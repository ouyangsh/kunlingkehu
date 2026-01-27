<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
    disableScroll: true,
  },
}
</route>

<template>
  <view class="fixed inset-0 overflow-hidden bg-white flex flex-col items-center box-border">
    <!-- Top Header Spacer (for Safe Area) -->
    <view class="w-full h-80rpx flex-shrink-0"></view>

    <!-- Top Header -->
    <view
      class="w-full h-88rpx flex items-center justify-center relative mb-10rpx px-40rpx flex-shrink-0 box-border"
    >
      <view
        class="absolute left-10rpx top-0 h-full w-100rpx flex items-center justify-center text-gray-400"
        @click="isForceJoin ? (isForceJoin = false) : openDrawer()"
      >
        <view :class="isForceJoin ? 'i-carbon-chevron-left' : 'i-carbon-menu'" class="text-44rpx" />
      </view>
      <text class="text-40rpx font-700 tracking-wider text-[#333]">
        {{ currentGroup?.name || 'Aileme' }}
      </text>
      <view
        class="absolute right-10rpx top-0 h-full w-100rpx flex items-center justify-center text-gray-400"
        @click="openRelationModal"
      >
        <view class="i-carbon-information text-44rpx" />
      </view>
    </view>

    <!-- Content Area: Flexible -->
    <template v-if="isInitLoaded">
      <view
        v-if="groupList.length > 0 && !isForceJoin"
        class="flex-1 w-full flex flex-col items-center justify-center overflow-hidden"
      >
        <!-- Swiper for multiple groups -->
        <swiper
          class="w-full h-full"
          :current="currentIndex"
          @change="handleSwiperChange"
          :indicator-dots="groupList.length > 1"
          indicator-color="rgba(0, 0, 0, .3)"
          indicator-active-color="#ff69b4"
        >
          <swiper-item v-for="(group, idx) in groupList" :key="group.id" class="w-full h-full">
            <view class="w-full h-full flex flex-col items-center justify-center overflow-hidden">
              <!-- Main Artistic Card -->
              <view class="w-full h-0 flex-1 max-h-600rpx rounded-24rpx overflow-hidden mb-30rpx">
                <ParticleHeart
                  :active="idx === currentIndex"
                  :memberCount="group?.member_count || 0"
                  :checkedCount="group?.checked_in_count || 0"
                  :isMeChecked="group?.is_checked_in_today || false"
                  @heartClick="handleCheckIn"
                />
              </view>

              <view class="flex flex-col items-center mb-20rpx px-40rpx text-center">
                <view class="text-28rpx text-gray-500 font-500 mb-2rpx">
                  <template v-if="group?.group_type !== 30">
                    和 {{ getDisplayNames(group) }}
                  </template>
                  已连续爱了
                </view>
              </view>

              <!-- Indicators (Decorative dots) -->
              <view class="flex space-x-12rpx mb-40rpx">
                <view class="w-12rpx h-12rpx rounded-full bg-gray-50"></view>
                <view class="w-12rpx h-12rpx rounded-full bg-gray-100"></view>
                <view class="w-12rpx h-12rpx rounded-full bg-gray-50"></view>
              </view>

              <!-- Days Counter -->
              <view class="flex items-baseline mb-20rpx">
                <text class="text-140rpx font-800 text-[#333] tracking-tighter leading-none">
                  {{ group?.streak_count || 0 }}
                </text>
                <text class="text-32rpx font-700 text-[#333] ml-16rpx">天</text>
              </view>

              <!-- Total Days (Sub-stat) -->
              <view class="flex items-center text-gray-300 text-24rpx mb-40rpx">
                <text>相伴第 {{ group?.total_days || 0 }} 天</text>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>

      <!-- Empty State: No Relationships / Join UI -->
      <view
        v-else
        class="flex-1 w-full flex flex-col items-center justify-center px-60rpx text-center box-border"
      >
        <view class="i-carbon-user-multiple text-120rpx text-gray-200 mb-40rpx" />
        <view class="text-36rpx font-700 text-[#333] mb-20rpx">开启你的守护</view>
        <view class="text-28rpx text-gray-400 mb-60rpx leading-relaxed">
          当前没有关系，输入你要加入的邮箱/用户名
          <br />
          开启你们的专属签到空间
        </view>

        <view class="w-540rpx flex flex-col items-center space-y-30rpx">
          <!-- Search Container with Suggestions -->
          <view class="w-full relative">
            <view
              class="w-full h-100rpx bg-gray-50 rounded-full flex items-center px-40rpx border border-gray-100 box-border relative z-20"
            >
              <view class="i-carbon-search text-gray-400 mr-20rpx text-36rpx" />
              <input
                v-model="joinEmail"
                @input="onSearchInput"
                class="flex-1 h-full text-28rpx"
                placeholder="请输入邮箱/用户名"
                placeholder-class="text-gray-300"
              />
            </view>

            <!-- Suggestion Dropdown (Docked) -->
            <view
              v-if="suggestions.length > 0 && showSuggestions"
              class="absolute top-80rpx left-20rpx right-20rpx bg-white rounded-b-32rpx shadow-2xl border border-gray-100 z-10 overflow-y-auto max-h-400rpx pt-30rpx"
            >
              <view
                v-for="user in suggestions"
                :key="user.id"
                class="flex items-center px-30rpx py-24rpx border-b border-gray-50 active:bg-gray-50 flex-shrink-0"
                @click="selectUser(user)"
              >
                <image
                  :src="user.avatar || '/static/default_avatar.png'"
                  class="w-64rpx h-64rpx rounded-full mr-20rpx"
                  mode="aspectFill"
                />
                <view class="flex flex-col items-start flex-1 overflow-hidden">
                  <text
                    class="text-28rpx text-[#333] font-600 truncate w-full flex-shrink-0 text-left"
                  >
                    {{ user.name }}
                  </text>
                  <text class="text-22rpx text-gray-400 truncate w-full flex-shrink-0 text-left">
                    {{ user.email }}
                  </text>
                </view>
              </view>
            </view>
          </view>

          <view
            class="w-full h-100rpx bg-[#333] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all"
            @click="handleJoin"
          >
            <text class="text-white text-30rpx font-700">进入关系</text>
          </view>

          <!-- Manual Refresh Fallback -->
          <view class="pt-20rpx" @click="loadLatestGroup">
            <text class="text-24rpx text-gray-400 border-b border-gray-200 pb-4rpx">
              还没看到新关系？点此刷新
            </text>
          </view>
        </view>
      </view>
    </template>

    <!-- Loading State: Prevents initial flicker -->
    <view v-else class="flex-1 w-full flex flex-col items-center justify-center">
      <!-- Subtle loading indicator -->
      <view
        class="w-100rpx h-100rpx rounded-full bg-gray-50 flex items-center justify-center animate-pulse"
      >
        <view class="i-carbon-circle-dash text-gray-200 text-40rpx" />
      </view>
    </view>

    <!-- Bottom Action & Navigation Bar -->
    <view v-if="currentGroup" class="w-full flex flex-col items-center flex-shrink-0">
      <!-- Main Check-in Action Area -->
      <view class="flex flex-col items-center mb-30rpx px-40rpx">
        <view class="flex items-center space-x-20rpx mb-20rpx">
          <!-- Status Pill -->
          <view
            class="w-320rpx h-90rpx rounded-full flex items-center px-10rpx shadow-[0_4rpx_20rpx_rgb(0,0,0,0.02)] transition-all bg-[#fcfcfc] border border-gray-50"
            @click="handleCheckIn"
          >
            <view
              class="w-70rpx h-70rpx rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              <image
                :src="
                  !isCheckedIn
                    ? '/static/used-images/checkin_todo_icon.png'
                    : uncompletedCount > 0
                      ? '/static/used-images/checkin_warning_icon.png'
                      : '/static/used-images/checkin_done_icon.png'
                "
                class="w-40rpx h-40rpx"
                mode="aspectFit"
              />
            </view>
            <text
              class="flex-1 text-center text-28rpx font-600 mr-10rpx"
              :class="isCheckedIn && uncompletedCount === 0 ? 'text-gray-400' : 'text-[#555]'"
            >
              <template v-if="!isCheckedIn">
                {{
                  uncompletedCount < (currentGroup?.member_count || 0) ? '今日未完成' : '今日未完成'
                }}
              </template>
              <template v-else>
                {{ uncompletedCount > 0 ? `${uncompletedCount}人未完成` : '今日已完成' }}
              </template>
            </text>
          </view>

          <!-- Restart Button -->
          <view
            class="w-90rpx h-90rpx rounded-full bg-[#fcfcfc] border border-gray-50 flex items-center justify-center shadow-[0_4rpx_20rpx_rgb(0,0,0,0.02)] transition-all"
            @click="handleCheckIn"
          >
            <image
              :src="
                isCheckedIn && uncompletedCount === 0
                  ? '/static/used-images/checkin_restart_icon.png'
                  : '/static/used-images/checkin_restart_inactive_icon.png'
              "
              class="w-48rpx h-48rpx"
              mode="aspectFit"
            />
          </view>
        </view>

        <!-- Remind Link Area -->
        <view
          v-if="currentGroup?.group_type !== 30 && (!isCheckedIn || uncompletedCount > 0)"
          class="flex flex-col items-center"
          @click="handleRemind"
        >
          <view class="flex items-center text-gray-400">
            <text class="text-28rpx">去提醒她/他</text>
            <view class="i-carbon-chevron-right text-28rpx ml-4rpx" />
          </view>
        </view>
      </view>

      <!-- Bottom Navigation component -->
      <BottomNav :active="0" :has-unread="hasUnreadMessages" />
    </view>

    <!-- Sidebar Drawer -->
    <uv-popup ref="popup" v-model="showDrawer" mode="left" width="560rpx">
      <view class="h-100vh bg-white flex flex-col relative overflow-hidden">
        <!-- Top Status Bar Spacer -->
        <view class="w-full flex-shrink-0" style="height: var(--status-bar-height)"></view>
        <view class="w-full h-20rpx flex-shrink-0"></view>

        <!-- User Info Section -->
        <view class="flex items-center space-x-30rpx px-60rpx mb-40rpx flex-shrink-0">
          <image
            :src="userInfo.avatar || '/static/used-images/default_avatar.png'"
            class="w-130rpx h-130rpx rounded-full border-4 border-white shadow-lg"
            mode="aspectFill"
          />
          <view class="flex flex-col">
            <text class="text-34rpx font-700 text-[#333] mb-8rpx">
              {{ userInfo.name || '家人' }}
            </text>
            <view class="bg-[#4e526e] rounded-full px-16rpx py-4rpx flex items-center w-fit">
              <text class="text-white text-18rpx font-500 tracking-wider">VIP 会员</text>
            </view>
          </view>
        </view>

        <!-- Divider -->
        <view class="mx-60rpx h-1rpx bg-gray-50 mb-40rpx flex-shrink-0"></view>

        <!-- Scrollable Content Part -->
        <view class="flex-1 overflow-y-auto">
          <!-- Menu List -->
          <view class="px-60rpx space-y-40rpx mb-60rpx">
            <view class="flex items-center space-x-36rpx" @click="editName">
              <view class="i-carbon-user text-gray-500 text-44rpx" />
              <text class="text-30rpx font-500 text-[#444]">个人信息</text>
            </view>
            <view
              class="flex items-center space-x-36rpx"
              @click="
                popup.close();
                showDrawer = false;
                isForceJoin = true;
              "
            >
              <view class="i-carbon-add-alt text-gray-500 text-44rpx" />
              <text class="text-30rpx font-500 text-[#444]">加入新的关系</text>
            </view>

            <view class="flex items-center w-full justify-between" @click="goToMessages">
              <view class="flex items-center space-x-36rpx">
                <view class="i-carbon-email text-gray-500 text-44rpx" />
                <text class="text-30rpx font-500 text-[#444]">消息中心</text>
              </view>
              <view
                v-if="hasUnreadMessages"
                class="bg-[#ff4d4f] w-16rpx h-16rpx rounded-full"
              ></view>
            </view>
          </view>

          <!-- Promotion Card Section -->
          <view class="px-30rpx mb-20rpx pb-20rpx">
            <view class="bg-[#f2f2f4] rounded-32rpx p-40rpx flex flex-col items-start shadow-sm">
              <text class="text-30rpx font-700 text-[#333] mb-20rpx">每日爱了吗</text>
              <uv-button
                :type="isCheckedIn ? 'info' : 'primary'"
                shape="circle"
                :customStyle="
                  isCheckedIn
                    ? 'background: #e0e0e6; color: #666; border: none; width: 100%; height: 80rpx; font-weight: 600; font-size: 28rpx;'
                    : 'background: #4a4e69; border: none; width: 100%; height: 80rpx; font-weight: 600; font-size: 28rpx;'
                "
                :disabled="isCheckedIn"
                @click="handleCheckIn"
              >
                {{ isCheckedIn ? '今日已签到' : '立即签到' }}
              </uv-button>
              <text class="text-22rpx text-gray-400 mt-20rpx leading-relaxed">
                已连续打卡 {{ streakCount }} 天，再打卡 {{ 365 - streakCount }} 天获得奖励
              </text>
            </view>
          </view>
        </view>

        <!-- Logout Footer -->
        <view
          class="flex items-center justify-center py-40rpx border-t border-gray-50 flex-shrink-0 bg-white pb-100rpx"
          @click="handleLogout"
        >
          <view class="i-carbon-logout text-gray-600 text-40rpx mr-20rpx" />
          <text class="text-30rpx font-500 text-gray-600">退出登录</text>
        </view>
        <!-- Bottom Tab Safe Spacer -->
        <view class="w-full h-safe flex-shrink-0 bg-white"></view>
      </view>
    </uv-popup>

    <!-- Connection Status (Relation) Modal -->
    <uv-popup
      ref="relationPopup"
      v-model="showRelationModal"
      mode="center"
      round="40rpx"
      :safeAreaInsetBottom="false"
    >
      <view
        class="w-540rpx bg-white p-40rpx flex flex-col relative overflow-hidden"
        style="max-height: 80vh"
      >
        <!-- Modal Header -->
        <view class="flex items-center justify-center mb-30rpx relative flex-shrink-0">
          <text class="text-34rpx font-700 text-[#333]">爱了吗成员关系</text>
          <view
            class="absolute -right-20rpx -top-20rpx p-20rpx text-gray-300 z-10"
            @click="closeRelationModal"
          >
            <view class="i-carbon-close-filled text-48rpx" />
          </view>
        </view>

        <!-- Modal Body: Member List (Scrollable) -->
        <scroll-view
          scroll-y
          class="w-full flex-1 mb-30rpx"
          style="max-height: calc(80vh - 200rpx)"
        >
          <view class="space-y-24rpx pr-10rpx">
            <view
              v-for="(member, idx) in currentGroup?.member_details"
              :key="idx"
              class="flex items-center justify-between py-10rpx"
            >
              <view class="flex items-center">
                <view
                  class="w-70rpx h-70rpx rounded-full bg-gray-50 border-2 border-white shadow-sm overflow-hidden mr-20rpx flex-shrink-0"
                >
                  <image
                    :src="member.avatar || '/static/used-images/default_avatar.png'"
                    class="w-full h-full"
                    mode="aspectFill"
                  />
                </view>
                <view class="flex flex-col">
                  <text class="text-26rpx font-600 text-[#333]">{{ member.name }}</text>
                  <text class="text-20rpx text-pink-400 font-500">
                    连续爱了 {{ member.streak_count || 1 }} 天
                  </text>
                </view>
              </view>
              <!-- Status Indicator -->
              <view class="flex flex-col items-end flex-shrink-0">
                <view class="i-carbon-checkmark-filled text-28rpx text-green-400 opacity-60" />
              </view>
            </view>
          </view>
        </scroll-view>

        <!-- Modal Footer Link -->
        <view class="flex items-center justify-center flex-shrink-0" @click="goToManage">
          <text class="text-26rpx text-gray-400 font-500">管理/解除关系 ></text>
        </view>
      </view>
    </uv-popup>

    <!-- Completion Greeting Modal -->
    <uv-popup
      ref="greetingPopup"
      v-model="showGreetingPopup"
      mode="center"
      round="48rpx"
      :safeAreaInsetBottom="false"
    >
      <view
        class="w-560rpx bg-[#f2f2f4] p-48rpx flex flex-col items-center relative overflow-hidden"
      >
        <view class="mb-32rpx flex flex-col items-center">
          <text class="text-44rpx mb-16rpx">🌟</text>
          <text class="text-36rpx font-700 text-[#333] mb-12rpx">今日份爱意已满员</text>
          <view class="w-80rpx h-4rpx bg-[#4a4e69] rounded-full opacity-20"></view>
        </view>

        <view class="w-full mb-48rpx text-center">
          <text class="text-30rpx text-gray-600 leading-relaxed font-500 italic">
            "{{ currentGreeting }}"
          </text>
        </view>

        <uv-button
          type="primary"
          shape="circle"
          customStyle="background: #4a4e69; border: none; width: 100%; height: 90rpx; font-weight: 700; font-size: 30rpx; letter-spacing: 4rpx;"
          @click="
            showGreetingPopup = false;
            greetingPopup.close();
          "
        >
          收到心意
        </uv-button>
      </view>
    </uv-popup>

    <!-- Edit Name Modal -->
    <uv-popup
      ref="editNamePopup"
      v-model="showEditNamePopup"
      mode="center"
      round="48rpx"
      :safeAreaInsetBottom="false"
    >
      <view
        class="w-560rpx bg-[#f2f2f4] p-48rpx flex flex-col items-center relative overflow-hidden"
      >
        <view class="mb-32rpx flex flex-col items-center">
          <text class="text-32rpx font-700 text-[#333] mb-8rpx">修改姓名</text>
          <text class="text-24rpx text-gray-400">当前：{{ userInfo.name || '未设置' }}</text>
        </view>

        <view class="w-full mb-40rpx">
          <input
            v-model="newName"
            class="w-full h-80rpx bg-white rounded-24rpx px-30rpx text-28rpx border border-gray-100"
            placeholder="请输入新的姓名"
            placeholder-class="text-gray-300"
          />
        </view>

        <uv-button
          type="primary"
          shape="circle"
          customStyle="background: #4a4e69; border: none; width: 100%; height: 80rpx; font-weight: 700; font-size: 28rpx;"
          @click="handleUpdateName"
        >
          确认修改
        </uv-button>
        <view
          class="mt-24rpx"
          @click="
            showEditNamePopup = false;
            editNamePopup.close();
          "
        >
          <text class="text-26rpx text-gray-400">取消</text>
        </view>
      </view>
    </uv-popup>

    <!-- Join Group List Selection Modal -->
    <uv-popup
      ref="joinGroupListPopup"
      v-model="showJoinGroupListPopup"
      mode="center"
      round="48rpx"
      :safeAreaInsetBottom="false"
    >
      <view class="w-600rpx bg-white p-48rpx flex flex-col items-center relative overflow-hidden">
        <view class="mb-40rpx flex flex-col items-center">
          <text class="text-34rpx font-700 text-[#333] mb-12rpx">选择要加入的关系</text>
          <text class="text-24rpx text-gray-400">请选择一个关系发送加入申请</text>
        </view>

        <scroll-view scroll-y class="w-full max-h-500rpx mb-40rpx">
          <view class="space-y-20rpx">
            <view
              v-for="g in targetUserGroups"
              :key="g.id"
              class="w-full p-30rpx bg-gray-50 rounded-24rpx border border-gray-100 flex items-center justify-between active:bg-gray-100 transition-colors"
              @click="submitJoinRequest(g)"
            >
              <view class="flex flex-col items-start">
                <text class="text-30rpx font-700 text-[#333] mb-4rpx">{{ g.name }}</text>
                <view class="flex items-center">
                  <view
                    class="w-12rpx h-12rpx rounded-full mr-12rpx"
                    :class="g.group_type === 10 ? 'bg-pink-400' : 'bg-blue-400'"
                  ></view>
                  <text class="text-22rpx text-gray-400">
                    {{ g.group_type === 10 ? '爱情' : g.group_type === 20 ? '友情' : '个人' }} ·
                    {{ g.member_count }}人
                  </text>
                </view>
              </view>
              <view class="i-carbon-chevron-right text-gray-300 text-36rpx" />
            </view>
            <view
              v-if="targetUserGroups.length === 0"
              class="py-40rpx text-center text-gray-300 text-26rpx"
            >
              该用户暂无公开关系
            </view>
          </view>
        </scroll-view>

        <uv-button
          type="default"
          shape="circle"
          customStyle="width: 100%; height: 80rpx; border: 1px solid #eee; font-size: 28rpx; color: #999;"
          @click="
            showJoinGroupListPopup = false;
            joinGroupListPopup.close();
          "
        >
          取消
        </uv-button>
      </view>
    </uv-popup>

    <!-- Global Join Request Popup -->
    <JoinRequestPopup />
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/store'
import { onLoad, onShow, onHide, onUnload } from '@dcloudio/uni-app'
import {
  getGroupListAPI,
  checkInAPI,
  getCheckInHistoryAPI,
  joinGroupByEmailAPI,
  updateUserInfoAPI,
  remindGroupAPI,
  getNotificationsAPI,
  searchUsersAPI,
  getUserGroupsAPI,
  applyToJoinAPI,
  handleJoinRequestAPI,
} from '@/service/signin'
import { useGlobalStore } from '@/store/global'
import ParticleHeart from '@/components/ParticleHeart.vue'
import BottomNav from '@/components/BottomNav.vue'
import JoinRequestPopup from '@/components/JoinRequestPopup.vue'
import dayjs from 'dayjs'

