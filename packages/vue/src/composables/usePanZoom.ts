import { onMounted, onBeforeUnmount, watch } from 'vue';
import { XYPanZoom, PanOnScrollMode, type PanZoomInstance, type Viewport } from '@xyflow/system';
import { useStore } from '../store/context';

export function usePanZoom(viewportEl: { value: HTMLDivElement | null }) {
  const store = useStore() as any;
  let instance: PanZoomInstance | null = null;

  const updateOptions = () => {
    if (!instance) return;
    instance.update({
      noWheelClassName: 'nowheel',
      noPanClassName: 'nopan',
      onPaneContextMenu: undefined,
      userSelectionActive: store.userSelectionActive.value,
      panOnScroll: false,
      panOnDrag: true,
      panOnScrollMode: PanOnScrollMode.Free,
      panOnScrollSpeed: 0.5,
      preventScrolling: true,
      zoomOnPinch: true,
      zoomOnScroll: true,
      zoomOnDoubleClick: true,
      zoomActivationKeyPressed: false,
      lib: 'vue',
      onTransformChange: (t: [number, number, number]) => {
        store.viewport.value = { x: t[0], y: t[1], zoom: t[2] };
      },
      connectionInProgress: store.connection.value.inProgress,
      paneClickDistance: 0,
      selectionOnDrag: false,
    });
  };

  onMounted(() => {
    const domNode = viewportEl.value?.closest('.vue-flow') as HTMLDivElement | null;
    if (!viewportEl.value || !domNode) return;

    store.domNode.value = domNode;

    instance = XYPanZoom({
      domNode: viewportEl.value,
      minZoom: store.minZoom.value,
      maxZoom: store.maxZoom.value,
      translateExtent: store.translateExtent.value,
      viewport: store.viewport.value,
      onPanZoom: (ev: MouseEvent | TouchEvent | null, v: Viewport) => {
        store.viewport.value = v;
        (store as any)._emitMove?.('move', ev, v);
      },
      onPanZoomStart: (ev: any, v: Viewport) => {
        store.paneDragging.value = true;
        (store as any)._emitMove?.('start', ev, v);
      },
      onPanZoomEnd: (ev: any, v: Viewport) => {
        store.paneDragging.value = false;
        (store as any)._emitMove?.('end', ev, v);
      },
      onDraggingChange: (d: boolean) => {
        store.paneDragging.value = d;
      },
    });

    store.panZoom.value = instance;

    updateOptions();
  });

  watch(
    [
      () => store.minZoom.value,
      () => store.maxZoom.value,
      () => store.userSelectionActive.value,
      () => store.connection.value.inProgress,
    ],
    () => {
      instance?.setScaleExtent([store.minZoom.value, store.maxZoom.value]);
      updateOptions();
    }
  );

  watch(
    () => store.translateExtent.value,
    (ext) => instance?.setTranslateExtent(ext)
  );

  onBeforeUnmount(() => {
    instance?.destroy();
    instance = null;
    store.panZoom.value = null;
  });
}
