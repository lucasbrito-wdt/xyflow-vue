import { onMounted, onBeforeUnmount, watch, type Ref } from 'vue';
import { XYDrag, type OnDrag } from '@xyflow/system';
import { useStore } from '../store/context';

export type UseDragParams = {
  el: Ref<HTMLElement | null>;
  disabled?: Ref<boolean>;
  noDragClass?: string;
  handleSelector?: string;
  nodeId?: string;
  isSelectable?: Ref<boolean>;
  nodeClickDistance?: number;
  onDrag?: OnDrag;
  onDragStart?: OnDrag;
  onDragStop?: OnDrag;
  onNodeMouseDown?: (id: string) => void;
};

export function useDrag(params: UseDragParams) {
  const store = useStore() as any;
  let instance: ReturnType<typeof XYDrag> | null = null;

  const getStoreItems = () => {
    const v = store.viewport.value;
    return {
      nodes: store.nodes.value,
      nodeLookup: store.nodeLookup,
      edges: store.edges.value,
      nodeExtent: store.nodeExtent.value,
      snapGrid: store.snapGrid.value ?? [0, 0],
      snapToGrid: !!store.snapGrid.value,
      nodeOrigin: store.nodeOrigin.value,
      multiSelectionActive: store.multiSelectionActive.value,
      domNode: store.domNode.value,
      transform: [v.x, v.y, v.zoom] as [number, number, number],
      autoPanOnNodeDrag: store.autoPanOnNodeDrag.value,
      nodesDraggable: store.nodesDraggable.value,
      selectNodesOnDrag: store.selectNodesOnDrag.value,
      nodeDragThreshold: 1,
      unselectNodesAndEdges: store.unselectNodesAndEdges,
      updateNodePositions: store.updateNodePositions,
      panBy: store.panBy,
      onSelectionDrag: (ev: MouseEvent, nodes: any[]) =>
        (store as any)._emitSelectionDrag?.('drag', ev, nodes),
      onSelectionDragStart: (ev: MouseEvent, nodes: any[]) =>
        (store as any)._emitSelectionDrag?.('start', ev, nodes),
      onSelectionDragStop: (ev: MouseEvent, nodes: any[]) =>
        (store as any)._emitSelectionDrag?.('stop', ev, nodes),
    };
  };

  const build = () => {
    if (!params.el.value) return;
    if (params.disabled?.value) return;

    const wrapDrag = (kind: 'start' | 'drag' | 'stop'): any =>
      (event: MouseEvent, nodes: any[], node: any) => {
        const fn =
          kind === 'start' ? params.onDragStart : kind === 'drag' ? params.onDrag : params.onDragStop;
        fn?.(event, nodes, node);
        const emitter = (store as any)._emitNodeDrag;
        const selEmitter = (store as any)._emitSelectionDrag;
        if (params.nodeId && emitter && node) emitter(kind, event, node, nodes);
        else if (!params.nodeId && selEmitter) selEmitter(kind, event, nodes);
      };

    instance = XYDrag({
      onDrag: wrapDrag('drag'),
      onDragStart: wrapDrag('start'),
      onDragStop: wrapDrag('stop'),
      onNodeMouseDown: params.onNodeMouseDown,
      getStoreItems,
    } as any);

    instance.update({
      domNode: params.el.value,
      noDragClassName: params.noDragClass,
      handleSelector: params.handleSelector,
      nodeId: params.nodeId,
      isSelectable: params.isSelectable?.value,
      nodeClickDistance: params.nodeClickDistance,
    });
  };

  onMounted(build);

  watch(
    () => [params.el.value, params.disabled?.value, params.isSelectable?.value],
    () => {
      instance?.destroy();
      instance = null;
      build();
    }
  );

  onBeforeUnmount(() => {
    instance?.destroy();
    instance = null;
  });
}
