<template>
  <div>
    <h2>Конфигурация станции</h2>
    <div class="wrapper">
      <div v-if="configParent.available" class="settings">
        <BisConfigNumSetting
          v-for="(settingUIData, settingId) in BisControlConfigUI.num"
          :key="settingId"
          :settingId="settingId"
          :settingUIData="settingUIData"
          :initValue="configParent.data ? configParent.data[settingId] : ''"
        />
        <BisConfigBoolSetting
          v-for="(settingUIData, settingId) in BisControlConfigUI.bool"
          :key="settingId"
          :settingId="settingId"
          :settingUIData="settingUIData"
          :initValue="configParent.data ? configParent.data[settingId] : false"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BisControlConfigUI, BisControlConfig } from "@/bisconfig-common";
import { setupDataService } from "@/utils/dataexchangeservice";
import BisConfigNumSetting from "./BisConfigNumSetting.vue";
import BisConfigBoolSetting from "./BisConfigBoolSetting.vue";

// инстациируем конфиг
const configParent = setupDataService<BisControlConfig>({ url: "/bis_control_config" });
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.wrapper {
  display: inline-block;
  text-align: center;
}
.settings {
  display: grid;
  grid-template-columns: 600px;
  gap: 15px;
  margin-bottom: 50px;
  margin-left: 100px;
  padding-top: 20px;
}
</style>