const userStore = useUserStore()
const globalStore = useGlobalStore()

// 核心：监听全局刷新信号，自动重置界面状态并加载数据
watch(
  () => globalStore.refreshId,
  (newVal) => {
    if (newVal > 0) {
      console.log('首页响应全局刷新信号:', newVal)
      // 1. 关闭搜索/强入模式
      isForceJoin.value = false

      // 2. 延迟刷新数据（关键）：防止推送比后端 DB 事务提交更早到达
      setTimeout(() => {
        loadLatestGroup()
        fetchUnreadStatus()
      }, 800)
    }
  },
)

const userInfo = ref({})
const isInitLoaded = ref(false)
const isForceJoin = ref(false)
const groupList = ref([])
const currentIndex = ref(0)
const isCheckedIn = ref(false)
const showDrawer = ref(false)
const showRelationModal = ref(false)
const popup = ref(null)
const relationPopup = ref(null)
const greetingPopup = ref(null)
const hasUnreadMessages = ref(false)
const currentGreeting = ref('')
const joinEmail = ref('')
const showEditNamePopup = ref(false)
const editNamePopup = ref(null)
const newName = ref('')

const suggestions = ref([])
const showSuggestions = ref(false)
let searchTimer = null

// 加入申请相关状态
const targetUserGroups = ref([])
const showJoinGroupListPopup = ref(false)
const joinGroupListPopup = ref(null)

