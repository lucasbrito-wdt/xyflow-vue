# Custom nodes

Any Vue component can be a node. You just need:
1. Declare the props you care about (avoid `NodeProps` generic — see below)
2. Render at least one `<Handle>` if you want connections
3. Register it in `nodeTypes`

## Example

```vue
<!-- MyNode.vue -->
<script setup lang="ts">
import { Handle, Position } from '@xyflow/vue';

defineProps<{
  id: string;
  data: { label: string; color: string };
  selected?: boolean;
}>();
</script>

<template>
  <div :style="{ background: data.color, padding: 8, border: selected ? '2px solid black' : 'none' }">
    <Handle type="target" :position="Position.Top" />
    {{ data.label }}
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>
```

```vue
<!-- App.vue -->
<script setup lang="ts">
import { markRaw } from 'vue';
import MyNode from './MyNode.vue';

const nodeTypes = { myNode: markRaw(MyNode) };
</script>

<template>
  <VueFlow :node-types="nodeTypes" ... />
</template>
```

**Always `markRaw`** when you stuff a component into a reactive `ref` or a plain object used by Vue. Without it, Vue makes the component reactive (tracking every internal field) which is pointless and slow.

## Why not `defineProps<NodeProps>()`?

`@xyflow/system` has deep type cross-references. Vue's SFC type resolver occasionally hits "Maximum call stack size exceeded" with the full `NodeProps` generic. Inline types are stable and compile faster.

## Accessing the store from inside a node

```ts
import { useVueFlow, useNodeConnections } from '@xyflow/vue';

const flow = useVueFlow();
flow.updateNodeData(props.id, { label: 'renamed' });

const connections = useNodeConnections({ handleType: 'target' });
// connections.value is reactive
```

## Built-in node types (reference)

| Type      | Component   | Handles                 |
|-----------|-------------|--------------------------|
| `input`   | InputNode   | 1 source (bottom)        |
| `output`  | OutputNode  | 1 target (top)           |
| `default` | DefaultNode | 1 target + 1 source      |
| `group`   | GroupNode   | no handles (container)   |

Set `type: 'group'` + `width`/`height` (not just `style`) and children with `parentId` + `extent: 'parent'` for subflows.

Next: **[Custom edges →](./custom-edges)**
