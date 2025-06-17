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
    <div
      class="flex justify-center items-center font-500 text-38rpx"
      :style="{
        height: menuButtonBoundingClientRect.height + 'px',
      }"
    >
      <slot name="title">组件标题</slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-size: 16px;
  font-weight: 600;
}
</style>
