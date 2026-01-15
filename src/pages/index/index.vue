<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <view class="page-container">
    <!-- Top Section: User Info -->
    <view class="top-section">
      <view class="user-info-row" @click="editName">
        <text class="label">你的姓名</text>
        <uv-icon name="edit-pen" size="16" color="#999" class="ml-10rpx"></uv-icon>
      </view>
      <view class="user-name-display">{{ userInfo.name || userInfo.nickname || '未设置' }}</view>

      <view class="user-info-row mt-40rpx" @click="editGroupEmail">
        <text class="label">当前所在群组(点击切换)</text>
        <uv-icon name="edit-pen" size="16" color="#999" class="ml-10rpx"></uv-icon>
      </view>
      <view class="user-email-display">{{ currentGroup?.owner_email || '暂无群组' }}</view>
      <view class="text-24rpx text-gray-400 mt-10rpx" v-if="currentGroup">
          输入其他用户的邮箱即可加入其群组
      </view>
    </view>

    <!-- Center Section: Check-in Button -->
    <view class="center-section">
      <view class="current-group-info mb-40rpx text-center" v-if="currentGroup">
          <view class="text-32rpx font-bold mb-10rpx">{{ currentGroup.name }}</view>
          <view class="text-24rpx text-primary bg-primary-50 px-20rpx py-6rpx rounded-full inline-block">
              已签到 {{ currentGroup.checked_in_count }} / {{ currentGroup.member_count }} 人
          </view>
      </view>

      <view class="checkin-btn-outer">
        <view class="checkin-btn-inner" @click="handleCheckIn" :class="{'disabled': !currentGroup}">
          <view class="icon-wrapper">
             <text class="emoji-icon">{{ isCheckedIn ? '✅' : '👻' }}</text>
          </view>
          <text class="btn-text">{{ isCheckedIn ? '已签到' : '今日签到' }}</text>
        </view>
      </view>
      
      <view class="mt-40rpx text-center text-primary" @click="editGroupEmail">
          <text class="text-28rpx underline">切换群组 / 加入新群组</text>
      </view>
    </view>

    <!-- Bottom Section: Notice -->
    <view class="bottom-section">
      <view class="notice-box">
        <view class="notice-icon">!</view>
        <text class="notice-text">多日未签到，系统将以你的名义，在次日邮件通知你的紧急联系人</text>
      </view>

      <view class="agreement-text">
        签到即同意 <text class="link">用户协议</text> 和 <text class="link">隐私政策</text>
      </view>

      <view class="mt-40rpx text-center">
        <button size="mini" type="warn" @click="handleLogout">测试：清除缓存并退出</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getGroupListAPI, checkInAPI, getCheckInHistoryAPI, joinGroupByEmailAPI, updateUserInfoAPI } from '@/service/signin'
import dayjs from 'dayjs'

const userStore = useUserStore()
const userInfo = ref({})
const currentGroup = ref(null)
const isCheckedIn = ref(false)

onShow(() => {
    // Refresh user info from store in case it updated
    userInfo.value = userStore.userInfo || {}
    loadLatestGroup()
    connectWebSocket()
})

onHide(() => {
    closeWebSocket()
})

const loadLatestGroup = async () => {
    try {
        const res = await getGroupListAPI()
        const list = res.data?.results || res.data || []
        if (list.length > 0) {
            currentGroup.value = list[0]
            checkTodayStatus(currentGroup.value.id)
        } else {
            currentGroup.value = null
        }
    } catch (e) {
        console.error(e)
    }
}

const checkTodayStatus = async (groupId) => {
    try {
        const res = await getCheckInHistoryAPI(groupId)
        const list = res.data?.results || res.data || []
        const myId = userStore.userInfo.userId
        const todayStr = dayjs().format('YYYY-MM-DD')
        const found = list.find(item => item.user === myId && item.date === todayStr)
        if (found) {
            isCheckedIn.value = true
        } else {
            isCheckedIn.value = false
        }
    } catch(e) {
        console.error(e)
    }
}

