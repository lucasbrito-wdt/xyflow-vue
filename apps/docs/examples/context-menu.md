# Context Menu

Show a contextual menu on right-click using the `@node-context-menu` event. Close it on `@pane-click`.

<ExampleFrame slug="ctxMenu" />

```vue
<script setup lang="ts">
const menu = ref<{ x: number; y: number; nodeId: string } | null>(null);

function onNodeCtx(event: MouseEvent, node: Node) {
  event.preventDefault();
  menu.value = { x: event.clientX, y: event.clientY, nodeId: node.id };
}
</script>

<template>
  <VueFlow @node-context-menu="onNodeCtx" @pane-click="menu = null" ... />
  <div v-if="menu" :style="{ position: 'fixed', top: menu.y + 'px', left: menu.x + 'px' }">
    <!-- menu items -->
  </div>
</template>
```

For edges/selections use the analogous `@edge-context-menu` and `@selection-context-menu`.
