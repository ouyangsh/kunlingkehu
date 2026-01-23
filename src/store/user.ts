import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getSystemUserInfoAPI } from '@/service/auth'

const initState = {
  nickname: '',
  avatar: '',
  token: '',
  refreshToken: '',
  userId: null,
  userName: '',
  nickName: '',
  email: '',
  phonenumber: '',
}

interface IUserInfo {
  token?: string
  refreshToken?: string
  userId?: string | number
  userName?: string
  nickName?: string
  realName?: string
  nickname?: string
  avatar?: string
  email?: string
  phonenumber?: string
  phone?: string
  sex?: string
  deptName?: string
  company?: string
  tenantName?: string
  tenantTypeName?: string
  loginDate?: string
  remark?: string
  roles?: any[]
  permissions?: any[]
  expireDate?: string
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)

    // 获取用户详细信息
    const fetchUserInfo = async () => {
      try {
        console.log('=== fetchUserInfo 开始执行 ===')
        console.log('调用 getSystemUserInfoAPI()...')
        const response = await getSystemUserInfoAPI()
        console.log('getSystemUserInfoAPI 响应：', response)

        if (response.code === 200 && response.data) {
          const userData = response.data.user
          const tenantName = response.data.tenantName
          const tenantTypeName = response.data.tenantTypeName

          // 更新用户信息，保留原有的token等登录信息
          const updatedUserInfo = {
            ...userInfo.value,
            // 从接口返回的用户详细信息
            userId: userData.userId,
            userName: userData.userName,
            nickName: userData.nickName,
            realName: userData.nickName, // 使用nickName作为真实姓名
            email: userData.email,
            phonenumber: userData.phonenumber,
            phone: userData.phonenumber, // 别名
            sex: userData.sex,
            avatar: userData.avatar,
            deptName: userData.deptName,
            company: tenantName || userData.deptName, // 使用租户名称或部门名称作为公司
            tenantName,
            tenantTypeName, // 添加租户类型名称
            loginDate: userData.loginDate,
            remark: userData.remark,
            roles: userData.roles,
            permissions: response.data.permissions,
            // 可以根据需要设置账号期限
            expireDate: '2025-12-31', // 默认期限，可以根据实际业务调整
          }

          setUserInfo(updatedUserInfo)
          console.log('用户详细信息获取成功:', updatedUserInfo)
          return updatedUserInfo
        } else {
          console.error('获取用户信息失败:', response.msg)
          throw new Error(response.msg || '获取用户信息失败')
        }
      } catch (error) {
        console.error('获取用户详细信息失败:', error)
        throw error
      }
    }

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      fetchUserInfo,
    }
  },
  {
    persist: true,
  },
)
