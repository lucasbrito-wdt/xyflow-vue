# xyflow-vue — Port Plan

Este documento mapeia **cada arquivo do `@xyflow/svelte` para seu equivalente Vue**, com status. A referência é `packages/svelte` porque é o port mais próximo filosoficamente de Vue (reatividade fina, stores, actions/directives).

Convenções:
- `*.svelte` (componente) → `*.vue` (SFC)
- `*.svelte.ts` (runes $state/$derived) → `*.ts` (composables com `ref`/`reactive`/`computed`)
- Actions Svelte (`use:foo`) → **Directives Vue** (`v-foo`) ou composables dentro de `onMounted`
- Provider / context Svelte → `provide`/`inject` Vue com `InjectionKey` tipado
- Stores custom Svelte → `ref`/`shallowRef`/`computed` + objeto retornado por factory

## Legenda de status
- ✅ feito (esqueleto funcional)
- 🟡 parcial (stub / sem paridade total)
- ❌ pendente
- ⛔ N/A (não porta — específico do svelte)

---

## 1. Infra / scaffolding

| Svelte | Vue | Status |
|---|---|---|
| `package.json` (svelte-package) | `package.json` (vite lib + vue-tsc) | ✅ |
| `tsconfig.json` | `tsconfig.json` (@vue/tsconfig) | ✅ |
| `svelte.config.js` | `vite.config.ts` | ✅ |
| `src/styles/base.css` | `src/styles/base.css` | ✅ |
| `src/styles/style.css` | `src/styles/style.css` | ✅ |
| postcss-rename (`.svelte-flow__` ← `.xy-`) | idem, trocar para `.vue-flow__` | ❌ (ajustar `tooling/postcss-config`) |

## 2. Store & tipos

| Svelte | Vue | Status |
|---|---|---|
| `store/initial-store.svelte.ts` | `store/index.ts` (`createStore`) | 🟡 — falta: selectedNodes/Edges derivados, visibleNodes por zIndex, connectionLookup sync completo, fitView queue, persistência de dimensões, parent resolution em cascata |
| `store/visibleElements.ts` | `store/visibleElements.ts` | ❌ |
| `store/context.ts` | `store/context.ts` | ✅ |
| `store/types.ts` | `store/types.ts` | ✅ |
| `store/index.ts` | `store/index.ts` | ✅ |
| `types/nodes.ts` | `types/nodes.ts` | ✅ |
| `types/edges.ts` | `types/edges.ts` | ✅ |
| `types/general.ts` | `types/general.ts` | ✅ |
| `types/events.ts` | `types/events.ts` | ✅ |
| `types/index.ts` | `types/index.ts` | ✅ |

## 3. Container / core

| Svelte | Vue | Status |
|---|---|---|
| `container/SvelteFlow/SvelteFlow.svelte` | `container/VueFlow/VueFlow.vue` | 🟡 — falta: keyboard, selection box, panOnScroll, zoomOnPinch props, ariaDescriptions, color mode, transformation origin, error handling wiring |
| `container/SvelteFlow/types.ts` | (em `store/types.ts`) | ✅ |
| `container/Panel/Panel.svelte` | `container/Panel/Panel.vue` | ❌ |
| `components/Viewport` (implícito) | `components/Viewport/Viewport.vue` | ✅ |

## 4. Componentes

| Svelte | Vue | Status |
|---|---|---|
| `components/NodeWrapper/NodeWrapper.svelte` | `components/NodeWrapper/NodeWrapper.vue` | 🟡 — sem drag, sem click/select, sem context menu, sem a11y, sem parent/subflow positioning |
| `components/EdgeWrapper/EdgeWrapper.svelte` | `components/EdgeWrapper/EdgeWrapper.vue` | 🟡 — sem reconnect, sem click/select, sem label, sem interaction width handlers |
| `components/Handle/Handle.svelte` | `components/Handle/Handle.vue` | 🟡 — sem XYHandle (pointerdown → connection flow) |
| `components/ConnectionLine/ConnectionLine.svelte` | `components/ConnectionLine/ConnectionLine.vue` | ❌ |
| `components/Selection/Selection.svelte` | `components/Selection/Selection.vue` | ❌ |
| `components/A11yDescriptions/A11yDescriptions.svelte` | `components/A11yDescriptions/A11yDescriptions.vue` | ❌ |
| `components/ViewportPortal/*` | `components/ViewportPortal/ViewportPortal.vue` (usar `<Teleport>`) | ❌ |
| `components/SvelteFlowProvider/*` | `components/VueFlowProvider/VueFlowProvider.vue` | ❌ |
| `components/EdgeLabel/*` | `components/EdgeLabel/EdgeLabel.vue` | ❌ |
| `components/EdgeReconnectAnchor/*` | `components/EdgeReconnectAnchor/EdgeReconnectAnchor.vue` | ❌ |
| `components/Attribution/*` | `components/Attribution/Attribution.vue` | ❌ |
| `components/NodeRenderer` (implícito) | `components/NodeRenderer/NodeRenderer.vue` | ✅ |
| `components/EdgeRenderer` (implícito) | `components/EdgeRenderer/EdgeRenderer.vue` | 🟡 — falta: z-index sorting, edge updater, edge selection markers |

