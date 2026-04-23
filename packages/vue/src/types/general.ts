import type { Connection, HandleType, XYPosition } from '@xyflow/system';
import type { Edge } from './edges';
import type { Node } from './nodes';

export type FitViewOptions<NodeType extends Node = Node> = {
  padding?: number;
  includeHiddenNodes?: boolean;
  minZoom?: number;
  maxZoom?: number;
  duration?: number;
  nodes?: (Partial<NodeType> & { id: NodeType['id'] })[];
};

export type OnBeforeConnect<EdgeType extends Edge = Edge> = (
  connection: Connection
) => EdgeType | Connection | undefined | null;

export type OnBeforeDelete<NodeType extends Node = Node, EdgeType extends Edge = Edge> = (params: {
  nodes: NodeType[];
  edges: EdgeType[];
}) => Promise<boolean | { nodes?: NodeType[]; edges?: EdgeType[] }>;

export type OnBeforeReconnect<EdgeType extends Edge = Edge> = (
  newEdge: EdgeType,
  oldEdge: EdgeType
) => EdgeType | undefined | null;

export type OnDelete<NodeType extends Node = Node, EdgeType extends Edge = Edge> = (params: {
  nodes: NodeType[];
  edges: EdgeType[];
}) => void;

export type OnSelectionChange<NodeType extends Node = Node, EdgeType extends Edge = Edge> = (params: {
  nodes: NodeType[];
  edges: EdgeType[];
}) => void;

export type IsValidConnection<EdgeType extends Edge = Edge> = (
  edge: EdgeType | Connection
) => boolean;

export type ConnectingHandle = {
  nodeId: string;
  handleId: string | null;
  type: HandleType;
  position?: XYPosition;
};
