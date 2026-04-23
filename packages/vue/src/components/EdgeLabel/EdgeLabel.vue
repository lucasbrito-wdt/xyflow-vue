<script setup lang="ts">
defineProps<{
  x: number;
  y: number;
  transparent?: boolean;
}>();
</script>

<template>
  <div
    class="vue-flow__edge-label"
    :class="{ transparent }"
    :style="{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }"
  >
    <slot />
  </div>
</template>
