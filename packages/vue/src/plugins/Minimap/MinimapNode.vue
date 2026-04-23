<script setup lang="ts">
defineProps<{
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  selected?: boolean;
  shapeRendering?: string;
}>();
</script>

<template>
  <rect
    class="vue-flow__minimap-node"
    :class="{ selected }"
    :x="x"
    :y="y"
    :rx="borderRadius ?? 0"
    :ry="borderRadius ?? 0"
    :width="width"
    :height="height"
    :fill="color ?? '#e2e2e2'"
    :stroke="strokeColor"
    :stroke-width="strokeWidth ?? 2"
    :shape-rendering="shapeRendering ?? 'geometricPrecision'"
  />
</template>
