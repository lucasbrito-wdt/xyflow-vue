<script setup lang="ts">
import { Handle, Position, useVueFlow } from '@xyflow/vue';

const props = defineProps<{
  id: string;
  data: { color: string };
  selected?: boolean;
}>();
const flow = useVueFlow();

function setColor(c: string) {
  flow.updateNodeData(props.id, { color: c });
}
</script>

<template>
  <div
    :style="{
      padding: '10px 14px',
      background: (data as any).color,
      color: 'white',
      borderRadius: 6,
      border: selected ? '2px solid #000' : '2px solid transparent',
      minWidth: 120,
      textAlign: 'center',
      fontFamily: 'system-ui',
    }"
  >
    <Handle type="target" :position="Position.Top" />
    <div style="font-weight: 600; margin-bottom: 6px">{{ (data as any).color }}</div>
    <div style="display: flex; gap: 4px; justify-content: center">
      <button
        v-for="c in ['#ff6b6b', '#4ecdc4', '#ffe66d', '#6c5ce7']"
        :key="c"
        :style="{
          width: 18,
          height: 18,
          background: c,
          border: '1px solid white',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: 0,
        }"
        @click.stop="setColor(c)"
      />
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
