# Undo / Redo

Wire undo-redo with a single composable. Snapshots are debounced (default 300ms) so dragging doesn't explode the history stack. Binds `Ctrl/Cmd+Z` and `Ctrl/Cmd+Shift+Z` / `Ctrl+Y` by default.

<ExampleFrame slug="undoRedo" />

```ts
import { useUndoRedo } from 'xyflow-vue';

const { undo, redo, clear, canUndo, canRedo, snapshot } = useUndoRedo({
  max: 100,          // history cap
  debounce: 300,     // ms of inactivity before committing a snapshot
  enableShortcuts: true,
});
```

- `snapshot()` — commit immediately (skip debounce). Call before imperative edits you want isolated on the stack.
- `clear()` — wipe past + future.
- `canUndo` / `canRedo` — `Ref<boolean>` you can bind to button `:disabled`.

> Must be called inside `<VueFlow>` or `<VueFlowProvider>`. Pass `{ store }` to inject it manually if needed.
