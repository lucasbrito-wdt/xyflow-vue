<script setup lang="ts">
import { ref } from 'vue';
import dagre from '@dagrejs/dagre';
import { VueFlow, Background, Controls, Panel, Position, type Node, type Edge } from 'xyflow-vue';

const nodeWidth = 172;
const nodeHeight = 36;

function layout(nodes: Node[], edges: Edge[], direction: 'TB' | 'LR' = 'TB'): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, nodesep: 40, ranksep: 60 });

  for (const n of nodes) g.setNode(n.id, { width: nodeWidth, height: nodeHeight });
  for (const e of edges) g.setEdge(e.source, e.target);

  dagre.layout(g);

  const isHorizontal = direction === 'LR';
  return nodes.map((n) => {
    const pos = g.node(n.id);
    return {
      ...n,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: { x: pos.x - nodeWidth / 2, y: pos.y - nodeHeight / 2 },
    };
  });
}

const rawNodes: Node[] = [
  { id: 'a', type: 'input', data: { label: 'root' }, position: { x: 0, y: 0 } },
  { id: 'b', data: { label: 'child 1' }, position: { x: 0, y: 0 } },
  { id: 'c', data: { label: 'child 2' }, position: { x: 0, y: 0 } },
  { id: 'd', data: { label: 'grandchild 1' }, position: { x: 0, y: 0 } },
  { id: 'e', data: { label: 'grandchild 2' }, position: { x: 0, y: 0 } },
  { id: 'f', data: { label: 'grandchild 3' }, position: { x: 0, y: 0 } },
  { id: 'g', type: 'output', data: { label: 'leaf' }, position: { x: 0, y: 0 } },
];
const rawEdges: Edge[] = [
  { id: 'a-b', source: 'a', target: 'b' },
  { id: 'a-c', source: 'a', target: 'c' },
  { id: 'b-d', source: 'b', target: 'd' },
  { id: 'b-e', source: 'b', target: 'e' },
  { id: 'c-f', source: 'c', target: 'f' },
  { id: 'f-g', source: 'f', target: 'g' },
];

const direction = ref<'TB' | 'LR'>('TB');
const nodes = ref<Node[]>(layout(rawNodes, rawEdges, 'TB'));
const edges = ref<Edge[]>(rawEdges);

function relayout(d: 'TB' | 'LR') {
  direction.value = d;
  nodes.value = layout(rawNodes, rawEdges, d);
}
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view :key="direction">
    <Background variant="dots" />
    <Controls />
    <Panel position="top-right">
      <button @click="relayout('TB')" :disabled="direction === 'TB'">Top → Bottom</button>
      <button @click="relayout('LR')" :disabled="direction === 'LR'" style="margin-left: 4px">
        Left → Right
      </button>
    </Panel>
  </VueFlow>
</template>
