<script setup lang="js">
const { menuButtonBoundingClientRect } = useLayout()
</script>

<template>
  <div
    class="bg-red-500 relative"
    :style="{
      height: menuButtonBoundingClientRect.height + 'px',
      top: menuButtonBoundingClientRect.top + 'px',
    }"
  >
    组件标题
  </div>
</template>

<style scoped lang="scss"></style>
