<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '协议详情',
    backgroundColor: '#fff',
  },
}
</route>

<template>
  <view class="p-40rpx bg-white min-h-screen">
    <view v-if="loading" class="flex flex-col items-center justify-center pt-200rpx">
      <uv-loading-icon text="加载中..."></uv-loading-icon>
    </view>
    <view v-else-if="!agreement" class="flex flex-col items-center justify-center pt-200rpx">
      <text class="text-28rpx text-gray-400">暂无内容</text>
    </view>
    <view v-else>
      <view class="text-40rpx font-700 text-[#333] mb-40rpx text-center">{{ agreement.title }}</view>
      <view class="text-28rpx text-[#666] leading-relaxed">
        <rich-text :nodes="agreement.content"></rich-text>
      </view>
      <view class="mt-80rpx pt-40rpx border-t border-gray-100 items-center justify-center flex flex-col">
          <text class="text-22rpx text-gray-300">最后更新：{{ formatTime(agreement.update_datetime) }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getAgreementAPI } from '@/service/auth'
import dayjs from 'dayjs'

const type = ref(10)
const loading = ref(true)
const agreement = ref(null)

onLoad((options) => {
  if (options.type) {
    type.value = parseInt(options.type)
  }
  fetchAgreement()
})

const fetchAgreement = async () => {
  loading.value = true
  try {
    const res = await getAgreementAPI(type.value)
    // The API might return a list of active agreements of that type, we take the newest one
    const results = res.data?.results || res.data || []
    if (results.length > 0) {
      agreement.value = results[0]
      uni.setNavigationBarTitle({ title: agreement.value.title })
    }
  } catch (e) {
    console.error('Fetch agreement failed', e)
    uni.showToast({ title: '加载失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

const formatTime = (time) => {
    if (!time) return '未知'
    return dayjs(time).format('YYYY-MM-DD HH:mm')
}
</script>

<style lang="scss" scoped>
.p-40rpx {
    padding: 40rpx;
}
</style>
