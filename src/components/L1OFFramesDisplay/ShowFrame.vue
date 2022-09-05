<template>
  <div class="string-list" v-if="!props.frameLoading && props.frameData">
    <div v-if="!isSF">
      <div class="string-list__item" v-for="(value, key) in props.frameData.content" :key="key">
        <ShowString :frame-string="value" :show-raw="props.showRaw ? props.showRaw : false" />
      </div>
    </div>
    <div v-if="isSF">
      <div class="string-list__item" v-for="(value, key) in props.frameData.content" :key="key">
        <ShowSFString :frame-string="value.string" />
      </div>
    </div>
  </div>
  <div class="string-list__progress" v-else-if="props.frameLoading">
    <ProgressSpinner />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import ProgressSpinner from "primevue/progressspinner";
import { OFFrame, SFFrame } from "@/signals-datatypes";
import ShowString from "@/components/L1OFFramesDisplay/ShowString.vue";
import ShowSFString from "@/components/L1OFFramesDisplay/ShowSFString.vue";

// Входные параметры
const props = defineProps<{
  frameData: OFFrame | SFFrame | undefined; // ID кадра в ЛБД
  frameLoading: boolean; // флаг загрузки кадра
  showRaw?: boolean; // флаг, показывать ли побитовую расшифровку
  isSF?: boolean; // флаг, закрытый ли сигнал
}>();
</script>

<style>
.string-list__progress {
  margin-top: 50px;
}
</style>
