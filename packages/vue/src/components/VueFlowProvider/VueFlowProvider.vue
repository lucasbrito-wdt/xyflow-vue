<script setup lang="ts">
import { createStore } from '../../store';
import { provideStore, useStoreSafe } from '../../store/context';
import type { VueFlowProps } from '../../store/types';

const props = defineProps<VueFlowProps>();

// Only create a new store if none exists above in the tree
const existing = useStoreSafe();
if (!existing) {
  const store = createStore(props);
  provideStore(store);
}
</script>

<template>
  <slot />
</template>
