<script setup lang="ts">
defineProps<{
  disabled?: boolean;
  title?: string;
}>();
</script>

<template>
  <button
    type="button"
    class="vue-flow__controls-button"
    :disabled="disabled"
    :title="title"
    :aria-label="title"
  >
    <slot />
  </button>
</template>
