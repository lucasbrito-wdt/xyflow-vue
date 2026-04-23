# Validation

Gate new connections with `isValidConnection`. The function receives a `Connection` and returns `boolean`. Rejected connections are visually indicated (no green "valid" state) and `@connect` is never fired.

<ExampleFrame slug="validation" />

```ts
import { type Connection } from 'xyflow-vue';

// Only allow A → B
const isValidConnection = (c: Connection) => c.source === 'a' && c.target === 'b';
```

```vue
<VueFlow :is-valid-connection="isValidConnection" @connect="onConnect" />
```

Per-handle: pass `isValidConnection` on a specific `<Handle>` to override just that anchor. Useful for "max connections" or type-based matching.
