import type { Ref, ShallowRef, ComputedRef } from 'vue';
import type {
  ConnectionLookup,
  ConnectionMode,
  ConnectionState,
  CoordinateExtent,
  EdgeLookup,
  NodeLookup,
  NodeOrigin,
  OnConnect,
  OnConnectEnd,
  OnConnectStart,
  OnError,
  PanZoomInstance,
  ParentLookup,
  SelectionRect,
  SnapGrid,
  Transform,
  Viewport,
  ColorModeClass,
  AriaLabelConfig,
  ZIndexMode,
} from '@xyflow/system';
import type { Edge, EdgeTypes } from '../types/edges';
import type { Node, NodeTypes } from '../types/nodes';
import type {
  FitViewOptions,
  IsValidConnection,
  OnBeforeConnect,
  OnBeforeDelete,
  OnDelete,
} from '../types/general';
import type { OnNodesChange, OnEdgesChange } from '../types/events';

export type VueFlowStore<NodeType extends Node = Node, EdgeType extends Edge = Edge> = {
  // refs (shallow for perf)
  flowId: ComputedRef<string>;
  domNode: ShallowRef<HTMLDivElement | null>;
  panZoom: ShallowRef<PanZoomInstance | null>;
  width: Ref<number>;
  height: Ref<number>;

  // graph
  nodes: ShallowRef<NodeType[]>;
  edges: ShallowRef<EdgeType[]>;
  nodeLookup: NodeLookup<NodeType extends Node ? any : any>;
  parentLookup: ParentLookup<NodeType extends Node ? any : any>;
  edgeLookup: EdgeLookup<EdgeType>;
  connectionLookup: ConnectionLookup;

  // viewport
  viewport: Ref<Viewport>;
  transform: ComputedRef<Transform>;

  // config
  nodeTypes: ShallowRef<NodeTypes>;
  edgeTypes: ShallowRef<EdgeTypes>;
  nodeOrigin: Ref<NodeOrigin>;
  nodeExtent: Ref<CoordinateExtent>;
  translateExtent: Ref<CoordinateExtent>;
  minZoom: Ref<number>;
  maxZoom: Ref<number>;
  snapGrid: Ref<SnapGrid | null>;
  snapToGrid: Ref<boolean>;
  connectionMode: Ref<ConnectionMode>;
  elevateNodesOnSelect: Ref<boolean>;
  elevateEdgesOnSelect: Ref<boolean>;
  zIndexMode: Ref<ZIndexMode>;
  colorMode: Ref<ColorModeClass>;
  ariaLabelConfig: Ref<AriaLabelConfig>;
  nodesDraggable: Ref<boolean>;
  nodesConnectable: Ref<boolean>;
  elementsSelectable: Ref<boolean>;
  selectNodesOnDrag: Ref<boolean>;
  multiSelectionActive: Ref<boolean>;
  autoPanOnNodeDrag: Ref<boolean>;
  autoPanOnConnect: Ref<boolean>;
  autoPanSpeed: Ref<number>;

  // interaction state
  connection: Ref<ConnectionState>;
  selectionRect: ShallowRef<SelectionRect | null>;
  selectionRectMode: Ref<string | null>;
  userSelectionActive: Ref<boolean>;
  paneDragging: Ref<boolean>;
  nodesInitialized: Ref<boolean>;
  viewportInitialized: ComputedRef<boolean>;
  fitViewQueued: Ref<boolean>;
  fitViewOptions: ShallowRef<FitViewOptions | undefined>;

  // callbacks
  onNodesChange: ShallowRef<OnNodesChange<NodeType> | undefined>;
  onEdgesChange: ShallowRef<OnEdgesChange<EdgeType> | undefined>;
  onConnect: ShallowRef<OnConnect | undefined>;
  onConnectStart: ShallowRef<OnConnectStart | undefined>;
  onConnectEnd: ShallowRef<OnConnectEnd | undefined>;
  onBeforeConnect: ShallowRef<OnBeforeConnect<EdgeType> | undefined>;
  onBeforeDelete: ShallowRef<OnBeforeDelete<NodeType, EdgeType> | undefined>;
  onDelete: ShallowRef<OnDelete<NodeType, EdgeType> | undefined>;
  onError: ShallowRef<OnError | undefined>;
  isValidConnection: ShallowRef<IsValidConnection<EdgeType> | undefined>;

  // actions
  setNodes: (nodes: NodeType[]) => void;
  setEdges: (edges: EdgeType[]) => void;
  updateNodeInternals: (ids: string[]) => void;
  addSelectedNodes: (ids: string[]) => void;
  addSelectedEdges: (ids: string[]) => void;
  unselectNodesAndEdges: (params?: { nodes?: NodeType[]; edges?: EdgeType[] }) => void;
  setViewport: (v: Viewport) => void;
  resetStoreValues: () => void;
};

export type VueFlowProps<NodeType extends Node = Node, EdgeType extends Edge = Edge> = {
  id?: string;
  nodes?: NodeType[];
  edges?: EdgeType[];
  defaultNodes?: NodeType[];
  defaultEdges?: EdgeType[];
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  nodeOrigin?: NodeOrigin;
  nodeExtent?: CoordinateExtent;
  translateExtent?: CoordinateExtent;
  minZoom?: number;
  maxZoom?: number;
  defaultViewport?: Viewport;
  viewport?: Viewport;
  snapGrid?: SnapGrid;
  snapToGrid?: boolean;
  connectionMode?: ConnectionMode;
  elevateNodesOnSelect?: boolean;
  elevateEdgesOnSelect?: boolean;
  zIndexMode?: ZIndexMode;
  fitView?: boolean;
  fitViewOptions?: FitViewOptions<NodeType>;
  colorMode?: 'light' | 'dark' | 'system';
  nodesDraggable?: boolean;
  nodesConnectable?: boolean;
  elementsSelectable?: boolean;
  selectNodesOnDrag?: boolean;
  autoPanOnNodeDrag?: boolean;
  autoPanOnConnect?: boolean;
  autoPanSpeed?: number;
  noDragClassName?: string;
  noPanClassName?: string;
  noWheelClassName?: string;
  ariaLabelConfig?: Partial<AriaLabelConfig>;
};
