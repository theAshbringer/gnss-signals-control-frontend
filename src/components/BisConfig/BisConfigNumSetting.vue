<template>
  <div class="settings__item">
    <label :for="props.settingId">{{ label }}</label>
    <input
      v-model="newSettingValue"
      type = "text"
      autocomplete="off"
      :id="props.settingId"
      :placeholder="'Введите значение'"
      :disabled = "config.posting ? true : false"
      @keyup.enter="sendConfig()"
      @blur="sendConfig()"
    />

    <button class="default-button"
      :disabled = "config.posting ? true : false"
      @click="setDefault()">По умолчанию</button>

    <!-- <button class="save-button"
      :disabled = "config.posting ? true : false"
      @click.prevent="sendConfig()">Сохранить</button> -->

    <div class="save-status">
      <small v-if="config.posting">Сохраняется...</small>
      <small class="saved" v-else-if="needMessageSaved">Сохранено!</small>
      <small class="invalid" v-else-if="config.postingFailed">Значение не сохранено</small>
    </div>

    <div class="errors">
      <div
        v-for="error of v$.$errors"
        :key="error.$uid"
      >
        <small>{{ error.$message }}</small>
      </div>
    </div>

      <div class="tips" v-if="!v$.$dirty">
        <small v-if="minRangeValue && maxRangeValue">
          Введите число в диапазоне {{ minRangeValue }}-{{ maxRangeValue }}</small>
        <small v-else-if="!maxRangeValue">
          Введите число не менее {{ minRangeValue }}</small>
      </div>

  </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import {
  required, minValue, maxValue, helpers, integer,
} from '@vuelidate/validators';
import {
  reactive, watch, defineProps, computed, ref,
} from 'vue';
import { DataExchange } from '@/utils/dataexchangeservice';
import { BisControlConfigUIItem, BisConfigSettingName, BisControlConfig } from '@/bisconfig-common';

const props = defineProps<{
  settingId: typeof BisConfigSettingName[number] // id настройки
  settingUIData: BisControlConfigUIItem // описание для настройки
  initValue: string | number | undefined
}>();

// парсим переменные для отрисовки контрола из пропсов
// eslint-disable-next-line vue/no-setup-props-destructure
const {
  label, defaultValue, minRangeValue, maxRangeValue,
} = props.settingUIData;

// создаем переменную для хранения нового значения настройки, инициализируя ее значением с сервера
const newSettingValue = ref(props.initValue);

// описываем валидаторы
const rules = computed(() => {
  const localRules = {
    newSettingValue: {
      required: helpers.withMessage('Поле не может быть пустым', required),
      minValue: helpers.withMessage(
        () => `Введите значение не менее ${minRangeValue}`,
        minValue(minRangeValue),
      ),
      ...(maxRangeValue && {
        maxValue: helpers.withMessage(
          () => `Введите значение не более ${maxRangeValue}`,
          maxValue(maxRangeValue),
        ),
      }),
      integer: helpers.withMessage('Значение должно быть целым числом', integer),
      $autoDirty: true, //
      $lazy: true,
    },
  };
  return localRules;
});

// инициализируем валидации
const v$ = useVuelidate(rules, { newSettingValue });

// инстациируем конфиг
// const config = reactive(new BisConfig());
const config = reactive(new DataExchange<BisControlConfig>({ url: '/bis_control_config' }));

// объявляем флаг "изменение сохранено на сервере"
const isSaved = ref<boolean>(false);

// смотрим, когда posting сменился с true на false
watch(() => config.posting, (currPosting, prevPosting) => {
  if (prevPosting && !currPosting) {
    if (!config.postingFailed) {
      isSaved.value = true;
    } else {
      isSaved.value = false;
    }
  }
});

// при любых изменениях в input сбрасываем флаг isSaved
watch(newSettingValue, () => {
  isSaved.value = false;
});

// объявляем флаг наличия надписи "Сохранено" (пришлось отделить от isSaved)
const needMessageSaved = ref(false);

// смотрим за isSaved, чтобы обнулить поля и сбросить флаг
watch(() => isSaved.value, (currSaved) => {
  if (currSaved) {
    needMessageSaved.value = true;
    v$.value.$reset();
    setTimeout(() => {
      needMessageSaved.value = false;
    }, 2000);
  }
});

// функция для отправки обновленной части конфига на сервер
async function sendConfig() {
  // отправляем новый конфиг только при успехе всех валидаций
  const isFormCorrect = await v$.value.newSettingValue.$validate();

  if (isFormCorrect) {
    config.post({
      [props.settingId]: newSettingValue.value,
    });
  }
}

// функция сброса значения до значения по умолчанию
function setDefault() {
  newSettingValue.value = defaultValue;
  sendConfig();
}

</script>

<style scoped>
.settings__item {
  display: grid;
  grid-template-columns: 300px auto auto 100px;
  grid-template-rows: auto 30px auto;
  grid-template-areas:
        "label .       .        ."
        "input dbutton sbutton  saved"
        "tips  tips    .        .";
  column-gap: 5px;
}
.settings__item label {
  padding: 0 5px;
  font-size: 13px;
  grid-area: label;
}

.tips {
  grid-area: tips;
  text-align: left;
}

.settings__item small {
  font-size: 11px;
}

.default-button {
  grid-area: dbutton;
}

.save-button {
  grid-area: sbutton;
}

.settings__item input {
  border-radius: 5px;
  padding: 3px;
  grid-area: input;
}

.errors {
  display: flex;
  flex-direction: column;
  color: red;
  text-align: left;
  grid-row: 3 / 4;
  grid-column: 1 / 2;
  margin: 0;
}

.invalid {
  color: red;
}

.save-status {
  grid-area: saved;
  font-weight: bold;
}
.saved {
  color: green;
}

</style>