### Nodes built-in
| Svelte | Vue | Status |
|---|---|---|
| `components/nodes/DefaultNode.svelte` | `components/nodes/DefaultNode.vue` | ✅ |
| `components/nodes/InputNode.svelte` | `components/nodes/InputNode.vue` | ✅ |
| `components/nodes/OutputNode.svelte` | `components/nodes/OutputNode.vue` | ✅ |
| `components/nodes/GroupNode.svelte` | `components/nodes/GroupNode.vue` | ✅ |

### Edges built-in
| Svelte | Vue | Status |
|---|---|---|
| `components/edges/BaseEdge.svelte` | `components/edges/BaseEdge.vue` | ✅ |
| `components/edges/BezierEdge.svelte` | `components/edges/BezierEdge.vue` | ✅ |
| `components/edges/StraightEdge.svelte` | `components/edges/StraightEdge.vue` | ✅ |
| `components/edges/SmoothStepEdge.svelte` | `components/edges/SmoothStepEdge.vue` | ✅ |
| `components/edges/StepEdge.svelte` | `components/edges/StepEdge.vue` | ✅ |
| `components/edges/BezierEdgeInternal` etc. | (substituídos pelo EdgeWrapper mapping) | 🟡 |

## 5. Actions → Directives / Composables

| Svelte | Vue | Status |
|---|---|---|
| `actions/drag/index.ts` (XYDrag wrapper) | `directives/drag.ts` ou `composables/useDrag.ts` | ❌ |
| `actions/zoom/index.ts` (XYPanZoom wrapper) | `composables/usePanZoom.ts` | ✅ |
| `actions/portal/portal.svelte.ts` | `components/ViewportPortal/ViewportPortal.vue` (`<Teleport>`) | ❌ |

## 6. Hooks → Composables

| Svelte | Vue | Status |
|---|---|---|
| `hooks/useSvelteFlow.svelte.ts` | `composables/useVueFlow.ts` | 🟡 — falta: setCenter, fitBounds, toObject, updateNode, updateEdge, updateNodeData, getHandleConnections, getNodesBounds com nodeOrigin, screenToFlow usando domNode rect |
| `hooks/useUpdateNodeInternals.svelte.ts` | `composables/useUpdateNodeInternals.ts` | ❌ |
| `hooks/useOnSelectionChange.svelte.ts` | `composables/useOnSelectionChange.ts` | ❌ |
| `hooks/useStore.ts` | `store/context.ts::useStore` | ✅ |
| `hooks/useInitialized.svelte.ts` | `composables/useInitialized.ts` | ❌ |
| `hooks/useConnection.svelte.ts` | `composables/useConnection.ts` | ❌ |
| `hooks/useNodesEdgesViewport.svelte.ts` | `composables/useNodesEdgesViewport.ts` | ❌ |
| `hooks/useInternalNode.svelte.ts` | `composables/useInternalNode.ts` | ❌ |
| `hooks/useNodeConnections.svelte.ts` | `composables/useNodeConnections.ts` | ❌ |
| `hooks/useColorMode.svelte.ts` | `composables/useColorMode.ts` | ❌ |
| `hooks/useNodesData.svelte.ts` | `composables/useNodesData.ts` | ❌ |

## 7. Plugins

| Svelte | Vue | Status |
|---|---|---|
| `plugins/Background/*` (Background, DotPattern, LinePattern) | `plugins/Background/Background.vue` (unificado) | ✅ |
| `plugins/Controls/*` (Controls + ControlButton) | `plugins/Controls/Controls.vue` + `ControlButton.vue` | ❌ |
| `plugins/Minimap/*` (Minimap, MinimapNode, interactive) | `plugins/Minimap/*` | ❌ |
| `plugins/NodeToolbar/*` | `plugins/NodeToolbar/NodeToolbar.vue` (`<Teleport>`) | ❌ |
| `plugins/EdgeToolbar/*` | `plugins/EdgeToolbar/EdgeToolbar.vue` (`<Teleport>`) | ❌ |
| `plugins/NodeResizer/*` (NodeResizer + ResizeControl) | `plugins/NodeResizer/*` (wrapper sobre XYResizer do @xyflow/system) | ❌ |

## 8. Utils

| Svelte | Vue | Status |
|---|---|---|
| `utils/index.ts` | `utils/index.ts` | ❌ (a maioria é re-export de `@xyflow/system`, já feito no index.ts) |

