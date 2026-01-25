<template>
  <uv-popup
    ref="popup"
    v-model="globalStore.showApprovePopup"
    mode="center"
    round="48rpx"
    :safeAreaInsetBottom="false"
    @change="onPopupChange"
  >
    <view class="w-560rpx bg-[#f2f2f4] p-48rpx flex flex-col items-center relative overflow-hidden">
      <view class="mb-40rpx flex flex-col items-center">
        <view
          class="w-120rpx h-120rpx bg-white rounded-full flex items-center justify-center mb-24rpx shadow-sm"
        >
          <view class="i-carbon-user-follow text-60rpx text-[#4a4e69]" />
        </view>
        <text class="text-34rpx font-700 text-[#333] mb-12rpx">加入申请</text>
        <text class="text-26rpx text-gray-500 text-center px-20rpx">
          <text class="font-700 text-[#4a4e69]">{{ globalStore.incomingRequest?.sender_name }}</text>
          申请加入您的关系
          <br />
          <text class="font-700">【{{ globalStore.incomingRequest?.group_name }}】</text>
        </text>
      </view>

      <view class="w-full space-y-24rpx">
        <uv-button
          type="primary"
          shape="circle"
          customStyle="background: #4a4e69; border: none; width: 100%; height: 90rpx; font-weight: 700; font-size: 28rpx;"
          @click="handleAction('approve')"
        >
          同意并加入
        </uv-button>
        <uv-button
          type="default"
          shape="circle"
          customStyle="background: white; border: 1px solid #eee; width: 100%; height: 80rpx; font-weight: 500; font-size: 26rpx; color: #ff4d4f;"
          @click="handleAction('reject')"
        >
          拒绝申请
        </uv-button>
      </view>
    </view>
  </uv-popup>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useGlobalStore } from '@/store/global'

const globalStore = useGlobalStore()
const popup = ref(null)

const handleAction = (action) => {
  globalStore.processRequest(action)
}

const onPopupChange = (e) => {
    if (!e.show) {
        globalStore.showApprovePopup = false
    }
}

watch(() => globalStore.showApprovePopup, (newVal) => {
    if (newVal && popup.value) {
        popup.value.open()
    } else if (!newVal && popup.value) {
        popup.value.close()
    }
})

</script>

<style scoped>
/* Any local styles */
</style>
