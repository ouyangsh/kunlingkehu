import { http } from '@/utils/http'

/**
 * 获取群组列表
 */
export const getGroupListAPI = () => {
  return http({
    url: `/api/signin/group/?_t=${Date.now()}`,
    method: 'GET',
  })
}

/**
 * 通过邮箱加入对方的群组
 * @param {Object} data { email: string }
 */
export const joinGroupByEmailAPI = (data) => {
  return http({
    url: '/api/signin/group/join_by_email/',
    method: 'POST',
    data,
  })
}

/**
 * 加入群组（通过ID）
 * @param {string|number} id Group ID
 */
export const joinGroupAPI = (id) => {
  return http({
    url: `/api/signin/group/${id}/join/`,
    method: 'POST',
  })
}

/**
 * 签到
 * @param {string|number} id Group ID
 */
export const checkInAPI = (id) => {
  return http({
    url: `/api/signin/group/${id}/checkin/`,
    method: 'POST',
  })
}

/**
 * 获取签到历史
 * @param {string|number} id Group ID
 */
export const getCheckInHistoryAPI = (id) => {
  return http({
    url: `/api/signin/group/${id}/history/`,
    method: 'GET',
  })
}

/**
 * 更新用户信息
 * @param {Object} data { name: string, etc... }
 */
export const updateUserInfoAPI = (data) => {
  return http({
    url: '/api/system/user/update_user_info/',
    method: 'PUT',
    data,
  })
}
/**
 * 提醒群组成员
 * @param {string|number} id Group ID
 */
export const remindGroupAPI = (id) => {
  return http({
    url: `/api/signin/group/${id}/remind/`,
    method: 'POST',
  })
}

/**
 * 获取通知列表
 */
export const getNotificationsAPI = () => {
  return http({
    url: '/api/signin/notification/',
    method: 'GET',
  })
}

/**
 * 标记所有通知为已读
 */
export const markAllNotificationsReadAPI = () => {
  return http({
    url: '/api/signin/notification/mark_all_as_read/',
    method: 'POST',
  })
}

/**
 * 标记单个通知为已读
 */
export const markNotificationReadAPI = (id) => {
  return http({
    url: `/api/signin/notification/${id}/mark_as_read/`,
    method: 'POST',
  })
}
/**
 * 退出群组/解除关系
 */
export const quitGroupAPI = (id) => {
  return http({
    url: `/api/signin/group/${id}/quit/`,
    method: 'POST',
  })
}
/**
 * 注册推送 CID
 * @param {string} cid Client ID
 */
export const registerPushCIDAPI = (cid) => {
  return http({
    url: '/api/signin/push/register_cid/',
    method: 'POST',
    data: { cid },
  })
}

/**
 * 搜索用户（联想功能）
 * @param {string} q 搜索关键词
 */
export const searchUsersAPI = (q) => {
  return http({
    url: `/api/signin/group/search_users/?q=${encodeURIComponent(q)}`,
    method: 'GET',
  })
}

/**
 * 创建群组/关系
 * @param {Object} data { name: string, group_type: number }
 */
export const createGroupAPI = (data) => {
  return http({
    url: '/api/signin/group/',
    method: 'POST',
    data,
  })
}

/**
 * 切换关系的隐藏/显示状态
 * @param {number} groupId
 */
export const toggleGroupVisibilityAPI = (groupId) => {
  return http({
    url: `/api/signin/group/${groupId}/toggle_visibility/`,
    method: 'POST',
  })
}

/**
 * 获取某个人的所有关系群组
 * @param {Object} params { user_id?: number; email?: string }
 */
export const getUserGroupsAPI = (params) => {
  return http({
    url: '/api/signin/group/get_user_groups/',
    method: 'GET',
    query: params,
  })
}

/**
 * 发起加入申请
 * @param {number} groupId 群组ID
 */
export const applyToJoinAPI = (groupId) => {
  return http({
    url: `/api/signin/group/${groupId}/apply_to_join/`,
    method: 'POST',
  })
}

/**
 * 处理加入申请 (同意/拒绝)
 * @param {Object} data { request_id: number; action: 'approve'|'reject'; remark?: string }
 */
export const handleJoinRequestAPI = (data) => {
  return http({
    url: '/api/signin/group/handle_join_request/',
    method: 'POST',
    data,
  })
}
