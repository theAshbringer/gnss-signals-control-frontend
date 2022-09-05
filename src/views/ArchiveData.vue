<template>
  <div>
    <h1 class="title">Архивные данные</h1>
    <RequestBisAndPeriod
      :loading-state="archiveResiduals.loading"
      @request-params="getDatasets"
    />
    <div v-if="archiveResiduals.isDataNotEmpty">
      <div>
        <h2 class="subtitle">Значения невязок и средняя невязка</h2>
        <ArchiveResidualsCharPlot
          :colors="NkaColor"
          :names="NkaFullName"
          :y-values="'residual'"
          :is-average-needed="true"
          :data="archiveResiduals"
        />
      </div>
      <div>
        <h2 class="subtitle">Отклонение невязок от среднего</h2>
        <ArchiveResidualsCharPlot
          :colors="NkaColor"
          :names="NkaFullName"
          :y-values="'delta'"
          :is-average-needed="false"
          :data="archiveResiduals"
        />
      </div>
      <div>
        <h2 class="subtitle">РНЗ</h2>
        <ArchiveNavSolutionPlot
          :data="archiveNavSolutions"
          :colors="NavSolutionENUColor"
          :names="NavSolutionENUName"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import ArchiveResidualsCharPlot from "@/components/Charts/ArchiveResidualsCharPlot.vue";
import ArchiveNavSolutionPlot from "@/components/Charts/ArchiveNavSolutionPlot.vue";
import { NkaFullName , NavSolutionENUName } from "@/knp-lang";
import { NkaColor , NavSolutionENUColor } from "@/knp-style";
import { BISAndPeriodRequestParams } from "@/signals-datatypes";
import RequestBisAndPeriod from '@/components/RequestBisAndPeriod.vue';
import { ArchiveResiduals, ArchiveNavSolution } from "@/knp-datatypes";
import { DataExchange } from "@/utils/dataexchangeservice";


const archiveResiduals = reactive(new DataExchange<ArchiveResiduals>({ url: '/archive_residuals' }));
const archiveNavSolutions = reactive(new DataExchange<ArchiveNavSolution[]>({ url: '/archive_solutions' }));

// функция принимает параметры запроса
function getDatasets(requestParams: BISAndPeriodRequestParams) {
  archiveResiduals.getParams = requestParams;
  archiveNavSolutions.getParams = requestParams;
  archiveResiduals.get();
  archiveNavSolutions.get();
}

</script>

<style>
.title {
  margin-bottom: 35px;
}
</style>
