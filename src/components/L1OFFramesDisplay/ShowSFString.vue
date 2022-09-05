<template>
  <div>
    <table class="table p-component">
      <tr class="table__row">
        <th class="table__head-cell"></th>
      </tr>
      <tr class="table__row">
        <td class="table__cell table__cell_type_raw">
          {{ props.frameString }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import "primevue/resources/primevue.min.css";
import { SFFrameString } from "@/signals-datatypes";

// Входные параметры
const props = defineProps<{
  frameString: SFFrameString; // строка кадра
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

.table__cell {
  border: solid 1px rgba(0, 0, 0, 0.08);
  padding: 0 1px;
}

.table__cell_type_raw {
  font-family: monospace;
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
}
</style>
