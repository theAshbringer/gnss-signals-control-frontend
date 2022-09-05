<template>
  <div>
    <DataTable
      v-if="props.framesList"
      @row-select="onRowSelect"
      :value="props.framesList"
      v-model:selection="selectedFrame"
      data-key="tk"
      responsive-layout="scroll"
      selection-mode="single"
      sort-field="tk"
      :paginator="true"
      :rows="8"
      :page-link-size="3"
      :sort-order="-1"
    >
      <Column field="timestamp" header="Дата" :sortable="true"></Column>
      <Column field="num" header="Номер кадра"></Column>
      <Column field="tk" header="tk" :sortable="true"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { OFFrames, OFMeta, SFFrames, SFMeta } from "@/signals-datatypes";

// Входные параметры
const props = defineProps<{
  framesList: OFFrames | SFFrames | undefined; // статус загрузки
}>();

// Выходные параметры
const emit = defineEmits(["frameIdSelect"]);

// Выбранный кадр
const selectedFrame = ref<OFMeta | SFMeta>();

/** Сортировка кадров */

function onRowSelect() {
  emit("frameIdSelect", { id: selectedFrame.value?.frameId });
}
</script>
