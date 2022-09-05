<template>
  <ScatterChart v-bind="scatterChartProps" v-if="ds.available" :height="500" :width="500" />
  <p v-if="ds.available">Последнее обновление {{ ds.lastGet }}</p>
  <div v-else class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, watch } from "vue";
import { ScatterChart, useScatterChart } from "vue-chart-3";
import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment";
import { knpGroupedTimeSeriesDataService, Grouper } from "@/utils/timeseriesservice";
import { NavSolution } from "@/knp-datatypes";
import TTLBuffer from "@/utils/ttlbuffer";

const props = defineProps<{
  groupBy: Grouper<NavSolution>; // признак для группировки (excluded)
  namingKey: keyof NavSolution; // ключ сущности, для которой требуются графики (Комплект)
  depth: number; // глубина буферов, с
  updateRate: number; // апдейт рейт, мс
  id: number; // id сущности, для которой требуются графики (Комплекта)
  colors: { [index: number]: string }; // словать цветов для раскрашивания линий на графике
  names: { [index: number]: string }; // словать лейблов для наименования линий на графике
}>();

// Это нужно, чтобы Chart.js работал со старыми браузерами
// https://stackoverflow.com/questions/68628305/chart-js-3-firefox-68-and-angular-referenceerror-resizeobserver-is-not-def
if (typeof window !== "undefined") {
  window.ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
}

// https://vue-chart-3.netlify.app/guide/#chart-js-v3
Chart.register(...registerables);

// Инициализируем буфер, устанавливаем группировку и подгруппировку
const ds = knpGroupedTimeSeriesDataService<NavSolution>({
  url: "/nav_solution",
  depth: props.depth,
  updateRate: props.updateRate,
  startImmediately: false,
});
ds.setGroup(props.groupBy);

function updateID(newId: number) {
  ds.emptyData();
  ds.getParams = {};
  ds.getParams[props.namingKey] = newId;
}

updateID(props.id);

ds.start();

// https://www.chartjs.org/docs/latest/axes/cartesian/time.html#configuration-options
// https://www.chartjs.org/chartjs-plugin-zoom/latest/guide/usage.html
const chartOptions = {
  options: {
    animation: false,
    maintainAspectRatio: true,
    responsive: false,
    parsing: {
      xAxisKey: "e",
      yAxisKey: "n",
    },
    scales: {
      x: {
        min: -5,
        max: 5,
        title: {
          display: true,
          text: "E",
        },
      },
      y: {
        min: -5,
        max: 5,
        title: {
          display: true,
          text: "N",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          drag: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
  },
};

// готовим датасеты для Chart JS
const chartData = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = {} as { datasets: any[] };
  if (ds.available && props.id && ds.groupedData !== undefined) {
    data.datasets = Object.values(ds.groupedData);
    data.datasets.forEach((value: TTLBuffer<NavSolution>, index: number) => {
      if (value.length !== 0) {
        const row = data.datasets[index].data[0];
        if (row !== undefined) {
          data.datasets[index].label = props.names[row[props.groupBy]];
          data.datasets[index].backgroundColor = props.colors[row[props.groupBy]];
        }
      }
    });
    return data;
  }
  return { datasets: [] };
});

// https://codesandbox.io/s/demo-vue-chart-3-ugynm?file=/src/App.vue
const { scatterChartProps } = useScatterChart({
  chartData,
  ...chartOptions,
});

// следим за глубиной, изменяемой извне
watch(
  () => props.depth,
  (after) => {
    ds.setDepth(after);
  }
);

watch(
  () => props.id,
  (newId) => {
    updateID(newId);
  }
);
</script>
