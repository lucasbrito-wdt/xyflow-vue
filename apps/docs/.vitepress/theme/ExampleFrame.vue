<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    slug: string;
    height?: number;
    baseUrl?: string;
  }>(),
  {
    height: 520,
    baseUrl: 'http://localhost:5173',
  }
);

const src = computed(() => `${props.baseUrl}/?demo=${props.slug}`);
const openUrl = computed(() => `${props.baseUrl}/?demo=${props.slug}`);
</script>

<template>
  <div class="example-frame">
    <div class="example-frame-header">
      <span>Live demo — <code>{{ slug }}</code></span>
      <a :href="openUrl" target="_blank" rel="noopener">Open in new tab ↗</a>
    </div>
    <iframe :src="src" :style="{ height: `${height}px` }" loading="lazy" />
  </div>
</template>
