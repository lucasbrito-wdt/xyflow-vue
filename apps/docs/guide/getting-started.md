# Installation

## Requirements

- Vue **3.5+**
- A bundler with SFC support: **Vite**, Rollup + `@vitejs/plugin-vue`, or `vite-plugin-vue` in Nuxt

## Install

::: code-group
```bash [pnpm]
pnpm add xyflow-vue
```
```bash [npm]
npm install xyflow-vue
```
```bash [yarn]
yarn add xyflow-vue
```
:::

## Import styles

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import 'xyflow-vue/dist/style.css'; // default theme
// or 'xyflow-vue/dist/base.css' for unstyled

createApp(App).mount('#app');
```

## Minimal flow

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, Background, type Node, type Edge } from 'xyflow-vue';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', data: { label: 'Input' }, position: { x: 250, y: 25 } },
  { id: '2', data: { label: 'Default' }, position: { x: 100, y: 125 } },
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
]);
</script>

<template>
  <div style="width: 100vw; height: 100vh">
    <VueFlow :nodes="nodes" :edges="edges" fit-view>
      <Background variant="dots" />
    </VueFlow>
  </div>
</template>
```

That's it. The container **must have explicit dimensions** (width/height) — `<VueFlow>` uses a `ResizeObserver` to read from its bounding box.

## Troubleshooting

**"Maximum call stack size exceeded" when using `defineProps<NodeProps>()`**
The generic types in `@xyflow/system` have cross-references that trip Vue's SFC type resolver. Declare props inline:

```ts
defineProps<{
  id: string;
  data: { label: string };
  selected?: boolean;
}>();
```

**Nothing renders, console silent**
Check that the parent of `<VueFlow>` has `width` and `height` set. VueFlow is `position: absolute; inset: 0` internally and needs a positioned parent with dimensions.

**Works on dev but crashes on Nuxt SSR**
Wrap in `<ClientOnly>`. VueFlow uses `ResizeObserver` and `window.matchMedia` which don't exist in Node — all gated behind `onMounted`, but the component tree still tries to hydrate on the server.

Next: **[Your first flow →](./first-flow)**
