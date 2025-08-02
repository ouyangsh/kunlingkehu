import { useUserStore } from '@/store'
import { wechatLoginAPI } from '@/service/auth'

/**
 * 自动登录函数
 * 在应用启动时调用，实现微信静默登录
 */
export const autoLogin = async () => {
  const userStore = useUserStore()

  // 如果已经登录，直接返回
  if (userStore.isLogined) {
    console.log('用户已登录，跳过自动登录')
    return { success: true, message: '用户已登录' }
  }

  try {
    console.log('开始自动登录...')

    // 1. 先尝试获取微信登录code
    const loginRes = await uni.login({
      provider: 'weixin',
    })

    console.log('获取微信登录code结果:', loginRes)

    if (!loginRes || !loginRes.code) {
      throw new Error('获取微信授权码失败')
    }

    // 2. 尝试静默登录（不获取用户信息，使用默认信息）
    const loginParams = {
      code: loginRes.code,
      user_info: {
        nickName: '微信用户',
        avatarUrl: '',
        gender: 0,
        city: '',
        province: '',
        country: '',
      },
    }

    console.log('准备调用自动登录API:', loginParams)

    const response = await wechatLoginAPI(loginParams)

    console.log('自动登录API响应:', response)

    if (response.data && response.data.access) {
      // 保存用户信息
      userStore.setUserInfo({
        nickname: response.data.name || '微信用户',
        avatar: response.data.avatar || '',
        token: response.data.access,
        refreshToken: response.data.refresh,
        userId: response.data.userId,
        username: response.data.username,
        userType: response.data.user_type,
        roleInfo: response.data.role_info || [],
        isAutoLogin: true, // 标记为自动登录
      })

      console.log('自动登录成功')
      return { success: true, message: '自动登录成功' }
    } else {
      throw new Error(response.msg || '自动登录失败')
    }
  } catch (error) {
    console.error('自动登录失败:', error)

    // 自动登录失败时，设置游客模式（可选）
    if (error.message.includes('授权码') || error.message.includes('网络')) {
      console.log('设置为游客模式')
      userStore.setUserInfo({
        nickname: '游客用户',
        avatar: '',
        token: 'guest_token_' + Date.now(),
        isGuest: true,
        isAutoLogin: true,
      })
      return { success: false, message: '已设置为游客模式' }
    }

    return { success: false, message: error.message || '自动登录失败' }
  }
}

/**
 * 手动触发微信授权登录
 * 当用户需要获取完整用户信息时调用
 */
export const manualWechatLogin = async () => {
  const userStore = useUserStore()

  try {
    console.log('开始手动微信登录...')

    // 1. 获取用户信息（需要用户授权）
    const userProfileRes = await uni.getUserProfile({
      desc: '用于完善用户资料',
    })

    console.log('用户信息结果:', userProfileRes)

    if (!userProfileRes || !userProfileRes.userInfo) {
      throw new Error('获取用户信息失败')
    }

    const { userInfo } = userProfileRes

    // 2. 获取微信登录code
    const loginRes = await uni.login({
      provider: 'weixin',
    })

    console.log('微信登录结果:', loginRes)

    if (!loginRes || !loginRes.code) {
      throw new Error('获取微信授权码失败')
    }

    // 3. 调用登录接口
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

    console.log('准备调用手动登录API:', loginParams)

    const response = await wechatLoginAPI(loginParams)

    console.log('手动登录API响应:', response)

    if (response.data && response.data.access) {
      // 保存完整用户信息
      userStore.setUserInfo({
        nickname: response.data.name || userInfo.nickName,
        avatar: response.data.avatar || userInfo.avatarUrl,
        token: response.data.access,
        refreshToken: response.data.refresh,
        userId: response.data.userId,
        username: response.data.username,
        userType: response.data.user_type,
        roleInfo: response.data.role_info || [],
        gender: userInfo.gender,
        city: userInfo.city,
        province: userInfo.province,
        country: userInfo.country,
        isAutoLogin: false,
      })

      uni.showToast({
        title: response.msg || '登录成功',
        icon: 'success',
      })

      return { success: true, message: '手动登录成功' }
    } else {
      throw new Error(response.msg || '登录失败')
    }
  } catch (error) {
    console.error('手动登录失败:', error)
    uni.showToast({
      title: error.message || '登录失败，请重试',
      icon: 'none',
    })
    return { success: false, message: error.message || '手动登录失败' }
  }
}

/**
 * 检查登录状态
 */
export const checkLoginStatus = () => {
  const userStore = useUserStore()
  return {
    isLogined: userStore.isLogined,
    userInfo: userStore.userInfo,
    isGuest: userStore.userInfo.isGuest || false,
    isAutoLogin: userStore.userInfo.isAutoLogin || false,
  }
}
