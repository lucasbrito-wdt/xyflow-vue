import { computed } from 'vue';
import { useStore } from '../store/context';

export function useNodes() {
  const store = useStore() as any;
  return computed(() => store.nodes.value);
}

export function useEdges() {
  const store = useStore() as any;
  return computed(() => store.edges.value);
}

export function useViewport() {
  const store = useStore() as any;
  return computed(() => store.viewport.value);
}
