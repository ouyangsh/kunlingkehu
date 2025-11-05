/**
 * 登录状态等待工具
 * 用于在登录完成后再执行某些操作
 */

let loginPromise = null
let isLoginCompleted = false

/**
 * 设置登录Promise
 * 在App.vue中调用autoLogin时设置
 */
export const setLoginPromise = (promise) => {
  loginPromise = promise

  // 监听登录完成
  promise
    .then(() => {
      isLoginCompleted = true
      console.log('登录状态已完成')
    })
    .catch(() => {
      isLoginCompleted = true // 即使登录失败也标记为完成
      console.log('登录失败，但标记为完成')
    })
}

/**
 * 等待登录完成
 * 如果登录已完成，立即返回
 * 如果登录未完成，等待登录Promise完成
 */
export const waitForLogin = async () => {
  if (isLoginCompleted) {
    console.log('登录已完成，无需等待')
    return Promise.resolve()
  }

  if (loginPromise) {
    console.log('等待登录完成...')
    try {
      await loginPromise
      console.log('登录等待完成')
    } catch (error) {
      console.log('登录等待结束（登录失败）')
    }
    return Promise.resolve()
  }

  // 如果没有登录Promise，直接返回
  console.log('没有登录Promise，直接返回')
  return Promise.resolve()
}

/**
 * 检查是否已登录完成
 */
export const isLoginReady = () => {
  return isLoginCompleted
}
