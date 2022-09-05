<template>
  <ScatterChart v-bind="scatterChartProps" v-if="archiveResiduals.available" />
  <p v-if="archiveResiduals.available">Последнее обновление {{ archiveResiduals.lastGet }}</p>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from "vue";
import { ScatterChart, useScatterChart } from "vue-chart-3";
import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";
import { ArchiveResiduals, ArchiveResidualSingle } from "@/knp-datatypes";
import { DataExchange } from "@/utils/dataexchangeservice";

const props = defineProps<{
  yValues: keyof ArchiveResidualSingle; // значения по вертикальной шкале
  colors: { [index: number]: string }; // словать цветов для раскрашивания линий на графике
  names: { [index: number]: string }; // словать лейблов для наименования линий на графике
  data: DataExchange<ArchiveResiduals>;
  isAverageNeeded: boolean;
}>();

const archiveResiduals = ref(props.data);

/** Общие параметры для графиков невязок */
// https://www.chartjs.org/docs/latest/axes/cartesian/time.html#configuration-options
// https://www.chartjs.org/chartjs-plugin-zoom/latest/guide/usage.html
const сhartOptions = {
  options: {
    animation: false,
    parsing: {
      xAxisKey: "timestamp",
    },
    scales: {
      x: {
        type: "time",
        time: {
          // Luxon format string
          tooltipFormat: "HH:mm:ss",
          unit: "minute",
          displayFormats: {
            minute: "DD-MMM HH:mm",
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
  if (archiveResiduals.value.available && archiveResiduals.value.data) {
    data.datasets = [];
    Object.values(archiveResiduals.value.data)
      .slice(0, -1)
      .forEach((residualsArray, index) => {
        data.datasets[index] = {};
        data.datasets[index].data = residualsArray;
        if (residualsArray.length !== 0) {
          const dataset = data.datasets[index].data[0];
          if (dataset !== undefined) {
            data.datasets[index].label = props.names[dataset.nkaId];
            data.datasets[index].backgroundColor = props.colors[dataset.nkaId];
            data.datasets[index].parsing = { yAxisKey: props.yValues };
          }
        }
      });
    if (props.isAverageNeeded) {
      // Параметры для графика средней невязки
      const averageResidualChartOptions = {
        label: "Средняя невязка",
        borderColor: "red",
        parsing: { yAxisKey: "average" },
        type: "line",
        pointStyle: "line",
        borderWidth: 6,
        order: -1,
      };
      const averageResiduals = {
        ...averageResidualChartOptions,
        data: archiveResiduals.value.data.average,
      };
      data.datasets.push(averageResiduals);
    }
    return data;
  }
  return { datasets: [] };
});

// Это нужно, чтобы Chart.js работал со старыми браузерами
// https://stackoverflow.com/questions/68628305/chart-js-3-firefox-68-and-angular-referenceerror-resizeobserver-is-not-def
if (typeof window !== "undefined") {
  window.ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
}

// https://vue-chart-3.netlify.app/guide/#chart-js-v3
Chart.register(...registerables, zoomPlugin);

// https://codesandbox.io/s/demo-vue-chart-3-ugynm?file=/src/App.vue
const { scatterChartProps } = useScatterChart({
  chartData,
  ...сhartOptions,
});
</script>
