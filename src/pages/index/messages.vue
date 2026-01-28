<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '消息',
    backgroundColor: '#fff'
  },
}
</route>

<template>
  <view class="fixed inset-0 bg-white flex flex-col items-center overflow-hidden box-border">
    <!-- Top Status Bar Spacer -->
    <view class="w-full flex-shrink-0 bg-white" :style="{ height: statusBarHeight + 'px' }"></view>
    
    <!-- Custom Header -->
    <view class="w-full h-100rpx bg-white flex items-center justify-center relative flex-shrink-0 border-b border-gray-50/50">
      <view class="absolute left-40rpx top-0 h-full flex items-center text-gray-400" @click="goBack">
        <view class="i-carbon-chevron-left text-48rpx" />
      </view>
      <text class="text-36rpx font-600 text-[#333]">消息中心</text>
      <view class="absolute right-40rpx top-0 h-full flex items-center text-gray-400" @click="markAllAsRead">
        <view class="i-carbon-checkmark-done text-44rpx" />
      </view>
    </view>

    <!-- Scrollable Message List -->
    <scroll-view class="flex-1 w-full" scroll-y @scrolltolower="loadMore">
      <view class="px-40rpx py-20rpx pb-100rpx">
        <view v-if="notifications.length === 0 && !loading" class="flex flex-col items-center justify-center pt-200rpx">
            <view class="i-carbon-notification-off text-100rpx text-gray-100 mb-20rpx" />
            <text class="text-26rpx text-gray-300">暂无新提醒</text>
        </view>

        <view 
            v-for="item in notifications" 
            :key="item.id" 
            class="flex items-center py-40rpx border-b border-gray-50/50 active:bg-gray-50 transition-colors"
            @click="handleMessageClick(item)"
        >
            <!-- Sender Avatars (Mocking stacked look if needed, but simple for now) -->
            <view class="relative w-120rpx h-120rpx mr-30rpx flex-shrink-0">
                <image 
                    :src="item.sender_avatar || '/static/used-images/default_avatar.png'" 
                    class="w-full h-full rounded-full border-4 border-white shadow-sm" 
                    mode="aspectFill" 
                />
                <!-- Unread Red Dot -->
                <view v-if="!item.is_read" class="absolute top-0 right-0 w-24rpx h-24rpx bg-red-500 rounded-full border-4 border-white" />
            </view>

            <!-- Message Content -->
            <view class="flex-1 flex flex-col justify-center overflow-hidden">
                <view class="flex items-center justify-between mb-8rpx">
                    <text class="text-30rpx font-700 text-[#333] truncate">和{{ item.sender_name || '家人' }}的消息</text>
                    <text class="text-22rpx text-gray-400">{{ formatTime(item.create_datetime) }}</text>
                </view>
                <text class="text-26rpx text-gray-400 truncate">{{ item.content }}</text>
            </view>
        </view>

        <view v-if="loading" class="py-40rpx text-center">
            <text class="text-24rpx text-gray-300">加载中...</text>
        </view>
      </view>
    </scroll-view>

    <!-- Bottom Navigation Component -->
    <BottomNav :active="2" :has-unread="false" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getNotificationsAPI, markAllNotificationsReadAPI, markNotificationReadAPI } from '@/service/signin'
import { useGlobalStore } from '@/store/global'
import BottomNav from '@/components/BottomNav.vue'
import dayjs from 'dayjs'

const globalStore = useGlobalStore()
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
const notifications = ref([])
const loading = ref(false)

const loadNotifications = async () => {
    loading.value = true
    try {
        const res = await getNotificationsAPI()
        notifications.value = res.data?.results || res.data || []
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

const markAllAsRead = async () => {
    try {
        await markAllNotificationsReadAPI()
        notifications.value.forEach(n => n.is_read = true)
        uni.showToast({ title: '全部标记为已读', icon: 'none' })
    } catch (e) {
        console.error(e)
    }
}

const formatTime = (time) => {
    if (!time) return ''
    const d = dayjs(time)
    const now = dayjs()
    if (d.isSame(now, 'day')) {
        return d.format('HH:mm')
    }
    return d.format('MM-DD HH:mm')
}

const goBack = () => {
    uni.navigateBack()
}

const handleMessageClick = (item) => {
    if (!item.is_read) {
        // Simple local update for UI
        item.is_read = true
        // Sync to backend
        markNotificationReadAPI(item.id).catch(e => console.error('Mark read failed:', e))
    }
    
    // 仅对待处理的加入申请（20）触发全局审批弹窗
    const isJoinRelated = item.notice_type === 20

    // 如果是申请类消息，提取信息并触发全局弹窗
    if (isJoinRelated) {
        globalStore.incomingRequest = {
            group_name: item.group_name || '未知关系',
            group_id: item.group,
            sender_name: item.sender_name || '系统用户',
            request_id: item.target_id || item.id // 关键修复：优先使用业务对象 ID (JoinRequest ID)
        }
        globalStore.showApprovePopup = true
        return
    }

    // 如果是被拒绝的消息（40），或者没有关联群组的消息，不做后续弹窗处理
    if (item.notice_type === 40 || !item.group) {
        return
    }

    uni.showModal({
        title: '进入空间',
        content: `是否进入与 ${item.sender_name || '家人'} 的专属空间？`,
        confirmText: '进入',
        cancelText: '取消',
        success: (res) => {
            if (res.confirm) {
                // Pin the group associated with this message
                if (item.group) {
                    uni.setStorageSync('pinnedGroupId', item.group)
                }

                // Navigate to home page
                uni.reLaunch({
                    url: '/pages/index/index'
                })
            }
        }
    })
}

onLoad(() => {
    loadNotifications()
})

onShow(() => {
    // Refresh on show
    loadNotifications()
})
</script>

<style lang="scss" scoped>
:deep(page),
page {
  background-color: #fff !important;
  height: 100vh !important;
  width: 100vw !important;
  overflow: hidden !important;
  position: fixed !important;
  top: 0;
  left: 0;
  box-sizing: border-box !important;
}

.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
