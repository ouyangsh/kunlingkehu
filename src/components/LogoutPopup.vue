<template>
  <uv-popup
    ref="popup"
    v-model="globalStore.showLogoutPopup"
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
          <view class="i-carbon-logout text-60rpx text-[#4a4e69]" />
        </view>
        <text class="text-34rpx font-700 text-[#333] mb-12rpx">确认退出</text>
        <text class="text-26rpx text-gray-500 text-center px-40rpx">
          确定要清除缓存并退出登录吗？
        </text>
      </view>

      <view class="w-full space-y-24rpx">
        <uv-button
          type="primary"
          shape="circle"
          customStyle="background: #4a4e69; border: none; width: 100%; height: 90rpx; font-weight: 700; font-size: 28rpx;"
          @click="handleLogout"
        >
          确定退出
        </uv-button>
        <uv-button
          type="default"
          shape="circle"
          customStyle="background: white; border: 1px solid #eee; width: 100%; height: 80rpx; font-weight: 500; font-size: 26rpx; color: #999;"
          @click="close"
        >
          取消
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

const emit = defineEmits(['confirm'])

const handleLogout = () => {
    globalStore.showLogoutPopup = false
    emit('confirm')
}

const close = () => {
    globalStore.showLogoutPopup = false
}

const onPopupChange = (e) => {
    if (!e.show) {
        globalStore.showLogoutPopup = false
    }
}

watch(() => globalStore.showLogoutPopup, (newVal) => {
    if (newVal && popup.value) {
        popup.value.open()
    } else if (!newVal && popup.value) {
        popup.value.close()
    }
})

</script>

<style scoped>
.space-y-24rpx > view + view {
    margin-top: 24rpx;
}
</style>
