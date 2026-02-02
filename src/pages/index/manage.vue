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
    <view class="w-full flex-shrink-0 bg-white" style="height: var(--status-bar-height)"></view>

    <!-- Custom Header -->
    <view
      class="w-full h-88rpx bg-white flex items-center justify-center relative flex-shrink-0 border-b border-gray-50/50"
    >
      <view
        class="absolute left-30rpx top-0 h-full flex items-center text-gray-600"
        @click="goBack"
      >
        <view class="i-carbon-chevron-left text-44rpx" />
      </view>
      <text class="text-34rpx font-700 text-[#333]">关系管理</text>
    </view>

    <!-- Tabs -->
    <view
      class="w-full h-90rpx bg-white flex items-center justify-center space-x-120rpx flex-shrink-0 border-b border-gray-50/30"
    >
      <view
        class="flex flex-col items-center justify-center h-full relative"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="activeTab = index"
      >
        <text
          class="text-28rpx transition-all duration-300"
          :class="activeTab === index ? 'text-[#333] font-700' : 'text-gray-400 font-400'"
        >
          {{ tab }}
        </text>
        <view
          v-if="activeTab === index"
          class="absolute bottom-0 w-40rpx h-6rpx bg-[#4a4e69] rounded-full"
        />
      </view>
    </view>

    <!-- Scrollable Relationship List -->
    <scroll-view class="flex-1 w-full" scroll-y>
      <view class="p-40rpx space-y-30rpx">
        <!-- Relationship Items -->
        <view
          v-for="item in filteredGroupList"
          :key="item.id"
          class="bg-white rounded-32rpx p-40rpx flex items-center shadow-[0_4rpx_20rpx_rgb(0,0,0,0.02)] transition-all duration-300"
          :class="
            String(item.id) === String(pinnedGroupId) ? 'ring-2 ring-pink-100 bg-pink-50/10' : ''
          "
          @click="handlePin(item.id)"
        >
          <!-- Stacked Avatars -->
          <view class="relative w-110rpx h-110rpx mr-30rpx">
            <template v-if="item.member_count === 2">
              <image
                :src="
                  (item.member_details && item.member_details[0]?.avatar) ||
                  '/static/used-images/default_avatar.png'
                "
                class="w-80rpx h-80rpx rounded-full border-4 border-white absolute bottom-0 left-0 z-1"
                mode="aspectFill"
              />
              <image
                :src="
                  (item.member_details && item.member_details[1]?.avatar) ||
                  '/static/used-images/default_avatar.png'
                "
                class="w-80rpx h-80rpx rounded-full border-4 border-white absolute top-0 right-0 z-0"
                mode="aspectFill"
              />
              <!-- Link Icon -->
              <view
                class="absolute inset-0 flex items-center justify-center z-2 pointer-events-none"
              >
                <view
                  class="i-carbon-link text-[#ff4d4f] text-32rpx bg-white rounded-full p-2rpx border border-white"
                />
              </view>
            </template>
            <template v-else>
              <image
                :src="
                  (item.member_details && item.member_details[0]?.avatar) ||
                  '/static/used-images/default_avatar.png'
                "
                class="w-80rpx h-80rpx rounded-full border-4 border-white"
                mode="aspectFill"
              />
              <view
                v-if="item.member_count > 1"
                class="w-80rpx h-80rpx rounded-full border-4 border-white absolute top-0 right-0 z-0 bg-gray-100 flex items-center justify-center overflow-hidden"
              >
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

          <!-- Right Icon Section -->
          <view class="flex items-center space-x-24rpx ml-20rpx">
            <!-- Visibility Toggle (Only for Owned Friendship groups) -->
            <view
              v-if="activeTab === 1 && item.group_type === 20"
              class="w-80rpx h-80rpx rounded-full flex items-center justify-center transition-all active:scale-90"
              :class="item.is_hidden ? 'bg-gray-100 text-gray-400' : 'bg-blue-50 text-blue-400'"
              @click.stop="handleToggleVisibility(item)"
            >
              <view
                :class="item.is_hidden ? 'i-carbon-view-off' : 'i-carbon-view'"
                class="text-40rpx"
              />
            </view>

            <view class="text-gray-300" @click.stop="openDisconnectModal(item)">
              <view class="i-carbon-information text-48rpx" />
            </view>
          </view>
        </view>

        <!-- Empty State -->
        <view
          v-if="filteredGroupList.length === 0 && !loading"
          class="flex flex-col items-center justify-center py-100rpx opacity-40"
        >
          <view class="i-carbon-user-multiple text-100rpx mb-20rpx" />
          <text class="text-26rpx">暂无关系，快去{{ activeTab === 1 ? '创建' : '加入' }}吧</text>
        </view>

        <!-- Bottom Placeholder for Fixed Button -->
        <view v-if="activeTab === 1" class="w-full h-160rpx"></view>
      </view>

      <!-- Bottom Safe Area Spacer -->
      <view class="w-full h-safe"></view>
    </scroll-view>

    <!-- Fixed Create Group Button (Only in 'Owned' tab) -->
    <view
      v-if="activeTab === 1"
      class="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#f8f8f8] via-[#f8f8f8] to-transparent px-40rpx pb-60rpx pt-40rpx z-10"
    >
      <button
        class="w-full h-100rpx bg-[#4a4e69] text-white rounded-32rpx flex items-center justify-center shadow-2xl active:scale-95 transition-all border-none"
        @click="openCreateModal"
      >
        <view class="i-carbon-add text-36rpx mr-10rpx" />
        <text class="text-30rpx font-600">创建新关系</text>
      </button>
      <!-- Safe Area Inset -->
      <view class="w-full h-safe-bottom mt-20rpx"></view>
    </view>

    <!-- Disconnection Confirmation Modal -->
    <uv-popup ref="disconnectPopup" mode="center" round="40rpx" :safeAreaInsetBottom="false">
      <view class="w-540rpx bg-white p-60rpx flex flex-col items-center">
        <text class="text-36rpx font-700 text-[#333] mb-40rpx text-center px-20rpx">
          是否{{ selectedGroup?.is_owner ? '解散' : '退出' }}
          <template v-if="selectedGroup?.group_type === 10">
            和 {{ getOtherName(selectedGroup) }} 的爱情关系
          </template>
          <template v-else-if="selectedGroup?.group_type === 20">该友情群组</template>
          <template v-else>该单人关系</template>
        </text>

        <!-- Group Profile for Friendship, Image for others -->
        <template v-if="selectedGroup?.group_type === 20">
          <view
            class="w-full bg-[#f8f8f8] rounded-32rpx p-40rpx mb-40rpx flex flex-col items-center justify-center border border-gray-50 shadow-inner"
          >
            <view class="flex items-center -space-x-20rpx mb-24rpx">
              <image
                v-for="(m, idx) in selectedGroup?.member_details"
                :key="idx"
                :src="m.avatar || '/static/used-images/default_avatar.png'"
                class="w-100rpx h-100rpx rounded-full border-4 border-white shadow-sm bg-white"
                mode="aspectFill"
              />
            </view>
            <text class="text-30rpx font-600 text-[#333]">{{ selectedGroup?.name }}</text>
            <text class="text-22rpx text-gray-400 mt-8rpx">
              {{ selectedGroup?.member_count }} 位成员已加入
            </text>
          </view>
        </template>
        <template v-else>
          <view class="w-full h-340rpx rounded-32rpx overflow-hidden mb-40rpx shadow-md">
            <image
              src="/static/used-images/home_featured.png"
              class="w-full h-full"
              mode="aspectFill"
            />
          </view>
        </template>

        <text class="text-26rpx text-gray-400 mb-60rpx">爱意珍贵，每一步都值得深思</text>

        <view class="flex w-full space-x-30rpx">
          <button
            class="flex-1 h-100rpx rounded-24rpx bg-[#eee] text-[#999] text-30rpx font-600 flex items-center justify-center border-none"
            @click="confirmDisconnect"
          >
            确定{{ selectedGroup?.is_owner ? '解散' : '退出' }}
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

    <!-- Create Relationship Popup -->
    <uv-popup ref="createGroupPopup" mode="center" round="48rpx">
      <view class="w-560rpx bg-[#f2f2f4] p-50rpx flex flex-col items-center">
        <text class="text-34rpx font-700 text-[#333] mb-40rpx">创建新关系</text>

        <view class="w-full bg-white rounded-32rpx px-30rpx py-10rpx mb-30rpx">
          <input
            v-model="newGroupName"
            placeholder="给关系起个名字吧"
            class="h-80rpx text-28rpx"
            placeholder-class="text-gray-300"
          />
        </view>

        <view class="w-full grid grid-cols-3 gap-16rpx mb-50rpx">
          <!-- Love Type -->
          <view
            class="h-100rpx rounded-24rpx flex flex-col items-center justify-center transition-all bg-white relative overflow-hidden"
            :class="[
              newGroupType === 10 ? 'ring-2 ring-[#4a4e69]' : '',
              hasLoveGroup ? 'opacity-30' : 'opacity-100 active:scale-95',
            ]"
            @click="handleSelectType(10)"
          >
            <view
              class="i-carbon-favorite-filled text-28rpx mb-4rpx"
              :class="newGroupType === 10 ? 'text-pink-400' : 'text-gray-300'"
            />
            <text
              class="text-20rpx font-500"
              :class="newGroupType === 10 ? 'text-[#333]' : 'text-gray-400'"
            >
              爱情
            </text>
            <view
              v-if="hasLoveGroup"
              class="absolute inset-0 flex items-center justify-center bg-gray-50/50"
            >
              <view class="i-carbon-locked text-24rpx text-gray-400" />
            </view>
          </view>

          <!-- Friend Type -->
          <view
            class="h-100rpx rounded-24rpx flex flex-col items-center justify-center transition-all bg-white opacity-100 active:scale-95"
            :class="newGroupType === 20 ? 'ring-2 ring-[#4a4e69]' : ''"
            @click="handleSelectType(20)"
          >
            <view
              class="i-carbon-user-multiple text-28rpx mb-4rpx"
              :class="newGroupType === 20 ? 'text-blue-400' : 'text-gray-300'"
            />
            <text
              class="text-20rpx font-500"
              :class="newGroupType === 20 ? 'text-[#333]' : 'text-gray-400'"
            >
              友情
            </text>
          </view>

          <!-- Single Type -->
          <view
            class="h-100rpx rounded-24rpx flex flex-col items-center justify-center transition-all bg-white relative overflow-hidden"
            :class="[
              newGroupType === 30 ? 'ring-2 ring-[#4a4e69]' : '',
              hasSingleGroup ? 'opacity-30' : 'opacity-100 active:scale-95',
            ]"
            @click="handleSelectType(30)"
          >
            <view
              class="i-carbon-user-avatar text-28rpx mb-4rpx"
              :class="newGroupType === 30 ? 'text-orange-400' : 'text-gray-300'"
            />
            <text
              class="text-20rpx font-500"
              :class="newGroupType === 30 ? 'text-[#333]' : 'text-gray-400'"
            >
              单人
            </text>
            <view
              v-if="hasSingleGroup"
              class="absolute inset-0 flex items-center justify-center bg-gray-50/50"
            >
              <view class="i-carbon-locked text-24rpx text-gray-400" />
            </view>
          </view>
        </view>

        <view class="flex w-full space-x-24rpx">
          <button
            class="flex-1 h-80rpx rounded-20rpx bg-white text-gray-400 text-28rpx font-600 flex items-center justify-center border-none"
            @click="closeCreateModal"
          >
            取消
          </button>
          <button
            class="flex-1 h-80rpx rounded-20rpx bg-[#4a4e69] text-white text-28rpx font-600 flex items-center justify-center border-none"
            @click="handleCreateGroup"
          >
            立即创建
          </button>
        </view>
      </view>
    </uv-popup>
    <!-- Global Join Request Popup -->
    <JoinRequestPopup />
  </view>
