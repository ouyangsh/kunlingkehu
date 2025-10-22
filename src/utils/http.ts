import { CustomRequestOptions } from '@/interceptors/request'

export const http = <T>(options: CustomRequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<IResData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      async success(res) {
        console.log('HTTP请求响应:', res)

        // 检查HTTP状态码
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 尝试解析响应数据
          const responseData = res.data as IResData<T>
          // 检查业务状态码
          if (responseData && responseData.code === 200) {
            // 2.1 提取核心数据 res.data
            resolve(responseData)
          } else if (responseData && responseData.code === 401) {
            console.log('收到401错误')
            // 401错误直接拒绝，让调用方处理
            reject(res)
          } else {
            // 其他业务错误 -> 根据后端错误信息轻提示
            console.error('业务错误:', responseData)
            uni.showToast({
              icon: 'none',
              title: responseData?.msg || '请求错误',
            })
            reject(res)
          }
        } else {
          // HTTP状态码错误
          console.error('HTTP状态码错误:', res.statusCode, res)
          uni.showToast({
            icon: 'none',
            title: `网络错误 ${res.statusCode}`,
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

// uni.uploadFile封装
export const uniFileUpload = <T>(options: CustomRequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<IResData<T>>((resolve, reject) => {
    uni.uploadFile({
      ...options,
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 文件上传接口的rea.data的类型为string，这里转一下
          const resData = JSON.parse(res.data) as IResData<T>
          resolve(resData)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          // userStore.clearUserInfo()
          // uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          uni.showToast({
            icon: 'none',
            title: '文件上传错误',
          })
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}
