<template>
  <p>
    Статус Комплект:
    <span
      :class="{
        red: eventNumber === Event.NO_BIS || eventNumber === Event.NO_KNP,
        orange: eventNumber === Event.NO_DATA,
        green: eventNumber === Event.OK,
      }"
      >{{ eventMessage[eventNumber] }}</span
    >
  </p>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { BisConnectionStatus } from "@/knp-datatypes";
import { setupDataService } from "@/utils/dataexchangeservice";

const dataFromAPI = setupDataService<BisConnectionStatus>({
  url: "/receiver_status",
  updateRate: 1000,
});

// Возможные события состояния связи с Комплект
enum Event {
  NO_KNP,
  NO_BIS,
  NO_DATA,
  OK,
}

// Описания событий состояния связи с Комплект
const eventMessage = {
  [Event.NO_KNP]: "Нет связи с сервером КНП",
  [Event.NO_BIS]: "Нет связи с Комплект",
  [Event.NO_DATA]: "Нет данных от Комплект",
  [Event.OK]: "Данные от Комплект получены",
};

// Событие для текущей комбинации статусов наличия соединения и данных
const eventNumber = computed<Event>(() => {
  if (dataFromAPI.loadingFailed === false && dataFromAPI.data !== undefined) {
    if (dataFromAPI.data.connected) {
      if (dataFromAPI.data.data) {
        return Event.OK; // connected = true, data = true
      }
      return Event.NO_DATA; // connected = true, data = false
    }
    return Event.NO_BIS; // connected = false
  }
  return Event.NO_KNP; // данные не были получены
});
</script>

<style scoped>
span {
  font-weight: bold;
}
.red {
  color: red;
}
.green {
  color: green;
}
.orange {
  color: orange;
}
</style>
