# Examples Backlog

Parity target: [reactflow.dev/examples](https://reactflow.dev/examples) — ~70 examples.

**Shipped: 24** · **Remaining: ~46**

Live demos: `pnpm dev` → http://localhost:5173. Docs pages with live iframe: `pnpm docs:dev` → http://localhost:5174/examples/.

---

## Nodes

| Example | Status | Notes |
|---|---|---|
| Add Node On Edge Drop | ✅ | `/examples/add-on-drop` |
| Connection Limit | ✅ | `/examples/connection-limit` — uses `useNodeConnections` |
| Custom Nodes | ✅ | `/examples/custom` |
| Delete Middle Node | ✅ | `/examples/delete-middle` |
| Node Resizer | ✅ | `/examples/node-resizer` |
| Node Toolbar | ✅ | `/examples/node-toolbar` |
| Stress Test | ✅ | `/examples/stress` — 500 nodes |
| Updating Nodes | ✅ | `/examples/updating` |
| Drag Handle | ⏳ S | `node.dragHandle` selector — 30 min |
| Easy Connect | ⏳ S | full-node Handle overlay — 45 min |
| Intersections | ⏳ M | `getNodesBounds` + AABB — 1-2h |
| Proximity Connect | ⏳ M | distance + auto-edge on drag — 2h |
| Rotatable Node | ⏳ S | CSS transform + custom resizer — 1h |
| Node Position Animation | ⏳ M | spring via @vueuse/motion — 2h |
| Shapes | ⏳ S | 5-6 SVG custom node shapes — 1h |

## Edges

| Example | Status | Notes |
|---|---|---|
| Edge Types | ✅ | `/examples/edge-types` |
| Edge Markers | ✅ | `/examples/edge-markers` |
| Floating Edges | ✅ | `/examples/floating-edges` |
| Editable Edge | ✅ | `/examples/editable-edge` — draggable control points |
| Animating Edges | ⏳ S | CSS `stroke-dasharray` — 30 min |
| Connection Line | ⏳ S | `<ConnectionLine>` customization — 30 min |
| Custom Edges | ⏳ S | covered in `/guide/custom-edges` — formal example: 30 min |
| Delete Edge on Drop | ⏳ M | edge reconnect + cleanup — 2h |
| Edge Label Renderer | ⏳ S | `<EdgeLabel>` usage — 30 min |
| Edge Intersection | ⏳ M | AABB during drag — 2h |
| Edge Toolbar | ⏳ S | `<EdgeToolbar>` — 30 min |
| Multi Connection Line | ⏳ L | multi-select connect — 3-4h |
| Reconnect Edge | ⏳ M | `<EdgeReconnectAnchor>` live wiring — 2h |
| Simple Floating Edges | ⏳ M | simplified float — 1-2h |
| Temporary Edges | ⏳ M | ghost nodes + cleanup — 2-3h |

## Interaction

| Example | Status | Notes |
|---|---|---|
| Context Menu | ✅ | `/examples/context-menu` |
| Drag and Drop | ✅ | `/examples/dnd` |
| Preventing Cycles | ✅ | `/examples/cycles` — DFS |
| Save and Restore | ✅ | `/examples/save-restore` — `toObject()` + localStorage |
| Undo and Redo | ✅ | `/examples/undo-redo` — `useUndoRedo` composable |
| Validation | ✅ | `/examples/validation` — `isValidConnection` |
| Connection Events | ✅ | covered by Events Log (`/examples/events`) |
| Copy and Paste | ✅ | built into `useKeyboardShortcuts` (Ctrl+C/X/V) |
| Computing Flows | ⏳ M | topological evaluation — 2-3h |
| Contextual Zoom | ⏳ S | `useViewport` + conditional render — 1h |
| Touch Device | ⏳ S | handle size + tap-to-connect — 1-2h |
| Helper Lines | ⏳ L | snap guides — 4-6h |
| Collaborative | ⏳ XL | yjs + y-webrtc — 1-2d |

## Subflows & Grouping

| Example | Status | Notes |
|---|---|---|
| Sub Flow | ✅ | `/examples/subflow` |
| Selection Grouping | ⏳ M | dynamic group from selection — 2-3h |
| Parent Child Relation | ⏳ M | drag in/out of parent + expandParent — 3-4h |

## Layout

| Example | Status | Lib | Notes |
|---|---|---|---|
| Horizontal Flow | ✅ | — | `/examples/horizontal` |
| Dagre Tree | ✅ | `@dagrejs/dagre` | `/examples/dagre` — TB/LR toggle |
| Elkjs Tree | ⏳ M | `elkjs` | same pattern as dagre |
| Elkjs Multiple Handles | ⏳ M | `elkjs` | |
| Expand and Collapse | ⏳ M | `@dagrejs/dagre` | |
| Auto Layout | ⏳ M | dagre/d3-hierarchy/elkjs | showcase multiple engines |
| Force Layout | ⏳ M | `d3-force` | |
| Dynamic Layouting | ⏳ L | `elkjs` | placeholder-driven self-organizing graph |
| Node Collisions | ⏳ M | `d3-force` | |

## Styling

| Example | Status | Notes |
|---|---|---|
| Dark Mode | ✅ | `/examples/dark` — light/dark/system |
| Base Style | ⏳ S | import `base.css` — 10 min |
| Tailwind | ⏳ S | Tailwind CDN + theme — 1h |
| Turbo Flow | ⏳ M | gradient border animation — 2-3h |

## Whiteboard

Large surface area. Probably belongs in a future `xyflow-vue-whiteboard` sibling package.

| Example | Complexity |
|---|---|
| Eraser Tool | ⏳ L (~1d) |
| Lasso Selection | ⏳ M (~3-4h) |
| Rectangle drawing | ⏳ M |
| Freehand Draw | ⏳ L |

## Misc

| Example | External dep |
|---|---|
| Download Image | `html-to-image` |
| Server Side Image Creation | Puppeteer (Node script, not Vue) |

---

## Other deferred work (not examples)

- **Playwright E2E tests** — port `tests/playwright` fixtures from svelte-flow. ~2-3d. High ROI for CI confidence.
- **Reconnect UX polish** — `<EdgeReconnectAnchor>` shell exists; wire the live pointerdown→XYHandle reconnect flow. ~1d.
- **Nuxt module** — `@xyflow/nuxt` wrapper with auto-imports + SSR defaults. ~1d.
- **Tree-shake audit** — verify unused plugins (MiniMap, NodeResizer) actually get dropped in a real app bundle. ~2h.

---

## Suggested next batch (high value / low effort)

Ordered by ROI for typical users:

1. **Edge Label Renderer** (S) — missing UI primitive, used constantly
2. **Edge Toolbar** (S) — rounds out the toolbar story next to NodeToolbar
3. **Drag Handle** (S) — common feature request, trivial via `node.dragHandle`
4. **Connection Line** (S) — custom preview line during drag
5. **Animating Edges** (S) — cheap visual polish, ~5 lines of CSS
6. **Reconnect Edge** (M) — user-facing feature parity gap
7. **Tailwind** (S) — highest-asked integration
8. **Elkjs Tree** (M) — Dagre alternative with richer constraints
9. **Helper Lines** (L) — frequent ask from design-tool users
10. **Playwright tests** (XL) — unblocks contributions & refactors
