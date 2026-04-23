<script setup lang="ts">
import { computed } from 'vue';
import type { PanelPosition } from '@xyflow/system';

const props = withDefaults(
  defineProps<{
    position?: PanelPosition;
  }>(),
  { position: 'top-left' }
);

const classes = computed(() => {
  const [v, h] = props.position.split('-');
  return ['vue-flow__panel', v, h];
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
