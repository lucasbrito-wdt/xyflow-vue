import { inject, provide, type InjectionKey } from 'vue';
import type { VueFlowStore } from './types';

export const VueFlowStoreKey: InjectionKey<VueFlowStore> = Symbol('VueFlowStore');

export function provideStore(store: VueFlowStore) {
  provide(VueFlowStoreKey, store);
}

export function useStore(): VueFlowStore {
  const store = inject(VueFlowStoreKey, null);
  if (!store) {
    throw new Error(
      '[xyflow-vue]: useStore must be used inside <VueFlow> or <VueFlowProvider>.'
    );
  }
  return store;
}

export function useStoreSafe(): VueFlowStore | null {
  return inject(VueFlowStoreKey, null);
}