## 9. Eventos / props ✅

Todos emits do svelte/react implementados: `nodesChange`, `edgesChange`, `connect`, `connectStart`, `connectEnd`, `paneClick`, `paneContextMenu`, `paneMouseEnter/Move/Leave`, `move`/`moveStart`/`moveEnd`, `nodeClick`/`nodeDoubleClick`/`nodeContextMenu`/`nodeMouseEnter/Move/Leave`/`nodeDragStart`/`nodeDrag`/`nodeDragStop`, `edgeClick`/`edgeDoubleClick`/`edgeContextMenu`/`edgeMouseEnter/Move/Leave`, `selectionDragStart`/`selectionDrag`/`selectionDragStop`/`selectionContextMenu`/`selectionStart`/`selectionEnd`/`selectionChange`, `init`, `error`.

## 10. Tests

| Svelte | Vue | Status |
|---|---|---|
| `tests/playwright/tests/*` svelte fixtures | portar fixtures para Vue no mesmo runner | ❌ |

## 11. Exemplos

Criar `examples/vue` (Vite + Vue 3) espelhando `examples/svelte` (fluxos de demo: overview, hierarchical-tree, drag-and-drop, etc.).

---

## Prioridade sugerida (roadmap incremental)

**Milestone 0 — compila e renderiza:**
✅ Scaffolding, store minimal, VueFlow, pan/zoom, render de nós e arestas, Background.

**Milestone 1 — interação básica:**
1. ✅ Node drag (`useDrag` via XYDrag)
2. 🟡 Node/edge selection (click básico ✅, selection box ❌, keyboard ❌)
3. ✅ Connection flow (Handle + XYHandle + ConnectionLine)
4. ✅ `applyNodeChanges` / `applyEdgeChanges` utils
5. 🟡 Emits principais (connect, paneClick, nodeClick, edgeClick) ✅ — falta: move*, nodeDrag*, selectionChange, nodeMouseEnter/Leave, edge events completos

**Milestone 2 — paridade de plugins:**
6. ✅ Controls, ✅ MiniMap, ✅ NodeToolbar, ✅ EdgeToolbar
7. ✅ NodeResizer (wrapper de XYResizer)
8. ✅ ViewportPortal, ✅ VueFlowProvider
9. ✅ EdgeLabel, 🟡 EdgeReconnectAnchor (shell sem wiring)
10. ✅ Panel, ✅ Attribution

**Milestone 3 — features avançadas:**
11. ✅ Keyboard shortcuts (Delete, Ctrl+A, Ctrl+C, Ctrl+X, Ctrl+V, Escape, Shift multi-select)
12. ✅ Selection box (shift+drag retangular)
13. 🟡 Subflows (adoptUserNodes já faz parent-child positioning; falta containment drag)
14. ✅ ColorMode (light/dark/system)
15. 🟡 A11yDescriptions (shell básico; falta aria-live, keyboard nav entre nodes)
16. ✅ Edge reconnect (EdgeReconnectAnchor com XYHandle)
17. ✅ Composables: useInternalNode, useUpdateNodeInternals, useConnection, useInitialized, useNodes/useEdges/useViewport, useNodesData, useNodeConnections, useColorMode, useOnSelectionChange

**Milestone 4 — polish (1-2 semanas):**
17. Todos os composables auxiliares (useNodesData, useNodeConnections, etc.)
18. Playwright tests portados
19. Docs + exemplos
20. SSR (Nuxt) — evitar `window` em setup, lazy-mount pan/zoom

## Pontos de atenção técnicos

1. **Reatividade**: `nodes`/`edges` estão em `shallowRef` para evitar Vue proxying cada nó (crucial em grafos >500 nós). Quando atualizar, sempre substituir o array (`setNodes([...])`), não mutar.
2. **Generics em SFC**: `<script setup lang="ts" generic="T extends Node">` exige Vue 3.3+. OK.
3. **Svelte 5 `$state` profundo** vs **Vue shallow**: o port Svelte usa reatividade profunda via runes. No Vue, optamos por shallow + updates imutáveis — idêntico ao padrão do React Flow. Pode haver divergência sutil de comportamento em edge cases de mutação direta que o svelte tolera.
4. **XYHandle / XYDrag**: são classes stateful do `@xyflow/system` que esperam callbacks. No Vue, guardar instância em variável local do `setup()` e destruir em `onBeforeUnmount`.
5. **postcss-rename**: o pipeline de CSS troca prefixo `.xy-` para `.svelte-flow__`/`.react-flow__` via config em `tooling/postcss-config`. Adicionar mapeamento para `.vue-flow__`.
6. **Teleport** substitui o portal action do Svelte para NodeToolbar/EdgeToolbar.
