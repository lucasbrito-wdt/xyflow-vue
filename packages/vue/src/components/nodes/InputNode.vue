<script setup lang="ts">
import { Position } from '@xyflow/system';
import Handle from '../Handle/Handle.vue';

defineOptions({ inheritAttrs: false });

defineProps<{
  data: { label?: string };
  sourcePosition?: Position;
  isConnectable?: boolean;
}>();
</script>

<template>
  <div>{{ data.label }}</div>
  <Handle
    type="source"
    :position="sourcePosition ?? Position.Bottom"
    :is-connectable="isConnectable"
  />
</template>
