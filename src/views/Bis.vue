<template>
  <h1>Комплект №{{ props.id }}</h1>
  <div class="bis">
    <section class="bis__options">
      <div class="bis__option">
        <label for="depth-selector">Глубина наблюдений</label>
        <div id="depth-selector">
          <select v-model="selectedDepth">
            <option v-for="option in depthOptions" :value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="bis__option">
        <label for="depth-selector">Частота обновления</label>
        <div id="depth-selector">
          <select v-model="selectedRate">
            <option v-for="option in updateRateOptions" :value="option.value" :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </section>
    <section class="bis__residuals">
      <h2>График невязок</h2>
      <ResidualsChartPlot
        :group-by="'nka'"
        :naming-key="'bis'"
        :depth="selectedDepth"
        :update-rate="selectedRate"
        :id="props.id"
        :colors="NkaColor"
        :names="NkaFullName"
        :y-values="'residual'"
      />
    </section>
    <section class="bis__plane">
      <h2>График РНЗ в плане</h2>
      <NavSolutionsPlaneChart
        :group-by="'excluded'"
        :naming-key="'bis'"
        :depth="selectedDepth"
        :update-rate="selectedRate"
        :id="props.id"
        :colors="NavSolutionColor"
        :names="NavSolutionName"
      />
    </section>
    <section class="bis__enu">
      <h2>График РНЗ по составляющим</h2>
      <NavSolutionsENUChart
        :group-by="'excluded'"
        :naming-key="'bis'"
        :depth="selectedDepth"
        :update-rate="selectedRate"
        :id="props.id"
        :colors="NavSolutionENUColor"
        :names="NavSolutionENUName"
      />
    </section>
    <section class="bis__angles">
      <BisCurrentAngles :id="props.id" :update-rate="selectedRate" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import ResidualsChartPlot from "@/components/Charts/ResidualsChartPlot.vue";
import NavSolutionsPlaneChart from "@/components/Charts/NavSolutionsPlaneChart.vue";
import NavSolutionsENUChart from "@/components/Charts/NavSolutionsENUChart.vue";
import { BisIDs } from "@/knp-common";
import { NavSolutionColor, NavSolutionENUColor, NkaColor } from "@/knp-style";
import { NavSolutionName, NavSolutionENUName, NkaFullName } from "@/knp-lang";
import BisCurrentAngles from "@/components/BisCurrentAnglesTable.vue";

/** Перечень опций глубины отображения */
const depthOptions = [
  { text: "1 мин", value: 60 },
  { text: "3 мин", value: 180 },
  { text: "5 мин", value: 300 },
  { text: "10 мин", value: 600 },
] as const;

/** Перечень опций частоты обновления */
const updateRateOptions = [
  { text: "1 c", value: 1000 },
  { text: "5 c", value: 5000 },
  { text: "15 c", value: 15000 },
  { text: "1 мин", value: 60000 },
] as const;

/** Выбранная глубина отображения */
const selectedDepth = ref(60);

/** Выбранная частота обновления */
const selectedRate = ref(5000);

const props = defineProps<{
  id: typeof BisIDs[number];
}>();
</script>

<style>
.bis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: max-content;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    "options options"
    "residuals residuals"
    "enu enu"
    "plane angles";
}

.bis__options {
  grid-area: options;
  display: flex;
}

.bis__option {
  margin-right: 23px;
}

.bis__residuals {
  grid-area: residuals;
  width: 100%;
}

.bis__plane {
  grid-area: plane;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bis__enu {
  grid-area: enu;
  width: 100%;
}

.bis__angles {
  grid-area: angles;
}
</style>
