<script setup lang="ts" generic="NodeType extends Node = Node, EdgeType extends Edge = Edge">
import { ref, watch, onMounted } from 'vue';
import type { Node } from '../../types/nodes';
import type { Edge } from '../../types/edges';
import type { VueFlowProps } from '../../store/types';
import type {
  Connection,
  NodeChange,
  EdgeChange,
  OnConnectStartParams,
  Viewport as ViewportState,
} from '@xyflow/system';
import { createStore } from '../../store';
import { provideStore } from '../../store/context';
import { useResizeObserver } from '../../composables/useResizeObserver';
import { useColorMode } from '../../composables/useColorMode';
import Viewport from '../../components/Viewport/Viewport.vue';
import NodeRenderer from '../../components/NodeRenderer/NodeRenderer.vue';
import EdgeRenderer from '../../components/EdgeRenderer/EdgeRenderer.vue';
import ConnectionLine from '../../components/ConnectionLine/ConnectionLine.vue';
import A11yDescriptions from '../../components/A11yDescriptions/A11yDescriptions.vue';
import Selection from '../../components/Selection/Selection.vue';
import { useKeyboardShortcuts } from '../../composables/useKeyboardShortcuts';

const props = withDefaults(defineProps<VueFlowProps<NodeType, EdgeType>>(), {
  minZoom: 0.5,
  maxZoom: 2,
  nodesDraggable: true,
  nodesConnectable: true,
  elementsSelectable: true,
});

const emit = defineEmits<{
  (e: 'update:nodes', nodes: NodeType[]): void;
  (e: 'update:edges', edges: EdgeType[]): void;
  (e: 'nodesChange', changes: NodeChange<NodeType>[]): void;
  (e: 'edgesChange', changes: EdgeChange<EdgeType>[]): void;
  (e: 'connect', connection: Connection): void;
  (e: 'connectStart', event: MouseEvent | TouchEvent, params: OnConnectStartParams): void;
  (e: 'connectEnd', event: MouseEvent | TouchEvent): void;
  (e: 'paneClick', event: MouseEvent): void;
  (e: 'paneContextMenu', event: MouseEvent): void;
  (e: 'paneMouseEnter', event: MouseEvent): void;
  (e: 'paneMouseMove', event: MouseEvent): void;
  (e: 'paneMouseLeave', event: MouseEvent): void;
  (e: 'move', event: MouseEvent | TouchEvent | null, viewport: ViewportState): void;
  (e: 'moveStart', event: MouseEvent | TouchEvent | null, viewport: ViewportState): void;
  (e: 'moveEnd', event: MouseEvent | TouchEvent | null, viewport: ViewportState): void;
  (e: 'nodeClick', event: MouseEvent, node: NodeType): void;
  (e: 'nodeDoubleClick', event: MouseEvent, node: NodeType): void;
  (e: 'nodeContextMenu', event: MouseEvent, node: NodeType): void;
  (e: 'nodeMouseEnter', event: MouseEvent, node: NodeType): void;
  (e: 'nodeMouseMove', event: MouseEvent, node: NodeType): void;
  (e: 'nodeMouseLeave', event: MouseEvent, node: NodeType): void;
  (e: 'nodeDragStart', event: MouseEvent, node: NodeType, nodes: NodeType[]): void;
  (e: 'nodeDrag', event: MouseEvent, node: NodeType, nodes: NodeType[]): void;
  (e: 'nodeDragStop', event: MouseEvent, node: NodeType, nodes: NodeType[]): void;
  (e: 'edgeClick', event: MouseEvent, edge: EdgeType): void;
  (e: 'edgeDoubleClick', event: MouseEvent, edge: EdgeType): void;
  (e: 'edgeContextMenu', event: MouseEvent, edge: EdgeType): void;
  (e: 'edgeMouseEnter', event: MouseEvent, edge: EdgeType): void;
  (e: 'edgeMouseMove', event: MouseEvent, edge: EdgeType): void;
  (e: 'edgeMouseLeave', event: MouseEvent, edge: EdgeType): void;
  (e: 'selectionDragStart', event: MouseEvent, nodes: NodeType[]): void;
  (e: 'selectionDrag', event: MouseEvent, nodes: NodeType[]): void;
  (e: 'selectionDragStop', event: MouseEvent, nodes: NodeType[]): void;
  (e: 'selectionContextMenu', event: MouseEvent, nodes: NodeType[]): void;
  (e: 'selectionStart', event: MouseEvent): void;
  (e: 'selectionEnd', event: MouseEvent): void;
  (e: 'selectionChange', params: { nodes: NodeType[]; edges: EdgeType[] }): void;
  (e: 'init'): void;
  (e: 'error', code: string, message: string): void;
}>();

const store = createStore<NodeType, EdgeType>(props);
provideStore(store as any);

// wire connection emits
store.onConnect.value = (c) => emit('connect', c);
store.onConnectStart.value = (ev: any, p: any) => emit('connectStart', ev, p);
store.onConnectEnd.value = (ev: any) => emit('connectEnd', ev);
store.onError.value = (code: string, message: string) => emit('error', code, message);

