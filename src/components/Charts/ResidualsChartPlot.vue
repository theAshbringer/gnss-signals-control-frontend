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
import zoomPlugin from "chartjs-plugin-zoom";
import { knpGroupedTimeSeriesDataService, Grouper } from "@/utils/timeseriesservice";
import { Residual } from "@/knp-datatypes";
import TTLBuffer from "@/utils/ttlbuffer";

const props = defineProps<{
  yValues: keyof Residual; // значения по вертикальной шкале
  groupBy: Grouper<Residual>; // признак для группировки (Комплект или НКА)
  depth: number; // глубина буферов, с
  updateRate: number; // апдейт рейт, мс
  id: number; // id сущности, для которой требуются графики
  namingKey: keyof Residual; // ключ сущности, для которой требуются графики (НКА или Комплект)
  colors: { [index: number]: string }; // словать цветов для раскрашивания линий на графике
  names: { [index: number]: string }; // словать лейблов для наименования линий на графике
}>();

// Это нужно, чтобы Chart.js работал со старыми браузерами
// https://stackoverflow.com/questions/68628305/chart-js-3-firefox-68-and-angular-referenceerror-resizeobserver-is-not-def
if (typeof window !== "undefined") {
  window.ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
}

// https://vue-chart-3.netlify.app/guide/#chart-js-v3
Chart.register(...registerables, zoomPlugin);

// Инициализируем буфер, устанавливаем группировку и подгруппировку
const ds = knpGroupedTimeSeriesDataService<Residual>({
  url: "/residuals",
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
    parsing: {
      xAxisKey: "timestamp",
      yAxisKey: props.yValues,
    },
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
          text: "ДМВ",
        },
      },
      y: {
        title: {
          display: true,
          text: "[м]",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "y",
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
    data.datasets.forEach((value: TTLBuffer<Residual>, index: number) => {
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
