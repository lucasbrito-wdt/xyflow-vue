<script setup lang="ts">
import { ResizeControlVariant, type ControlLinePosition, type ControlPosition } from '@xyflow/system';
import ResizeControl from './ResizeControl.vue';

const props = withDefaults(
  defineProps<{
    nodeId?: string;
    color?: string;
    handleClassName?: string;
    lineClassName?: string;
    handleStyle?: Record<string, string | number>;
    lineStyle?: Record<string, string | number>;
    isVisible?: boolean;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    keepAspectRatio?: boolean;
    shouldResize?: any;
    onResize?: any;
    onResizeStart?: any;
    onResizeEnd?: any;
  }>(),
  { isVisible: true, minWidth: 10, minHeight: 10 }
);

const linePositions: ControlLinePosition[] = ['top', 'right', 'bottom', 'left'];
const handlePositions: ControlPosition[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
</script>

<template>
  <template v-if="isVisible">
    <ResizeControl
      v-for="pos in linePositions"
      :key="`line-${pos}`"
      :node-id="nodeId"
      :position="pos"
      :variant="ResizeControlVariant.Line"
      :color="color"
      :min-width="minWidth"
      :min-height="minHeight"
      :max-width="maxWidth"
      :max-height="maxHeight"
      :keep-aspect-ratio="keepAspectRatio"
      :should-resize="shouldResize"
      :on-resize="onResize"
      :on-resize-start="onResizeStart"
      :on-resize-end="onResizeEnd"
    />
    <ResizeControl
      v-for="pos in handlePositions"
      :key="`handle-${pos}`"
      :node-id="nodeId"
      :position="pos"
      :variant="ResizeControlVariant.Handle"
      :color="color"
      :min-width="minWidth"
      :min-height="minHeight"
      :max-width="maxWidth"
      :max-height="maxHeight"
      :keep-aspect-ratio="keepAspectRatio"
      :should-resize="shouldResize"
      :on-resize="onResize"
      :on-resize-start="onResizeStart"
      :on-resize-end="onResizeEnd"
    />
  </template>
</template>
