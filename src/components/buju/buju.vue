<script setup lang="js">
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
const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
})
const showHeader = computed(() => props.showHeader)
const showFooter = computed(() => props.showFooter)
</script>

<template>
  <!-- 全局背景设置 -->
  <!-- <image
    class="w-full h-full absolute top-0 left-0 z--1"
    src="https://img.yzcdn.cn/vant/apple-3.jpg"
    mode="aspectFill"
  ></image> -->

  <!-- <div
    class="w-full h-full absolute top-0 left-0 z--1 bg-red-500"
    src="https://img.yzcdn.cn/vant/apple-3.jpg"
    mode="aspectFill"
  ></div> -->
  <!--  传入顶部导航使用传入的，不传入使用默认的-->
  <div v-if="showHeader" :style="{ height: headerHeight }">
    <slot name="header">
      <dingbu></dingbu>
    </slot>
  </div>
  <!--  主体-->
  <div class="" :style="{ height: mainHeight }">
    <slot name="main"></slot>
  </div>
  <!--  底部导航-->
  <div
    v-if="showFooter"
    class="bg-[#ffffffff] fixed bottom-0 left-0 right-0 z-10"
    :style="{ height: footerHeight }"
  >
    <slot name="footer"></slot>
  </div>
</template>

<style scoped lang="scss"></style>
