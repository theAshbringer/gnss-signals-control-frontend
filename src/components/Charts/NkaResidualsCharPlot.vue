<template>
  <h2>График отклонения невязок от среднего</h2>
  <label for="depth-selector">Глубина наблюдений</label>
  <div id="depth-selector">
    <select v-model="selectedDepth">
      <option v-for="option in depthOptions" :value="option.value" :key="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
  <ResidualsChartPlot
    :group-by="'bis'"
    :naming-key="'nka'"
    :depth="selectedDepth"
    :update-rate="1000"
    :id="props.id"
    :colors="BisColor"
    :names="BisFullName"
    :y-values="'delta'"
  />
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import ResidualsChartPlot from "@/components/Charts/ResidualsChartPlot.vue";
import { BisFullName } from "@/knp-lang";
import { BisColor } from "@/knp-style";
import { NKASysNumbers } from "@/knp-common";

/** Перечень опций глубины отображения */
const depthOptions = [
  { text: "1 мин", value: 60 },
  { text: "3 мин", value: 180 },
  { text: "5 мин", value: 300 },
  { text: "10 мин", value: 600 },
] as const;

/** Выбранная глубина отображения */
const selectedDepth = ref(60);

const props = defineProps<{
  id: typeof NKASysNumbers[number];
}>();
</script>
