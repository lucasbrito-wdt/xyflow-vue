<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, provide } from 'vue';
import { useStore } from '../../store/context';
import { useDrag } from '../../composables/useDrag';
import DefaultNode from '../nodes/DefaultNode.vue';
import InputNode from '../nodes/InputNode.vue';
import OutputNode from '../nodes/OutputNode.vue';
import GroupNode from '../nodes/GroupNode.vue';
import type { Node } from '../../types/nodes';

const props = defineProps<{ node: Node }>();
const store = useStore();
const el = ref<HTMLDivElement | null>(null);

const builtIn: Record<string, any> = {
  default: DefaultNode,
  input: InputNode,
  output: OutputNode,
  group: GroupNode,
};

const NodeComponent = computed(() => {
  const type = props.node.type ?? 'default';
  return store.nodeTypes.value[type] ?? builtIn[type] ?? DefaultNode;
});

const internal = computed(() => store.nodeLookup.get(props.node.id));

const style = computed(() => {
  const n = internal.value;
  const pos = n?.internals.positionAbsolute ?? props.node.position;
  const userStyle = (props.node.style as Record<string, unknown> | undefined) ?? {};
  const w = (userStyle.width as number | string | undefined) ?? props.node.width ?? props.node.initialWidth;
  const h = (userStyle.height as number | string | undefined) ?? props.node.height ?? props.node.initialHeight;
  return {
    ...userStyle,
    transform: `translate(${pos.x}px, ${pos.y}px)`,
    width: typeof w === 'number' ? `${w}px` : w,
    height: typeof h === 'number' ? `${h}px` : h,
    zIndex: n?.internals.z ?? 0,
    pointerEvents: props.node.selectable !== false ? 'all' : 'none',
  } as any;
});

// expose node id + connectable to Handle via provide
provide('vueflow-node-id', props.node.id);
provide(
  'vueflow-node-connectable',
  computed(() => props.node.connectable ?? store.nodesConnectable.value)
);

const isDraggable = computed(() => props.node.draggable ?? store.nodesDraggable.value);
const isSelectable = computed(() => props.node.selectable ?? store.elementsSelectable.value);
const disabled = computed(() => !isDraggable.value);

useDrag({
  el,
  disabled,
  noDragClass: 'nodrag',
  handleSelector: props.node.dragHandle,
  nodeId: props.node.id,
  isSelectable,
  onNodeMouseDown: (id) => {
    if (isSelectable.value && !props.node.selected) {
      store.addSelectedNodes([id]);
    }
  },
});

let ro: ResizeObserver | null = null;
const triggerMeasure = () => {
  if (!el.value) return;
  const updates = new Map<string, { id: string; nodeElement: HTMLElement; force?: boolean }>();
  updates.set(props.node.id, { id: props.node.id, nodeElement: el.value });
  store.updateNodeInternals(updates);
};

onMounted(() => {
  if (!el.value) return;
  triggerMeasure();
  ro = new ResizeObserver(() => triggerMeasure());
  ro.observe(el.value);
});
onBeforeUnmount(() => ro?.disconnect());

const nodeProps = computed(() => ({
  id: props.node.id,
  data: props.node.data,
  type: props.node.type ?? 'default',
  selected: !!props.node.selected,
  dragging: false,
  isConnectable: props.node.connectable ?? store.nodesConnectable.value,
  sourcePosition: props.node.sourcePosition,
  targetPosition: props.node.targetPosition,
  dragHandle: props.node.dragHandle,
  width: props.node.width,
  height: props.node.height,
  parentId: props.node.parentId,
  zIndex: internal.value?.internals.z ?? 0,
  positionAbsoluteX: internal.value?.internals.positionAbsolute.x ?? props.node.position.x,
  positionAbsoluteY: internal.value?.internals.positionAbsolute.y ?? props.node.position.y,
}));
</script>

<template>
  <div
    ref="el"
    class="vue-flow__node"
    :class="[
      `vue-flow__node-${node.type ?? 'default'}`,
      { selected: node.selected, draggable: node.draggable ?? store.nodesDraggable.value },
    ]"
    :data-id="node.id"
    :style="style"
    @click="(store as any)._emitNodeClick?.($event, node)"
    @dblclick="(store as any)._emitNodeDblClick?.($event, node)"
    @contextmenu="(store as any)._emitNodeContextMenu?.($event, node)"
    @mouseenter="(store as any)._emitNodeMouseEnter?.($event, node)"
    @mousemove="(store as any)._emitNodeMouseMove?.($event, node)"
    @mouseleave="(store as any)._emitNodeMouseLeave?.($event, node)"
  >
    <component :is="NodeComponent" v-bind="(nodeProps as any)" />
  </div>
</template>
