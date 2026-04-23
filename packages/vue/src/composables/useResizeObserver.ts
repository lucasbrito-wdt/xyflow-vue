import { onMounted, onBeforeUnmount } from 'vue';
import { useStore } from '../store/context';
import type { VueFlowStore } from '../store/types';

export function useResizeObserver(target: { value: HTMLElement | null }, injectedStore?: VueFlowStore) {
  const store = injectedStore ?? useStore();
  let ro: ResizeObserver | null = null;

  onMounted(() => {
    if (!target.value) return;
    const sync = () => {
      const rect = target.value!.getBoundingClientRect();
      store.width.value = rect.width;
      store.height.value = rect.height;
    };
    sync();
    ro = new ResizeObserver(sync);
    ro.observe(target.value);
  });

  onBeforeUnmount(() => {
    ro?.disconnect();
    ro = null;
  });
}
