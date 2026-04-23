import { useStore } from '../store/context';

export function useUpdateNodeInternals() {
  const store = useStore() as any;
  return (idOrIds: string | string[]) => {
    const ids = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
    store.updateNodeInternals(ids);
  };
}
