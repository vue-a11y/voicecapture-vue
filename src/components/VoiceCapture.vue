<script setup>
const props = defineProps(['labelDark', 'labelLight', 'hiddenIcon', 'hiddenLabel'])
</script>

<template>
</template>

<style>
body {
  --dm-color-primary: #f00;
  --dm-color-secondary: #000;
  --dm-color-text: #222;
  --dm-color-background: #fff;
}

body.darkmode {
  --dm-color-text: #fff;
  --dm-color-background: #222;
}
</style>
