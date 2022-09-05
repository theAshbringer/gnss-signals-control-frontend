<template>
  <h3>Счетчики пакетов</h3>
  <table v-if="bisPacketCounters.available">
    <thead>
      <tr>
        <th>Станция/Комплект</th>
        <th v-for="packet_code in BISPacketIDs" :key="packet_code">
          {{ bisPacketName[packet_code] }}
        </th>
      </tr>
    </thead>
    <tbody v-for="(station_packets, station) in bisPacketCounters.data" :key="station">
      <tr v-for="(bis_packets, bis) in station_packets" :key="bis">
        <td>{{ station }} / {{ bis }}</td>
        <td v-for="packet_code in BISPacketIDs" :key="packet_code">
          {{ bis_packets[packet_code] }}
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
  <p v-if="bisPacketCounters.available">Последнее обновление {{ bisPacketCounters.lastUpdate }}</p>
</template>

<script lang="ts" setup>
import { knpDataService } from "@/utils/dataservice";
import { AllPacketCounters } from "@/knp-datatypes";
import { bisPacketName } from "@/knp-lang";
import { BISPacketIDs } from "@/knp-common";

const bisPacketCounters = knpDataService<AllPacketCounters>({ url: "/packet_counters" });
</script>
