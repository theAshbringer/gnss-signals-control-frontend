<template>
  <h1 class="title">Кадры ЦИ L1SF</h1>
  <GetQueryParams
    :loading-state="l1sfFramesList.loading"
    @query-params="getL1SFFrames"
    />
  <div class="frames-display" v-if="l1sfFramesList.available && l1sfFramesList.data?.length">
    <div class="frames-display__settings">
      <div class="frames-display__list">
      <FramesListTable
        :frames-list="framesListData"
        @frame-id-select="assignFrameId"
        />
    </div>
    <div class="frames-display__switch">
      <label>Отобразить побитовую расшифровку
        <InputSwitch v-model="showRaw" disabled="disabled"/>
      </label>
    </div>
    </div>
    <div class="frames-display__single-frame">
      <ShowFrame
        v-if="showFrame"
        :frame-data="l1sfFrame.data"
        :frame-loading="l1sfFrame.loading"
        :is-s-f="true"
      />
    </div>
  </div>
  <div v-else>
    Нет данных для отображения
  </div>
</template>

<script lang="ts" setup>
import { watch, reactive, ref } from 'vue';
import moment from 'moment';
import InputSwitch from 'primevue/inputswitch';
// import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import {
  SFFrame as L1SFFrame,
  SFFrames as L1SFFrames,
  SingleFrameRequest,
  FrameListRequest,
} from '@/signals-datatypes';
import { DataExchange } from '@/utils/dataexchangeservice';
import GetQueryParams from '@/components/L1OFFramesDisplay/GetParams.vue';
import FramesListTable from '@/components/L1OFFramesDisplay/FramesListTable.vue';
import ShowFrame from '@/components/L1OFFramesDisplay/ShowFrame.vue';

// инстанциируем сервис обмена данными о списке кадров ЦИ
const l1sfFramesList = reactive(new DataExchange<L1SFFrames>({ url: '/l1sf_frames' }));

// инстанциируем сервис обмена данными о кадре ЦИ
const l1sfFrame = reactive(new DataExchange<L1SFFrame>({ url: '/l1sf_frame' }));

/** Флаг отображения кадра */
const showFrame = ref<boolean>(false);

// функция принимает параметры запроса и получает список кадров ЦИ L2OF
function getL1SFFrames(queryParams: FrameListRequest) {
  showFrame.value = false;
  l1sfFramesList.getParams = queryParams;
  l1sfFramesList.get();
}

// список кадров с датой в формате 'DD.MM.yyyy HH:mm:ss'
const framesListData = ref<L1SFFrames>();

// когда список кадров загрузился с сервера, меняем формат даты и записываем
watch(() => l1sfFramesList.loading, (currValue, prevValue) => {
  if (l1sfFramesList.data !== undefined && prevValue) {
    // eslint-disable-next-line arrow-body-style
    framesListData.value = l1sfFramesList.data.map((item) => {
      return { ...item, timestamp: moment(item.timestamp).format('DD.MM.yyyy HH:mm:ss') };
    });
  }
});

// флаг, показывать ли побитовую расшифровку для значений строк
const showRaw = ref<boolean>(true);

// функция принимает ID кадра ЦИ L1OF в ЛБД и получает этот кадр
function assignFrameId(frameId: SingleFrameRequest) {
  l1sfFrame.getParams = frameId;
  l1sfFrame.get();
  showFrame.value = true;
}

</script>

<style>
.title {
  margin-bottom: 3rem;
}

.frames-display {
  display: flex;
  align-items: flex-start;
  width: 100%;
}

.frames-display__settings {
  flex-basis: 30%;
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
}

.frames-display__list {
  margin-bottom: 20px;
}

.frames-display__single-frame {
  /* flex-grow: 1; */
  margin: auto;
}
</style>
