import { ref, watch, onMounted, onBeforeUnmount, type Ref } from 'vue';
import { useStore } from '../store/context';
import type { VueFlowStore } from '../store/types';
import type { Node } from '../types/nodes';
import type { Edge } from '../types/edges';

type Snapshot<N, E> = { nodes: N[]; edges: E[] };

export type UseUndoRedoOptions = {
  /** Max history entries to keep (default 100). */
  max?: number;
  /** Milliseconds of inactivity before committing a snapshot (default 300). */
  debounce?: number;
  /** Wire Ctrl/Cmd+Z + Ctrl/Cmd+Shift+Z / Ctrl+Y. Default true. */
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
  snapshot: () => void;
  past: Ref<Snapshot<NodeType, EdgeType>[]>;
  future: Ref<Snapshot<NodeType, EdgeType>[]>;
};

/**
 * Undo/redo via shallow snapshots of `nodes` + `edges`.
 *
 * Keeps `lastCommitted` = the state *before* the newest mutation. After
 * `debounce` ms of quiet, that snapshot is pushed to `past` and refreshed.
 * Undo pops from `past`, moves `lastCommitted` to `future`, and applies.
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

  // Seed with the state at mount — first undo returns here.
  let lastCommitted: Snapshot<NodeType, EdgeType> = cloneCurrent();

  const refreshFlags = () => {
    canUndo.value = past.value.length > 0;
    canRedo.value = future.value.length > 0;
  };

  const commit = () => {
    past.value.push(lastCommitted);
    if (past.value.length > max) past.value.shift();
    future.value = [];
    lastCommitted = cloneCurrent();
    refreshFlags();
  };

  const snapshot = () => {
    if (applying) return;
    if (timer) { clearTimeout(timer); timer = null; }
    commit();
  };

  const queueSnapshot = () => {
    if (applying) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      commit();
      timer = null;
    }, debounce);
  };

  const apply = (snap: Snapshot<NodeType, EdgeType>) => {
    applying = true;
    if (timer) { clearTimeout(timer); timer = null; }
    try {
      store.setNodes(snap.nodes);
      store.setEdges(snap.edges);
    } finally {
      applying = false;
    }
    lastCommitted = cloneCurrent();
  };

  const undo = () => {
    if (!past.value.length) return;
    // Flush any pending debounce so an in-flight change isn't dropped
    if (timer) { clearTimeout(timer); timer = null; commit(); }
    future.value.push(lastCommitted);
    const prev = past.value.pop()!;
    apply(prev);
    refreshFlags();
  };

  const redo = () => {
    if (!future.value.length) return;
    if (timer) { clearTimeout(timer); timer = null; commit(); }
    past.value.push(lastCommitted);
    const next = future.value.pop()!;
    apply(next);
    refreshFlags();
  };

  const clear = () => {
    past.value = [];
    future.value = [];
    lastCommitted = cloneCurrent();
    refreshFlags();
  };

  // flush: 'sync' — runs while setNodes/setEdges is still executing, so the
  // `applying` guard in apply() still holds and we skip the self-snapshot.
  watch(
    [() => store.nodes.value, () => store.edges.value],
    () => queueSnapshot(),
    { deep: false, flush: 'sync' }
  );

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
