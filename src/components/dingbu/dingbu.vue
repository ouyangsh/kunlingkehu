<script setup lang="js">
const { menuButtonBoundingClientRect, headerHeight } = useLayout()
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-10 bg-[#ffffffff]" :style="{ height: headerHeight }">
    <div
      class="relative"
      :style="{
        height: menuButtonBoundingClientRect.height + 'px',
        top: menuButtonBoundingClientRect.top + 'px',
      }"
    >
      <div
        class="flex justify-between mx-30rpx items-center font-500 text-38rpx"
        :style="{
          height: menuButtonBoundingClientRect.height + 'px',
        }"
      >
        <uni-icons type="left" size="25"></uni-icons>
        <slot name="title">组件标题</slot>
        <div>asdf</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-size: 16px;
  font-weight: 600;
}
</style>
