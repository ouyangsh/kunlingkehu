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

  // 从 /system/user/getInfo 接口获取的详细信息
  realName?: string        // 真实姓名
  nickName?: string        // 昵称
  email?: string           // 邮箱
  phonenumber?: string     // 手机号
  phone?: string           // 手机号（别名）
  sex?: string             // 性别
  deptName?: string        // 部门名称
  company?: string         // 公司/单位
  tenantName?: string      // 租户名称
  loginDate?: string       // 最后登录时间
  expireDate?: string      // 账号期限
  remark?: string          // 备注
  roles?: Array<{          // 角色信息
    roleId: number
    roleName: string
    roleKey: string
    superAdmin?: boolean
  }>
  permissions?: string[]   // 权限列表
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
