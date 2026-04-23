import type { Component } from 'vue';
import type {
  CoordinateExtent,
  NodeBase,
  InternalNodeBase,
  NodeProps as NodePropsBase,
  HandleType,
  Position,
} from '@xyflow/system';

export type Node<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string | undefined = string | undefined
> = NodeBase<NodeData, NodeType>;

export type InternalNode<NodeType extends Node = Node> = InternalNodeBase<NodeType>;

export type BuiltInNode =
  | Node<{ label: string }, 'input' | 'output' | 'default'>
  | Node<Record<string, never>, 'group'>;

export type NodeProps<NodeType extends Node = Node> = NodePropsBase<NodeType>;

export type NodeTypes = Record<string, Component<NodeProps<any>>>;

export type DefaultNodeOptions = Partial<Omit<Node, 'id' | 'position' | 'data'>>;

export type NodeHandle = {
  id: string | null;
  position: Position;
  type: HandleType;
  nodeId: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
};

export type { CoordinateExtent };