const incomingRequest = ref(null)
const showApprovePopup = ref(false)
const approvePopup = ref(null)

const openDrawer = () => {
  showDrawer.value = true
  if (popup.value) {
    popup.value.open()
  }
}

const openRelationModal = () => {
  showRelationModal.value = true
  if (relationPopup.value) {
    relationPopup.value.open()
  }
}

const closeRelationModal = () => {
  showRelationModal.value = false
  if (relationPopup.value) {
    relationPopup.value.close()
  }
}

const currentGroup = computed(() => {
  return groupList.value[currentIndex.value] || null
})

const streakCount = computed(() => {
  return currentGroup.value?.streak_count || 0
})

const totalDays = computed(() => {
  return currentGroup.value?.total_days || 0
})

const uncompletedCount = computed(() => {
  if (!currentGroup.value) return 0
  const total = currentGroup.value.member_count || 0
  const done = currentGroup.value.checked_in_count || 0
  return Math.max(0, total - done)
})

const displayRelationNames = computed(() => {
  if (!currentGroup.value || !currentGroup.value.member_details) return ''

  const myId = userStore.userInfo?.userId || userStore.userInfo?.id
  const others = currentGroup.value.member_details.filter((m) => String(m.id) !== String(myId))

  if (others.length === 0) return ''

  if (currentGroup.value.member_count === 2) {
    const other = others[0]
    return other?.nickName || other?.nickname || other?.name || '对方'
  } else {
    const names = others.slice(0, 2).map((o) => o.nickName || o.nickname || o.name || '成员')
    return names.join('、') + (others.length > 2 ? ' 等人' : '')
  }
})

