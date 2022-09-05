<template>
  <div class="card">
    <div class="p-fluid grid">
      <div class="field col-4">
        <span class="p-float-label">
          <Calendar
            id="start"
            v-model="startDatetime"
            autocomplete="off"
            :showTime="true"
            :showSeconds="true"
            dateFormat="dd.mm.yy"
          />
          <label for="start">Начало периода (МДВ)</label>
        </span>
      </div>
      <div class="field col-4">
        <span class="p-float-label">
          <Calendar
            id="end"
            v-model="endDatetime"
            autocomplete="off"
            :showTime="true"
            :showSeconds="true"
            dateFormat="dd.mm.yy"
          />
          <label for="end">Конец периода (МДВ)</label>
        </span>
      </div>
      <div class="field col-4">
        <span class="p-float-label">
          <Dropdown id="nka" v-model="selectedNka" :options="localNKASysNumbers" />
          <label for="nka">Номер НКА</label>
        </span>
      </div>
      <div class="field col-8">
        <div v-if="!isEmpty">
          <p class="distring" v-for="(string, index) in DI.data" :key="index">{{ string }}</p>
        </div>
        <div v-else>В запрошенном периоде ЦИ отсутствует</div>
      </div>
      <div class="field col-4">
        <div class="col-6 col-offset-3">
          <Button label="Получить" @click="getDI" icon="pi pi-check" :loading="DI.loading"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import moment from "moment";
import { L1OFDi, L1OFDiQueryParams } from "@/signals-datatypes";
import { DataExchange } from "@/utils/dataexchangeservice";
import { NKASysNumbers } from "@/knp-common";

const init = new Date();
const startDatetime = ref<Date>(init);
const endDatetime = ref<Date>(init);
const selectedNka = ref<typeof NKASysNumbers[number]>(1);
const localNKASysNumbers = [...NKASysNumbers];

// инстанциируем сервис обмена ЦИ
const DI = reactive(new DataExchange<L1OFDi>({ url: "/l1of_di" }));

// функция преобразовывает датувремя в формат ISO
function toISODate(datetime: Date) {
  return moment(datetime).format("YYYY-MM-DDTHH:mm:ss");
}

// индикатор отсутствия ЦИ
const isEmpty = computed(() => {
  if (DI.data !== undefined && DI.data.length === 0) {
    return true;
  }
  return false;
});

// функция формирует параметры запроса ЦИ и делает запрос
function getDI() {
  const queryParams: L1OFDiQueryParams = {
    nka: selectedNka.value,
    start: toISODate(startDatetime.value),
    end: toISODate(endDatetime.value),
  };
  DI.getParams = queryParams;
  DI.get();
}
</script>

<style scoped>
.distring {
  font-family: monospace;
}
</style>
