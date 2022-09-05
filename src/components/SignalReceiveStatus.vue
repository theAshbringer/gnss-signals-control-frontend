<template>
  <h3>Состояние приема сигналов</h3>
  <table v-if="statusData.available">
    <tr>
      <th>НКА</th>
      <th v-for="signal_code of NavSignalsCodes" :key="signal_code">
        {{ NavSignalName[signal_code] }}
      </th>
    </tr>
    <tr v-for="(signals_status, nka) in statusData.data" :key="nka">
      <td>{{ nka }}</td>
      <td
        v-for="signal_code in NavSignalsCodes"
        :key="signal_code"
        :class="{
          red: signals_status[signal_code] == SignalStatus.UNAVAILABLE,
          green: signals_status[signal_code] == SignalStatus.RECEIVE,
          yellow: signals_status[signal_code] == SignalStatus.ERROR,
          white: signals_status[signal_code] == SignalStatus.NOT_ON_AIR,
        }"
      >
        {{ signals_status[signal_code] }}
      </td>
    </tr>
  </table>
  <div v-else class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  <p v-if="statusData.available">Последнее обновление {{ statusData.lastUpdate }}</p>
</template>

<script lang="ts" setup>
import { knpDataService } from "@/utils/dataservice";
import { SummarySignalReceiveStatus } from "@/knp-datatypes";
import { NavSignalsCodes, SignalStatus } from "@/knp-common";
import { NavSignalName } from "@/knp-lang";

const statusData = knpDataService<SummarySignalReceiveStatus>({
  url: "/summary_signals_receive_status",
});
</script>

<style scoped>
td {
  background-color: darkgray;
}
.red {
  background-color: red;
}
.green {
  background-color: green;
}
.yellow {
  background-color: yellow;
}
.white {
  background-color: white;
}
</style>