const fetchUnreadStatus = async () => {
  try {
    const res = await getNotificationsAPI()
    const list = res.data?.results || res.data || []
    hasUnreadMessages.value = list.some((n) => !n.is_read)
  } catch (e) {
    console.error(e)
  }
}

onShow(() => {
  // Refresh user info from store in case it updated
  userInfo.value = userStore.userInfo || {}
  loadLatestGroup()
  fetchUnreadStatus()
})

onLoad(() => {
  // onLoad logic
})

onUnload(() => {
  // onUnload logic
})

const loadLatestGroup = async () => {
  try {
    const res = await getGroupListAPI()
    const list = res.data?.results || res.data || []
    groupList.value = list

    if (list.length > 0) {
      // Check for pinned group and set as current index
      const pId = uni.getStorageSync('pinnedGroupId')
      if (pId) {
        const pinnedIndex = list.findIndex((g) => String(g.id) === String(pId))
        if (pinnedIndex !== -1) {
          currentIndex.value = pinnedIndex
        }
      }
      isCheckedIn.value = list[currentIndex.value]?.is_checked_in_today || false
    }
  } catch (e) {
    console.error(e)
  } finally {
    isInitLoaded.value = true
  }
}

const handleSwiperChange = (e) => {
  currentIndex.value = e.detail.current
  const current = groupList.value[currentIndex.value]
  if (current) {
    isCheckedIn.value = current.is_checked_in_today || false
  }
}

