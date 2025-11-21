<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '我的',
  },
}
</route>
<template>
  <!-- 微信小程序兼容的页面切换方案 -->
  <view class="page-container">
    <index v-show="suoyin === 'index'"></index>
    <shaicha v-show="suoyin === 'shaicha'"></shaicha>
    <zixun v-show="suoyin === 'zixun'"></zixun>
    <userCenter v-show="suoyin === 'userCenter'"></userCenter>
  </view>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import index from '@/pages/index/index.vue'
import shaicha from '@/pages/shaicha/index.vue'
import zixun from '@/pages/zixun/index.vue'
import userCenter from '@/pages/user-center/index.vue'
import { useNavigationStore } from '@/store/navigation'

const navigationStore = useNavigationStore()
const suoyin = computed(() => navigationStore.suoyin)

// 向子组件提供当前激活状态，用于控制生命周期行为
provide('isPageActive', (pageName: string) => suoyin.value === pageName)
provide('currentPage', suoyin)
</script>

<style scoped>
.page-container {
  position: relative;
  width: 100%;
  height: 100vh;
}
/* 微信小程序兼容的页面样式 */
.page-container view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
