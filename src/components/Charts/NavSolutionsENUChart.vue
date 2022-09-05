<template>
  <ScatterChart v-bind="scatterChartProps" v-if="ds.available" />
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

const props = defineProps<{
  groupBy: Grouper<NavSolution>; // признак для группировки (excluded)
  namingKey: keyof NavSolution; // ключ сущности, для которой требуются графики (Комплект)
  depth: number; // глубина буферов, с
  updateRate: number; // апдейт рейт, мс
  id: number; // id сущности, для которой требуются графики (Комплекта)
  colors: { [index: string]: string }; // словать цветов для раскрашивания линий на графике
  names: { [index: string]: string }; // словать лейблов для наименования линий на графике
}>();

const parsingKeys: (keyof NavSolution)[] = ["e", "n", "u", "dt"];

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
    scales: {
      x: {
        type: "time",
        time: {
          // Luxon format string
          tooltipFormat: "HH:mm:ss",
          displayFormats: {
            millisecond: "HH:mm:ss",
            second: "HH:mm:ss",
            minute: "HH:mm",
            hour: "HH",
          },
        },
        title: {
          display: true,
          text: "МДВ",
        },
      },
      y: {
        title: {
          display: true,
          text: "E, N, U, м",
        },
        position: "left",
      },
      y2: {
        title: {
          display: true,
          text: "dt, м",
        },
        position: "right",
      },
    },
  },
};

// готовим датасеты для Chart JS
const chartData = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = {} as { datasets: any[] };

  if (ds.available && props.id && ds.groupedData !== undefined) {
    data.datasets = [];
    parsingKeys.forEach((value, index) => {
      const dataset = {} as { data: any; label: string; backgroundColor: string; yAxisID: string };
      dataset.data = Object.values(ds.groupedData)[0].data.map((n) => ({
        y: n[parsingKeys[index]],
        x: n.timestamp,
      }));
      dataset.label = props.names[parsingKeys[index]];
      dataset.backgroundColor = props.colors[parsingKeys[index]];
      dataset.yAxisID = "y";
      data.datasets.push(dataset);
    });
    data.datasets[data.datasets.length - 1].yAxisID = "y2";

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