const getDisplayNames = (group) => {
  if (!group || !group.member_details) return ''

  const myId = userStore.userInfo?.userId || userStore.userInfo?.id
  const others = group.member_details.filter((m) => String(m.id) !== String(myId))

  if (others.length === 0) return ''

  if (group.member_count === 2) {
    const other = others[0]
    return other?.nickName || other?.nickname || other?.name || '对方'
  } else {
    const names = others.slice(0, 2).map((o) => o.nickName || o.nickname || o.name || '成员')
    return names.join('、') + (others.length > 2 ? ' 等人' : '')
  }
}

const goToDetail = () => {
  if (currentGroup.value) {
    uni.navigateTo({
      url: `/pages/group/detail?id=${currentGroup.value.id}&name=${encodeURIComponent(currentGroup.value.name)}`,
    })
  }
}

const handleCheckIn = async () => {
  // 强制刷新：只要点击就开始拉取新数据（包含随机文案）
  loadLatestGroup()

  if (!currentGroup.value) {
    // 关闭抽屉
    showDrawer.value = false
    if (popup.value) popup.value.close()

    uni.showToast({ title: '请先在页面加入或创建关系', icon: 'none' })
    return
  }

  // If everyone is done, or user is already done, show toast but still refresh for new greeting
  if (isCheckedIn.value && uncompletedCount.value === 0) {
    uni.showToast({ title: '今日爱意已发送', icon: 'success' })
    return
  }

  if (isCheckedIn.value) {
    uni.showToast({ title: '今日爱意已发送', icon: 'none' })
    return
  }

  uni.showLoading({ title: '爱意发送中...' })
  try {
    const res = await checkInAPI(currentGroup.value.id)

    // 如果签到后群组已满员，展示文案弹窗
    if (res.data?.is_complete && res.data?.greeting) {
      currentGreeting.value = res.data.greeting
      setTimeout(() => {
        if (greetingPopup.value) {
          greetingPopup.value.open()
        }
      }, 300)
    } else {
      uni.showToast({ title: '爱意已发送', icon: 'success' })
    }

    isCheckedIn.value = true
    // Refresh to update counts
    loadLatestGroup()
  } catch (e) {
    // Correctly parse message from backend response object
    const errorMsg = e.data?.msg || e.msg || '爱意发送失败'

    if (errorMsg.includes('已发送')) {
      uni.showToast({ title: '今日已发送', icon: 'none' })
      isCheckedIn.value = true
      // Redundant state sync
      if (currentGroup.value) loadLatestGroup()
    } else {
      // If http.ts already showed a toast, we might be double-toasting here.
      // But we use the real error message now.
      uni.showToast({ title: errorMsg, icon: 'none' })
    }
  } finally {
    uni.hideLoading()
  }
}

