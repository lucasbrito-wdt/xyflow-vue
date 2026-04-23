<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { getInternalNodesBounds, XYMinimap, type PanelPosition } from '@xyflow/system';
import Panel from '../../container/Panel/Panel.vue';
import MinimapNode from './MinimapNode.vue';
import { useStore } from '../../store/context';
import type { Node } from '../../types/nodes';

const props = withDefaults(
  defineProps<{
    position?: PanelPosition;
    width?: number;
    height?: number;
    pannable?: boolean;
    zoomable?: boolean;
    inversePan?: boolean;
    zoomStep?: number;
    bgColor?: string;
    maskColor?: string;
    maskStrokeColor?: string;
    maskStrokeWidth?: number;
    nodeColor?: string | ((n: Node) => string);
    nodeStrokeColor?: string | ((n: Node) => string);
    nodeBorderRadius?: number;
    nodeStrokeWidth?: number;
    nodeClassName?: string | ((n: Node) => string);
    ariaLabel?: string;
  }>(),
  {
    position: 'bottom-right',
    width: 200,
    height: 150,
    pannable: false,
    zoomable: false,
    maskColor: 'rgb(240, 240, 240, 0.6)',
    ariaLabel: 'Mini map',
  }
);

const store = useStore() as any;
const svgRef = ref<SVGSVGElement | null>(null);

const bounds = computed(() => {
  const internal = Array.from(store.nodeLookup.values());
  const vp = store.viewport.value;
  const b = getInternalNodesBounds(store.nodeLookup, {
    filter: (n: any) => !n.hidden && !!(n.width || n.initialWidth) && !!(n.height || n.initialHeight),
  });
  const width = store.width.value / vp.zoom;
  const height = store.height.value / vp.zoom;
  const viewBB = {
    x: -vp.x / vp.zoom,
    y: -vp.y / vp.zoom,
    width,
    height,
  };
  const union = {
    x: Math.min(viewBB.x, b.x),
    y: Math.min(viewBB.y, b.y),
    width: Math.max(viewBB.x + viewBB.width, b.x + b.width) - Math.min(viewBB.x, b.x),
    height: Math.max(viewBB.y + viewBB.height, b.y + b.height) - Math.min(viewBB.y, b.y),
  };
  void internal;
  return { bounds: union, viewBB };
});

const viewBox = computed(() => {
  const { bounds: b } = bounds.value;
  const elementWidth = props.width;
  const elementHeight = props.height;
  const scaledWidth = b.width / elementWidth;
  const scaledHeight = b.height / elementHeight;
  const viewScale = Math.max(scaledWidth, scaledHeight);
  const viewWidth = viewScale * elementWidth;
  const viewHeight = viewScale * elementHeight;
  const offset = 5 * viewScale;
  return {
    x: b.x - (viewWidth - b.width) / 2 - offset,
    y: b.y - (viewHeight - b.height) / 2 - offset,
    width: viewWidth + offset * 2,
    height: viewHeight + offset * 2,
    viewScale,
  };
});

const visibleNodes = computed(() => {
  // touch nodes ref to retrigger when graph changes
  void store.nodes.value;
  const arr: any[] = [];
  for (const n of store.nodeLookup.values() as IterableIterator<any>) {
    if (n.hidden) continue;
    const w = n.measured?.width ?? n.width ?? n.initialWidth;
    const h = n.measured?.height ?? n.height ?? n.initialHeight;
    if (!w || !h) continue;
    arr.push({
      id: n.id,
      x: n.internals.positionAbsolute.x,
      y: n.internals.positionAbsolute.y,
      width: w,
      height: h,
      selected: !!n.selected,
    });
  }
  return arr;
});

const getColor = (n: Node, p: typeof props.nodeColor) =>
  typeof p === 'function' ? p(n) : p;

let minimapInstance: ReturnType<typeof XYMinimap> | null = null;
onMounted(() => {
  if (!svgRef.value) return;
  minimapInstance = XYMinimap({
    domNode: svgRef.value,
    panZoom: store.panZoom.value,
    getTransform: () => {
      const v = store.viewport.value;
      return [v.x, v.y, v.zoom];
    },
    getViewScale: () => viewBox.value.viewScale,
  });
  minimapInstance.update({
    translateExtent: store.translateExtent.value,
    width: store.width.value,
    height: store.height.value,
    inversePan: props.inversePan,
    pannable: props.pannable,
    zoomStep: props.zoomStep ?? 10,
    zoomable: props.zoomable,
  });
});
onBeforeUnmount(() => minimapInstance?.destroy());
</script>

<template>
  <Panel :position="position" class="vue-flow__minimap">
    <svg
      ref="svgRef"
      :width="width"
      :height="height"
      :viewBox="`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`"
      class="vue-flow__minimap-svg"
      role="img"
      :aria-label="ariaLabel"
      :style="bgColor ? { background: bgColor } : undefined"
    >
      <MinimapNode
        v-for="n in visibleNodes"
        :key="n.id"
        :x="n.x"
        :y="n.y"
        :width="n.width"
        :height="n.height"
        :color="getColor(n as any, nodeColor)"
        :stroke-color="getColor(n as any, nodeStrokeColor)"
        :stroke-width="nodeStrokeWidth"
        :border-radius="nodeBorderRadius"
        :selected="n.selected"
      />
      <path
        class="vue-flow__minimap-mask"
        :d="`M${viewBox.x - 5},${viewBox.y - 5}h${viewBox.width + 10}v${viewBox.height + 10}h${-(viewBox.width + 10)}z
             M${bounds.viewBB.x},${bounds.viewBB.y}h${bounds.viewBB.width}v${bounds.viewBB.height}h${-bounds.viewBB.width}z`"
        :fill="maskColor"
        fill-rule="evenodd"
        :stroke="maskStrokeColor"
        :stroke-width="maskStrokeWidth"
        pointer-events="none"
      />
    </svg>
  </Panel>
</template>