</template>

<script setup lang="ts">
import {
  getGroupListAPI,
  quitGroupAPI,
  createGroupAPI,
  toggleGroupVisibilityAPI,
  getLimitAPI,
} from '@/service/signin'
import dayjs from 'dayjs'
import { useUserStore } from '@/store'
import { onMounted, ref, computed, watch } from 'vue'
import { onUnload, onLoad } from '@dcloudio/uni-app'
import JoinRequestPopup from '@/components/JoinRequestPopup.vue'
import { useGlobalStore } from '@/store/global'

const globalStore = useGlobalStore()

onLoad((query) => {
  if (query?.openCreate) {
    // New user auto flow: switch to 'Owned' tab and open modal
    activeTab.value = 1
    // Delay slightly to ensure UI is ready
    setTimeout(() => {
      openCreateModal()
    }, 500)
  }
})

// 核心：监听全局刷新信号
watch(
  () => globalStore.refreshId,
  (newVal) => {
    if (newVal > 0) {
      console.log('管理页响应全局刷新信号:', newVal)
      fetchGroups()
    }
  },
)

const userStore = useUserStore()
const groupList = ref([])
const loading = ref(true)
const pinnedGroupId = ref(uni.getStorageSync('pinnedGroupId'))
const disconnectPopup = ref(null)
const selectedGroup = ref(null)
const friendLimit = ref(5) // 默认值

