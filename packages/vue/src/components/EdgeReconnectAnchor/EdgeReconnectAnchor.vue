<script setup lang="ts">
import { XYHandle, type HandleType } from '@xyflow/system';
import { useStore } from '../../store/context';

const props = defineProps<{
  x: number;
  y: number;
  type: HandleType;
  edgeId: string;
  radius?: number;
}>();

const store = useStore() as any;

function onPointerDown(event: MouseEvent | TouchEvent) {
  const edge = store.edgeLookup.get(props.edgeId);
  if (!edge) return;

  // the "fixed" end stays connected; we drag the opposite end
  const isTarget = props.type === 'target';
  const fixedNodeId = isTarget ? edge.source : edge.target;
  const fixedHandleId = isTarget ? edge.sourceHandle ?? null : edge.targetHandle ?? null;
  const fixedType: HandleType = isTarget ? 'source' : 'target';

  const v = store.viewport.value;

  XYHandle.onPointerDown(event, {
    handleId: fixedHandleId,
    nodeId: fixedNodeId,
    isTarget: fixedType === 'target',
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
      // reconnect the existing edge instead of creating a new one
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
    },
    onConnectStart: store.onConnectStart.value,
    onConnectEnd: (...args: any[]) => store.onConnectEnd.value?.(...args),
    getTransform: () => [v.x, v.y, v.zoom],
    getFromHandle: () => store.connection.value.fromHandle,
    dragThreshold: 1,
    handleDomNode: event.currentTarget as HTMLElement,
  } as any);
}
</script>

<template>
  <circle
    class="vue-flow__edge-reconnect-anchor"
    :cx="x"
    :cy="y"
    :r="radius ?? 8"
    fill="transparent"
    :data-edgeid="edgeId"
    :data-handletype="type"
    @mousedown="onPointerDown"
    @touchstart.passive="onPointerDown"
  />
</template>
