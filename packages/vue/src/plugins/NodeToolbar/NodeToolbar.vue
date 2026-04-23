<script setup lang="ts">
import { computed, inject } from 'vue';
import { Position, getNodeToolbarTransform, getNodesBounds } from '@xyflow/system';
import { useStore } from '../../store/context';

const props = withDefaults(
  defineProps<{
    nodeId?: string | string[];
    position?: Position;
    align?: 'start' | 'center' | 'end';
    offset?: number;
    isVisible?: boolean;
  }>(),
  {
    position: Position.Top,
    align: 'center',
    offset: 10,
  }
);

const store = useStore() as any;
const ctxNodeId = inject<string>('vueflow-node-id', '');

const toolbarNodes = computed(() => {
  const ids = Array.isArray(props.nodeId) ? props.nodeId : [props.nodeId ?? ctxNodeId];
  return ids
    .map((id) => (id ? store.nodeLookup.get(id) : null))
    .filter((n): n is any => !!n);
});

const transform = computed(() => {
  if (!toolbarNodes.value.length) return '';
  const rect = getNodesBounds(toolbarNodes.value, {
    nodeOrigin: store.nodeOrigin.value,
    nodeLookup: store.nodeLookup,
  });
  return getNodeToolbarTransform(rect, store.viewport.value, props.position, props.offset, props.align);
});

const zIndex = computed(() => {
  if (!toolbarNodes.value.length) return 1;
  return Math.max(...toolbarNodes.value.map((n: any) => (n.internals.z || 5) + 1));
});

const selectedCount = computed(() => (store.nodes.value as any[]).filter((n) => n.selected).length);

const isActive = computed(() => {
  if (typeof props.isVisible === 'boolean') return props.isVisible;
  return toolbarNodes.value.length === 1 && toolbarNodes.value[0].selected && selectedCount.value === 1;
});

const mount = computed(() => store.domNode.value?.querySelector('.vue-flow__renderer') ?? store.domNode.value);
</script>

<template>
  <Teleport v-if="isActive && mount" :to="mount">
    <div
      class="vue-flow__node-toolbar"
      :style="{ position: 'absolute', transform, zIndex }"
    >
      <slot />
    </div>
  </Teleport>
</template>
