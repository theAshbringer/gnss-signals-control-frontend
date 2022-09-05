<template>
  <div>
    <table v-if="currentAngles.available">
      <tr>
        <th>Станция</th>
        <th>Угол места</th>
        <th>Азимут</th>
      </tr>
      <tr v-for="(data, key) in currentAngles.data" :key="key">
        <td>{{ BisFullName[data.bisId] }}</td>
        <td>{{ data.elevation }}</td>
        <td>{{ data.azimuth }}</td>
      </tr>
    </table>
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
import { BisFullName } from "@/knp-lang";
import { NKASysNumbers } from "@/knp-common";
import { setupDataService } from "@/utils/dataexchangeservice";
import { CurrentAngles } from "@/knp-datatypes";

const props = defineProps<{
  id: typeof NKASysNumbers[number];
}>();

const currentAngles = setupDataService<CurrentAngles[]>({
  url: "/current_angles",
  updateRate: 1000,
  startImmediately: false,
});
currentAngles.getParams = { nka: props.id };
currentAngles.start();

watch(
  () => props.id,
  (newId) => {
    currentAngles.getParams = { nka: newId };
  }
);
</script>
