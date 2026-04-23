<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../store/context';
import NodeWrapper from '../NodeWrapper/NodeWrapper.vue';

const store = useStore();

const visibleNodes = computed(() => store.nodes.value.filter((n) => !n.hidden));
</script>

<template>
  <div class="vue-flow__nodes vue-flow__container">
    <NodeWrapper v-for="node in visibleNodes" :key="node.id" :node="node" />
  </div>
</template>
