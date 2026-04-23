<script setup lang="ts">
import { XYHandle, type HandleType } from '@xyflow/system';
import { useStore } from '../../store/context';

const props = withDefaults(
  defineProps<{
    x: number;
    y: number;
    type: HandleType;
    edgeId: string;
    radius?: number;
  }>(),
  { radius: 8 }
);

const emit = defineEmits<{
  (e: 'reconnect', edgeId: string, newSource: string, newTarget: string): void;
}>();

const store = useStore() as any;

function onPointerDown(event: MouseEvent | TouchEvent) {
  const edge = store.edgeLookup.get(props.edgeId);
  if (!edge) return;

  // The "fixed" end (opposite of the one the user grabbed) stays anchored;
  // XYHandle drags from there and fires onConnect when a new target is reached.
  const isTarget = props.type === 'target';
  const fixedNodeId = isTarget ? edge.source : edge.target;
  const fixedHandleId = isTarget ? edge.sourceHandle ?? null : edge.targetHandle ?? null;
  const fixedIsTarget = !isTarget;

  const v = store.viewport.value;

  XYHandle.onPointerDown(event, {
    handleId: fixedHandleId,
    nodeId: fixedNodeId,
    isTarget: fixedIsTarget,
    edgeUpdaterType: props.type,
    connectionRadius: 20,
    domNode: store.domNode.value,
    nodeLookup: store.nodeLookup,
    connectionMode: store.connectionMode.value,
    lib: 'vue',
    autoPanOnConnect: store.autoPanOnConnect.value,
    autoPanSpeed: store.autoPanSpeed.value,
    flowId: store.flowId.value,
    isValidConnection: (c: any) => store.isValidConnection.value?.(c) ?? true,
    updateConnection: store.updateConnection,
    cancelConnection: store.cancelConnection,
    panBy: store.panBy,
    onConnect: (connection: any) => {
      const next = (store.edges.value as any[]).map((e) =>
        e.id === props.edgeId
          ? {
              ...e,
              source: connection.source,
              target: connection.target,
              sourceHandle: connection.sourceHandle,
              targetHandle: connection.targetHandle,
            }
          : e
      );
      store.setEdges(next);
      emit('reconnect', props.edgeId, connection.source, connection.target);
    },
    onConnectStart: undefined,
    onConnectEnd: undefined,
    onReconnectEnd: undefined,
    getTransform: () => [v.x, v.y, v.zoom],
    getFromHandle: () => store.connection.value.fromHandle,
    dragThreshold: 1,
    handleDomNode: event.currentTarget as unknown as HTMLElement,
  } as any);
}
</script>

<template>
  <circle
    class="vue-flow__edge-reconnect-anchor"
    :cx="x"
    :cy="y"
    :r="radius"
    fill="white"
    stroke="#3578e5"
    stroke-width="2"
    style="cursor: crosshair; pointer-events: all"
    :data-edgeid="edgeId"
    :data-handletype="type"
    @mousedown="onPointerDown"
    @touchstart.passive="onPointerDown"
  />
</template>
