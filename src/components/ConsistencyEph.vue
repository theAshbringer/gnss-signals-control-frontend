<template>
  <h3>Согласованность ЭИ"</h3>
  <table v-if="statusData.available">
    <thead>
      <tr>
        <td v-for="(ephemeridesStatus, nka) in statusData.data" :key="nka">
          {{ nka }}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td
          v-for="(ephemeridesStatus, nka) in statusData.data"
          :key="nka"
          :class="{
            red: ephemeridesStatus == EphemeridesStatus.INCONSIST,
            green: ephemeridesStatus == EphemeridesStatus.OK,
            darkgray: ephemeridesStatus == EphemeridesStatus.NO_DATA,
          }"
        >
          {{ ephemeridesStatus }}
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { knpDataService } from "@/utils/dataservice";
import { ControlConsistEphInf } from "@/knp-datatypes";
import { EphemeridesStatus } from "@/knp-common";

const statusData = knpDataService<ControlConsistEphInf>({ url: "/eph_on_border" });

console.log(statusData);
</script>

<style scoped>
td {
  background-color: rgba(1, 1, 1, 0);
}
.red {
  background-color: red;
}
.green {
  background-color: green;
}
.darkgray {
  background-color: darkgray;
}
</style>