// node drag wiring — expose emits via store for useDrag to read
(store as any)._emitNodeDrag = (kind: 'start' | 'drag' | 'stop', event: MouseEvent, node: NodeType, nodes: NodeType[]) => {
  if (kind === 'start') emit('nodeDragStart', event, node, nodes);
  else if (kind === 'drag') emit('nodeDrag', event, node, nodes);
  else emit('nodeDragStop', event, node, nodes);
};
(store as any)._emitSelectionDrag = (kind: 'start' | 'drag' | 'stop', event: MouseEvent, nodes: NodeType[]) => {
  if (kind === 'start') emit('selectionDragStart', event, nodes);
  else if (kind === 'drag') emit('selectionDrag', event, nodes);
  else emit('selectionDragStop', event, nodes);
};

// viewport move emits (panZoom callbacks set later in usePanZoom) — expose a shim
(store as any)._emitMove = (kind: 'start' | 'move' | 'end', ev: any, vp: ViewportState) => {
  if (kind === 'start') emit('moveStart', ev, vp);
  else if (kind === 'move') emit('move', ev, vp);
  else emit('moveEnd', ev, vp);
};

// changes emits — forwarded from utils/changes helpers used by apps
(store as any)._emits.nodesChange = (changes: NodeChange<NodeType>[]) => emit('nodesChange', changes);
(store as any)._emits.edgesChange = (changes: EdgeChange<EdgeType>[]) => emit('edgesChange', changes);

// per-item mouse event shims
(store as any)._emitNodeClick = (ev: MouseEvent, n: NodeType) => emit('nodeClick', ev, n);
(store as any)._emitNodeDblClick = (ev: MouseEvent, n: NodeType) => emit('nodeDoubleClick', ev, n);
(store as any)._emitNodeContextMenu = (ev: MouseEvent, n: NodeType) => emit('nodeContextMenu', ev, n);
(store as any)._emitNodeMouseEnter = (ev: MouseEvent, n: NodeType) => emit('nodeMouseEnter', ev, n);
(store as any)._emitNodeMouseMove = (ev: MouseEvent, n: NodeType) => emit('nodeMouseMove', ev, n);
(store as any)._emitNodeMouseLeave = (ev: MouseEvent, n: NodeType) => emit('nodeMouseLeave', ev, n);
(store as any)._emitEdgeClick = (ev: MouseEvent, e: EdgeType) => emit('edgeClick', ev, e);
(store as any)._emitEdgeDblClick = (ev: MouseEvent, e: EdgeType) => emit('edgeDoubleClick', ev, e);
(store as any)._emitEdgeContextMenu = (ev: MouseEvent, e: EdgeType) => emit('edgeContextMenu', ev, e);
(store as any)._emitEdgeMouseEnter = (ev: MouseEvent, e: EdgeType) => emit('edgeMouseEnter', ev, e);
(store as any)._emitEdgeMouseMove = (ev: MouseEvent, e: EdgeType) => emit('edgeMouseMove', ev, e);
(store as any)._emitEdgeMouseLeave = (ev: MouseEvent, e: EdgeType) => emit('edgeMouseLeave', ev, e);

// selectionChange via watch on selected nodes/edges
let prevSelection = { n: new Set<string>(), e: new Set<string>() };
watch([() => store.nodes.value, () => store.edges.value], () => {
  const selNodes = (store.nodes.value as NodeType[]).filter((n) => n.selected);
  const selEdges = (store.edges.value as EdgeType[]).filter((e) => e.selected);
  const nIds = new Set(selNodes.map((n) => n.id));
  const eIds = new Set(selEdges.map((e) => e.id));
  const changed = nIds.size !== prevSelection.n.size
    || eIds.size !== prevSelection.e.size
    || [...nIds].some((id) => !prevSelection.n.has(id))
    || [...eIds].some((id) => !prevSelection.e.has(id));
  if (changed) {
    prevSelection = { n: nIds, e: eIds };
    emit('selectionChange', { nodes: selNodes, edges: selEdges });
  }
});

// controlled sync
watch(() => props.nodes, (n) => { if (n) store.setNodes(n); });
watch(() => props.edges, (e) => { if (e) store.setEdges(e); });

const rootEl = ref<HTMLDivElement | null>(null);
useResizeObserver(rootEl, store as any);
const colorModeClass = useColorMode(props.colorMode, store as any);
useKeyboardShortcuts(undefined, store as any);

onMounted(() => {
  // give panZoom a tick to initialize, then emit init
  queueMicrotask(() => emit('init'));
});

function onPaneClick(event: MouseEvent) {
  if (event.target !== event.currentTarget) return;
  store.unselectNodesAndEdges();
  emit('paneClick', event);
}
</script>

<template>
  <div
    ref="rootEl"
    class="vue-flow vue-flow__container"
    :class="[colorModeClass, `vue-flow-${colorModeClass}`]"
    :data-id="store.flowId.value"
    @click="onPaneClick"
    @contextmenu="emit('paneContextMenu', $event)"
    @mouseenter="emit('paneMouseEnter', $event)"
    @mousemove="emit('paneMouseMove', $event)"
    @mouseleave="emit('paneMouseLeave', $event)"
  >
    <Viewport>
      <EdgeRenderer />
      <ConnectionLine />
      <NodeRenderer />
      <Selection />
    </Viewport>
    <slot />
    <A11yDescriptions />
  </div>
</template>
