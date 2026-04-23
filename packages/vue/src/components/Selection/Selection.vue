<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../store/context';

const store = useStore() as any;

const rect = computed(() => store.selectionRect.value);

const style = computed(() => {
  const r = rect.value;
  if (!r) return null;
  return {
    width: `${r.width}px`,
    height: `${r.height}px`,
    transform: `translate(${r.x}px, ${r.y}px)`,
  };
});
</script>

<template>
  <div v-if="style" class="vue-flow__selection" :style="style" />
</template>
