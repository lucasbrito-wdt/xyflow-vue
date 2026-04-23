<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../store/context';

const store = useStore() as any;
const aria = computed(() => store.ariaLabelConfig.value);
const flowId = computed(() => store.flowId.value);
</script>

<template>
  <div class="vue-flow__a11y-descriptions" style="display: none">
    <div :id="`vue-flow__aria-desc-${flowId}`">
      {{ aria['node.a11yDescription.default'] }}
    </div>
  </div>
</template>
