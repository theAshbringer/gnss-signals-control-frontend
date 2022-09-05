<template>
<div>
    <h1> НКА {{NkaFullName[props.id]}}</h1>
    <NkaResidualsCharPlotVue :id="props.id"/>
    <NkaCurrentAnglesTable :id="props.id"/>
</div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { NkaFullName } from '@/knp-lang';
import { NKASysNumbers } from '@/knp-common';
import NkaResidualsCharPlotVue from '@/components/Charts/NkaResidualsCharPlot.vue';
import NkaCurrentAnglesTable from '@/components/NkaCurrentAnglesTable.vue';

const props = defineProps<{
  id: typeof NKASysNumbers[number],
}>();

</script>
