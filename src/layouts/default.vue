<template>
  <view :class="['default-layout', props.customClass]">
    <slot />
    <wd-toast />
    <wd-message-box />
    <JoinRequestPopup />
    <LogoutPopup @confirm="handleGlobalLogout" />
  </view>
</template>

<script setup>
import JoinRequestPopup from '@/components/JoinRequestPopup.vue'
import LogoutPopup from '@/components/LogoutPopup.vue'
import { useUserStore } from '@/store/user'
import { useGlobalStore } from '@/store/global'

const userStore = useUserStore()
const globalStore = useGlobalStore()

const handleGlobalLogout = () => {
    // Stop WebSocket
    globalStore.closeWebSocket()

    // Clear store
    userStore.clearUserInfo()
    if (userStore.reset) userStore.reset()
    
    // Clear local storage
    uni.clearStorageSync()
    
    // Redirect
    uni.reLaunch({
      url: '/pages/login/index'
    })
}

const props = defineProps({
  customClass: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss">
.default-layout {
  height: 100vh;
  /* #ifdef H5 */
  padding-bottom: 50px;
  overflow: auto;
  /* #endif */
}
</style>
