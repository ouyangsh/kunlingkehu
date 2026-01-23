<template>
  <view
    class="w-full flex flex-col items-center flex-shrink-0 bg-white shadow-[0_-1rpx_0_rgba(0,0,0,0.02)]"
    :style="{ paddingBottom: safeAreaBottom + 'px' }"
  >
    <view
      class="w-600rpx h-100rpx rounded-full bg-white border border-gray-50 shadow-[0_4rpx_24rpx_rgb(0,0,0,0.1)] flex items-center justify-around px-20rpx mb-20rpx mt-10rpx"
    >
      <!-- Love / Home Tab -->
      <view class="flex-1 flex items-center justify-center h-full" @click="navigateTo(0)">
        <image
          :src="
            active === 0
              ? '/static/used-images/nav_love_active_new.png'
              : '/static/used-images/nav_love_inactive_new.png'
          "
          class="w-52rpx h-52rpx transition-all duration-300"
          mode="aspectFit"
        />
      </view>

      <!-- Square / Send Tab (Placeholder) -->
      <view class="flex-1 flex items-center justify-center h-full" @click="showSquareToast">
        <image
          :src="
            active === 1
              ? '/static/used-images/nav_send_active_new.png'
              : '/static/used-images/nav_send_inactive_new.png'
          "
          class="w-52rpx h-52rpx transition-all duration-300"
          mode="aspectFit"
        />
      </view>

      <!-- Messages / Timeline Tab -->
      <view class="flex-1 flex items-center justify-center h-full" @click="navigateTo(2)">
        <image
          :src="
            active === 2
              ? hasUnread
                ? '/static/used-images/nav_timeline_unread_new.png'
                : '/static/used-images/nav_timeline_active_new.png'
              : '/static/used-images/nav_timeline_inactive_new.png'
          "
          class="w-52rpx h-52rpx transition-all duration-300"
          mode="aspectFit"
        />
      </view>
    </view>
    <!-- We keep a small additional fixed margin for aesthetic breathing room -->
    <view class="w-full h-10rpx flex-shrink-0"></view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

/**
 * @property {Number} active - 当前选中的 Tab 索引 (0: 首页, 1: 广场, 2: 消息)
 * @property {Boolean} hasUnread - 是否有未读消息
 */
const props = defineProps({
  active: {
    type: Number,
    default: 0,
  },
  hasUnread: {
    type: Boolean,
    default: false,
  },
})

const safeAreaBottom = ref(0)

onMounted(() => {
  // 获取系统信息，动态计算底部安全距离
  const sysInfo = uni.getSystemInfoSync()
  // 某些情况下 safeAreaInsets 可能不存在，做个兼容
  const bottom =
    (sysInfo.safeAreaInsets && sysInfo.safeAreaInsets.bottom) || sysInfo.safeArea?.bottom || 0
  // 如果是普通手机（没有安全距离），设置一个默认的精美间距（如 20px）
  // 如果是刘海屏，则是安全距离本身
  safeAreaBottom.value = bottom > 0 ? bottom : 20

  console.log('BottomNav - 系统底部安全距离:', bottom, '实际应用间距:', safeAreaBottom.value)
})

const navigateTo = (index) => {
  if (index === props.active) return

  if (index === 0) {
    uni.reLaunch({ url: '/pages/index/index' })
  } else if (index === 2) {
    uni.navigateTo({ url: '/pages/index/messages' })
  }
}

const showSquareToast = () => {
  uni.showToast({ title: '广场暂未开放，敬请期待', icon: 'none' })
}
</script>

<style scoped>
/* Icon interaction feedback if needed */
image:active {
  transform: scale(0.92);
}
</style>
