
/**
 * 自动登录函数
 * 因移除微信登录，目前暂无需自动登录逻辑
 * 或后续可改为 token 校验逻辑
 */
export const autoLogin = async () => {
  return Promise.resolve()
}

export const manualWechatLogin = async () => {
  console.warn('微信登录已移除')
  return Promise.resolve({ success: false, message: '微信登录已移除' })
}

export const checkLoginStatus = () => {
  return {}
}

