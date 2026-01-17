<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '消息',
  },
}
</route>

<template>
  <view class="fixed inset-0 bg-[#f8f8f8] flex flex-col overflow-hidden">
    <!-- Top Status Bar Spacer -->
    <view class="w-full flex-shrink-0 bg-white" style="height: var(--status-bar-height);"></view>
    
    <!-- Custom Header -->
    <view class="w-full h-88rpx bg-white flex items-center justify-center relative flex-shrink-0 border-b border-gray-50/50">
      <view class="absolute left-30rpx top-0 h-full flex items-center text-gray-600" @click="goBack">
        <view class="i-carbon-chevron-left text-44rpx" />
      </view>
      <text class="text-34rpx font-700 text-[#333]">关系管理</text>
    </view>

    <!-- Scrollable Relationship List -->
    <scroll-view class="flex-1 w-full" scroll-y>
      <view class="p-40rpx space-y-30rpx">
        <!-- Relationship Items -->
        <view 
            v-for="item in groupList" 
            :key="item.id" 
            class="bg-white rounded-32rpx p-40rpx flex items-center shadow-[0_4rpx_20rpx_rgb(0,0,0,0.02)] transition-all duration-300"
            :class="String(item.id) === String(pinnedGroupId) ? 'ring-2 ring-pink-100 bg-pink-50/10' : ''"
            @click="handlePin(item.id)"
        >
          <!-- Stacked Avatars -->
          <view class="relative w-110rpx h-110rpx mr-30rpx">
            <template v-if="item.member_count === 2">
              <image 
                :src="(item.member_details && item.member_details[0]?.avatar) || '/static/used-images/default_avatar.png'" 
                class="w-80rpx h-80rpx rounded-full border-4 border-white absolute bottom-0 left-0 z-1" 
                mode="aspectFill" 
              />
              <image 
                :src="(item.member_details && item.member_details[1]?.avatar) || '/static/used-images/default_avatar.png'" 
                class="w-80rpx h-80rpx rounded-full border-4 border-white absolute top-0 right-0 z-0" 
                mode="aspectFill" 
              />
              <!-- Link Icon -->
              <view class="absolute inset-0 flex items-center justify-center z-2 pointer-events-none">
                  <view class="i-carbon-link text-[#ff4d4f] text-32rpx bg-white rounded-full p-2rpx border border-white" />
              </view>
            </template>
            <template v-else>
              <image 
                :src="(item.member_details && item.member_details[0]?.avatar) || '/static/used-images/default_avatar.png'" 
                class="w-80rpx h-80rpx rounded-full border-4 border-white" 
                mode="aspectFill" 
              />
              <view v-if="item.member_count > 1" class="w-80rpx h-80rpx rounded-full border-4 border-white absolute top-0 right-0 z-0 bg-gray-100 flex items-center justify-center overflow-hidden">
                 <text class="text-20rpx text-gray-400">+{{ item.member_count - 1 }}</text>
              </view>
            </template>
          </view>
          
          <!-- Relationship Info -->
          <view class="flex-1 flex flex-col">
            <text class="text-24rpx text-gray-400 mb-8rpx">{{ getDaysCount(item) }}</text>
            <view class="flex items-center">
                <text class="text-30rpx font-700 text-[#333]">{{ getRelationTitle(item) }}</text>
                <!-- Thumbtack Icon: Only show if pinned -->
                <view 
                    v-if="String(item.id) === String(pinnedGroupId)"
                    class="i-carbon-pin-filled text-pink-300 text-24rpx ml-12rpx" 
                />
            </view>
          </view>
          
          
          <!-- Right Icon -->
          <view class="text-gray-300 ml-20rpx" @click.stop="openDisconnectModal(item)">
            <view class="i-carbon-information text-48rpx" />
          </view>
        </view>

        <!-- Empty State -->
        <view v-if="groupList.length === 0 && !loading" class="flex flex-col items-center justify-center py-100rpx opacity-40">
           <view class="i-carbon-user-multiple text-100rpx mb-20rpx" />
           <text class="text-26rpx">暂无关系，快去加入吧</text>
        </view>
      </view>
      
      <!-- Bottom Safe Area Spacer -->
      <view class="w-full h-safe"></view>
    </scroll-view>

    <!-- Disconnection Confirmation Modal -->
    <uv-popup ref="disconnectPopup" mode="center" round="40rpx" :safeAreaInsetBottom="false">
        <view class="w-540rpx bg-white p-60rpx flex flex-col items-center">
            <text class="text-36rpx font-700 text-[#333] mb-40rpx text-center">
                是否解除{{ selectedGroup?.member_count === 2 ? '和' + getOtherName(selectedGroup) : '该' }}的{{ selectedGroup?.member_count === 2 ? '恋人' : '朋友' }}关系
            </text>
            
            <view class="w-full h-340rpx rounded-32rpx overflow-hidden mb-30rpx shadow-md">
                <image 
                    src="/static/used-images/home_featured.png" 
                    class="w-full h-full" 
                    mode="aspectFill" 
                />
            </view>
            
            <text class="text-26rpx text-gray-400 mb-60rpx">爱意珍贵，每一步都值得深思</text>
            
            <view class="flex w-full space-x-30rpx">
                <button 
                    class="flex-1 h-100rpx rounded-24rpx bg-[#eee] text-[#999] text-30rpx font-600 flex items-center justify-center border-none"
                    @click="confirmDisconnect"
                >
                    确定解除
                </button>
                <button 
                    class="flex-1 h-100rpx rounded-24rpx bg-[#4a4e69] text-white text-30rpx font-600 flex items-center justify-center border-none"
                    @click="closeDisconnectModal"
                >
                    我再想想
                </button>
            </view>
        </view>
    </uv-popup>
  </view>
