# Add Node On Edge Drop

When the user drops a connection line on empty pane, create a new node at that position and connect it. Uses `@connect-start` to remember the source and `@connect-end` to spawn.

<ExampleFrame slug="addOnDrop" />

```ts
const lastSource = ref<string | null>(null);

function onConnectStart(_ev, { nodeId }) {
  lastSource.value = nodeId;
}

function onConnectEnd(ev: MouseEvent | TouchEvent) {
  const target = ev.target as HTMLElement | null;
  if (!target?.classList.contains('vue-flow__pane')) return;

  const cx = (ev as MouseEvent).clientX ?? (ev as TouchEvent).changedTouches[0].clientX;
  const cy = (ev as MouseEvent).clientY ?? (ev as TouchEvent).changedTouches[0].clientY;
  const pos = flow.screenToFlowPosition({ x: cx, y: cy });

  const id = crypto.randomUUID();
  nodes.value.push({ id, data: { label: id.slice(0, 5) }, position: pos });
  if (lastSource.value) {
    edges.value.push({ id: `e-${lastSource.value}-${id}`, source: lastSource.value, target: id });
  }
}
```