const handleCheckIn = async () => {
    if (!currentGroup.value) {
        uni.showToast({ title: '请先加入一个群组', icon: 'none' })
        editGroupEmail()
        return
    }
    if (isCheckedIn.value) {
         uni.showToast({ title: '今日已签到', icon: 'none' })
         return
    }

    uni.showLoading({ title: '打卡中' })
    try {
        await checkInAPI(currentGroup.value.id)
        uni.showToast({ title: '签到成功', icon: 'success' })
        isCheckedIn.value = true
        // Refresh to update counts
        loadLatestGroup()
    } catch(e) {
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

const editName = () => {
  uni.showModal({
      title: '修改姓名',
      editable: true,
      placeholderText: '请输入新的姓名',
      content: userInfo.value.name || '',
      success: async (res) => {
          if (res.confirm && res.content) {
              try {
                  uni.showLoading({ title: '修改中' })
                  await updateUserInfoAPI({ name: res.content })
                  userInfo.value.name = res.content
                  // Update store if needed, usually requires relogin or store mutation
                  userStore.userInfo.name = res.content
                  userStore.userInfo.nickname = res.content 
                  
                  uni.showToast({ title: '修改成功', icon: 'success' })
              } catch(e) {
                  uni.showToast({ title: e.msg || '修改失败', icon: 'none' })
              } finally {
                  uni.hideLoading()
              }
          }
      }
  })
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
                } catch(e) {
                    uni.showToast({ title: e.msg || '加入失败', icon: 'none' })
                } finally {
                    uni.hideLoading()
                }
            }
        }
    })
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
                        }
                    })
                } catch(e) {
                    console.error('Logout error', e)
                    uni.showToast({ title: '退出失败', icon: 'none' })
                }
            }
        }
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
        }
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
                 console.log('Received group update via WebSocket')
                 loadLatestGroup()
                 
                 // Show greeting if present
                 if (data.greeting) {
                     uni.showToast({
                         title: data.greeting,
                         icon: 'none',
                         duration: 3000
                     })
                 }
            }
            
            // 处理离线期间的待发送文案
            if (data.type === 'pending_greeting') {
                console.log('Received pending greeting:', data)
                loadLatestGroup()
                
                // 显示离线期间的文案
                if (data.greeting) {
                    const checkInUser = data.checkInUser || '群成员'
                    uni.showToast({
                        title: `${checkInUser}的签到: ${data.greeting}`,
                        icon: 'none',
                        duration: 4000
                    })
                }
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
.page-container {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 140rpx 60rpx 60rpx;
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;

  .user-info-row {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;
    margin-bottom: 10rpx;
  }
  
  .user-name-display, .user-email-display {
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
  }
}

.center-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.checkin-btn-outer {
  width: 500rpx;
  height: 500rpx;
  border-radius: 50%;
  background-color: #E8F5E9;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.checkin-btn-inner {
  width: 400rpx;
  height: 400rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #00E676 0%, #00C853 100%);
  box-shadow: 0 10rpx 30rpx rgba(0, 200, 83, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  
  &:active {
      transform: scale(0.95);
      transition: transform 0.1s;
  }

  &.disabled {
      background: #ccc;
      box-shadow: none;
  }
}

.icon-wrapper {
    margin-bottom: 20rpx;
}
.emoji-icon {
    font-size: 80rpx;
}

.btn-text {
  font-size: 40rpx;
  font-weight: bold;
}

.text-primary {
    color: #00C853;
}
.bg-primary-50 {
    background-color: rgba(0, 200, 83, 0.1);
}

.bottom-section {
  margin-top: 80rpx;
}

.notice-box {
  background-color: #F8F9FA;
  padding: 30rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: flex-start;
  margin-bottom: 40rpx;
}

.notice-icon {
  width: 32rpx;
  height: 32rpx;
  background-color: #00C853;
  color: white;
  border-radius: 50%;
  font-size: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20rpx;
  margin-top: 4rpx;
  flex-shrink: 0;
}

.notice-text {
  flex: 1;
  font-size: 26rpx;
  color: #666;
  line-height: 1.5;
}

.agreement-text {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  
  .link {
    color: #00C853;
    margin: 0 6rpx;
  }
}
</style>
