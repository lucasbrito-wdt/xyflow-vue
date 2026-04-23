import {
  getViewportForBounds,
  getNodesBounds,
  type Viewport,
  type FitViewOptionsBase,
  type XYPosition,
  type Rect,
  type HandleType,
  type NodeConnection,
} from '@xyflow/system';
import { useStore } from '../store/context';
import type { Node } from '../types/nodes';
import type { Edge } from '../types/edges';

export function useVueFlow<NodeType extends Node = Node, EdgeType extends Edge = Edge>() {
  const store = useStore() as any;

  const getNodes = () => store.nodes.value as NodeType[];
  const getEdges = () => store.edges.value as EdgeType[];

  const updateNode = (
    id: string,
    update: Partial<NodeType> | ((n: NodeType) => Partial<NodeType>),
    options?: { replace?: boolean }
  ) => {
    const next = (store.nodes.value as NodeType[]).map((n) => {
      if (n.id !== id) return n;
      const patch = typeof update === 'function' ? update(n) : update;
      return (options?.replace ? (patch as NodeType) : { ...n, ...patch }) as NodeType;
    });
    store.setNodes(next);
  };

  const updateEdge = (
    id: string,
    update: Partial<EdgeType> | ((e: EdgeType) => Partial<EdgeType>),
    options?: { replace?: boolean }
  ) => {
    const next = (store.edges.value as EdgeType[]).map((e) => {
      if (e.id !== id) return e;
      const patch = typeof update === 'function' ? update(e) : update;
      return (options?.replace ? (patch as EdgeType) : { ...e, ...patch }) as EdgeType;
    });
    store.setEdges(next);
  };

  const updateNodeData = (
    id: string,
    data: Record<string, unknown> | ((n: NodeType) => Record<string, unknown>),
    options?: { replace?: boolean }
  ) => {
    updateNode(
      id,
      ((n: NodeType) => ({
        data: (options?.replace
          ? data
          : { ...n.data, ...(typeof data === 'function' ? data(n) : data) }) as any,
      })) as any,
      { replace: false }
    );
  };

  const screenToFlowPosition = (pos: XYPosition) => {
    const rect = store.domNode.value?.getBoundingClientRect();
    const offX = rect?.left ?? 0;
    const offY = rect?.top ?? 0;
    const [tx, ty, tz] = store.transform.value;
    return { x: (pos.x - offX - tx) / tz, y: (pos.y - offY - ty) / tz };
  };

  const flowToScreenPosition = (pos: XYPosition) => {
    const rect = store.domNode.value?.getBoundingClientRect();
    const offX = rect?.left ?? 0;
    const offY = rect?.top ?? 0;
    const [tx, ty, tz] = store.transform.value;
    return { x: pos.x * tz + tx + offX, y: pos.y * tz + ty + offY };
  };

  const fitView = (options?: FitViewOptionsBase) => {
    const nodes = store.nodes.value as NodeType[];
    const filtered = options?.nodes
      ? nodes.filter((n) => options.nodes!.some((m: { id: string }) => m.id === n.id))
      : nodes;
    if (!filtered.length) return;
    const bounds = getNodesBounds(filtered as any, {
      nodeOrigin: store.nodeOrigin.value,
      nodeLookup: store.nodeLookup,
    });
    const vp = getViewportForBounds(
      bounds,
      store.width.value,
      store.height.value,
      options?.minZoom ?? store.minZoom.value,
      options?.maxZoom ?? store.maxZoom.value,
      options?.padding ?? 0.1
    );
    store.setViewport(vp);
  };

  const fitBounds = (bounds: Rect, options?: { padding?: number; duration?: number }) => {
    const vp = getViewportForBounds(
      bounds,
      store.width.value,
      store.height.value,
      store.minZoom.value,
      store.maxZoom.value,
      options?.padding ?? 0.1
    );
    store.panZoom.value?.setViewport(vp, { duration: options?.duration ?? 0 });
    store.viewport.value = vp;
  };

  const setCenter = (x: number, y: number, options?: { zoom?: number; duration?: number }) => {
    const zoom = options?.zoom ?? store.viewport.value.zoom;
    const vp: Viewport = {
      x: store.width.value / 2 - x * zoom,
      y: store.height.value / 2 - y * zoom,
      zoom,
    };
    store.panZoom.value?.setViewport(vp, { duration: options?.duration ?? 0 });
    store.viewport.value = vp;
  };

  const toObject = () => ({
    nodes: [...(store.nodes.value as NodeType[])],
    edges: [...(store.edges.value as EdgeType[])],
    viewport: { ...store.viewport.value },
  });

  const getHandleConnections = (params: {
    nodeId: string;
    type: HandleType;
    handleId?: string;
  }): NodeConnection[] => {
    const prefix = `${params.nodeId}-${params.type}${params.handleId ? `-${params.handleId}` : ''}`;
    const result: NodeConnection[] = [];
    const map = store.connectionLookup.get(prefix);
    if (map) for (const conn of map.values()) result.push(conn);
    return result;
  };

  return {
    getNodes,
    getEdges,
    setNodes: (nodes: NodeType[]) => store.setNodes(nodes),
    setEdges: (edges: EdgeType[]) => store.setEdges(edges),
    addNodes: (nodes: NodeType[] | NodeType) => {
      const arr = Array.isArray(nodes) ? nodes : [nodes];
      store.setNodes([...(store.nodes.value as NodeType[]), ...arr]);
    },
    addEdges: (edges: EdgeType[] | EdgeType) => {
      const arr = Array.isArray(edges) ? edges : [edges];
      store.setEdges([...(store.edges.value as EdgeType[]), ...arr]);
    },
    getNode: (id: string) => store.nodeLookup.get(id),
    getEdge: (id: string) => store.edgeLookup.get(id),
    getInternalNode: (id: string) => store.nodeLookup.get(id),
    updateNode,
    updateEdge,
    updateNodeData,
    deleteElements: ({ nodes = [], edges = [] }: { nodes?: { id: string }[]; edges?: { id: string }[] }) => {
      const nIds = new Set(nodes.map((n) => n.id));
      const eIds = new Set(edges.map((e) => e.id));
      store.setNodes((store.nodes.value as NodeType[]).filter((n) => !nIds.has(n.id)));
      store.setEdges(
        (store.edges.value as EdgeType[]).filter(
          (e) => !eIds.has(e.id) && !nIds.has(e.source) && !nIds.has(e.target)
        )
      );
    },
    getViewport: (): Viewport => store.viewport.value,
    setViewport: (v: Viewport) => store.setViewport(v),
    fitView,
    fitBounds,
    setCenter,
    zoomIn: () => store.panZoom.value?.scaleBy(1.2),
    zoomOut: () => store.panZoom.value?.scaleBy(1 / 1.2),
    zoomTo: (zoom: number) => store.panZoom.value?.scaleTo(zoom),
    toObject,
    screenToFlowPosition,
    flowToScreenPosition,
    getHandleConnections,
    getNodesBounds: (nodes: NodeType[]) =>
      getNodesBounds(nodes as any, {
        nodeOrigin: store.nodeOrigin.value,
        nodeLookup: store.nodeLookup,
      }),
  };
}
