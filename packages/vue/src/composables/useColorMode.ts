import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import type { ColorMode, ColorModeClass } from '@xyflow/system';
import { useStore } from '../store/context';
import type { VueFlowStore } from '../store/types';

export function useColorMode(mode: ColorMode | undefined = 'light', injectedStore?: VueFlowStore) {
  const store = (injectedStore ?? useStore()) as any;
  const systemPref = ref<ColorModeClass>('light');
  let mql: MediaQueryList | null = null;

  const listener = (e: MediaQueryListEvent) => {
    systemPref.value = e.matches ? 'dark' : 'light';
  };

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    mql = window.matchMedia('(prefers-color-scheme: dark)');
    systemPref.value = mql.matches ? 'dark' : 'light';
    mql.addEventListener('change', listener);
  });

  onBeforeUnmount(() => {
    mql?.removeEventListener('change', listener);
  });

  const resolved = computed<ColorModeClass>(() =>
    mode === 'system' ? systemPref.value : (mode as ColorModeClass)
  );

  watch(
    resolved,
    (v) => {
      store.colorMode.value = v;
    },
    { immediate: true }
  );

  return resolved;
}
