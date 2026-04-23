<script setup lang="ts">
import { computed, inject, type ComputedRef } from 'vue';
import {
  Position,
  XYHandle,
  ConnectionMode,
  isMouseEvent,
  getHostForElement,
  type HandleType,
  type Connection,
  type IsValidConnection,
} from '@xyflow/system';
import { useStore } from '../../store/context';

const props = withDefaults(
  defineProps<{
    id?: string | null;
    type?: HandleType;
    position?: Position;
    isConnectable?: boolean;
    isConnectableStart?: boolean;
    isConnectableEnd?: boolean;
    isValidConnection?: IsValidConnection;
  }>(),
  {
    type: 'source',
    position: Position.Top,
    isConnectableStart: true,
    isConnectableEnd: true,
  }
);

const emit = defineEmits<{
  (e: 'connect', c: Connection): void;
  (e: 'disconnect', c: Connection): void;
}>();

const store = useStore() as any;
const nodeId = inject<string>('vueflow-node-id', '');
const nodeConnectable = inject<ComputedRef<boolean>>(
  'vueflow-node-connectable',
  computed(() => true) as any
);

const isTarget = computed(() => props.type === 'target');
const isConnectable = computed(() =>
  props.isConnectable !== undefined ? props.isConnectable : nodeConnectable.value
);

const connState = computed(() => {
  const c = store.connection.value;
  if (!c.inProgress) return { inProgress: false, from: false, to: false, possible: false, valid: false };
  const from =
    c.fromHandle &&
    c.fromHandle.nodeId === nodeId &&
    c.fromHandle.type === props.type &&
    c.fromHandle.id === (props.id ?? null);
  const to =
    c.toHandle &&
    c.toHandle.nodeId === nodeId &&
    c.toHandle.type === props.type &&
    c.toHandle.id === (props.id ?? null);
  const possible =
    store.connectionMode.value === ConnectionMode.Strict
      ? c.fromHandle?.type !== props.type
      : nodeId !== c.fromHandle?.nodeId || (props.id ?? null) !== c.fromHandle?.id;
  return { inProgress: true, from, to, possible, valid: to && c.isValid };
});

function onPointerDown(event: MouseEvent | TouchEvent) {
  const isMouseTriggered = isMouseEvent(event as MouseEvent);
  if (!event.currentTarget) return;
  if (isMouseTriggered && (event as MouseEvent).button !== 0) return;

  const v = store.viewport.value;
  XYHandle.onPointerDown(event, {
    handleId: props.id ?? null,
    nodeId,
    isTarget: isTarget.value,
    connectionRadius: 20,
    domNode: store.domNode.value,
    nodeLookup: store.nodeLookup,
    connectionMode: store.connectionMode.value,
    lib: 'vue',
    autoPanOnConnect: store.autoPanOnConnect.value,
    autoPanSpeed: store.autoPanSpeed.value,
    flowId: store.flowId.value,
    isValidConnection:
      props.isValidConnection ?? ((c: any) => store.isValidConnection.value?.(c) ?? true),
    updateConnection: store.updateConnection,
    cancelConnection: store.cancelConnection,
    panBy: store.panBy,
    onConnect: (connection: Connection) => {
      const maybe = store.onBeforeConnect.value ? store.onBeforeConnect.value(connection) : connection;
      if (!maybe) return;
      store.addEdge(maybe);
      store.onConnect.value?.(connection);
      emit('connect', connection);
    },
    onConnectStart: store.onConnectStart.value,
    onConnectEnd: (...args: any[]) => store.onConnectEnd.value?.(...args),
    getTransform: () => [v.x, v.y, v.zoom],
    getFromHandle: () => store.connection.value.fromHandle,
    dragThreshold: 1,
    handleDomNode: event.currentTarget as HTMLElement,
  } as any);
}

const classes = computed(() => [
  'vue-flow__handle',
  `vue-flow__handle-${props.position}`,
  props.position,
  {
    source: !isTarget.value,
    target: isTarget.value,
    connectable: isConnectable.value,
    connectablestart: props.isConnectableStart,
    connectableend: props.isConnectableEnd,
    connectingfrom: connState.value.from,
    connectingto: connState.value.to,
    valid: connState.value.valid,
    connectionindicator:
      isConnectable.value && (!connState.value.inProgress || connState.value.possible),
  },
]);
</script>

<template>
  <div
    :class="classes"
    :data-handleid="id ?? ''"
    :data-nodeid="nodeId"
    :data-handlepos="position"
    :data-handletype="type"
    :data-id="`${store.flowId.value}-${nodeId}-${id ?? 'null'}-${type}`"
    @mousedown="onPointerDown"
    @touchstart.passive="onPointerDown"
  />
</template>
