# Preventing Cycles

Reject connections that would introduce a cycle. Use DFS from the target back toward the source — if reached, it's a cycle.

<ExampleFrame slug="cycles" />

```ts
import { getOutgoers, type Connection } from 'xyflow-vue';

const isValidConnection = (c: Connection) => {
  if (c.source === c.target) return false;
  const visited = new Set<string>();
  const stack = [nodes.value.find((n) => n.id === c.target)!];
  while (stack.length) {
    const n = stack.pop()!;
    if (visited.has(n.id)) continue;
    visited.add(n.id);
    if (n.id === c.source) return false;     // cycle detected
    stack.push(...getOutgoers(n, nodes.value, edges.value));
  }
  return true;
};
```
