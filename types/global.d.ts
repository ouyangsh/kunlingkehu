declare type Recordable<T = any> = Record<string, T>

// 用户信息接口
interface IUserInfo {
  // 来自接口或登录后的用户会话字段
  token?: string
  refreshToken?: string | null
  userId?: number
  openid?: string | null
  scope?: string | null
  expireIn?: number
  refreshExpireIn?: number | null
  clientId?: string

  // 以下为历史可能存在的扩展字段，按需使用
  nickname?: string
  avatar?: string
  username?: string
  userType?: number
  roleInfo?: any[]
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

// 登录响应接口（服务端可能返回不同风格的字段，均做可选）
interface ILoginResponse {
  code: number
  data: {
    access?: string
    refresh?: string
    access_token?: string
    refresh_token?: string | null
    userId?: number
    openid?: string | null
    scope?: string | null
    expire_in?: number
    refresh_expire_in?: number | null
    client_id?: string

    username?: string
    name?: string
    avatar?: string
    user_type?: number
    pwd_change_count?: number
    role_info?: any[]
  }
  msg: string
}
