# Edge Markers

Add arrowheads or custom SVG markers to edge start/end points. Use the `MarkerType` enum for built-in shapes.

<ExampleFrame slug="markers" />

```ts
import { MarkerType } from 'xyflow-vue';

const edges = [
  { id: 'a', source: '1', target: '2',
    markerEnd: { type: MarkerType.Arrow } },

  { id: 'b', source: '1', target: '3',
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff6b6b' },
    style: { stroke: '#ff6b6b' } },

  { id: 'c', source: '1', target: '4',
    markerStart: { type: MarkerType.ArrowClosed },
    markerEnd: { type: MarkerType.ArrowClosed } },
];
```

Marker props: `type`, `color`, `width`, `height`, `markerUnits`, `orient`, `strokeWidth`.
