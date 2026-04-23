import { onBeforeUnmount, onMounted } from 'vue';
import { useStore } from '../store/context';
import type { VueFlowStore } from '../store/types';

/**
 * Default shortcuts:
 *  - Delete / Backspace → delete selected nodes and edges
 *  - Ctrl/Cmd+A → select all
 *  - Escape → unselect all
 *  - Shift held → multiSelectionActive = true (for drag multi-select)
 */
export function useKeyboardShortcuts(
  options?: { disabled?: () => boolean },
  injectedStore?: VueFlowStore
) {
  const store = (injectedStore ?? useStore()) as any;
  let clipboard: { nodes: any[]; edges: any[] } | null = null;

  const shouldIgnore = (e: KeyboardEvent) => {
    if (options?.disabled?.()) return true;
    const t = e.target as HTMLElement | null;
    if (!t) return false;
    const tag = t.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || t.isContentEditable;
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (shouldIgnore(e)) return;

    if (e.key === 'Shift') {
      store.multiSelectionActive.value = true;
      return;
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      const nodes = (store.nodes.value as any[]).filter((n) => n.selected && n.deletable !== false);
      const edges = (store.edges.value as any[]).filter((ed) => ed.selected && ed.deletable !== false);
      const nIds = new Set(nodes.map((n) => n.id));
      const eIds = new Set(edges.map((ed) => ed.id));
      const keepNodes = (store.nodes.value as any[]).filter((n) => !nIds.has(n.id));
      const keepEdges = (store.edges.value as any[]).filter(
        (ed) => !eIds.has(ed.id) && !nIds.has(ed.source) && !nIds.has(ed.target)
      );
      store.setNodes(keepNodes);
      store.setEdges(keepEdges);
      store.onDelete.value?.({ nodes, edges });
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      store.addSelectedNodes((store.nodes.value as any[]).map((n) => n.id));
      store.addSelectedEdges((store.edges.value as any[]).map((ed) => ed.id));
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
      const selNodes = (store.nodes.value as any[]).filter((n) => n.selected);
      const selEdges = (store.edges.value as any[]).filter((ed) => ed.selected);
      if (!selNodes.length && !selEdges.length) return;
      const selNodeIds = new Set(selNodes.map((n) => n.id));
      const internalEdges = selEdges.filter(
        (ed) => selNodeIds.has(ed.source) && selNodeIds.has(ed.target)
      );
      clipboard = { nodes: selNodes.map((n) => ({ ...n })), edges: internalEdges.map((ed) => ({ ...ed })) };
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
      const selNodes = (store.nodes.value as any[]).filter((n) => n.selected);
      const selEdges = (store.edges.value as any[]).filter((ed) => ed.selected);
      if (!selNodes.length && !selEdges.length) return;
      const selNodeIds = new Set(selNodes.map((n) => n.id));
      clipboard = {
        nodes: selNodes.map((n) => ({ ...n })),
        edges: selEdges
          .filter((ed) => selNodeIds.has(ed.source) && selNodeIds.has(ed.target))
          .map((ed) => ({ ...ed })),
      };
      const nIds = new Set(selNodes.map((n) => n.id));
      const eIds = new Set(selEdges.map((ed) => ed.id));
      store.setNodes((store.nodes.value as any[]).filter((n) => !nIds.has(n.id)));
      store.setEdges(
        (store.edges.value as any[]).filter(
          (ed) => !eIds.has(ed.id) && !nIds.has(ed.source) && !nIds.has(ed.target)
        )
      );
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
      if (!clipboard || (!clipboard.nodes.length && !clipboard.edges.length)) return;
      e.preventDefault();
      const idMap = new Map<string, string>();
      const newNodes = clipboard.nodes.map((n: any) => {
        const newId = `${n.id}-copy-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`;
        idMap.set(n.id, newId);
        return {
          ...n,
          id: newId,
          position: { x: n.position.x + 40, y: n.position.y + 40 },
          selected: true,
        };
      });
      const newEdges = clipboard.edges.map((ed: any) => ({
        ...ed,
        id: `${ed.id}-copy-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
        source: idMap.get(ed.source) ?? ed.source,
        target: idMap.get(ed.target) ?? ed.target,
        selected: true,
      }));
      store.setNodes([
        ...(store.nodes.value as any[]).map((n) => (n.selected ? { ...n, selected: false } : n)),
        ...newNodes,
      ]);
      store.setEdges([
        ...(store.edges.value as any[]).map((ed) => (ed.selected ? { ...ed, selected: false } : ed)),
        ...newEdges,
      ]);
      return;
    }

    if (e.key === 'Escape') {
      store.unselectNodesAndEdges();
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Shift') store.multiSelectionActive.value = false;
  };

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
  });
}
