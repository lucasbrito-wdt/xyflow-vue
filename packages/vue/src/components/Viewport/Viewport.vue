<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '../../store/context';
import { usePanZoom } from '../../composables/usePanZoom';
import { useSelectionBox } from '../../composables/useSelectionBox';

const store = useStore();
const paneEl = ref<HTMLDivElement | null>(null);

usePanZoom(paneEl);
useSelectionBox(paneEl);

const transform = computed(() => {
  const [x, y, z] = store.transform.value;
  return `translate(${x}px, ${y}px) scale(${z})`;
});
</script>

<template>
  <div ref="paneEl" class="vue-flow__pane vue-flow__container">
    <div class="vue-flow__viewport xyflow__viewport vue-flow__container" :style="{ transform }">
      <slot />
    </div>
  </div>
</template>
