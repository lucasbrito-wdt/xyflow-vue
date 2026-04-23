<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../store/context';

const store = useStore() as any;
const mount = computed(() =>
  store.domNode.value?.querySelector('.vue-flow__viewport') ?? null
);
</script>

<template>
  <Teleport v-if="mount" :to="mount">
    <slot />
  </Teleport>
</template>
