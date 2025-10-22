import { useUserStore } from '@/store'
import { wechatLoginAPI } from '@/service/auth'

/**
 * 自动登录函数
 * 在应用启动时调用，实现微信静默登录
 */
export const autoLogin = async () => {
  const userStore = useUserStore()

  // 如果已经登录，直接返回
  // if (userStore.isLogined) {
  //   console.log('用户已登录，跳过自动登录')
  //   return { success: true, message: '用户已登录' }
  // }

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
      source: 'wechat_mini_program', // 固定
      socialCode: loginRes.code, // 授权code
      socialState: 'state', // 固定
      clientId: 'e5cd7e4891bf95d1d19206ce24a7b32e', // 固定
      grantType: 'social', // 固定
    }

    console.log('准备调用自动登录API:', loginParams)

    const response = await wechatLoginAPI(loginParams)
    // response = {
    //   code: 200,
    //   msg: '操作成功',
    //   data: {
    //     scope: null,
    //     openid: null,
    //     userId: 1,
    //     access_token:
    //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJLQW1JcDZmUGNoZkJSdUpOdHpxRENlTzFxd1FzNE1oTyIsImNsaWVudGlkIjoiZTVjZDdlNDg5MWJmOTVkMWQxOTIwNmNlMjRhN2IzMmUiLCJ0ZW5hbnRJZCI6IjAwMDAwMCIsImNvbXBhbnlOYW1lIjoi5rW35ZCM56eR5oqAIiwidXNlcklkIjoxLCJ1c2VyTmFtZSI6ImFkbWluIiwiZGVwdElkIjoxMDMsImRlcHROYW1lIjoi56CU5Y-R6YOo6ZeoIiwiZGVwdENhdGVnb3J5IjoiIn0.tj46gpPQAuQN0xBk_l4MOC9mOW7xMaypmh8UBToD4lk',
    //     refresh_token: null,
    //     expire_in: 604799,
    //     refresh_expire_in: null,
    //     client_id: 'e5cd7e4891bf95d1d19206ce24a7b32e',
    //   },
    // }
    console.log('自动登录API响应:', response)

    const accessToken = response && response.data && response.data.access_token
    const refreshToken = response && response.data && response.data.refresh_token

    if (accessToken) {
      // 保存用户信息（合并现有信息，避免覆盖详细信息）
      const currentUserInfo = userStore.userInfo
      userStore.setUserInfo({
        ...currentUserInfo, // 保留现有的详细信息
        token: accessToken,
        refreshToken,
        userId: response.data.userId,
        openid: response.data.openid ?? null,
        scope: response.data.scope ?? null,
        expireIn: response.data.expire_in,
        refreshExpireIn: response.data.refresh_expire_in ?? null,
        clientId: response.data.client_id,
        isAutoLogin: true,
      })

      console.log('自动登录成功')
      return { success: true, message: response.msg || '登录成功' }
    } else {
      // 登录失败，抛出错误让catch处理跳转
      throw new Error(response?.msg || '自动登录失败')
    }
  } catch (error) {
    console.error('自动登录失败:', error)

    // 自动登录失败时，跳转到登录页面
    console.log('自动登录失败，准备跳转到登录页面')
    try {
      uni.navigateTo({
        url: '/pages/login/index',
      })
      console.log('已跳转到登录页面')
    } catch (navError) {
      console.error('跳转到登录页面失败:', navError)
    }

    // 对于特定的网络错误，可以设置游客模式
    if (error.message && (error.message.includes('授权码') || error.message.includes('网络'))) {
      console.log('网络相关错误，设置为游客模式')
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

    const accessToken = response && response.data && response.data.access_token
    const refreshToken = response && response.data && response.data.refresh_token
    if (accessToken) {
      // 保存用户信息（合并现有信息，避免覆盖详细信息）
      const currentUserInfo = userStore.userInfo
      userStore.setUserInfo({
        ...currentUserInfo, // 保留现有的详细信息
        token: accessToken,
        refreshToken,
        userId: response.data.userId,
        openid: response.data.openid ?? null,
        scope: response.data.scope ?? null,
        expireIn: response.data.expire_in,
        refreshExpireIn: response.data.refresh_expire_in ?? null,
        clientId: response.data.client_id,
        isAutoLogin: false,
      })

      uni.showToast({
        title: response.msg || '登录成功',
        icon: 'success',
      })

      // 登录成功后获取用户详细信息
      try {
        await userStore.fetchUserInfo()
        console.log('微信登录后用户详细信息获取成功')
      } catch (error) {
        console.error('微信登录后获取用户详细信息失败:', error)
        // 不影响登录流程，只记录错误
      }

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
