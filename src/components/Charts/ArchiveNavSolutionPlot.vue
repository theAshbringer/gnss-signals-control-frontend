<template>
  <ScatterChart v-bind="scatterChartProps" v-if="archiveNavSolutions.available" />
  <p v-if="archiveNavSolutions.available">Последнее обновление {{ archiveNavSolutions.lastGet }}</p>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from "vue";
import { ScatterChart, useScatterChart } from "vue-chart-3";
import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment";
import zoomPlugin from "chartjs-plugin-zoom";
import { ArchiveNavSolution } from "@/knp-datatypes";
import { DataExchange } from "@/utils/dataexchangeservice";

const props = defineProps<{
  data: DataExchange<ArchiveNavSolution[]>;
  colors: { [index: string]: string }; // словать цветов для раскрашивания линий на графике
  names: { [index: string]: string }; // словать лейблов для наименования линий на графике
}>();

const parsingKeys: (keyof ArchiveNavSolution)[] = ["e", "n", "u", "dt"];

const archiveNavSolutions = ref(props.data);

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
  if (archiveNavSolutions.value.isDataNotEmpty) {
    data.datasets = [];

    parsingKeys.forEach((value, index) => {
      const dataset = {} as { data: any; label: string; backgroundColor: string; yAxisID: string };
      dataset.data = archiveNavSolutions.value.data!.map((solution) => ({
        y: solution[parsingKeys[index]],
        x: solution.timestamp,
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
  ...chartOptions,
});
</script>
