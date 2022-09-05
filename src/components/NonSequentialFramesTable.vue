<template>
  <div v-if="!hasProps" style="text-align: left">
    <label>Поиск по № КА:</label>
    <input v-model="nkaFilter" />
  </div>
  <table-lite
    :is-static-mode="true"
    :is-loading="tKNotSequential.loading"
    :columns="tKNotSequentialTable.columns"
    :rows="tKNotSequentialTable.rows"
    :total="tKNotSequentialTable.totalRecordCount"
    :sortable="tKNotSequentialTable.sortable"
    :messages="tKNotSequentialTable.messages"
  />
</template>

<script lang="ts" setup>
import { ref, reactive, computed, defineProps } from "vue";
import TableLite from "vue3-table-lite/ts";
import { setupDataService } from "@/utils/dataexchangeservice";
import { TKNotSequential } from "@/knp-datatypes";
import { NKASysNumbers } from "@/knp-common";

const props = defineProps<{
  nkaSysNumber: typeof NKASysNumbers[number] | ""; // номер КА для фильтрации
}>();

// флаг наличия номера КА в пропсах
const hasProps = !!props.nkaSysNumber;

// значение поля для фильтра по номеру КА
const nkaFilter = ref(hasProps ? props.nkaSysNumber : "");

// Инстанциируем сервис кадров L1OF, принятых не по порядку
const tKNotSequential = setupDataService<TKNotSequential>({ url: "/tk_not_sequential" });

// Инициализируем свойства таблицы
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tKNotSequentialTable: any = reactive({
  // Параметры столбцов таблицы
  columns: [
    {
      label: "№ КА",
      field: "nkaSysNumber",
      width: "3%",
      sortable: true,
      isKey: true,
    },
    {
      label: "t_k",
      field: "tK",
      width: "10%",
      sortable: true,
    },
    {
      label: "diff",
      field: "diff",
      width: "15%",
      sortable: true,
    },
  ],
  // Строки таблицы
  rows: computed(() =>
    tKNotSequential.data?.filter((x) =>
      x.nkaSysNumber.toString().includes(nkaFilter.value.toString())
    )
  ),
  // Счетчик строк
  totalRecordCount: computed(() => tKNotSequentialTable.rows?.length),
  // Параметры сортировки
  sortable: {
    order: "nkaSysNumber",
    sort: "asc",
  },
  // Кастомные сообщения
  messages: {
    pagingInfo: "Показано {0}-{1} из {2}",
    pageSizeChangeLabel: "Показывать строк:",
    gotoPageLabel: "Перейти на страницу:",
    noDataAvailable: "Нет соответствующих данных",
  },
});
</script>

<style scoped>
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: #fff;
  background-color: #42b983;
  border-color: #42b983;
}
</style>
