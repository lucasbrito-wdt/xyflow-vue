<script setup lang="ts">
import { Panel, useUndoRedo } from 'xyflow-vue';

const { undo, redo, canUndo, canRedo, clear } = useUndoRedo();
</script>

<template>
  <Panel position="top-right">
    <button :disabled="!canUndo" @click="undo">↶ undo (Ctrl+Z)</button>
    <button :disabled="!canRedo" @click="redo" style="margin-left: 4px">↷ redo (Ctrl+Shift+Z)</button>
    <button @click="clear" style="margin-left: 4px">clear history</button>
  </Panel>
</template>
