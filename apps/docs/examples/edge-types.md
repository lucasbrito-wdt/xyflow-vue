# Edge Types

Four built-in edge types ship out of the box: `default` (bezier), `straight`, `step`, `smoothstep`. Set `type` on any edge to switch.

<ExampleFrame slug="types" />

```ts
const edges: Edge[] = [
  { id: '1', source: 'a1', target: 'b1' },                      // default (bezier)
  { id: '2', source: 'a2', target: 'b2', type: 'straight' },
  { id: '3', source: 'a3', target: 'b3', type: 'step' },
  { id: '4', source: 'a4', target: 'b4', type: 'smoothstep' },
];
```

Each maps to a component: `<BezierEdge>`, `<StraightEdge>`, `<StepEdge>`, `<SmoothStepEdge>` (all exported for direct use in custom edges). See [Custom edges](../guide/custom-edges) to build your own.