// Tabs and Filtering
const tabs = ['我加入的', '我创建的']
const activeTab = ref(0)
const filteredGroupList = computed(() => {
  if (activeTab.value === 0) {
    // 我加入的: is_owner = false
    return groupList.value.filter((item) => !item.is_owner)
  } else {
    // 我创建的: is_owner = true
    return groupList.value.filter((item) => item.is_owner)
  }
})

const hasLoveGroup = computed(() => groupList.value.some((g) => g.group_type === 10))
const hasSingleGroup = computed(() => groupList.value.some((g) => g.group_type === 30))

const handleSelectType = (type: number) => {
  if (type === 10 && hasLoveGroup.value) {
    uni.showToast({ title: '您已拥有一个爱情关系，无法再次创建', icon: 'none' })
    return
  }
  if (type === 30 && hasSingleGroup.value) {
    uni.showToast({ title: '您已拥有一个单人关系，无法再次创建', icon: 'none' })
    return
  }
  newGroupType.value = type
}

// Create Group
const createGroupPopup = ref(null)
const newGroupName = ref('')
const newGroupType = ref(10) // Default Love

const goBack = () => {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  } else {
    uni.reLaunch({
      url: '/pages/index/index',
    })
  }
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

const openCreateModal = () => {
  newGroupName.value = ''
  newGroupType.value = 10
  if (createGroupPopup.value) {
    createGroupPopup.value.open()
  }
}

