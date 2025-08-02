<route lang="json5">
{
  style: {
    navigationBarTitleText: '用户中心',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="用户中心">
    <div class="user-center-container px-30rpx">
      <!-- 用户信息卡片 -->
      <div class="user-card bg-white rounded-16rpx p-30rpx mb-30rpx">
        <div class="flex items-center">
          <!-- 头像 -->
          <image
            :src="userInfo.avatar || '/static/icons/default-avatar.png'"
            class="w-100rpx h-100rpx rounded-50rpx mr-30rpx"
            mode="aspectFill"
          />

          <!-- 用户信息 -->
          <div class="flex-1">
            <text class="text-32rpx font-600 text-black mb-10rpx block">
              {{ userInfo.nickname || '未登录用户' }}
            </text>
            <text v-if="userInfo.isGuest" class="text-24rpx text-orange-500">游客身份</text>
            <text v-else-if="userInfo.username" class="text-24rpx text-gray-500">
              {{ userInfo.username }}
            </text>
            <text v-else-if="userInfo.city" class="text-24rpx text-gray-500">
              {{ userInfo.province }} {{ userInfo.city }}
            </text>
            <text v-else class="text-24rpx text-gray-500">微信用户</text>
            <text v-if="userInfo.userId" class="text-20rpx text-gray-400 mt-5rpx block">
              ID: {{ userInfo.userId }}
            </text>
          </div>

          <!-- 登录状态 -->
          <view
            :class="[
              'px-20rpx py-10rpx rounded-20rpx',
              isLogined ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600',
            ]"
          >
            <text class="text-24rpx">{{ isLogined ? '已登录' : '未登录' }}</text>
          </view>
        </div>
      </div>

      <!-- 功能菜单 -->
      <div class="menu-section">
        <!-- 登录相关 -->
        <div class="menu-group bg-white rounded-16rpx mb-30rpx">
          <div
            v-if="!isLogined"
            @click="manualLogin"
            class="menu-item flex items-center justify-between p-30rpx border-b border-gray-100"
          >
            <div class="flex items-center">
              <text class="text-28rpx">🔑</text>
              <text class="text-30rpx ml-20rpx">授权登录</text>
            </div>
            <text class="text-gray-400">></text>
          </div>

          <div
            v-else-if="userInfo.isAutoLogin"
            @click="upgradeLogin"
            class="menu-item flex items-center justify-between p-30rpx border-b border-gray-100"
          >
            <div class="flex items-center">
              <text class="text-28rpx">⬆️</text>
              <text class="text-30rpx ml-20rpx">完善用户信息</text>
            </div>
            <text class="text-gray-400">></text>
          </div>

          <div
            v-if="isLogined"
            @click="logout"
            class="menu-item flex items-center justify-between p-30rpx"
          >
            <div class="flex items-center">
              <text class="text-28rpx">🚪</text>
              <text class="text-30rpx ml-20rpx">退出登录</text>
            </div>
            <text class="text-gray-400">></text>
          </div>
        </div>

        <!-- 其他功能 -->
        <div class="menu-group bg-white rounded-16rpx mb-30rpx">
          <div
            @click="viewProfile"
            class="menu-item flex items-center justify-between p-30rpx border-b border-gray-100"
          >
            <div class="flex items-center">
              <text class="text-28rpx">👤</text>
              <text class="text-30rpx ml-20rpx">个人资料</text>
            </div>
            <text class="text-gray-400">></text>
          </div>

          <div
            @click="viewSettings"
            class="menu-item flex items-center justify-between p-30rpx border-b border-gray-100"
          >
            <div class="flex items-center">
              <text class="text-28rpx">⚙️</text>
              <text class="text-30rpx ml-20rpx">设置</text>
            </div>
            <text class="text-gray-400">></text>
          </div>

          <div @click="viewHelp" class="menu-item flex items-center justify-between p-30rpx">
            <div class="flex items-center">
              <text class="text-28rpx">❓</text>
              <text class="text-30rpx ml-20rpx">帮助与反馈</text>
            </div>
            <text class="text-gray-400">></text>
          </div>
        </div>

        <!-- 应用信息 -->
        <div class="menu-group bg-white rounded-16rpx">
          <div @click="viewAbout" class="menu-item flex items-center justify-between p-30rpx">
            <div class="flex items-center">
              <text class="text-28rpx">ℹ️</text>
              <text class="text-30rpx ml-20rpx">关于我们</text>
            </div>
            <text class="text-gray-400">></text>
          </div>
        </div>
      </div>

      <!-- 版本信息 -->
      <div class="version-info text-center mt-60rpx">
        <text class="text-24rpx text-gray-400">版本号：1.0.0</text>
      </div>
    </div>
  </buju>
</template>

<script setup lang="js">
import { useUserStore } from '@/store'
import { logoutAPI } from '@/service/auth'
import { manualWechatLogin } from '@/utils/autoLogin'

const userStore = useUserStore()

// 计算属性
const userInfo = computed(() => userStore.userInfo)
const isLogined = computed(() => userStore.isLogined)

// 手动登录（获取用户授权）
const manualLogin = async () => {
  try {
    const result = await manualWechatLogin()
    if (result.success) {
      console.log('手动登录成功')
    } else {
      console.log('手动登录失败:', result.message)
    }
  } catch (error) {
    console.error('手动登录出错:', error)
  }
}

// 升级登录（完善用户信息）
const upgradeLogin = async () => {
  try {
    const result = await uni.showModal({
      title: '完善用户信息',
      content: '获取您的微信头像和昵称，以便提供更好的服务',
    })

    if (result[1].confirm) {
      const loginResult = await manualWechatLogin()
      if (loginResult.success) {
        uni.showToast({
          title: '用户信息已更新',
          icon: 'success',
        })
      }
    }
  } catch (error) {
    console.error('升级登录出错:', error)
  }
}

// 退出登录
const logout = async () => {
  try {
    const result = await uni.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
    })

    if (result[1].confirm) {
      // 调用退出登录API（如果需要）
      try {
        await logoutAPI()
      } catch (error) {
        console.log('退出登录API调用失败，但继续本地退出', error)
      }

      // 清除本地用户信息
      userStore.clearUserInfo()

      uni.showToast({
        title: '已退出登录',
        icon: 'success',
      })
    }
  } catch (error) {
    console.error('退出登录失败:', error)
  }
}

