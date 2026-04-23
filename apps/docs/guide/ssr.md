# Nuxt / SSR

Vue Flow is **SSR-safe** in terms of no crashes — all `window`/`document`/`ResizeObserver` access is guarded inside `onMounted`. But it doesn't make sense to *render* a flow on the server (you'd ship HTML with zero interactivity and huge hydration). Always client-render.

## Nuxt 3 / 4

```vue
<!-- pages/index.vue -->
<template>
  <ClientOnly>
    <VueFlow :nodes="nodes" :edges="edges" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VueFlow, type Node, type Edge } from 'xyflow-vue';
import 'xyflow-vue/dist/style.css';

const nodes = ref<Node[]>([...]);
const edges = ref<Edge[]>([...]);
</script>
```

## Nitro / build config

Exclude from SSR bundling if you hit any build issues:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  build: {
    transpile: ['xyflow-vue', '@xyflow/system'],
  },
  ssr: true,
});
```

## Prerendering routes

If you prerender a page with VueFlow, wrap in `<ClientOnly>` and provide a fallback:

```vue
<ClientOnly>
  <VueFlow ... />
  <template #fallback>
    <div class="skeleton">Loading flow...</div>
  </template>
</ClientOnly>
```

## Vite SSR (custom)

Same pattern — defer mounting with `<Suspense>` or a dynamic import guarded by `import.meta.env.SSR === false`.
