<script setup lang="ts">
import type { PanelPosition, ProOptions } from '@xyflow/system';
import Panel from '../../container/Panel/Panel.vue';

withDefaults(
  defineProps<{
    position?: PanelPosition;
    proOptions?: ProOptions;
  }>(),
  { position: 'bottom-right' }
);
</script>

<template>
  <Panel v-if="!proOptions?.hideAttribution" :position="position" class="vue-flow__attribution" data-message="Please only hide this attribution when you are subscribed to xyflow Pro">
    <a href="https://xyflow.com" target="_blank" rel="noopener noreferrer" aria-label="xyflow attribution">
      Vue Flow
    </a>
  </Panel>
</template>
