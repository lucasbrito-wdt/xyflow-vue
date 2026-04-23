# Dagre Tree Layout

Auto-layout with [`@dagrejs/dagre`](https://github.com/dagrejs/dagre). A small function reads node dimensions, feeds them to dagre, and writes back positions. Toggle direction with one click.

<ExampleFrame slug="dagre" />

```bash
pnpm add @dagrejs/dagre
```

```ts
import dagre from '@dagrejs/dagre';
import { Position, type Node, type Edge } from 'xyflow-vue';

function layout(nodes: Node[], edges: Edge[], direction: 'TB' | 'LR' = 'TB'): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, nodesep: 40, ranksep: 60 });

  for (const n of nodes) g.setNode(n.id, { width: 172, height: 36 });
  for (const e of edges) g.setEdge(e.source, e.target);

  dagre.layout(g);

  const isH = direction === 'LR';
  return nodes.map((n) => {
    const pos = g.node(n.id);
    return {
      ...n,
      targetPosition: isH ? Position.Left : Position.Top,
      sourcePosition: isH ? Position.Right : Position.Bottom,
      position: { x: pos.x - 86, y: pos.y - 18 },
    };
  });
}
```

For bigger/more-flexible layouts use [`elkjs`](https://github.com/kieler/elkjs) — same pattern, just read back positions and `sourcePosition`/`targetPosition`.
