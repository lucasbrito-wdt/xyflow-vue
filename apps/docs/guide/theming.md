# Theming

## Styles import

```ts
import '@xyflow/vue/dist/style.css'; // default, ready to use
// OR
import '@xyflow/vue/dist/base.css';  // minimal, style everything yourself
```

All class names use the `.vue-flow__` prefix. Example:

```css
.vue-flow__node-default { background: lavender; }
.vue-flow__edge-path { stroke: crimson; }
.vue-flow__handle { background: black; }
```

## CSS variables (from `style.css`)

```css
:root {
  --xy-node-border-default: 1px solid #bbb;
  --xy-node-border-selected-default: 1px solid #555;
  --xy-handle-background-color-default: #333;
  --xy-selection-background-color-default: rgba(150, 150, 180, 0.1);
  --xy-connectionline-stroke-default: #b1b1b7;
}
```

Override at any level:

```css
.my-flow {
  --xy-node-border-default: 2px solid teal;
  --xy-handle-background-color-default: teal;
}
```

## Color mode (light/dark/system)

```vue
<VueFlow :color-mode="'dark'" ... />
<VueFlow :color-mode="'system'" ... />
```

Adds `.dark` class on the root. Use in custom styles:

```css
.vue-flow.dark .vue-flow__node-default { background: #222; color: white; }
```

## Per-node styling

```ts
const node = {
  id: '1',
  data: { label: 'Custom' },
  position: { x: 0, y: 0 },
  style: {
    background: '#ff6b6b',
    color: 'white',
    borderRadius: 8,
  },
};
```

`node.style` is applied directly on the node wrapper div.

Next: **[Nuxt / SSR →](./ssr)**
