<script setup lang="ts">
import { Handle, Position, NodeResizer } from 'xyflow-vue';

defineProps<{ data: { label: string }; selected?: boolean }>();
</script>

<template>
  <div
    style="
      width: 100%;
      height: 100%;
      background: #fff;
      border: 1px solid #bbb;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    "
  >
    <NodeResizer color="#3578e5" :is-visible="selected" :min-width="100" :min-height="60" />
    <Handle type="target" :position="Position.Top" />
    <div>{{ data.label }}</div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
