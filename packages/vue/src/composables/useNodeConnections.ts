import { computed, inject } from 'vue';
import type { HandleType, NodeConnection } from '@xyflow/system';
import { useStore } from '../store/context';

/**
 * Reactive list of connections on a node (optionally filtered by handle).
 *
 * Matches `@xyflow/system`'s connectionLookup keying:
 *  - `nodeId` → all connections on the node
 *  - `nodeId-{source|target}` → connections on one handle type
 *  - `nodeId-{source|target}-{handleId}` → connections on a specific handle
 */
export function useNodeConnections(params?: {
  id?: string;
  handleType?: HandleType;
  handleId?: string;
}) {
  const store = useStore() as any;
  const ctxNodeId = inject<string>('vueflow-node-id', '');
  const nodeId = params?.id ?? ctxNodeId;

  return computed<NodeConnection[]>(() => {
    void store.edges.value;
    if (!nodeId) return [];

    const key = params?.handleType
      ? params.handleId
        ? `${nodeId}-${params.handleType}-${params.handleId}`
        : `${nodeId}-${params.handleType}`
      : nodeId;

    const map = (store.connectionLookup as Map<string, Map<string, NodeConnection>>).get(key);
    return map ? Array.from(map.values()) : [];
  });
}
