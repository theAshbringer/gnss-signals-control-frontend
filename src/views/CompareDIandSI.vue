<template>
  <h1>Сравнение ЦИ и СИ </h1>
<div v-if="comparison.available">
  <p>t<sub>b</sub>(ЦИ) = {{comparison.data?.time.tb}}</p>
  <p>N<sub>T</sub> = {{comparison.data?.time.nt}}</p>
  <p>N<sub>A</sub> = {{comparison.data?.time.na}}</p>
  <p>Время: {{comparison.data?.time.timestamp}}</p>
  <div>
    <table-lite
      :is-static-mode="true"
      :is-loading="comparison.loading"
      :columns="comparisonTable.columns"
      :rows="comparisonTable.rows"
      :total="comparisonTable.totalRecordCount"
      :sortable="comparisonTable.sortable"
      :messages="comparisonTable.messages"
    />
  </div>
</div>
<h2 v-else class="compare__no-data">
  Для выбранного кадра отсутствуют соответствующие формы СИ
</h2>
</template>

<script setup lang="ts">
import TableLite from 'vue3-table-lite/ts';
import { computed, reactive } from "vue";
import { Comparison, ComparisonRecord } from "@/knp-datatypes";
import { DataExchange } from "@/utils/dataexchangeservice";

// Входные параметры
const props = defineProps<{
  id: number;
  signalType: string;
}>();

// const frameId = 8;

// получаем данные сравнения ЦИ и СИ
const comparison = reactive(new DataExchange<Comparison>({ url: '/compare_DI_SI' }));
comparison.getParams = {id: props.id, signalType: props.signalType }
comparison.get();

// Инициализируем свойства таблицы
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const comparisonTable: any = reactive({
  // Столбцы таблицы
  columns: [
    {
      label: 'Параметр',
      field: 'param',
      isKey: true,
      sortable: true,
    },
    {
      label: 'ЦИ',
      field: 'di',
    },
    {
      label: 'СИ',
      field: 'si',
    },
    {
      label: 'Разность',
      field: 'diff',
    },
  ],
  // Строки таблицы
  rows: computed(() => comparison.data?.result.map(({param, di, si, diff}: ComparisonRecord) => {
    const item: {[index: string]: string | number} = {}
    item.param = param;
    if (['Ax', 'Ay', 'Az'].includes(param)) {
      item.si = si.toExponential(3);
      item.di = di.toExponential(3);
      item.diff = diff.toExponential(3);

    } else {
      item.si = si.toFixed(3);
      item.di = di.toFixed(3);
      item.diff = diff.toFixed(3);
    }
    return item;
  })),
  // Счетчик строк
  totalRecordCount: computed(() => comparisonTable.rows?.length),
  // Параметры сортировки
  sortable: {
    order: 'param',
    sort: 'asc',
  },
  // Кастомные сообщения
  messages: {
    pagingInfo: 'Показано {0}-{1} из {2}',
    pageSizeChangeLabel: 'Показывать строк:',
    gotoPageLabel: 'Перейти на страницу:',
    noDataAvailable: 'Нет соответствующих данных',
  },
});
</script>

<style>
.compare__no-data {
  margin-top: 30vh;
}
</style>

