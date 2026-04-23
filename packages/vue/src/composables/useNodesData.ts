import { computed } from 'vue';
import { useStore } from '../store/context';
import type { Node } from '../types/nodes';

export function useNodesData<NodeType extends Node = Node>(idOrIds: string | string[]) {
  const store = useStore() as any;
  const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds];

  const result = computed(() => {
    const all = store.nodes.value as NodeType[];
    const idSet = new Set(ids);
    return all
      .filter((n) => idSet.has(n.id))
      .map((n) => ({ id: n.id, type: n.type, data: n.data }));
  });

  return Array.isArray(idOrIds) ? result : computed(() => result.value[0]);
}
