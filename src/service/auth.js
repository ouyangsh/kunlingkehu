import { http } from '@/utils/http'

// 移除微信登录相关API，仅保留通用或邮箱登录API

/**
 * 退出登录
 * @returns {Promise}
 */
export const logoutAPI = () => {
  return http({
    url: '/api/logout/',
    method: 'POST',
  })
}

/**
 * 获取用户信息
 * @returns {Promise}
 */
export const getUserInfoAPI = () => {
  return http({
    url: '/user/info',
    method: 'GET',
  })
}

/**
 * 获取系统用户详细信息
 * @returns {Promise}
 */
export const getSystemUserInfoAPI = () => {
  return http({
    url: '/system/user/getInfo',
    method: 'GET',
  })
}

/**
 * 发送邮箱验证码
 * @param {{ email: string }} params
 * @returns {Promise}
 */
export const sendEmailCodeAPI = (params) => {
  return http({
    url: '/api/email_code/',
    method: 'POST',
    data: params,
  })
}

/**
 * 邮箱登录
 * @param {{ email: string; code: string }} params
 * @returns {Promise}
 */
export const emailLoginAPI = (params) => {
  return http({
    url: '/api/email_login/',
    method: 'POST',
    data: params,
  })
}

/**
 * 账户注销
 * @returns {Promise}
 */
export const deregisterAPI = () => {
  return http({
    url: '/api/system/user/deregister/',
    method: 'POST',
  })
}
/**
 * 获取协议与条款
 * @param {number} type 10: 隐私政策, 20: 用户协议
 * @returns {Promise}
 */
export const getAgreementAPI = (type) => {
  return http({
    url: '/api/signin/agreement/',
    method: 'GET',
    data: { type },
  })
}
