# Stress Test

500 nodes wired in a linear chain. The `shallowRef`-based store keeps Vue reactivity tracking out of the per-node path, so pan/zoom stays smooth.

<ExampleFrame slug="stress" />

```ts
const COUNT = 500;
const COLS = 25;

const nodes = ref(
  Array.from({ length: COUNT }, (_, i) => ({
    id: `n${i}`,
    data: { label: `${i}` },
    position: { x: (i % COLS) * 90, y: Math.floor(i / COLS) * 60 },
  }))
);

const edges = ref(
  Array.from({ length: COUNT - 1 }, (_, i) => ({
    id: `e${i}`,
    source: `n${i}`,
    target: `n${i + 1}`,
  }))
);
```

**Perf tips:**
- Always use `ref` (not `reactive`) for nodes/edges arrays — let VueFlow's internal `shallowRef` handle tracking.
- Avoid `v-memo` on individual nodes — the NodeWrapper already memoizes via `shallowRef`.
- Use `MiniMap`'s `pannable` / `zoomable` for navigation instead of pan-through in huge flows.
