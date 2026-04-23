import { computed } from 'vue';
import type { InternalNode } from '../types/nodes';
import { useStore } from '../store/context';

export function useInternalNode(id: string) {
  const store = useStore() as any;
  return computed<InternalNode | undefined>(() => {
    // touch nodes ref so the computed re-runs when the array changes
    void store.nodes.value;
    return store.nodeLookup.get(id);
  });
}
