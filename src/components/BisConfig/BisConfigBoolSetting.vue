<template>
  <div class="settings__item">
    <label :for="props.settingId">{{ label }}</label>
    <input
      v-model="newSettingValue"
      :id="props.settingId"
      :disabled="config.posting ? true : false"
      type="checkbox"
      @change="sendConfig()"
    />
    <button :disabled="config.posting ? true : false" @click="setDefault()">По умолчанию</button>

    <div class="save-status">
      <small v-if="config.posting">Сохраняется...</small>
      <small class="saved" v-else-if="isSaved">Сохранено!</small>
      <small class="invalid" v-else-if="config.postingFailed">Значение не сохранено</small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, defineProps } from "vue";
import { DataExchange } from "@/utils/dataexchangeservice";
import { BisControlConfigUIItem, BisConfigSettingName, BisControlConfig } from "@/bisconfig-common";

const props = defineProps<{
  settingId: typeof BisConfigSettingName[number]; // id настройки
  settingUIData: BisControlConfigUIItem; // описание для настройки
  initValue: boolean | undefined; // значение для инициализации чекбокса
}>();

// парсим переменные для отрисовки контрола из пропсов
// eslint-disable-next-line vue/no-setup-props-destructure
const { label } = props.settingUIData;
const defaultValue = !!props.settingUIData.defaultValue;
const initValue = !!props.initValue;

// инстациируем конфиг
// const config = reactive(new BisConfig());
const config = reactive(new DataExchange<BisControlConfig>({ url: "/bis_control_config" }));

// переменная для хранения нового значения настройки
const newSettingValue = ref(initValue);

// объявляем флаг "изменение сохранено на сервере"
const isSaved = ref<boolean>(false);

// смотрим, когда posting сменился с true на false
watch(
  () => config.posting,
  (posting, prevPosting) => {
    if (prevPosting && !posting) {
      if (!config.postingFailed) {
        isSaved.value = true;
      } else {
        isSaved.value = false;
        newSettingValue.value = !newSettingValue.value;
      }
    }
  }
);

// смотрим за isSaved, чтобы сбросить флаг
watch(
  () => isSaved.value,
  (currSaved) => {
    if (currSaved) {
      setTimeout(() => {
        isSaved.value = false;
      }, 1500);
    }
  }
);

// функция для отправки обновленной части конфига на сервер
function sendConfig() {
  config.post({
    [props.settingId]: newSettingValue.value,
  });
}

// функция сброса значения до значения по умолчанию
function setDefault() {
  if (!(newSettingValue.value === defaultValue)) {
    newSettingValue.value = defaultValue;
    sendConfig();
  }
}
</script>

<style scoped>
.settings__item {
  display: grid;
  grid-template-columns: 285px 15px auto auto 100px;
  grid-template-rows: auto 30px;
  grid-template-areas:
    "label label .      . ."
    "input input button . saved";
  column-gap: 5px;
}
.settings__item label {
  padding: 0 5px;
  font-size: 13px;
  grid-area: label;
}

.settings__item small {
  font-size: 11px;
}

.settings__item button {
  grid-area: button;
}
.settings__item input {
  padding: 3px;
  grid-area: input;
  margin: 0 auto;
  align-self: center;
}

.save-status {
  grid-area: saved;
  font-weight: bold;
}

.saved {
  color: green;
}

.invalid {
  color: red;
}
</style>
