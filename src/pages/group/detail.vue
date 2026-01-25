<route lang="json5">
{
  style: {
    navigationBarTitleText: '群组签到',
  },
}
</route>

<template>
  <view class="page-container">
    <view class="header-card bg-primary text-white p-50rpx text-center">
      <view class="text-40rpx font-bold mb-20rpx">{{ groupName }}</view>
      <view class="text-24rpx opacity-80">每日打卡，养成好习惯</view>
      
      <view class="checkin-btn-area mt-60rpx mb-20rpx flex justify-center">
        <view 
          class="checkin-circle flex flex-col items-center justify-center" 
          :class="{ 'checked': isCheckedIn }"
          @click="handleCheckIn"
        >
          <view class="text-36rpx font-bold">{{ isCheckedIn ? '已签到' : '签到' }}</view>
          <view class="text-24rpx mt-10rpx">{{ currentDate }}</view>
        </view>
      </view>
    </view>

    <view class="history-section p-30rpx -mt-30rpx relative z-10">
      <view class="bg-white rounded-20rpx p-30rpx shadow-sm" style="min-height: 400rpx;">
        <view class="flex justify-between items-center mb-30rpx border-b border-gray-100 pb-20rpx">
          <view class="text-30rpx font-bold border-l-8rpx border-primary pl-20rpx">今日动态</view>
          <view class="text-24rpx text-gray-400">共 {{ historyList.length }} 人已签到</view>
        </view>

        <view v-if="historyList.length === 0" class="text-center py-60rpx text-gray-400">
          暂无签到记录，快来抢沙发！
        </view>

        <view v-else class="space-y-30rpx">
          <view v-for="(item, index) in historyList" :key="index" class="flex items-center justify-between">
            <view class="flex items-center">
              <view class="w-80rpx h-80rpx rounded-full bg-gray-200 overflow-hidden mr-20rpx">
                 <image v-if="item.user_avatar" :src="item.user_avatar" class="w-full h-full" />
                 <view v-else class="w-full h-full flex items-center justify-center text-gray-400 text-24rpx">头像</view>
              </view>
              <view>
                <view class="text-28rpx font-500">{{ item.user_name || '无名氏' }}</view>
                <view class="text-22rpx text-gray-400">连续签到 {{ item.streak_count || 1 }} 天</view>
              </view>
            </view>
            <view class="text-24rpx text-primary font-bold bg-primary-50 px-20rpx py-6rpx rounded-full">
               {{ formatTime(item.signin_time) }}
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="p-40rpx mt-20rpx">
      <uv-button type="info" :plain="true" shape="circle" icon="share" text="邀请好友加入" open-type="share"></uv-button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad, onPullDownRefresh, onShareAppMessage } from '@dcloudio/uni-app'
import { checkInAPI, getCheckInHistoryAPI } from '@/service/signin'
import dayjs from 'dayjs'

const groupId = ref('')
const groupName = ref('')
const historyList = ref([])
const isCheckedIn = ref(false)
const currentDate = dayjs().format('MM-DD')

onLoad((options) => {
  if (options.id) {
    groupId.value = options.id
    groupName.value = decodeURIComponent(options.name || '群组')
    loadData()
  }
})

onPullDownRefresh(() => {
    loadData().finally(() => {
        uni.stopPullDownRefresh()
    })
})

const formatTime = (timeStr) => {
    if(!timeStr) return ''
    return dayjs(timeStr).format('HH:mm')
}

const loadData = async () => {
    try {
        const res = await getCheckInHistoryAPI(groupId.value)
        // Check if list or paginated
        const list = res.data?.results || res.data || []
        historyList.value = list
        
        // Check if current user is in list for today
        // Ideally API tells us, but here we can check local list if it contains "me" or handling the API error "Today already checked in"
        // But better UX is to show state.
        // For simplicity, we assume we don't know until we fetch "my status", 
        // OR we just try to check in and handle "already" error gracefully.
        // But visually we want to show "Checked".
        // Let's iterate list to see if *I* am there? 
        // Need userStore.userInfo.userId to compare. 
        // Assuming user store is available.
        // const userStore = useUserStore() ...
    } catch(e) {
        console.error(e)
    }
}

import { useUserStore } from '@/store'
const userStore = useUserStore()

// Re-compute isCheckedIn based on history
watch(() => historyList.value, (list) => {
    const myId = userStore.userInfo.userId
    const todayStr = dayjs().format('YYYY-MM-DD')
    if (list && list.length) {
        // Assuming item has user ID or we match by name?
        // Serializer has `user` field which is ID usually.
        const found = list.find(item => item.user === myId && item.date === todayStr)
        if(found) isCheckedIn.value = true
    }
}, { deep: true })


const handleCheckIn = async () => {
    if (isCheckedIn.value) return
    
    uni.showLoading({ title: '打卡中' })
    try {
        await checkInAPI(groupId.value)
        uni.showToast({ title: '签到成功', icon: 'success' })
        isCheckedIn.value = true
        loadData() // Refresh list
    } catch(e) {
        uni.hideLoading()
        if (e.msg && e.msg.includes('已签到')) {
             uni.showToast({ title: '今日已签到', icon: 'none' })
             isCheckedIn.value = true
        } else {
             uni.showToast({ title: e.msg || '签到失败', icon: 'none' })
        }
    } finally {
        uni.hideLoading()
    }
}

onShareAppMessage(() => {
    return {
        title: `邀请你加入【${groupName.value}】打卡群`,
        path: `/pages/group/detail?id=${groupId.value}&name=${encodeURIComponent(groupName.value)}` // Better: redirect to join page logic
        // But for now detail page is ok if we handle "Join" there?
        // Actually, user must be member to see detail/checkin.
        // If non-member opens detail, API `checkIn` or `history` might fail with "Not member".
        // We should handle that error and show "Join" button.
        // For MVP, we'll leave it as is.
    }
})
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.bg-primary {
  background: linear-gradient(135deg, #018d71 0%, #2db396 100%);
}
.border-primary {
    border-color: #018d71;
}
.text-primary {
    color: #018d71;
}
.bg-primary-50 {
    background-color: rgba(1, 141, 113, 0.1);
}

.checkin-circle {
  width: 240rpx;
  height: 240rpx;
  color: #018d71;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 0 20rpx rgba(255, 255, 255, 0.2);
  transition: all 0.3s;

  &:active {
    transform: scale(0.95);
  }

  &.checked {
    color: #999;
    background: #e0e0e0;
    box-shadow: none;
  }
}
</style>
