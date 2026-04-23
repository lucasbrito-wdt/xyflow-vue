<script setup lang="ts">
import { computed } from 'vue';
import { getEdgePosition } from '@xyflow/system';
import { useStore } from '../../store/context';

const props = defineProps<{
  edgeId: string;
  offset?: number;
  isVisible?: boolean;
}>();

const store = useStore() as any;

const edge = computed(() => store.edgeLookup.get(props.edgeId));

const isActive = computed(() => {
  if (typeof props.isVisible === 'boolean') return props.isVisible;
  return !!edge.value?.selected;
});

const position = computed(() => {
  const e = edge.value;
  if (!e) return null;
  const s = store.nodeLookup.get(e.source);
  const t = store.nodeLookup.get(e.target);
  if (!s || !t) return null;
  const p = getEdgePosition({
    id: e.id,
    sourceNode: s,
    targetNode: t,
    sourceHandle: e.sourceHandle ?? null,
    targetHandle: e.targetHandle ?? null,
    connectionMode: store.connectionMode.value,
    onError: store.onError.value,
  });
  if (!p) return null;
  const v = store.viewport.value;
  const cx = (p.sourceX + p.targetX) / 2;
  const cy = (p.sourceY + p.targetY) / 2;
  return { x: cx * v.zoom + v.x, y: cy * v.zoom + v.y };
});

const mount = computed(() => store.domNode.value);
</script>

<template>
  <Teleport v-if="isActive && mount && position" :to="mount">
    <div
      class="vue-flow__edge-toolbar"
      :style="{
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
        zIndex: 1000,
      }"
    >
      <slot />
    </div>
  </Teleport>
</template>