const editName = () => {
  newName.value = userInfo.value.name || ''
  showEditNamePopup.value = true
  if (editNamePopup.value) {
    editNamePopup.value.open()
  }
}

const handleUpdateName = async () => {
  if (!newName.value) {
    uni.showToast({ title: '请输入姓名', icon: 'none' })
    return
  }
  try {
    uni.showLoading({ title: '修改中' })
    await updateUserInfoAPI({ name: newName.value })
    userInfo.value.name = newName.value
    userStore.userInfo.name = newName.value
    userStore.userInfo.nickname = newName.value

    uni.showToast({ title: '修改成功', icon: 'success' })
    showEditNamePopup.value = false
    if (editNamePopup.value) {
      editNamePopup.value.close()
    }
  } catch (e) {
    uni.showToast({ title: e.msg || '修改失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

const editGroupEmail = () => {
  uni.showModal({
    title: '切换/加入群组',
    editable: true,
    placeholderText: '请输入对方的邮箱',
    content: '',
    success: async (res) => {
      if (res.confirm && res.content) {
        if (!res.content.includes('@')) {
          uni.showToast({ title: '邮箱格式不正确', icon: 'none' })
          return
        }
        try {
          uni.showLoading({ title: '加入中' })
          await joinGroupByEmailAPI({ email: res.content })
          uni.showToast({ title: '加入成功', icon: 'success' })
          // Refresh group info
          setTimeout(() => {
            loadLatestGroup()
          }, 500)
        } catch (e) {
          uni.showToast({ title: e.msg || '加入失败', icon: 'none' })
        } finally {
          uni.hideLoading()
        }
      }
    },
  })
}

const handleJoin = async () => {
  if (!joinEmail.value) {
    uni.showToast({ title: '请输入邮箱/用户名', icon: 'none' })
    return
  }

  try {
    uni.showLoading({ title: '获取关系中...' })
    // 先获取该用户拥有的群组
    const res = await getUserGroupsAPI({ email: joinEmail.value })
    targetUserGroups.value = res.data || []

    if (targetUserGroups.value.length === 0) {
      uni.showToast({ title: '该用户目前没有可加入的关系', icon: 'none' })
      return
    }

    // 打开选择弹窗
    showJoinGroupListPopup.value = true
    if (joinGroupListPopup.value) {
      joinGroupListPopup.value.open()
    }
  } catch (e) {
    uni.showToast({ title: e.msg || '获取失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

const submitJoinRequest = async (group) => {
  try {
    uni.showLoading({ title: '提交申请中...' })
    await applyToJoinAPI(group.id)
    uni.showToast({ title: '申请已发送', icon: 'success' })

    // 关闭选择窗口
    showJoinGroupListPopup.value = false
    if (joinGroupListPopup.value) {
      joinGroupListPopup.value.close()
    }

    // 清空输入
    joinEmail.value = ''
    isForceJoin.value = false
  } catch (e) {
    uni.showToast({ title: e.msg || '申请失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

const processRequest = async (action) => {
  if (!incomingRequest.value) return

  try {
    uni.showLoading({ title: '正在处理...' })
    await handleJoinRequestAPI({
      request_id: incomingRequest.value.request_id,
      action,
    })

    uni.showToast({ title: action === 'approve' ? '已同意' : '已拒绝', icon: 'none' })

    // 关闭窗口
    showApprovePopup.value = false
    if (approvePopup.value) {
      approvePopup.value.close()
    }

    // 如果是同意，直接刷新群组列表
    if (action === 'approve') {
      loadLatestGroup()
    }
  } catch (e) {
    uni.showToast({ title: e.msg || '处理失败', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

const onSearchInput = (e) => {
  const val = e.detail.value
  console.log('Search input value:', val)
  if (searchTimer) clearTimeout(searchTimer)

  if (!val || val.length < 1) {
    suggestions.value = []
    showSuggestions.value = false
    return
  }

  searchTimer = setTimeout(async () => {
    try {
      console.log('Firing search API for:', val)
      const res = await searchUsersAPI(val)
      suggestions.value = res.data || []
      showSuggestions.value = suggestions.value.length > 0
      console.log(
        'Suggestions updated:',
        suggestions.value.length,
        'showSuggestions:',
        showSuggestions.value,
      )
    } catch (e) {
      console.error('Search failed', e)
    }
  }, 500)
}

const selectUser = (user) => {
  joinEmail.value = user.email
  suggestions.value = []
  showSuggestions.value = false
}

const goToManage = () => {
  // Force close popups
  if (relationPopup.value) {
    relationPopup.value.close()
  }
  if (popup.value) {
    popup.value.close()
  }
  showRelationModal.value = false
  showDrawer.value = false
  uni.navigateTo({
    url: '/pages/index/manage',
  })
}

const goToMessages = () => {
  if (popup.value) {
    popup.value.close()
  }
  showDrawer.value = false
  hasUnreadMessages.value = false
  uni.navigateTo({
    url: '/pages/index/messages',
  })
}

const handleRemind = async () => {
  if (!currentGroup.value) return

  uni.showLoading({ title: '正在提醒...' })
  try {
    const res = await remindGroupAPI(currentGroup.value.id)
    uni.showToast({
      title: res.msg || '已发送提醒',
      icon: 'success',
    })
  } catch (e) {
    console.error(e)
    // Correctly parse message from backend response object
    const errorMsg = e.data?.msg || e.msg || '提醒失败'
    uni.showToast({ title: errorMsg, icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

const handleLogout = () => {
  uni.showModal({
    title: '确认退出',
    content: '确定要清除缓存并退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        try {
          // Stop WebSocket
          closeWebSocket()

          // Clear store using available methods
          userStore.clearUserInfo()
          userStore.reset()
          // Clear local storage
          uni.clearStorageSync()
          // Redirect
          uni.reLaunch({
            url: '/pages/login/index',
            success: () => {
              console.log('Redirect to login success')
            },
            fail: (err) => {
              console.error('Redirect to login failed', err)
              uni.showToast({ title: '跳转失败: ' + JSON.stringify(err), icon: 'none' })
            },
          })
        } catch (e) {
          console.error('Logout error', e)
          uni.showToast({ title: '退出失败', icon: 'none' })
        }
      }
    },
  })
}

// WebSocket Implementation
let socketTask = null
let socketReconnectTimer = null

const connectWebSocket = () => {
  if (socketTask) return
  const baseUrl = import.meta.env.VITE_SERVER_BASEURL || 'http://127.0.0.1:8000'
  const token = userStore.userInfo.token
  if (!token) return

  // Convert http/https to ws/wss
  const wsUrl = baseUrl.replace(/^http/, 'ws') + `/ws/${token}/`

  console.log('Connecting to WebSocket:', wsUrl)

  socketTask = uni.connectSocket({
    url: wsUrl,
    success: () => {
      console.log('WebSocket connection initiated')
    },
    fail: (err) => {
      console.error('WebSocket connection failed', err)
      socketTask = null
      reconnectWebSocket()
    },
  })

  socketTask.onOpen((res) => {
    console.log('WebSocket Open', res)
    // Clear reconnect timer if any
    if (socketReconnectTimer) {
      clearTimeout(socketReconnectTimer)
      socketReconnectTimer = null
    }
  })

  socketTask.onMessage((res) => {
    // console.log('WebSocket Message', res.data)
    try {
      const data = JSON.parse(res.data)
      // Backend sends: {"type": "push.message", "json": {...}}
      // Or simpler custom format.
      // Check websocketConfig.pyset_message format or notify_users format.
      // notify_users sends: { "type": "push.message", "json": { "type": "group_update", "groupId": ... }}

      // Wait, Channel layer group_send calls "push.message" method on Consumer?
      // "type": "push.message" in group_send usually maps to push_message method in consumer.
      // In Consumer (MegCenter): `await self.send(text_data=json.dumps(message))` where message is event['json'].
      // So data received here IS event['json'].

      // 处理实时签到更新
      if (data.type === 'group_update' || data.contentType === 'group_update') {
        console.log('Received group update via WebSocket', data)
        loadLatestGroup()
      }

      // 处理群组打卡满员
      if (data.type === 'group_completion') {
        console.log('Received group completion via WebSocket', data)
        loadLatestGroup()
        if (data.greeting) {
          currentGreeting.value = data.greeting
          if (greetingPopup.value) {
            greetingPopup.value.open()
          }
        }
      }

      // 处理离线期间的待发送文案
      if (data.type === 'pending_greeting') {
        console.log('Received pending greeting:', data)
        loadLatestGroup()

        if (data.greeting) {
          currentGreeting.value = data.greeting
          if (greetingPopup.value) {
            greetingPopup.value.open()
          }
        }
      }

      // 处理新提醒通知
      if (data.type === 'new_notification') {
        console.log('Received new notification via WebSocket')
        hasUnreadMessages.value = true

        // 收到新通知时也主动刷新一下数据，确保心形状态是最新的
        loadLatestGroup()

        if (data.content) {
          uni.showToast({
            title: data.content,
            icon: 'none',
            duration: 3000,
          })
        }
      }

      // 处理加入申请 (对接收方)
      if (data.type === 'join_request') {
        console.log('Received join request via WebSocket', data)
        incomingRequest.value = data
        showApprovePopup.value = true
        if (approvePopup.value) {
          approvePopup.value.open()
        }
      }

      // 处理申请通过 (对发起方)
      if (data.type === 'join_approved') {
        console.log('Join request approved!', data)
        uni.showToast({ title: data.msg || '加入关系申请已通过', icon: 'success' })
        loadLatestGroup()
      }
    } catch (e) {
      console.error('WebSocket message parse error', e)
    }
  })

  socketTask.onError((err) => {
    console.error('WebSocket Error', err)
    socketTask = null
    reconnectWebSocket()
  })

  socketTask.onClose(() => {
    console.log('WebSocket Closed')
    socketTask = null
    reconnectWebSocket()
  })
}

const reconnectWebSocket = () => {
  if (socketReconnectTimer) return
  if (!userStore.isLogined) return

  socketReconnectTimer = setTimeout(() => {
    console.log('Reconnecting WebSocket...')
    socketReconnectTimer = null
    connectWebSocket()
  }, 5000)
}

const closeWebSocket = () => {
  if (socketReconnectTimer) {
    clearTimeout(socketReconnectTimer)
    socketReconnectTimer = null
  }
  if (socketTask) {
    socketTask.close()
    socketTask = null
  }
}
</script>

<style lang="scss" scoped>
:deep(page),
page {
  position: fixed !important;
  top: 0;
  left: 0;
  box-sizing: border-box !important;
  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden !important;
  background-color: #fff !important;
}
/* Custom icons or tweaks if needed */
.i-carbon-menu,
.i-carbon-information,
.i-carbon-checkmark,
.i-carbon-favorite,
.i-carbon-share,
.i-carbon-chevron-left,
.i-carbon-chevron-right {
  display: inline-block;
}
</style>
