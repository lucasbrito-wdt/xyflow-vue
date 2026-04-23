import { computed, ref, shallowRef } from 'vue';
import {
  ConnectionMode,
  adoptUserNodes,
  updateConnectionLookup,
  updateNodeInternals as sysUpdateNodeInternals,
  initialConnection,
  mergeAriaLabelConfig,
  infiniteExtent,
  type ConnectionLookup,
  type EdgeLookup,
  type NodeLookup,
  type ParentLookup,
  type Viewport,
} from '@xyflow/system';

import type { Edge } from '../types/edges';
import type { Node } from '../types/nodes';
import type { VueFlowProps, VueFlowStore } from './types';

export { useStore, useStoreSafe, provideStore, VueFlowStoreKey } from './context';

export function createStore<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  props: VueFlowProps<NodeType, EdgeType>
): VueFlowStore<NodeType, EdgeType> {
  const nodes = shallowRef<NodeType[]>(props.nodes ?? props.defaultNodes ?? []);
  const edges = shallowRef<EdgeType[]>(props.edges ?? props.defaultEdges ?? []);

  const nodeLookup: NodeLookup = new Map();
  const parentLookup: ParentLookup = new Map();
  const edgeLookup: EdgeLookup<EdgeType> = new Map();
  const connectionLookup: ConnectionLookup = new Map();

  const width = ref(0);
  const height = ref(0);
  const domNode = shallowRef<HTMLDivElement | null>(null);
  const panZoom = shallowRef<import('@xyflow/system').PanZoomInstance | null>(null);

  const nodeOrigin = ref<[number, number]>(props.nodeOrigin ?? [0, 0]);
  const nodeExtent = ref(props.nodeExtent ?? infiniteExtent);
  const translateExtent = ref(props.translateExtent ?? infiniteExtent);
  const minZoom = ref(props.minZoom ?? 0.5);
  const maxZoom = ref(props.maxZoom ?? 2);
  const snapGrid = ref(props.snapGrid ?? null);
  const snapToGrid = ref(props.snapToGrid ?? false);
  const connectionMode = ref(props.connectionMode ?? ConnectionMode.Strict);
  const elevateNodesOnSelect = ref(props.elevateNodesOnSelect ?? true);
  const elevateEdgesOnSelect = ref(props.elevateEdgesOnSelect ?? false);
  const zIndexMode = ref(props.zIndexMode ?? 'basic');
  const colorMode = ref<'light' | 'dark'>('light');
  const ariaLabelConfig = ref(mergeAriaLabelConfig(props.ariaLabelConfig));
  const nodesDraggable = ref(props.nodesDraggable ?? true);
  const nodesConnectable = ref(props.nodesConnectable ?? true);
  const elementsSelectable = ref(props.elementsSelectable ?? true);
  const selectNodesOnDrag = ref(props.selectNodesOnDrag ?? true);
  const multiSelectionActive = ref(false);
  const autoPanOnNodeDrag = ref(props.autoPanOnNodeDrag ?? true);
  const autoPanOnConnect = ref(props.autoPanOnConnect ?? true);
  const autoPanSpeed = ref(props.autoPanSpeed ?? 15);

  const viewport = ref<Viewport>(props.defaultViewport ?? props.viewport ?? { x: 0, y: 0, zoom: 1 });
  const transform = computed<[number, number, number]>(() => [
    viewport.value.x,
    viewport.value.y,
    viewport.value.zoom,
  ]);

  const nodeTypes = shallowRef(props.nodeTypes ?? {});
  const edgeTypes = shallowRef(props.edgeTypes ?? {});

  const connection = ref({ ...initialConnection });
  const selectionRect = shallowRef(null);
  const selectionRectMode = ref<string | null>(null);
  const userSelectionActive = ref(false);
  const paneDragging = ref(false);
  const nodesInitialized = ref(false);
  const viewportInitialized = computed(() => panZoom.value !== null);
  const fitViewQueued = ref(props.fitView ?? false);
  const fitViewOptions = shallowRef(props.fitViewOptions);

  const onNodesChange = shallowRef<any>(undefined);
  const onEdgesChange = shallowRef<any>(undefined);
  const onConnect = shallowRef<any>(undefined);
  const onConnectStart = shallowRef<any>(undefined);
  const onConnectEnd = shallowRef<any>(undefined);
  const onBeforeConnect = shallowRef<any>(undefined);
  const onBeforeDelete = shallowRef<any>(undefined);
  const onDelete = shallowRef<any>(undefined);
  const onError = shallowRef<any>(undefined);
  const isValidConnection = shallowRef<any>(undefined);

  const syncNodeLookup = () => {
    const res = adoptUserNodes(nodes.value as any, nodeLookup, parentLookup, {
      nodeExtent: nodeExtent.value,
      nodeOrigin: nodeOrigin.value,
      elevateNodesOnSelect: elevateNodesOnSelect.value,
      checkEquality: true,
      zIndexMode: zIndexMode.value,
    });
    nodesInitialized.value = res.nodesInitialized;
  };

  const syncEdgeLookup = () => {
    updateConnectionLookup(connectionLookup, edgeLookup, edges.value as any);
  };

  const setNodes = (next: NodeType[]) => {
    nodes.value = next;
    syncNodeLookup();
  };
  const setEdges = (next: EdgeType[]) => {
    edges.value = next;
    syncEdgeLookup();
  };

  syncNodeLookup();
  syncEdgeLookup();

  const updateNodeInternals = (
    idsOrUpdates: string[] | Map<string, { id: string; nodeElement: HTMLElement; force?: boolean }>
  ) => {
    if (Array.isArray(idsOrUpdates)) {
      syncNodeLookup();
      nodes.value = [...nodes.value];
      return;
    }
    sysUpdateNodeInternals(
      idsOrUpdates,
      nodeLookup,
      parentLookup,
      domNode.value,
      nodeOrigin.value,
      nodeExtent.value,
      zIndexMode.value
    );
    // bump shallowRef so downstream computeds re-run
    nodes.value = [...nodes.value];
  };

  const addSelectedNodes = (ids: string[]) => {
    const idSet = new Set(ids);
    setNodes(nodes.value.map((n) => ({ ...n, selected: idSet.has(n.id) })) as NodeType[]);
  };
  const addSelectedEdges = (ids: string[]) => {
    const idSet = new Set(ids);
    setEdges(edges.value.map((e) => ({ ...e, selected: idSet.has(e.id) })) as EdgeType[]);
  };
  const unselectNodesAndEdges = () => {
    setNodes(nodes.value.map((n) => (n.selected ? { ...n, selected: false } : n)) as NodeType[]);
    setEdges(edges.value.map((e) => (e.selected ? { ...e, selected: false } : e)) as EdgeType[]);
  };
  const setViewport = (v: Viewport) => {
    viewport.value = v;
    panZoom.value?.syncViewport(v);
  };
  const resetStoreValues = () => {
    setNodes([]);
    setEdges([]);
    viewport.value = { x: 0, y: 0, zoom: 1 };
  };

  // XYDrag / XYHandle integration
  const panBy = (delta: { x: number; y: number }) => {
    const pz = panZoom.value;
    if (!pz) return false;
    const v = viewport.value;
    const next = { x: v.x + delta.x, y: v.y + delta.y, zoom: v.zoom };
    pz.syncViewport(next);
    viewport.value = next;
    return true;
  };

  // holder for late-bound emit handlers set by <VueFlow>
  const emits: { nodesChange?: (c: any[]) => void; edgesChange?: (c: any[]) => void } = {};

  const updateNodePositions = (
    updates: Map<string, { id: string; position: { x: number; y: number }; dragging?: boolean }>
  ) => {
    const changes: any[] = [];
    // Collect descendants of updated nodes so they also get new userNode refs
    // — otherwise adoptUserNodes' checkEquality reuses their stale internals
    // and their positionAbsolute doesn't follow the dragged parent.
    const touched = new Set(updates.keys());
    const collectDescendants = (id: string) => {
      const children = parentLookup.get(id);
      if (!children) return;
      for (const c of children.values()) {
        if (touched.has(c.id)) continue;
        touched.add(c.id);
        collectDescendants(c.id);
      }
    };
    for (const id of [...updates.keys()]) collectDescendants(id);

    const next = nodes.value.map((n) => {
      if (!touched.has(n.id)) return n;
      const u = updates.get(n.id);
      const internal = nodeLookup.get(n.id);
      if (!u) {
        // descendant: new reference to force re-adopt (position stays same)
        return { ...n, measured: internal?.measured ?? n.measured } as NodeType;
      }
      changes.push({ type: 'position', id: n.id, position: u.position, dragging: u.dragging });
      return {
        ...n,
        position: u.position,
        dragging: u.dragging,
        measured: internal?.measured ?? n.measured,
      } as NodeType;
    });
    setNodes(next);
    if (changes.length) emits.nodesChange?.(changes);
  };

  const updateConnection = (c: any) => {
    connection.value = c;
  };
  const cancelConnection = () => {
    connection.value = { ...initialConnection };
  };

  const addEdge = (edgeOrConnection: any) => {
    const e = edgeOrConnection.id
      ? edgeOrConnection
      : {
          ...edgeOrConnection,
          id: `xy-edge__${edgeOrConnection.source}${edgeOrConnection.sourceHandle ?? ''}-${
            edgeOrConnection.target
          }${edgeOrConnection.targetHandle ?? ''}`,
        };
    if (edges.value.some((x) => x.id === e.id)) return;
    setEdges([...edges.value, e as EdgeType]);
  };

  return {
    flowId: computed(() => props.id ?? '1'),
    domNode,
    panZoom,
    width,
    height,
    nodes,
    edges,
    nodeLookup,
    parentLookup,
    edgeLookup,
    connectionLookup,
    viewport,
    transform,
    nodeTypes,
    edgeTypes,
    nodeOrigin,
    nodeExtent,
    translateExtent,
    minZoom,
    maxZoom,
    snapGrid,
    snapToGrid,
    connectionMode,
    elevateNodesOnSelect,
    elevateEdgesOnSelect,
    zIndexMode,
    colorMode,
    ariaLabelConfig,
    nodesDraggable,
    nodesConnectable,
    elementsSelectable,
    selectNodesOnDrag,
    multiSelectionActive,
    autoPanOnNodeDrag,
    autoPanOnConnect,
    autoPanSpeed,
    connection,
    selectionRect,
    selectionRectMode,
    userSelectionActive,
    paneDragging,
    nodesInitialized,
    viewportInitialized,
    fitViewQueued,
    fitViewOptions,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onConnectStart,
    onConnectEnd,
    onBeforeConnect,
    onBeforeDelete,
    onDelete,
    onError,
    isValidConnection,
    setNodes,
    setEdges,
    updateNodeInternals,
    addSelectedNodes,
    addSelectedEdges,
    unselectNodesAndEdges,
    setViewport,
    resetStoreValues,
    panBy,
    updateNodePositions,
    updateConnection,
    cancelConnection,
    addEdge,
    _emits: emits,
  } as unknown as VueFlowStore<NodeType, EdgeType>;
}
