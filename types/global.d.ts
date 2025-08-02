declare type Recordable<T = any> = Record<string, T>

// 用户信息接口
interface IUserInfo {
  nickname?: string
  avatar?: string
  token?: string
  refreshToken?: string
  userId?: number
  username?: string
  userType?: number
  roleInfo?: any[]
  openid?: string
  unionid?: string
  gender?: number
  city?: string
  province?: string
  country?: string
  isGuest?: boolean
  isAutoLogin?: boolean
}

// 微信登录请求参数
interface IWechatLoginParams {
  code: string
  user_info: {
    nickName: string
    avatarUrl: string
    gender: number
    city: string
    province: string
    country: string
  }
}

// 登录响应接口
interface ILoginResponse {
  code: number
  data: {
    access: string
    refresh: string
    username: string
    name: string
    userId: number
    avatar: string
    user_type: number
    pwd_change_count: number
    role_info: any[]
  }
  msg: string
}
