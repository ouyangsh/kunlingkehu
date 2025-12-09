<route lang="json5">
{
  style: {
    navigationBarTitleText: '用户中心',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="用户中心">
    <view class="content">
      <view class="text-area">
        <text class="title">我的</text>
      </view>
    </view>
    <template #footer>
      <TabBar />
    </template>
  </buju>
</template>

<script setup lang="ts">
import TabBar from '@/components/TabBar/TabBar.vue'
import { onShow } from '@dcloudio/uni-app'

// onShow(() => {
//   uni.hideTabBar()
// })
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
