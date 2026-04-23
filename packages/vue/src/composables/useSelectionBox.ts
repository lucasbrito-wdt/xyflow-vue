import { onBeforeUnmount, onMounted, type Ref } from 'vue';
import { getNodesInside } from '@xyflow/system';
import { useStore } from '../store/context';

/**
 * Enables shift+drag rectangular selection on the pane.
 * Target element should be the pane (viewport listener container).
 */
export function useSelectionBox(paneEl: Ref<HTMLElement | null>) {
  const store = useStore() as any;
  let startX = 0;
  let startY = 0;
  let active = false;

  const toFlow = (clientX: number, clientY: number) => {
    const rect = store.domNode.value?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const v = store.viewport.value;
    return {
      x: (clientX - rect.left - v.x) / v.zoom,
      y: (clientY - rect.top - v.y) / v.zoom,
    };
  };

  const onDown = (e: MouseEvent) => {
    if (!e.shiftKey || e.button !== 0) return;
    const { x, y } = toFlow(e.clientX, e.clientY);
    startX = x;
    startY = y;
    active = true;
    store.userSelectionActive.value = true;
    store.selectionRect.value = { x, y, width: 0, height: 0, startX: x, startY: y };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    e.preventDefault();
  };

  const onMove = (e: MouseEvent) => {
    if (!active) return;
    const { x, y } = toFlow(e.clientX, e.clientY);
    const rect = {
      x: Math.min(startX, x),
      y: Math.min(startY, y),
      width: Math.abs(x - startX),
      height: Math.abs(y - startY),
      startX,
      startY,
    };
    store.selectionRect.value = rect;

    const hits = getNodesInside(
      store.nodeLookup,
      rect,
      [store.viewport.value.x, store.viewport.value.y, store.viewport.value.zoom],
      true
    );
    store.addSelectedNodes(hits.map((n: any) => n.id));
  };

  const onUp = () => {
    active = false;
    store.userSelectionActive.value = false;
    store.selectionRect.value = null;
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  };

  onMounted(() => paneEl.value?.addEventListener('mousedown', onDown));
  onBeforeUnmount(() => {
    paneEl.value?.removeEventListener('mousedown', onDown);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  });
}
