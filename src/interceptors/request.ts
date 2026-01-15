/* eslint-disable no-param-reassign */
import qs from 'qs'
import { useUserStore } from '@/store'

export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any>
} & IUniUploadFileOptions // 添加uni.uploadFile参数类型

// 请求基地址
const baseURL = import.meta.env.VITE_SERVER_BASEURL

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: CustomRequestOptions) {
    // 接口请求支持通过 query 参数配置 queryString
    if (options.query) {
      const queryStr = qs.stringify(options.query)
      if (options.url.includes('?')) {
        options.url += `&${queryStr}`
      } else {
        options.url += `?${queryStr}`
      }
    }
    // api 目前为 mock 接口，所以无需处理
    if (!options.url.startsWith('http')) {
      // 1. 非 http 开头需拼接地址
      options.url = baseURL + options.url
    }
    // 2. 请求超时（仅在未显式传入时设置默认值）
    options.timeout = options.timeout ?? 10000 // 10s
    // 3. 添加小程序端请求头标识
    options.header = {
      platform: 'mp-weixin', // 可选值与 uniapp 定义的平台一致，告诉后台来源
      clientid: 'e5cd7e4891bf95d1d19206ce24a7b32e',
      ...options.header,
    }
    // 4. 添加 token 请求头标识
    const userStore = useUserStore()
    const { token } = userStore.userInfo
    console.log('请求拦截器 - 用户登录状态:', userStore.isLogined)
    console.log('请求拦截器 - Token:', token ? '已设置' : '未设置')
    if (token && !options.url.includes('/api/email_code') && !options.url.includes('/api/email_login')) {
      options.header.Authorization = `Bearer ${token}`
      console.log('请求拦截器 - Authorization头已设置')
    } else {
      console.warn('请求拦截器 - 未找到token，可能影响API调用')
    }
    console.log('请求拦截器 - 最终请求头:', options.header)
  },
}

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor('request', httpInterceptor)
    // 拦截 uploadFile 文件上传
    uni.addInterceptor('uploadFile', httpInterceptor)
  },
}
