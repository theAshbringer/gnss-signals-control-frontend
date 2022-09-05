<template>
  <div class="card">
    <div class="p-fluid grid align-items-center">
      <div class="field col">
        <span class="p-float-label">
          <InputNumber id="nka-number" mode="decimal" v-model="selectedNka" :min="1" :max="24" />
          <label for="nka-number">№ НКА</label>
        </span>
      </div>
      <div class="field col">
        <span class="p-float-label">
          <Dropdown
            id="bis-number"
            v-model="selectedBisNumber"
            :options="bisList.data?.map((item) => item.bisNumber)"
          />
          <label for="bis-number">№ Комплект</label>
        </span>
      </div>
      <div class="field col">
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
      <div class="field col">
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
      <div class="field col">
        <Button
          label="Отобразить список"
          @click="getQueryForL1ofFrames"
          icon="pi pi-check"
          :loading="props.loadingState"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed } from "vue";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import moment from "moment";
import { setupDataService } from "@/utils/dataexchangeservice";
import { BISList } from "@/knp-datatypes";
import { FrameListRequest } from "@/signals-datatypes";
import { NKASysNumbers } from "@/knp-common";

// Входные параметры
const props = defineProps<{
  loadingState: boolean; // статус загрузки
}>();
// Выходные параметры
const emit = defineEmits(["queryParams"]);

const init = new Date();
const startDatetime = ref<Date>(init);
const endDatetime = ref<Date>(init);
const selectedNka = ref<typeof NKASysNumbers[number]>(1);
const selectedBisNumber = ref<number>(1);

// получаем список Комплект
const bisList = setupDataService<BISList>({ url: "/bis" });

// находим Комплект по выбранному номеру в списке Комплект
// eslint-disable-next-line arrow-body-style
const selectedBis = computed(() => {
  return bisList.data?.find((item) => item.bisNumber === selectedBisNumber.value);
});

// функция преобразовывает датувремя в формат ISO
// TODO: реализовать это преобразование в сервисе обмена данными
function toISODate(datetime: Date) {
  return moment(datetime).format("YYYY-MM-DDTHH:mm:ss");
}

// функция формирует параметры запроса списка кадров L1OF
function getQueryForL1ofFrames() {
  const queryParams: FrameListRequest = {
    nka: selectedNka.value,
    bis: selectedBis.value ? selectedBis.value.bisId : 1, // id, а не номер!
    start: toISODate(startDatetime.value),
    end: toISODate(endDatetime.value),
  };
  emit("queryParams", queryParams);
}
</script>
