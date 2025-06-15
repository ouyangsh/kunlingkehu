<script setup lang="js">
import { useLayout } from '@/hooks/useLayout'

const {
  safeAreaInsets,
  menuButtonBoundingClientRect,
  topSafeArea,
  bottomSafeArea,
  headerHeight,
  footerHeight,
  mainHeight,
} = useLayout()

// 判断safeAreaInsets的top和bottom是否为空
// if (safeAreaInsets.value.top === 0 && safeAreaInsets.value.bottom === 0) {
//   safeAreaInsets.value.top = 30
//   safeAreaInsets.value.bottom = 30
// }
</script>

<template>
  <!-- 全局背景设置 -->
  <image
    class="w-full h-full absolute top-0 left-0 z--1"
    src="https://img.yzcdn.cn/vant/apple-3.jpg"
    mode="aspectFill"
  ></image>
  <!--  传入顶部导航使用传入的，不传入使用默认的-->
  <div class="bg-yellow-200" :style="{ height: headerHeight }">
    <slot name="header">
      <div
        class="bg-red-500 relative"
        :style="{
          height: menuButtonBoundingClientRect.height + 'px',
          top: menuButtonBoundingClientRect.top + 'px',
        }"
      >
        <slot name="header-title">标题</slot>
      </div>
    </slot>
  </div>
  <!--  主体-->
  <div class="" :style="{ height: mainHeight }">
    <slot name="main"></slot>
  </div>
  <!--  底部导航-->
  <div class="bg-blue-500" :style="{ height: footerHeight }">
    <slot name="footer"></slot>
  </div>
</template>

<style scoped lang="scss"></style>
