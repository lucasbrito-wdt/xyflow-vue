<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount, ref } from 'vue';
import {
  XYResizer,
  ResizeControlVariant,
  type ControlPosition,
  type XYResizerInstance,
  type XYResizerChange,
  type XYResizerChildChange,
  type OnResize,
  type OnResizeStart,
  type OnResizeEnd,
  type ShouldResize,
} from '@xyflow/system';
import { useStore } from '../../store/context';

const props = withDefaults(
  defineProps<{
    nodeId?: string;
    position?: ControlPosition;
    variant?: ResizeControlVariant;
    color?: string;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    keepAspectRatio?: boolean;
    resizeDirection?: 'horizontal' | 'vertical';
    autoScale?: boolean;
    shouldResize?: ShouldResize;
    onResizeStart?: OnResizeStart;
    onResize?: OnResize;
    onResizeEnd?: OnResizeEnd;
  }>(),
  {
    variant: 'handle' as ResizeControlVariant,
    minWidth: 10,
    minHeight: 10,
    maxWidth: Number.MAX_VALUE,
    maxHeight: Number.MAX_VALUE,
    keepAspectRatio: false,
    autoScale: true,
  }
);

const store = useStore() as any;
const ctxNodeId = inject<string>('vueflow-node-id', '');
const id = computed(() => props.nodeId ?? ctxNodeId);

const isLine = computed(() => props.variant === ResizeControlVariant.Line);
const controlPosition = computed<ControlPosition>(
  () => props.position ?? ((isLine.value ? 'right' : 'bottom-right') as ControlPosition)
);
const classes = computed(() => controlPosition.value.split('-'));

const el = ref<HTMLDivElement | null>(null);
let instance: XYResizerInstance | null = null;

onMounted(() => {
  if (!el.value || !id.value) return;
  instance = XYResizer({
    domNode: el.value,
    nodeId: id.value,
    getStoreItems: () => ({
      nodeLookup: store.nodeLookup,
      transform: [store.viewport.value.x, store.viewport.value.y, store.viewport.value.zoom],
      snapGrid: store.snapGrid.value ?? undefined,
      snapToGrid: !!store.snapGrid.value,
      nodeOrigin: store.nodeOrigin.value,
      paneDomNode: store.domNode.value,
    }),
    onChange: (change: XYResizerChange, childChanges: XYResizerChildChange[]) => {
      const changes = new Map<string, XYResizerChange>();
      changes.set(id.value, change);
      for (const c of childChanges) changes.set(c.id, { x: c.position.x, y: c.position.y });

      const horizontal = !props.resizeDirection || props.resizeDirection === 'horizontal';
      const vertical = !props.resizeDirection || props.resizeDirection === 'vertical';

      const next = (store.nodes.value as any[]).map((node) => {
        const ch = changes.get(node.id);
        if (!ch) return node;
        return {
          ...node,
          position: {
            x: horizontal ? ch.x ?? node.position.x : node.position.x,
            y: vertical ? ch.y ?? node.position.y : node.position.y,
          },
          width: horizontal ? ch.width ?? node.width : node.width,
          height: vertical ? ch.height ?? node.height : node.height,
        };
      });
      store.setNodes(next);
    },
  });

  instance.update({
    controlPosition: controlPosition.value,
    boundaries: {
      minWidth: props.minWidth,
      minHeight: props.minHeight,
      maxWidth: props.maxWidth,
      maxHeight: props.maxHeight,
    },
    keepAspectRatio: props.keepAspectRatio,
    resizeDirection: props.resizeDirection,
    onResizeStart: props.onResizeStart,
    onResize: props.onResize,
    onResizeEnd: props.onResizeEnd,
    shouldResize: props.shouldResize,
  } as any);
});

onBeforeUnmount(() => instance?.destroy());
</script>

<template>
  <div
    ref="el"
    class="vue-flow__resize-control nodrag"
    :class="[...classes, variant, { 'vue-flow__resize-control-line': isLine }]"
    :style="color ? (isLine ? { borderColor: color } : { backgroundColor: color }) : undefined"
  >
    <slot />
  </div>
</template>
