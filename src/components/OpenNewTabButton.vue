<template>
  <Button :label="props.label" @click="openNewTab" />
</template>

<script setup lang="ts">
import Button from "primevue/button";
import router from "@/router";

// Входные параметры
const props = defineProps<{
  label: string; // Текст кнопки
  componentName: string; // Название компонента, на который переходим
  params: { [index: string]: number | string }; // Параметры для URL
}>();

function openNewTab() {
  const routeData = router.resolve({ name: props.componentName, params: props.params });
  window.open(routeData.href, "_blank");
}
</script>
