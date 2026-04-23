<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<template>
  <!-- GroupNode is just a container — dimensions/background come from node.style
       applied on the wrapper. Rendering nothing here lets child nodes show through. -->
  <div style="width: 100%; height: 100%" />
</template>
