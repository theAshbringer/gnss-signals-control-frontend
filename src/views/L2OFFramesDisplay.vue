<template>
  <h1 class="title">Кадры ЦИ L2OF</h1>
  <GetQueryParams
    :loading-state="l2ofFramesList.loading"
    @query-params="getL2ofFrames"
    />
  <div class="frames-display" v-if="l2ofFramesList.available && l2ofFramesList.data?.length">
    <div class="frames-display__settings">
      <div class="frames-display__list">
      <FramesListTable
        :frames-list="framesListData"
        @frame-id-select="assignFrameId"
        />
    </div>
    <div class="frames-display__switch">
      <label>Отобразить побитовую расшифровку
        <InputSwitch v-model="showRaw"/>
      </label>
    </div>
    </div>
    <div class="frames-display__single-frame">
      <ShowFrame
        v-if="showFrame"
        :frame-data="l2ofFrame.data"
        :show-raw="showRaw"
        :frame-loading="l2ofFrame.loading"
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
  OFFrame as L2OFFrame,
  OFFrames as L2OFFrames,
  SingleFrameRequest,
  FrameListRequest,
} from '@/signals-datatypes';
import { DataExchange } from '@/utils/dataexchangeservice';
import GetQueryParams from '@/components/L1OFFramesDisplay/GetParams.vue';
import FramesListTable from '@/components/L1OFFramesDisplay/FramesListTable.vue';
import ShowFrame from '@/components/L1OFFramesDisplay/ShowFrame.vue';

// инстанциируем сервис обмена данными о списке кадров ЦИ
const l2ofFramesList = reactive(new DataExchange<L2OFFrames>({ url: '/l2of_frames' }));

// инстанциируем сервис обмена данными о кадре ЦИ
const l2ofFrame = reactive(new DataExchange<L2OFFrame>({ url: '/l2of_frame' }));

/** Флаг отображения кадра */
const showFrame = ref<boolean>(false);

// функция принимает параметры запроса и получает список кадров ЦИ L2OF
function getL2ofFrames(queryParams: FrameListRequest) {
  showFrame.value = false;
  l2ofFramesList.getParams = queryParams;
  l2ofFramesList.get();
}

// список кадров с датой в формате 'DD.MM.yyyy HH:mm:ss'
const framesListData = ref<L2OFFrames>();

// когда список кадров загрузился с сервера, меняем формат даты и записываем
watch(() => l2ofFramesList.loading, (currValue, prevValue) => {
  if (l2ofFramesList.data !== undefined && prevValue) {
    // eslint-disable-next-line arrow-body-style
    framesListData.value = l2ofFramesList.data.map((item) => {
      return { ...item, timestamp: moment(item.timestamp).format('DD.MM.yyyy HH:mm:ss') };
    });
  }
});

// флаг, показывать ли побитовую расшифровку для значений строк
const showRaw = ref<boolean>(false);

// функция принимает ID кадра ЦИ L1OF в ЛБД и получает этот кадр
function assignFrameId(frameId: SingleFrameRequest) {
  l2ofFrame.getParams = frameId;
  l2ofFrame.get();
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