const closeCreateModal = () => {
  if (createGroupPopup.value) {
    createGroupPopup.value.close()
  }
}

const handleCreateGroup = async () => {
  if (!newGroupName.value.trim()) {
    uni.showToast({ title: '请输入关系名称', icon: 'none' })
    return
  }
  
  // 友情群组数量限制检查
  if (newGroupType.value === 20) {
    const friendCount = groupList.value.filter(g => g.group_type === 20).length
    if (friendCount >= friendLimit.value) {
      uni.showToast({ title: `友情群组数量已达上限(${friendLimit.value}个)`, icon: 'none' })
      return
    }
  }

  uni.showLoading({ title: '正在创建...' })
  try {
    await createGroupAPI({
      name: newGroupName.value,
      group_type: newGroupType.value,
    })
    uni.showToast({ title: '创建成功', icon: 'success' })
    closeCreateModal()
    fetchGroups()
  } catch (e) {
    uni.showToast({ title: e.msg || '创建失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

const getOtherName = (item) => {
  if (!item) return ''
  const myId = userStore.userInfo?.userId
  const otherMember = item.member_details?.find((m) => String(m.userId || m.id) !== String(myId))
  return otherMember?.nickName || otherMember?.nickname || otherMember?.name || '对方'
}

const handleToggleVisibility = async (item) => {
  if (item.group_type === 10 || item.group_type === 30) {
    uni.showToast({ title: '当前关系类型不支持隐藏', icon: 'none' })
    return
  }

  const actionText = item.is_hidden ? '显示' : '隐藏'
  const content = item.is_hidden
    ? '显示后，别人搜索您的账号可以看到并申请加入该关系。'
    : '隐藏后，别人搜索您的账号将看不到该关系。'

  uni.showModal({
    title: `确认${actionText}`,
    content,
    success: async (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '设置中...' })
        try {
          await toggleGroupVisibilityAPI(item.id)
          uni.showToast({ title: '设置成功', icon: 'success' })
          fetchGroups()
        } catch (e) {
          uni.showToast({ title: e.msg || '操作失败', icon: 'none' })
        } finally {
          uni.hideLoading()
        }
      }
    },
  })
}

const fetchGroups = async () => {
  try {
    const res = await getGroupListAPI()
    // Keep groups even if they have only 1 member, as they could be 'Single' type or newly created
    const list = res.data || []
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
  const typeLabel =
    {
      10: '爱人',
      20: '朋友',
      30: '个人',
    }[item.group_type] || '守护'

  return `${item.name} (${typeLabel})`
}

const getDaysCount = (item) => {
  let type = '相伴'
  if (item.group_type === 10) type = '相爱'
  if (item.group_type === 30) type = '坚持'
  return `持续${type}${item.days_count || 1}天`
}

onMounted(() => {
  fetchGroups()
  // 获取友情群组限制
  getLimitAPI().then(res => {
    if(res.data && res.data.limit) {
      friendLimit.value = res.data.limit
    }
  }).catch(() => {
      // ignore
  })
})

onUnload(() => {
  // logic
})
</script>

<style lang="scss" scoped>
// Page background color should cover the whole area
:deep(page) {
  background-color: #f8f8f8;
}
</style>
