# Subflow

Nest nodes inside a `group` parent. Children with `extent: 'parent'` get clamped to the parent's bounding box during drag.

<ExampleFrame slug="subflow" />

```ts
const nodes = [
  {
    id: 'group-1',
    type: 'group',
    position: { x: 50, y: 50 },
    data: {},
    width: 400,                      // ← explicit, required for clamping
    height: 250,
    style: { backgroundColor: 'rgba(120, 130, 230, 0.1)' },
  },
  {
    id: 'child-1',
    data: { label: 'Child 1' },
    position: { x: 40, y: 60 },       // ← relative to parent
    parentId: 'group-1',
    extent: 'parent',
  },
];
```

> **Required:** set `width` and `height` directly on the parent node (not only `style`). Without them, the child clamping math treats the parent as 0×0.
