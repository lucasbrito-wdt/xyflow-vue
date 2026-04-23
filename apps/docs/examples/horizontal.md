# Horizontal Flow

Left-to-right flow by setting `sourcePosition` to `Right` and `targetPosition` to `Left` on every node.

<ExampleFrame slug="horizontal" />

```ts
import { Position } from '@xyflow/vue';

const nodes = [
  { id: '1', type: 'input', data: { label: 'Input' }, position: { x: 0, y: 100 },
    sourcePosition: Position.Right },
  { id: '2', data: { label: 'Step 1' }, position: { x: 200, y: 100 },
    sourcePosition: Position.Right, targetPosition: Position.Left },
  { id: '3', data: { label: 'Step 2' }, position: { x: 400, y: 100 },
    sourcePosition: Position.Right, targetPosition: Position.Left },
  { id: '4', type: 'output', data: { label: 'Output' }, position: { x: 600, y: 100 },
    targetPosition: Position.Left },
];
```

For automatic layouting — columns, rows, trees — use an external engine like `@dagrejs/dagre` or `elkjs`. See the `EXAMPLES_BACKLOG.md` for planned integrations.
