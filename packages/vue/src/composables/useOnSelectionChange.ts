import { watch } from 'vue';
import { useStore } from '../store/context';
import type { Node } from '../types/nodes';
import type { Edge } from '../types/edges';

export function useOnSelectionChange<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge
>(cb: (params: { nodes: NodeType[]; edges: EdgeType[] }) => void) {
  const store = useStore() as any;
  watch(
    [() => store.nodes.value, () => store.edges.value],
    () => {
      const nodes = (store.nodes.value as NodeType[]).filter((n) => n.selected);
      const edges = (store.edges.value as EdgeType[]).filter((e) => e.selected);
      cb({ nodes, edges });
    },
    { deep: false }
  );
}
