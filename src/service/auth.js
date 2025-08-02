import { http } from '@/utils/http'

/**
 * 微信登录
 * @param {Object} params - 登录参数
 * @param {string} params.code - 微信授权码
 * @param {Object} params.user_info - 用户信息
 * @param {string} params.user_info.nickName - 用户昵称
 * @param {string} params.user_info.avatarUrl - 头像URL
 * @param {number} params.user_info.gender - 性别
 * @param {string} params.user_info.city - 城市
 * @param {string} params.user_info.province - 省份
 * @param {string} params.user_info.country - 国家
 * @returns {Promise} 登录响应
 */
export const wechatLoginAPI = (params) => {
  return http({
    url: 'http://127.0.0.1:8000/api/wechat/login/',
    method: 'POST',
    data: params,
  })
}

/**
 * 退出登录
 * @returns {Promise}
 */
export const logoutAPI = () => {
  return http({
    url: '/logout',
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
