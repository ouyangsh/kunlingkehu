<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '法律法规',
  },
}
</route>

<template>
  <buju title="法律法规">
    <view class="content">
      <view class="text-area">
        <text class="title">法律法规</text>
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
