<route lang="json5">
{
  style: {
    navigationBarTitleText: '用户中心',
    navigationStyle: 'custom',
  },
  needLogin: true,
}
</route>

<template>
  <buju title="用户中心">
    <view class="content">
      <view class="text-area">
        <text class="title">我的</text>
      </view>
      
      <view class="mt-40rpx px-40rpx w-full">
         <uv-button type="primary" @click="goToLogin">去登录</uv-button>
      </view>
    </view>
    <template #footer>
      <TabBar />
    </template>
  </buju>
</template>

<script setup lang="ts">
import TabBar from '@/components/TabBar/TabBar.vue'

const goToLogin = () => {
  uni.navigateTo({ url: '/pages/login/index' })
}
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
