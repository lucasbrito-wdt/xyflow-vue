<script setup lang="ts">
import { Position } from '@xyflow/system';
import Handle from '../Handle/Handle.vue';

defineOptions({ inheritAttrs: false });

defineProps<{
  data: { label?: string };
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
</template>
