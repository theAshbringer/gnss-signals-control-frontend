<template>
  <h1 class="title">Кадры ЦИ L1OF</h1>
  <GetQueryParams
    :loading-state="l1ofFramesList.loading"
    @query-params="getL1ofFrames"
    />
  <div class="frames-display" v-if="l1ofFramesList.available && l1ofFramesList.data?.length">
    <div class="frames-display__settings">
      <div class="frames-display__list">
        <FramesListTable
          :frames-list="framesListData"
          @frame-id-select="assignFrameId"
          />
      </div>
      <div class="frames-display__switch">
        <label for="show-raw" class="frames-display__switch-label">Отобразить побитовую расшифровку</label>
        <InputSwitch id="show-raw" v-model="showRaw"/>
      </div>
      <div class="frames-display__compare" v-if="selectedFrame !== null && frameParams !== {}">
          <OpenNewTabButton
            :label="'Сравнить с СИ'"
            :componentName="'CompareDIandSI'"
            :params="frameParams"
          />
      </div>
    </div>
    <div class="frames-display__single-frame">
      <ShowFrame
        v-if="showFrame"
        :frame-data="l1ofFrame.data"
        :show-raw="showRaw"
        :frame-loading="l1ofFrame.loading"
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
  OFFrame as L1OFFrame,
  OFFrames as L1OFFrames,
  SingleFrameRequest,
  FrameListRequest,
} from '@/signals-datatypes';
import { DataExchange } from '@/utils/dataexchangeservice';
import GetQueryParams from '@/components/L1OFFramesDisplay/GetParams.vue';
import FramesListTable from '@/components/L1OFFramesDisplay/FramesListTable.vue';
import ShowFrame from '@/components/L1OFFramesDisplay/ShowFrame.vue';
import OpenNewTabButton from '@/components/OpenNewTabButton.vue';

// инстанциируем сервис обмена данными о списке кадров ЦИ
const l1ofFramesList = reactive(new DataExchange<L1OFFrames>({ url: '/l1of_frames' }));

// инстанциируем сервис обмена данными о кадре ЦИ
const l1ofFrame = reactive(new DataExchange<L1OFFrame>({ url: '/l1of_frame' }));

/** Флаг отображения кадра */
const showFrame = ref<boolean>(false);

/** ID выбранного кадра */
const selectedFrame = ref<null | number>(null);

// функция принимает параметры запроса и получает список кадров ЦИ L1OF
function getL1ofFrames(queryParams: FrameListRequest) {
  showFrame.value = false;
  l1ofFramesList.getParams = queryParams;
  l1ofFramesList.get();
}

// список кадров с датой в формате 'DD.MM.yyyy HH:mm:ss'
const framesListData = ref<L1OFFrames>();

// когда список кадров загрузился с сервера, меняем формат даты и записываем
watch(() => l1ofFramesList.loading, (currValue, prevValue) => {
  if (l1ofFramesList.data !== undefined && prevValue) {
    // eslint-disable-next-line arrow-body-style
    framesListData.value = l1ofFramesList.data.map((item) => {
      return { ...item, timestamp: moment(item.timestamp).format('DD.MM.yyyy HH:mm:ss') };
    });
  }
});

// флаг, показывать ли побитовую расшифровку для значений строк
const showRaw = ref<boolean>(false);

// функция принимает ID кадра ЦИ L1OF в ЛБД и получает этот кадр
function assignFrameId(frameId: SingleFrameRequest) {
  l1ofFrame.getParams = frameId;
  l1ofFrame.get();
  showFrame.value = true;
  selectedFrame.value = frameId.id;
}

const frameParams = ref({})

/** Параметры для сравнения с СИ */
watch(() => selectedFrame.value, (currValue) => {
  if (currValue !== null) {
    frameParams.value = {
      id: selectedFrame,
      signalType: 'L1OF'
    }
  }
})


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
  margin: auto;
}

.frames-display__switch {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  align-self: center;
  justify-content: center;
}

.frames-display__switch-label {
  margin-right: 10px;
}
</style>
