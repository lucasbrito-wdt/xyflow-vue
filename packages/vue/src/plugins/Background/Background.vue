<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../../store/context';

type Variant = 'dots' | 'lines' | 'cross';

const props = withDefaults(
  defineProps<{
    id?: string;
    variant?: Variant;
    gap?: number | [number, number];
    size?: number;
    lineWidth?: number;
    color?: string;
    bgColor?: string;
    patternClass?: string;
  }>(),
  {
    variant: 'dots',
    gap: 20,
    lineWidth: 1,
  }
);

const store = useStore();

const gapXY = computed<[number, number]>(() =>
  Array.isArray(props.gap) ? props.gap : [props.gap, props.gap]
);

const scaledGap = computed(() => {
  const [gx, gy] = gapXY.value;
  const [, , zoom] = store.transform.value;
  return [gx * zoom, gy * zoom] as const;
});

const offset = computed(() => {
  const [x, y] = store.transform.value;
  const [sgx, sgy] = scaledGap.value;
  return [x % sgx, y % sgy] as const;
});

const patternId = computed(() => `vueflow-bg-${store.flowId.value}-${props.id ?? 'default'}`);

const defaultColor = computed(() => {
  if (props.color) return props.color;
  return props.variant === 'lines' ? '#eee' : '#91919a';
});

const dotSize = computed(() => (props.size ?? 1) * store.transform.value[2]);
</script>

<template>
  <svg
    class="vue-flow__background vue-flow__container"
    :style="{ backgroundColor: bgColor }"
    data-testid="vf__background"
  >
    <pattern
      :id="patternId"
      :x="offset[0]"
      :y="offset[1]"
      :width="scaledGap[0]"
      :height="scaledGap[1]"
      patternUnits="userSpaceOnUse"
    >
      <template v-if="variant === 'dots'">
        <circle :cx="dotSize" :cy="dotSize" :r="dotSize" :fill="defaultColor" />
      </template>
      <template v-else-if="variant === 'lines'">
        <path
          :d="`M${scaledGap[0] / 2} 0 V${scaledGap[1]} M0 ${scaledGap[1] / 2} H${scaledGap[0]}`"
          :stroke="defaultColor"
          :stroke-width="lineWidth"
        />
      </template>
      <template v-else>
        <path
          :d="`M${scaledGap[0] / 2} 0 v${size ?? 6} M0 ${scaledGap[1] / 2} h${size ?? 6}`"
          :stroke="defaultColor"
          :stroke-width="lineWidth"
        />
      </template>
    </pattern>
    <rect x="0" y="0" width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>