</template>

<script setup lang="ts">
import { getGroupListAPI, quitGroupAPI } from '@/service/signin'
import dayjs from 'dayjs'
import { useUserStore } from '@/store'
import { onMounted } from 'vue'

const userStore = useUserStore()
const groupList = ref([])
const loading = ref(true)
const pinnedGroupId = ref(uni.getStorageSync('pinnedGroupId'))
const disconnectPopup = ref(null)
const selectedGroup = ref(null)

const goBack = () => {
    uni.navigateBack()
}

const handlePin = (id) => {
    pinnedGroupId.value = id
    uni.setStorageSync('pinnedGroupId', id)
    uni.showToast({ title: '已选中首页展示', icon: 'none' })
}

const openDisconnectModal = (item) => {
    selectedGroup.value = item
    if (disconnectPopup.value) {
        disconnectPopup.value.open()
    }
}

const closeDisconnectModal = () => {
    if (disconnectPopup.value) {
        disconnectPopup.value.close()
    }
}

const confirmDisconnect = async () => {
    if (!selectedGroup.value) return
    
    uni.showLoading({ title: '正在解除...' })
    try {
        await quitGroupAPI(selectedGroup.value.id)
        uni.showToast({ title: '已成功解除关系', icon: 'success' })
        closeDisconnectModal()
        // Refresh list
        fetchGroups()
        // If the pinned group was deleted, clear pinning
        if (String(pinnedGroupId.value) === String(selectedGroup.value.id)) {
            uni.removeStorageSync('pinnedGroupId')
            pinnedGroupId.value = null
        }
    } catch (e) {
        uni.showToast({ title: e.msg || '操作失败', icon: 'none' })
    } finally {
        uni.hideLoading()
    }
}

const getOtherName = (item) => {
    if (!item) return ''
    const myId = userStore.userInfo?.userId || userStore.userInfo?.id
    const otherMember = item.member_details?.find(m => String(m.id) !== String(myId))
    return otherMember?.nickName || otherMember?.nickname || otherMember?.name || '对方'
}

const fetchGroups = async () => {
    try {
        const res = await getGroupListAPI()
        // Filter out groups with only one person (yourself)
        const list = (res.data || []).filter(item => item.member_count > 1)
        groupList.value = list
        
        // Auto-pin first one if none pinned
        if (!pinnedGroupId.value && list.length > 0) {
            handlePin(list[0].id)
        }
    } catch (error) {
        console.error('Fetch groups failed:', error)
        uni.showToast({ title: '加载失败', icon: 'none' })
    } finally {
        loading.value = false
    }
}

const getRelationTitle = (item) => {
    if (item.member_count === 2) {
        // Find the other person
        const myId = userStore.userInfo?.userId || userStore.userInfo?.id
        const otherMember = item.member_details?.find(m => String(m.id) !== String(myId))
        const otherName = otherMember?.nickName || otherMember?.nickname || otherMember?.name || '对方'
        return `和 ${otherName} 为爱人关系`
    } else if (item.member_count > 2) {
        return `和 ${item.name} 成员为朋友关系`
    } else {
        return `个人签到空间（${item.name}）`
    }
}

const getDaysCount = (item) => {
    return `持续${item.member_count === 2 ? '相爱' : '相伴'}${item.days_count || 1}天`
}

onMounted(() => {
    fetchGroups()
})
</script>

<style lang="scss" scoped>
// Page background color should cover the whole area
:deep(page) {
  background-color: #f8f8f8;
}
</style>
