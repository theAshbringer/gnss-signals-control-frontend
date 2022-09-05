<template>
  <div>
    <table class="table p-component">
      <tr class="table__row">
        <th class="table__head-cell" v-for="(value, key) in props.frameString" :key="key">
          <span v-html="OFStrFieldNamesHTML[key]"></span>
        </th>
      </tr>
      <tr class="table__row">
        <td
          class="table__cell"
          :style="{ minWidth: String(value.raw).length + 'ch' }"
          v-for="(value, key) in props.frameString"
          :key="key"
        >
          {{
            Number.isInteger(+value.val) || key === "x" || key === "y" || key === "z"
              ? +value.val
              : (+value.val).toExponential(4)
          }}
        </td>
      </tr>
      <tr class="table__row" v-if="props.showRaw">
        <td
          class="table__cell table__cell_type_raw"
          v-for="(value, key) in props.frameString"
          :key="key"
        >
          {{ value.raw }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import "primevue/resources/primevue.min.css";
import { OFStrFieldNamesHTML } from "@/knp-lang";
import { OFFrameString } from "@/signals-datatypes";

// Входные параметры
const props = defineProps<{
  frameString: OFFrameString; // строка кадра
  showRaw: boolean; // флаг, показывать ли побитовую расшифровку
}>();
</script>

<style>
.table {
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}

.table__row {
  border-bottom: solid 1px rgba(0, 0, 0, 0.08);
  height: 1.8rem;
}

.table__head-cell {
  text-align: inherit;
  border: solid 1px #e9ecef;
  background-color: #f8f9fa;
  font-weight: bold;
  padding: 0 1px;
}

.table__cell {
  border: solid 1px rgba(0, 0, 0, 0.08);
  padding: 0 1px;
}

.table__cell_type_raw {
  font-family: monospace;
  font-size: 1.1rem;
}
</style>
