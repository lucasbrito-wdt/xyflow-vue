import { computed } from 'vue';
import { useStore } from '../store/context';

export function useInitialized() {
  const store = useStore() as any;
  return computed(() => store.nodesInitialized.value && store.viewportInitialized.value);
}
