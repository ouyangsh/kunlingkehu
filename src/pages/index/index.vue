<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <buju title="首页" headerClass="bg-emerald">
    <template #header>
      <div class="bg-emerald h-300rpx">头部</div>
    </template>
    <view class="content">
      <view class="text-area">
        <button @click="to('/pages-sub/test/test')">tiaozhuan</button>
        <text class="title">首页</text>
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

const to = (url: string) => {
  uni.navigateTo({
    url,
  })
}
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
