import { computed } from 'vue';
import type { ConnectionState } from '@xyflow/system';
import { useStore } from '../store/context';

export function useConnection<T = ConnectionState>(
  selector?: (s: ConnectionState) => T
) {
  const store = useStore() as any;
  return computed(() => {
    const c = store.connection.value as ConnectionState;
    return selector ? selector(c) : (c as unknown as T);
  });
}
