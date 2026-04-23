# Dark Mode

Toggle between `light`, `dark`, and `system` color modes. Adds `.dark` class to the root, which the default stylesheet handles via CSS variables.

<ExampleFrame slug="dark" />

```vue
<script setup lang="ts">
import { ref } from 'vue';
const mode = ref<'light' | 'dark' | 'system'>('dark');
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" :color-mode="mode">
    <Panel position="top-right">
      <select v-model="mode">
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="system">system</option>
      </select>
    </Panel>
  </VueFlow>
</template>
```

`system` subscribes to `prefers-color-scheme: dark` and updates on change. To customize the theme, override CSS variables scoped to `.vue-flow.dark`:

```css
.vue-flow.dark {
  --xy-node-color-default: #f8f8f8;
  --xy-handle-background-color-default: #fff;
}
```
