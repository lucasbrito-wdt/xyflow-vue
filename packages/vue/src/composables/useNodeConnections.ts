import { computed, inject } from 'vue';
import type { HandleType, NodeConnection } from '@xyflow/system';
import { useStore } from '../store/context';

export function useNodeConnections(params?: {
  id?: string;
  handleType?: HandleType;
  handleId?: string;
}) {
  const store = useStore() as any;
  const ctxNodeId = inject<string>('vueflow-node-id', '');
  const nodeId = params?.id ?? ctxNodeId;

  return computed<NodeConnection[]>(() => {
    // depend on edges to retrigger when lookup changes
    void store.edges.value;
    const result: NodeConnection[] = [];
    const prefix = params?.handleType ? `${nodeId}-${params.handleType}` : null;

    for (const [key, connMap] of store.connectionLookup as Map<string, Map<string, NodeConnection>>) {
      if (!key.startsWith(nodeId)) continue;
      if (prefix && !key.startsWith(prefix)) continue;
      if (params?.handleId && !key.endsWith(`-${params.handleId}`)) continue;
      for (const conn of connMap.values()) result.push(conn);
    }
    return result;
  });
}
