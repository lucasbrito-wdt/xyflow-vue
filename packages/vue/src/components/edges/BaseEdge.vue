<script setup lang="ts">
defineOptions({ inheritAttrs: false });

defineProps<{
  id?: string;
  path: string;
  markerStart?: string;
  markerEnd?: string;
  style?: Record<string, string | number> | string;
  interactionWidth?: number;
}>();
</script>

<template>
  <path
    :id="id"
    class="vue-flow__edge-path"
    :d="path"
    :marker-start="markerStart"
    :marker-end="markerEnd"
    :style="style"
    fill="none"
  />
  <path
    v-if="interactionWidth && interactionWidth > 0"
    :d="path"
    class="vue-flow__edge-interaction"
    fill="none"
    :stroke-width="interactionWidth"
    stroke="transparent"
  />
</template>
