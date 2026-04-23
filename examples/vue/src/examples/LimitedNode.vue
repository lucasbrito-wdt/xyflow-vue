<script setup lang="ts">
import { computed } from 'vue';
import { Handle, Position, useNodeConnections } from 'xyflow-vue';

defineProps<{ id: string; data: { label: string } }>();

const connections = useNodeConnections({ handleType: 'target' });
const isConnectable = computed(() => connections.value.length < 2);
</script>

<template>
  <div style="padding: 10px; background: white; border: 1px solid #bbb; border-radius: 4px; min-width: 140px; text-align: center">
    <Handle type="target" :position="Position.Left" :is-connectable="isConnectable" />
    <div>{{ data.label }}</div>
    <div style="font-size: 10px; color: #888">{{ connections.length }}/2 connected</div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>
