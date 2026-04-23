# Delete Middle Node

Remove a node and reconnect its incomers directly to its outgoers, preserving the flow shape. Uses `getIncomers` / `getOutgoers` from `xyflow-vue`.

<ExampleFrame slug="deleteMiddle" />

```ts
import { getIncomers, getOutgoers } from 'xyflow-vue';

function deleteMiddle() {
  const middle = nodes.value.find((n) => n.id === 'b');
  if (!middle) return;
  const incomers = getIncomers(middle, nodes.value, edges.value);
  const outgoers = getOutgoers(middle, nodes.value, edges.value);

  const bridgeEdges = incomers.flatMap((inc) =>
    outgoers.map((out) => ({ id: `${inc.id}->${out.id}`, source: inc.id, target: out.id }))
  );

  nodes.value = nodes.value.filter((n) => n.id !== 'b');
  edges.value = [
    ...edges.value.filter((e) => e.source !== 'b' && e.target !== 'b'),
    ...bridgeEdges,
  ];
}
```
