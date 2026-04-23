# Types

## `Node`

```ts
type Node<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string | undefined = string | undefined
> = {
  id: string;
  position: { x: number; y: number };
  data: NodeData;
  type?: NodeType;

  // visual
  style?: Record<string, string | number>;
  className?: string;
  hidden?: boolean;
  width?: number;
  height?: number;
  initialWidth?: number;
  initialHeight?: number;

  // interaction
  selected?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  sourcePosition?: Position;
  targetPosition?: Position;

  // subflow
  parentId?: string;
  extent?: 'parent' | CoordinateExtent;

  // ordering
  zIndex?: number;

  // state (usually managed internally)
  dragging?: boolean;
  measured?: { width?: number; height?: number };
};
```

## `Edge`

```ts
type Edge<
  EdgeData extends Record<string, unknown> = Record<string, unknown>,
  EdgeType extends string | undefined = string | undefined
> = {
  id: string;
  source: string;
  target: string;
  type?: EdgeType;
  data?: EdgeData;

  sourceHandle?: string | null;
  targetHandle?: string | null;

  animated?: boolean;
  hidden?: boolean;
  selected?: boolean;
  deletable?: boolean;
  selectable?: boolean;

  label?: string;
  labelStyle?: Record<string, string | number>;
  style?: Record<string, string | number>;
  markerStart?: string | EdgeMarker;
  markerEnd?: string | EdgeMarker;

  interactionWidth?: number;

  zIndex?: number;
};
```

## `Connection`

```ts
type Connection = {
  source: string;
  target: string;
  sourceHandle: string | null;
  targetHandle: string | null;
};
```

## `Viewport`

```ts
type Viewport = { x: number; y: number; zoom: number };
```

## `Position`

```ts
enum Position {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}
```

## `MarkerType`

```ts
enum MarkerType {
  Arrow = 'arrow',
  ArrowClosed = 'arrowclosed',
}
```

## `NodeChange` / `EdgeChange`

Union types — `'add' | 'remove' | 'replace' | 'select' | 'position' | 'dimensions'`. Use with `applyNodeChanges` / `applyEdgeChanges`.

## Generics in `<VueFlow>`

```vue
<script setup lang="ts">
type MyNode = Node<{ label: string; count: number }, 'counter'>;
type MyEdge = Edge<{ weight: number }, 'weighted'>;
</script>

<template>
  <VueFlow<MyNode, MyEdge>
    :nodes="nodes"
    :edges="edges"
    @node-click="(_, node) => console.log(node.data.count)" <!-- typed -->
  />
</template>
```
