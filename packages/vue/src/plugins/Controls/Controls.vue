<script setup lang="ts">
import { computed } from 'vue';
import type { PanelPosition } from '@xyflow/system';
import Panel from '../../container/Panel/Panel.vue';
import ControlButton from './ControlButton.vue';
import { useStore } from '../../store/context';
import { useVueFlow } from '../../composables/useVueFlow';

const props = withDefaults(
  defineProps<{
    position?: PanelPosition;
    orientation?: 'horizontal' | 'vertical';
    showZoom?: boolean;
    showFitView?: boolean;
    showLock?: boolean;
  }>(),
  {
    position: 'bottom-left',
    orientation: 'vertical',
    showZoom: true,
    showFitView: true,
    showLock: true,
  }
);

const emit = defineEmits<{
  (e: 'zoomIn'): void;
  (e: 'zoomOut'): void;
  (e: 'fitView'): void;
  (e: 'interactiveChange', interactive: boolean): void;
}>();

const store = useStore();
const flow = useVueFlow();

const isInteractive = computed(
  () => store.nodesDraggable.value || store.nodesConnectable.value || store.elementsSelectable.value
);
const minZoomReached = computed(() => store.viewport.value.zoom <= store.minZoom.value);
const maxZoomReached = computed(() => store.viewport.value.zoom >= store.maxZoom.value);

const toggleInteractive = () => {
  const v = !isInteractive.value;
  store.nodesDraggable.value = v;
  store.nodesConnectable.value = v;
  store.elementsSelectable.value = v;
  emit('interactiveChange', v);
};
</script>

<template>
  <Panel
    :position="position"
    :class="['vue-flow__controls', orientation]"
  >
    <template v-if="showZoom">
      <ControlButton
        title="zoom in"
        :disabled="maxZoomReached"
        class="vue-flow__controls-zoomin"
        @click="flow.zoomIn(); emit('zoomIn')"
      >
        <svg viewBox="0 0 32 32"><path d="M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" /></svg>
      </ControlButton>
      <ControlButton
        title="zoom out"
        :disabled="minZoomReached"
        class="vue-flow__controls-zoomout"
        @click="flow.zoomOut(); emit('zoomOut')"
      >
        <svg viewBox="0 0 32 5"><path d="M0 0h32v4.2H0z" /></svg>
      </ControlButton>
    </template>
    <ControlButton
      v-if="showFitView"
      title="fit view"
      class="vue-flow__controls-fitview"
      @click="flow.fitView(); emit('fitView')"
    >
      <svg viewBox="0 0 32 32"><path d="M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708A4.64 4.64 0 0 0 0 4.708v5.2h3.692V4.631zM27.354 0h-5.2v3.692h5.215c.53 0 .938.4.938.939v5.277H32V4.708A4.64 4.64 0 0 0 27.354 0zm.953 27.354c0 .53-.4.938-.939.938h-5.215V32h5.277A4.64 4.64 0 0 0 32 27.354v-5.2h-3.692v5.2zM4.63 28.292a.95.95 0 0 1-.938-.939v-5.2H0v5.2A4.64 4.64 0 0 0 4.708 32h5.277v-3.708H4.631z" /></svg>
    </ControlButton>
    <ControlButton
      v-if="showLock"
      title="toggle interactivity"
      class="vue-flow__controls-interactive"
      @click="toggleInteractive"
    >
      <svg v-if="isInteractive" viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 0 0 0 13.714v15.238A3.056 3.056 0 0 0 3.048 32h18.285a3.056 3.056 0 0 0 3.048-3.048V13.714a3.056 3.056 0 0 0-3.048-3.047zM12.19 24.38a3.056 3.056 0 0 1-3.047-3.047 3.056 3.056 0 0 1 3.047-3.048 3.056 3.056 0 0 1 3.048 3.048 3.056 3.056 0 0 1-3.048 3.047zm4.724-13.713H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" /></svg>
      <svg v-else viewBox="0 0 25 32"><path d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 0 0 0 13.714v15.238A3.056 3.056 0 0 0 3.048 32h18.285a3.056 3.056 0 0 0 3.048-3.048V13.714a3.056 3.056 0 0 0-3.048-3.047zM12.19 24.38a3.056 3.056 0 0 1-3.047-3.047 3.056 3.056 0 0 1 3.047-3.048 3.056 3.056 0 0 1 3.048 3.048 3.056 3.056 0 0 1-3.048 3.047z" /></svg>
    </ControlButton>
    <slot />
  </Panel>
</template>
