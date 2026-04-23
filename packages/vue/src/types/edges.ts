import type { Component } from 'vue';
import type {
  EdgeBase,
  BezierPathOptions,
  SmoothStepPathOptions,
  DefaultEdgeOptionsBase,
  EdgePosition,
} from '@xyflow/system';

// Minimal EdgeProps - mirrors react/svelte frame
export type EdgePropsBase<EdgeType extends EdgeBase = EdgeBase> = Pick<
  EdgeType,
  'id' | 'animated' | 'data' | 'selected' | 'source' | 'target' | 'selectable' | 'deletable' | 'sourceHandle' | 'targetHandle' | 'interactionWidth' | 'type'
> & EdgePosition & {
  markerStart?: string;
  markerEnd?: string;
  style?: Record<string, string | number>;
  label?: string;
  labelStyle?: Record<string, string | number>;
};

export type Edge<
  EdgeData extends Record<string, unknown> = Record<string, unknown>,
  EdgeType extends string | undefined = string | undefined
> = EdgeBase<EdgeData, EdgeType>;

export type BuiltInEdge =
  | Edge<Record<string, never>, 'straight'>
  | Edge<{ pathOptions?: BezierPathOptions }, 'default'>
  | Edge<{ pathOptions?: SmoothStepPathOptions }, 'smoothstep'>
  | Edge<{ pathOptions?: SmoothStepPathOptions }, 'step'>;

export type EdgeProps<EdgeType extends EdgeBase = Edge> = EdgePropsBase<EdgeType>;

export type BezierEdgeProps = EdgeProps<Edge<{ pathOptions?: BezierPathOptions }, 'default'>>;
export type SmoothStepEdgeProps = EdgeProps<Edge<{ pathOptions?: SmoothStepPathOptions }, 'smoothstep'>>;
export type StepEdgeProps = EdgeProps<Edge<{ pathOptions?: SmoothStepPathOptions }, 'step'>>;
export type StraightEdgeProps = EdgeProps<Edge<Record<string, never>, 'straight'>>;

export type EdgeTypes = Record<string, Component<EdgeProps<any>>>;

export type DefaultEdgeOptions = DefaultEdgeOptionsBase<Edge>;

export type EdgeLayouted = Edge & {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourceHandleId?: string | null;
  targetHandleId?: string | null;
};
