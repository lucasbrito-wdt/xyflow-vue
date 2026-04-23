// main component
export { VueFlow } from './container/VueFlow';
export type { VueFlowProps } from './store/types';

// components
export { default as Handle } from './components/Handle/Handle.vue';
export {
  BaseEdge,
  BezierEdge,
  StraightEdge,
  SmoothStepEdge,
  StepEdge,
} from './components/edges';

// built-in nodes
export { default as DefaultNode } from './components/nodes/DefaultNode.vue';
export { default as InputNode } from './components/nodes/InputNode.vue';
export { default as OutputNode } from './components/nodes/OutputNode.vue';
export { default as GroupNode } from './components/nodes/GroupNode.vue';

// container
export * from './container/Panel';
export * from './components/VueFlowProvider';
export * from './components/ViewportPortal';
export * from './components/EdgeLabel';
export * from './components/EdgeReconnectAnchor';
export * from './components/Attribution';

// plugins
export * from './plugins/Background';
export * from './plugins/Controls';
export * from './plugins/Minimap';
export * from './plugins/NodeToolbar';
export * from './plugins/EdgeToolbar';
export * from './plugins/NodeResizer';

export { default as ConnectionLine } from './components/ConnectionLine/ConnectionLine.vue';

// store + composables
export { useStore } from './store/context';
export { useVueFlow } from './composables/useVueFlow';
export { useDrag } from './composables/useDrag';
export { useInternalNode } from './composables/useInternalNode';
export { useUpdateNodeInternals } from './composables/useUpdateNodeInternals';
export { useConnection } from './composables/useConnection';
export { useInitialized } from './composables/useInitialized';
export { useNodes, useEdges, useViewport } from './composables/useNodesEdgesViewport';
export { useNodesData } from './composables/useNodesData';
export { useNodeConnections } from './composables/useNodeConnections';
export { useColorMode } from './composables/useColorMode';
export { useOnSelectionChange } from './composables/useOnSelectionChange';
export { useKeyboardShortcuts } from './composables/useKeyboardShortcuts';
export { useSelectionBox } from './composables/useSelectionBox';

// utils
export { applyNodeChanges, applyEdgeChanges } from './utils/changes';

// types
export * from './types';
export type { VueFlowStore } from './store/types';

// system re-exports (match svelte surface)
export {
  type Align,
  type SmoothStepPathOptions,
  type BezierPathOptions,
  ConnectionLineType,
  type EdgeMarker,
  type EdgeMarkerType,
  MarkerType,
  type OnMove,
  type OnMoveStart,
  type OnMoveEnd,
  type Connection,
  ConnectionMode,
  type OnConnectStartParams,
  type OnConnectStart,
  type OnConnect,
  type OnConnectEnd,
  type Viewport,
  type SnapGrid,
  PanOnScrollMode,
  type ViewportHelperFunctionOptions,
  type SetCenterOptions,
  type FitBoundsOptions,
  type PanelPosition,
  type ProOptions,
  SelectionMode,
  type SelectionRect,
  type OnError,
  type NodeOrigin,
  type OnSelectionDrag,
  Position,
  type XYPosition,
  type XYZPosition,
  type Dimensions,
  type Rect,
  type Box,
  type Transform,
  type CoordinateExtent,
  type ColorMode,
  type ColorModeClass,
  type ShouldResize,
  type OnResizeStart,
  type OnResize,
  type OnResizeEnd,
  type OnReconnect,
  type OnReconnectStart,
  type OnReconnectEnd,
  type ControlPosition,
  type ControlLinePosition,
  ResizeControlVariant,
  type ResizeParams,
  type ResizeParamsWithDirection,
  type ResizeDragEvent,
  type IsValidConnection,
  type NodeConnection,
  type AriaLabelConfig,
  type SetCenter,
  type SetViewport,
  type FitBounds,
  type HandleConnection,
  type ZIndexMode,
} from '@xyflow/system';

export {
  type GetBezierPathParams,
  getBezierEdgeCenter,
  getBezierPath,
  getEdgeCenter,
  type GetSmoothStepPathParams,
  getSmoothStepPath,
  type GetStraightPathParams,
  getStraightPath,
  getViewportForBounds,
  getNodesBounds,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  addEdge,
} from '@xyflow/system';
