<script setup lang="ts">
import { Position } from '@xyflow/system';
import Handle from '../Handle/Handle.vue';

defineOptions({ inheritAttrs: false });

defineProps<{
  data: { label?: string } & Record<string, unknown>;
  sourcePosition?: Position;
  targetPosition?: Position;
  isConnectable?: boolean;
}>();
</script>

<template>
  <Handle
    type="target"
    :position="targetPosition ?? Position.Top"
    :is-connectable="isConnectable"
  />
  <div>{{ data.label }}</div>
  <Handle
    type="source"
    :position="sourcePosition ?? Position.Bottom"
    :is-connectable="isConnectable"
  />
</template>
