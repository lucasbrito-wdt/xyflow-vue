import type {
  Connection,
  OnConnect,
  OnConnectStart,
  OnConnectEnd,
  OnMove,
  OnMoveStart,
  OnMoveEnd,
  OnSelectionDrag,
  NodeChange,
  EdgeChange,
  Viewport,
} from '@xyflow/system';
import type { Node } from './nodes';
import type { Edge } from './edges';

export type NodeMouseEvent<NodeType extends Node = Node> = (event: MouseEvent, node: NodeType) => void;
export type NodeTouchEvent<NodeType extends Node = Node> = (event: TouchEvent, node: NodeType) => void;
export type EdgeMouseEvent<EdgeType extends Edge = Edge> = (event: MouseEvent, edge: EdgeType) => void;

export type OnNodesChange<NodeType extends Node = Node> = (changes: NodeChange<NodeType>[]) => void;
export type OnEdgesChange<EdgeType extends Edge = Edge> = (changes: EdgeChange<EdgeType>[]) => void;

export type OnNodeDrag<NodeType extends Node = Node> = (
  event: MouseEvent,
  node: NodeType,
  nodes: NodeType[]
) => void;

export type {
  Connection,
  OnConnect,
  OnConnectStart,
  OnConnectEnd,
  OnMove,
  OnMoveStart,
  OnMoveEnd,
  OnSelectionDrag,
  Viewport,
};