// 查看个人资料
const viewProfile = () => {
  if (!isLogined.value) {
    uni.showToast({
      title: '请先登录',
      icon: 'none',
    })
    return
  }

  const info = userInfo.value
  let content = `昵称：${info.nickname || '未设置'}\n`

  if (info.userId) {
    content += `用户ID：${info.userId}\n`
  }

  if (info.username) {
    content += `用户名：${info.username}\n`
  }

  if (info.gender) {
    content += `性别：${info.gender === 1 ? '男' : info.gender === 2 ? '女' : '未知'}\n`
  }

  if (info.province && info.city) {
    content += `地区：${info.province} ${info.city}\n`
  }

  if (info.userType !== undefined) {
    content += `用户类型：${info.userType}\n`
  }

  if (info.isGuest) {
    content += `身份：游客用户\n`
  }

  uni.showModal({
    title: '个人资料',
    content: content.trim(),
    showCancel: false,
  })
}

// 查看设置
const viewSettings = () => {
  uni.showToast({
    title: '设置功能开发中',
    icon: 'none',
  })
}

// 查看帮助
const viewHelp = () => {
  uni.showToast({
    title: '帮助功能开发中',
    icon: 'none',
  })
}

// 关于我们
const viewAbout = () => {
  uni.showModal({
    title: '关于我们',
    content: '这是一个基于uniapp开发的应用，感谢您的使用！',
    showCancel: false,
  })
}

// 页面加载时检查登录状态
onMounted(() => {
  console.log('用户中心页面加载，当前登录状态：', isLogined.value)
  console.log('用户信息：', userInfo.value)
})
</script>

<style lang="scss" scoped>
.user-center-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.user-card {
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.menu-item {
  transition: background-color 0.2s ease;
}

.menu-item:active {
  background-color: #f5f5f5;
}
</style>
