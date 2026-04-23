# Examples Backlog

Parity target: [reactflow.dev/examples](https://reactflow.dev/examples) — ~70 examples.

**Shipped: 20** (in `examples/vue/src/examples/`)
**Remaining: 55**

---

## Nodes (remaining: 10)

| Example | Complexity | Notes |
|---|---|---|
| Add Node On Edge Drop | ✅ shipped | — |
| Connection Limit | ✅ shipped | — |
| Custom Nodes | ✅ shipped | — |
| Delete Middle Node | ✅ shipped | — |
| Drag Handle | S | `node.dragHandle` selector — 30 min |
| Easy Connect | S | full-node Handle overlay — 45 min |
| Intersections | M | `getNodesBounds` + AABB collision — 1-2h |
| Node Resizer | ✅ shipped | — |
| Node Toolbar | ✅ shipped | — |
| Proximity Connect | M | distance calc on drag + auto edge — 2h |
| Rotatable Node | S | CSS transform + custom resizer — 1h |
| Node Position Animation | M | spring animation via @vueuse/motion — 2h |
| Stress Test | ✅ shipped | — |
| Updating Nodes | ✅ shipped | — |
| Shapes | S | 5-6 custom nodes with SVG shapes — 1h |

## Edges (remaining: 13)

| Example | Complexity | Notes |
|---|---|---|
| Animating Edges | S | CSS `stroke-dasharray` animation — 30 min |
| Connection Line | S | `<ConnectionLine>` customization — 30 min |
| Custom Edges | S | already covered in `custom-edges` docs — 30 min |
| Delete Edge on Drop | M | edge reconnect flow integration — 2h |
| Edge Label Renderer | S | `<EdgeLabel>` usage — 30 min |
| Edge Intersection | M | AABB on drag — 2h |
| Edge Toolbar | S | `<EdgeToolbar>` — 30 min |
| Edge Types | ✅ shipped | — |
| Floating Edges | M | custom edge with dynamic handle positions — 2-3h |
| Edge Markers | ✅ shipped | — |
| Multi Connection Line | L | multi-selection connect — 3-4h |
| Reconnect Edge | M | `<EdgeReconnectAnchor>` live wiring — 2h |
| Simple Floating Edges | M | simplified floating — 1-2h |
| Temporary Edges | M | ghost nodes + cleanup — 2-3h |
| Editable Edge | L | draggable control points — 4-6h |

## Interaction (remaining: 10)

| Example | Complexity | Notes |
|---|---|---|
| Computing Flows | M | topological eval — 2-3h |
| Connection Events | ✅ covered by EventsLog | — |
| Context Menu | ✅ shipped | — |
| Contextual Zoom | S | `useViewport` + conditional rendering — 1h |
| Drag and Drop | ✅ shipped | — |
| Preventing Cycles | ✅ shipped | — |
| Save and Restore | ✅ shipped | — |
| Touch Device | S | handle size overrides + tap-to-connect — 1-2h |
| Validation | ✅ shipped | — |
| Helper Lines | L | guide lines + snapping — 4-6h |
| Collaborative | XL | yjs + y-webrtc — 1-2 days |
| Copy and Paste | ✅ built into keyboard | — |
| Undo and Redo | M | command stack via pinia or @vueuse/useUndo — 3-4h |

## Subflows & Grouping (remaining: 2)

| Example | Complexity | Notes |
|---|---|---|
| Selection Grouping | M | dynamic group creation from selection — 2-3h |
| Parent Child Relation | M | drag in/out of parent + expandParent — 3-4h |
| Sub Flow | ✅ shipped | — |

## Layout (remaining: 8)

All of these need external layout libraries. Scaffold them as dedicated examples once we decide on deps.

| Example | Library | Install |
|---|---|---|
| Dagre Tree | `@dagrejs/dagre` | `pnpm add @dagrejs/dagre` |
| Elkjs Tree | `elkjs` | `pnpm add elkjs` |
| Elkjs Multiple Handles | `elkjs` | — |
| Horizontal Flow | ✅ shipped | — |
| Expand and Collapse | `@dagrejs/dagre` | — |
| Auto Layout | `@dagrejs/dagre` or `d3-hierarchy` | — |
| Force Layout | `d3-force` | `pnpm add d3-force` |
| Dynamic Layouting | `elkjs` | — |
| Node Collisions | `d3-force` | — |

## Styling (remaining: 3)

| Example | Complexity | Notes |
|---|---|---|
| Base Style | S | just import `base.css` — 10 min |
| Dark Mode | ✅ shipped | — |
| Tailwind | S | Tailwind CDN + tailwind theme — 1h |
| Turbo Flow | M | fancy gradient border animation — 2-3h |

## Whiteboard (remaining: 4)

Big feature — each is essentially a new mode on top of VueFlow. Probably warrants its own `xyflow-vue-whiteboard` package.

| Example | Complexity |
|---|---|
| Eraser Tool | L (~1 day) |
| Lasso Selection | M (~3-4h) |
| Rectangle drawing | M |
| Freehand Draw | L |

## Misc (remaining: 2)

| Example | External dep |
|---|---|
| Download Image | `html-to-image` |
| Server Side Image Creation | Puppeteer (Node script, not Vue) |

---

## Priority for next batch

If resuming, tackle in this order (highest value-to-effort):

1. **Drag Handle** (S) — common real-world need
2. **Edge Label Renderer** (S) — missing UI building block
3. **Connection Line** (S) — completes connect experience
4. **Animating Edges** (S) — cheap visual polish
5. **Edge Toolbar** (S) — matches NodeToolbar parity
6. **Tailwind** (S) — most-requested integration
7. **Floating Edges** (M) — frequently requested pattern
8. **Computing Flows** (M) — showcases reactive power
9. **Dagre Tree** (M) — top layout integration
10. **Undo and Redo** (M) — common editor feature
