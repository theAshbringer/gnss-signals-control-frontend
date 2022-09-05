<template>
  <div class="angles">
    <table v-if="currentAngles.available" class="angles__table">
      <tr>
        <th>НКА</th>
        <th>Угол места</th>
        <th>Азимут</th>
      </tr>
      <tr v-for="(data, key) in currentAngles.data" :key="key">
        <td>{{ NkaFullName[data.nkaNumber] }}</td>
        <td>{{ data.elevation }}</td>
        <td>{{ data.azimuth }}</td>
      </tr>
    </table>
    <p v-if="currentAngles.available">Последнее обновление {{ currentAngles.lastGet }}</p>
    <div v-else class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, watch } from "vue";
import { NkaFullName } from "@/knp-lang";
import { BisIDs } from "@/knp-common";
import { setupDataService } from "@/utils/dataexchangeservice";
import { CurrentAngles } from "@/knp-datatypes";

const props = defineProps<{
  id: typeof BisIDs[number];
  updateRate: number;
}>();

const currentAngles = setupDataService<CurrentAngles[]>({
  url: "/current_angles",
  updateRate: props.updateRate,
  startImmediately: false,
});
currentAngles.getParams = { bis: props.id };

currentAngles.start();

watch(
  () => props.id,
  (newId) => {
    currentAngles.getParams = { bis: newId };
  }
);
</script>

<style>
.angles {
  display: flex;
  flex-direction: column;
}

.angles__table {
  align-self: center;
}
</style>
