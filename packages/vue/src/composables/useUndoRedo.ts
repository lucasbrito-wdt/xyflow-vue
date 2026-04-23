import { ref, watch, onMounted, onBeforeUnmount, type Ref } from 'vue';
import { useStore } from '../store/context';
import type { VueFlowStore } from '../store/types';
import type { Node } from '../types/nodes';
import type { Edge } from '../types/edges';

type Snapshot<N, E> = { nodes: N[]; edges: E[] };

export type UseUndoRedoOptions = {
  /** Max history entries to keep (default 100). */
  max?: number;
  /** Milliseconds of inactivity before committing a snapshot (default 300). Prevents per-drag-frame flooding. */
  debounce?: number;
  /** Wire Ctrl/Cmd+Z for undo and Ctrl/Cmd+Shift+Z / Ctrl+Y for redo. Default true. */
  enableShortcuts?: boolean;
  /** Inject a store explicitly when calling outside of a `<VueFlow>` subtree. */
  store?: VueFlowStore;
};

export type UseUndoRedoReturn<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge
> = {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  canUndo: Ref<boolean>;
  canRedo: Ref<boolean>;
  /** Take a snapshot immediately (skips debounce). Use before/after imperative edits. */
  snapshot: () => void;
  past: Ref<Snapshot<NodeType, EdgeType>[]>;
  future: Ref<Snapshot<NodeType, EdgeType>[]>;
};

/**
 * Undo/redo via shallow snapshots of `nodes` + `edges`.
 * Debounced so dragging doesn't explode the history stack.
 */
export function useUndoRedo<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge
>(options: UseUndoRedoOptions = {}): UseUndoRedoReturn<NodeType, EdgeType> {
  const store = (options.store ?? useStore()) as any;
  const max = options.max ?? 100;
  const debounce = options.debounce ?? 300;
  const wireShortcuts = options.enableShortcuts !== false;

  const past = ref<Snapshot<NodeType, EdgeType>[]>([]) as Ref<Snapshot<NodeType, EdgeType>[]>;
  const future = ref<Snapshot<NodeType, EdgeType>[]>([]) as Ref<Snapshot<NodeType, EdgeType>[]>;
  const canUndo = ref(false);
  const canRedo = ref(false);
  let applying = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const cloneCurrent = (): Snapshot<NodeType, EdgeType> => ({
    nodes: (store.nodes.value as NodeType[]).map((n: any) => ({ ...n })),
    edges: (store.edges.value as EdgeType[]).map((e: any) => ({ ...e })),
  });

  const refreshFlags = () => {
    canUndo.value = past.value.length > 0;
    canRedo.value = future.value.length > 0;
  };

  const snapshot = () => {
    if (applying) return;
    if (timer) clearTimeout(timer);
    past.value.push(cloneCurrent());
    if (past.value.length > max) past.value.shift();
    future.value = [];
    refreshFlags();
  };

  const queueSnapshot = () => {
    if (applying) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      past.value.push(cloneCurrent());
      if (past.value.length > max) past.value.shift();
      future.value = [];
      refreshFlags();
      timer = null;
    }, debounce);
  };

  const apply = (snap: Snapshot<NodeType, EdgeType>) => {
    applying = true;
    // cancel any pending debounced snapshot that was queued just before apply()
    if (timer) { clearTimeout(timer); timer = null; }
    try {
      store.setNodes(snap.nodes);
      store.setEdges(snap.edges);
    } finally {
      // with flush: 'sync' on the watcher, it has already run synchronously
      // inside setNodes/setEdges — safe to release the guard here
      applying = false;
    }
  };

  const undo = () => {
    if (!past.value.length) return;
    future.value.push(cloneCurrent());
    const prev = past.value.pop()!;
    apply(prev);
    refreshFlags();
  };

  const redo = () => {
    if (!future.value.length) return;
    past.value.push(cloneCurrent());
    const next = future.value.pop()!;
    apply(next);
    refreshFlags();
  };

  const clear = () => {
    past.value = [];
    future.value = [];
    refreshFlags();
  };

  // flush: 'sync' — runs synchronously when nodes/edges shallowRef is reassigned,
  // so the `applying` guard in apply() is still truthy and snapshots are skipped.
  watch(
    [() => store.nodes.value, () => store.edges.value],
    () => queueSnapshot(),
    { deep: false, flush: 'sync' }
  );

  // Keyboard shortcuts
  const onKey = (e: KeyboardEvent) => {
    if (!wireShortcuts) return;
    const t = e.target as HTMLElement | null;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;

    const meta = e.ctrlKey || e.metaKey;
    if (!meta) return;
    const key = e.key.toLowerCase();

    if (key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if ((key === 'z' && e.shiftKey) || key === 'y') {
      e.preventDefault();
      redo();
    }
  };

  onMounted(() => window.addEventListener('keydown', onKey));
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey));

  return { undo, redo, clear, snapshot, canUndo, canRedo, past, future };
}
