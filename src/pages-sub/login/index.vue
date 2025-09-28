<route lang="json5">
{
  style: {
    navigationBarTitleText: '登录',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="登录">
    <div class="login-container px-30rpx">
      <!-- Logo区域 -->
      <div class="logo-section flex flex-col items-center mt-80rpx mb-80rpx">
        <image src="/static/used-images/logo.png" class="w-120rpx h-120rpx rounded-16rpx" mode="aspectFit" />
        <text class="text-36rpx font-600 mt-20rpx">欢迎使用</text>
        <text class="text-26rpx text-gray-500 mt-10rpx">请授权登录后继续使用</text>
      </div>

      <!-- 登录表单区域 -->
      <div class="form-section">
        <!-- 微信授权登录按钮 -->
        <button
          v-if="canIUseGetUserProfile"
          @click="wechatLogin"
          :disabled="isLoading"
          class="login-btn w-full h-88rpx bg-green-500 rounded-16rpx flex justify-center items-center mb-30rpx"
        >
          <image src="/static/used-images/logo.png" class="w-36rpx h-36rpx mr-20rpx" mode="aspectFit" />
          <text class="text-white text-32rpx font-500">
            {{ isLoading ? '登录中...' : '微信授权登录' }}
          </text>
        </button>

        <!-- 手机号登录按钮（如果微信授权不可用） -->
        <button
          v-else
          @click="phoneLogin"
          :disabled="isLoading"
          class="login-btn w-full h-88rpx bg-blue-500 rounded-16rpx flex justify-center items-center mb-30rpx"
        >
          <text class="text-white text-32rpx font-500">
            {{ isLoading ? '登录中...' : '手机号登录' }}
          </text>
        </button>

        <!-- 游客登录 -->
        <button
          @click="guestLogin"
          :disabled="isLoading"
          class="guest-btn w-full h-88rpx bg-gray-100 rounded-16rpx flex justify-center items-center"
        >
          <text class="text-gray-600 text-30rpx">游客登录</text>
        </button>
      </div>

      <!-- 协议区域 -->
      <div class="agreement-section mt-60rpx">
        <div class="flex items-center justify-center">
          <view
            @click="toggleAgreement"
            class="border-2 border-gray-300 border-solid rounded-6rpx mr-16rpx flex justify-center items-center"
            :class="[
              'w-32rpx h-32rpx border-2 rounded-6rpx mr-16rpx flex justify-center items-center',
              isAgreed ? 'bg-blue-500 border-blue-500' : 'border-gray-300',
            ]"
          >
            <text v-if="isAgreed" class="text-white text-20rpx">✓</text>
          </view>
          <text class="text-24rpx text-gray-600">
            我已阅读并同意
            <text @click="showUserAgreement" class="text-blue-500">《用户协议》</text>
            和
            <text @click="showPrivacyPolicy" class="text-blue-500">《隐私政策》</text>
          </text>
        </div>
      </div>
    </div>
  </buju>
</template>

<script setup lang="js">
import { wechatLoginAPI } from '@/service/auth'
import { useUserStore } from '@/store'
import { log } from 'console'

const userStore = useUserStore()

// 响应式数据
const isLoading = ref(false)
const isAgreed = ref(false)
const canIUseGetUserProfile = ref(false)

// 检查微信授权能力
onMounted(() => {
  // 检查是否支持 getUserProfile
  if (uni.getUserProfile) {
    canIUseGetUserProfile.value = true
  }

  // 检查是否已经登录
  if (userStore.isLogined) {
    redirectToTarget()
  }
})

// 切换协议同意状态
const toggleAgreement = () => {
  isAgreed.value = !isAgreed.value
}

// 微信授权登录
const wechatLogin = async () => {
  if (!isAgreed.value) {
    uni.showToast({
      title: '请先同意用户协议和隐私政策',
      icon: 'none',
    })
    return
  }

  if (isLoading.value) return

  try {
    isLoading.value = true

    // 先获取用户信息（必须在用户点击手势中直接调用）
    const userProfileRes = await uni.getUserProfile({
      desc: '用于完善用户资料',
    })

    console.log('用户信息结果:', JSON.stringify(userProfileRes))

    if (!userProfileRes || !userProfileRes.userInfo) {
      throw new Error('获取用户信息失败')
    }

    const { userInfo } = userProfileRes

    // 再获取微信登录code
    const loginRes = await uni.login({
      provider: 'weixin',
    })

    console.log('微信登录结果:', loginRes)

    if (!loginRes || !loginRes.code) {
      throw new Error('获取微信授权码失败')
    }

    // 调用登录接口
    const loginParams = {
      code: loginRes.code,
      user_info: {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        gender: userInfo.gender,
        city: userInfo.city,
        province: userInfo.province,
        country: userInfo.country,
      },
    }

    console.log('准备调用登录API:', loginParams)

    const response = await wechatLoginAPI(loginParams)

    console.log('登录API响应:', response)

    const accessToken = response && response.data && response.data.access_token
    const refreshToken = response && response.data && response.data.refresh_token
    if (accessToken) {
      // 保存用户信息
      userStore.setUserInfo({
        token: accessToken,
        refreshToken,
        userId: response.data.userId,
        openid: response.data.openid ?? null,
        scope: response.data.scope ?? null,
        expireIn: response.data.expire_in,
        refreshExpireIn: response.data.refresh_expire_in ?? null,
        clientId: response.data.client_id,
      })

      uni.showToast({
        title: response.msg || '登录成功',
        icon: 'success',
      })

      // 延迟跳转
      setTimeout(() => {
        redirectToTarget()
      }, 1000)
    } else {
      throw new Error(response.msg || '登录失败')
    }
  } catch (error) {
    console.error('微信登录失败:', error)
    uni.showToast({
      title: error.message || '登录失败，请重试',
      icon: 'none',
    })
  } finally {
    isLoading.value = false
  }
}

// 手机号登录（备用方案）
const phoneLogin = async () => {
  if (!isAgreed.value) {
    uni.showToast({
      title: '请先同意用户协议和隐私政策',
      icon: 'none',
    })
    return
  }

  try {
    const phoneRes = await uni.getPhoneNumber()
    console.log('手机号授权:', phoneRes)
    // 这里可以实现手机号登录逻辑
    uni.showToast({
      title: '手机号登录功能开发中',
      icon: 'none',
    })
  } catch (error) {
    console.error('手机号授权失败:', error)
    uni.showToast({
      title: '授权失败',
      icon: 'none',
    })
  }
}

// 游客登录
const guestLogin = () => {
  if (!isAgreed.value) {
    uni.showToast({
      title: '请先同意用户协议和隐私政策',
      icon: 'none',
    })
    return
  }

  // 设置游客身份
  userStore.setUserInfo({
    nickname: '游客用户',
    avatar: '',
    token: 'guest_token_' + Date.now(),
    isGuest: true,
  })

  uni.showToast({
    title: '游客登录成功',
    icon: 'success',
  })

  setTimeout(() => {
    redirectToTarget()
  }, 1000)
}

// 跳转到目标页面
const redirectToTarget = () => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}

  if (options.redirect) {
    uni.redirectTo({
      url: decodeURIComponent(options.redirect),
    })
  } else {
    // 未带 redirect，使用 reLaunch 进入首页，避免非 tabBar 页切换报错
    uni.reLaunch({ url: '/pages/index/index' })
  }
}

// 显示用户协议
const showUserAgreement = () => {
  uni.showModal({
    title: '用户协议',
    content: '这里是用户协议内容，实际项目中应该跳转到协议页面或显示完整协议内容。',
    showCancel: false,
  })
}

// 显示隐私政策
const showPrivacyPolicy = () => {
  uni.showModal({
    title: '隐私政策',
    content: '这里是隐私政策内容，实际项目中应该跳转到隐私政策页面或显示完整政策内容。',
    showCancel: false,
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  &::before {
    position: absolute;
    inset: 0;
    z-index: 1;
    content: '';
    background: rgb(255 255 255 / 90%);
  }

  .logo-section,
  .form-section,
  .agreement-section {
    position: relative;
    z-index: 2;
  }
}

.login-btn {
  background: linear-gradient(45deg, #1aad19, #2dc653);
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  transition: all 0.3s ease;
}

.guest-btn {
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  transition: all 0.3s ease;
}
</style>
