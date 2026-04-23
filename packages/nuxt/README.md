# xyflow-vue-nuxt

Nuxt 3/4 module for [`xyflow-vue`](https://github.com/lucasbrito-wdt/xyflow-vue).

- Auto-imports every component (`<VueFlow>`, `<Background>`, `<Controls>`, …)
- Auto-imports every composable (`useVueFlow`, `useNodes`, `useUndoRedo`, …)
- Global CSS injection (opt-out available)
- Nitro-friendly transpile config

## Install

```bash
pnpm add xyflow-vue xyflow-vue-nuxt
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['xyflow-vue-nuxt'],
});
```

That's it. You can now use any xyflow-vue component/composable without importing:

```vue
<template>
  <ClientOnly>
    <VueFlow :nodes="nodes" :edges="edges" fit-view>
      <Background variant="dots" />
      <Controls />
    </VueFlow>
  </ClientOnly>
</template>

<script setup lang="ts">
const nodes = ref([
  { id: '1', type: 'input', data: { label: 'Hello' }, position: { x: 0, y: 0 } },
]);
const edges = ref([]);
</script>
```

> Wrap in `<ClientOnly>` if the page is SSR/SSG — xyflow-vue is internally safe (guards `window`/`ResizeObserver` behind `onMounted`) but rendering the full interactive canvas on the server is wasted HTML.

## Options

```ts
export default defineNuxtConfig({
  modules: ['xyflow-vue-nuxt'],
  xyflowVue: {
    components: true,      // auto-import components (default true)
    composables: true,     // auto-import composables (default true)
    css: true,             // 'base' to use the unstyled base.css, false to skip
    prefix: '',            // e.g. 'Xy' → <XyVueFlow>
  },
});
```

## License

MIT © Lucas Brito
