<template>
  <sidebar-menu :menu="menu" :hideToggle="true" :width="'200px'" :showOneChild="true" />
  <div class="maindiv">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { BISList } from "./knp-datatypes";
import { NkaFullName } from "./knp-lang";
import { setupDataService } from "./utils/dataexchangeservice";

// Формируем массив имен ссылок и их адресов по всем НКА
let nkas: { href: string; title: string }[] = [
  {
    href: "/nka",
    title: "Общее",
  },
];
for (const [key, value] of Object.entries(NkaFullName)) {
  nkas = nkas.concat({ href: `/nka/${key}`, title: value });
}

// Создаем массив для имен ссылок и их адресов по всем парам станция/Комплект
const BISAvailable = ref<{ href: string; title: string }[]>([
  {
    href: "/bis",
    title: "Общее",
  },
]);

// Подгружаем список доступных пар станция/комплект
const BISListData = setupDataService<BISList>({ url: "/bis", updateRate: 10000 });

const menu = ref([
  {
    header: "КНП",
  },
  {
    href: "/",
    title: "Дашборд",
  },
  {
    href: "/bis",
    title: "Комплект",
    child: BISAvailable.value,
  },
  {
    href: "/nka",
    title: "НКА",
    child: nkas,
  },
  {
    href: "/settings",
    title: "Настройки",
    child: [
      {
        href: "/settings",
        title: "Конфигурация Комплект",
      },
    ],
  },
  {
    href: "/tools",
    title: "Инструменты",
    child: [
      {
        href: "/tools/dil1of",
        title: "ЦИ L1OF",
      },
      {
        href: "/tools/tk_not_sequential",
        title: "Таблица кадров L1OF, пришедших не по порядку",
      },
      {
        href: "/tools/l1of_frames_display",
        title: "Кадры L1OF",
      },
      {
        href: "/tools/l2of_frames_display",
        title: "Кадры L2OF",
      },
      {
        href: "/tools/l1sf_frames_display",
        title: "Кадры L1SF",
      },
      {
        href: "/tools/archive_data",
        title: "Архивные данные",
      },
    ],
  },
]);

// При получении списка Комплект формируем массив имен ссылок и их адресов по всем парам станция/Комплект
watch(
  () => BISListData.loading,
  (currValue) => {
    if (!currValue && BISListData.data) {
      BISAvailable.value = [
        {
          href: "/bis",
          title: "Общее",
        },
      ];
      BISListData.data.forEach((item, index) => {
        BISAvailable.value.push({
          href: `/bis/${index + 1}`,
          title: `Комплект ${item.stationId}/${item.bisNumber}`,
        });
      });
    }
    // Удаляем текущую версию массива с номерами Комплект и заменяем подгруженной
    menu.value.splice(2, 1, {
      href: "/bis",
      title: "Комплект",
      child: BISAvailable.value,
    });
  }
);
</script>

<style>
@import "assets/loaders.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.maindiv {
  margin-left: 220px;
  margin-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
