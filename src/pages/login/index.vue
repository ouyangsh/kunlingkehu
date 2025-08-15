<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '账号登录' },
}
</route>

<template>
  <view class="px-40rpx py-40rpx">
    <view class="text-center mt-40rpx mb-60rpx">
      <image src="/static/logo.png" class="w-120rpx h-120rpx rounded-16rpx" mode="aspectFit" />
      <view class="text-36rpx font-600 mt-20rpx">欢迎登录</view>
      <view class="text-26rpx text-gray-500 mt-10rpx">请输入账号和密码</view>
    </view>

    <uv-form ref="formRef" :model="form" :rules="rules" labelWidth="160rpx">
      <uv-form-item label="账号" prop="username">
        <uv-input v-model="form.username" placeholder="请输入账号" clearable />
      </uv-form-item>
      <uv-form-item label="密码" prop="password">
        <uv-input v-model="form.password" placeholder="请输入密码" type="password" clearable />
      </uv-form-item>
    </uv-form>

    <view class="mt-40rpx">
      <uv-button type="primary" :loading="submitting" :disabled="submitting" @click="onSubmit">
        登录
      </uv-button>
    </view>

    <view class="mt-20rpx text-center text-24rpx text-gray-500">
      登录成功后会跳转回拦截前的页面
    </view>
  </view>
</template>

<script lang="ts" setup>
import { currRoute } from '@/utils'
import { useUserStore } from '@/store'
import { accountLoginAPI, bindMiniProgramAccountAPI } from '@/service/auth'

const userStore = useUserStore()

const formRef = ref()
const submitting = ref(false)

const form = reactive({
  username: '',
  password: '',
})

const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: ['blur', 'change'] }],
  password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }],
})

const redirectBack = () => {
  const { query } = currRoute()
  if (query.redirect) {
    uni.redirectTo({ url: query.redirect })
  } else {
    // 未带 redirect 时，使用 reLaunch 进入首页，避免非 tabBar 页切换报错
    uni.reLaunch({ url: '/pages/index/index' })
  }
}

const onSubmit = async () => {
  try {
    await formRef.value.validate()
  } catch (e) {
    return
  }

  if (submitting.value) return
  submitting.value = true
  try {
    // 约定：账号密码登录也走 /auth/login，区分参数
    const params = {
      grantType: 'password',
      username: form.username,
      password: form.password,
      clientId: 'e5cd7e4891bf95d1d19206ce24a7b32e',
    }
    const res = await accountLoginAPI(params)

    // 按照当前接口返回（access_token/refresh_token）
    const accessToken = res && res.data && res.data.access_token
    const refreshToken = res && res.data && res.data.refresh_token
    if (accessToken) {
      userStore.setUserInfo({
        token: accessToken,
        refreshToken,
        userId: res.data.userId,
        openid: res.data.openid ?? null,
        scope: res.data.scope ?? null,
        expireIn: res.data.expire_in,
        refreshExpireIn: res.data.refresh_expire_in ?? null,
        clientId: res.data.client_id,
      })

      uni.showToast({ title: res.msg || '登录成功', icon: 'success' })
      // 调用小程序账号绑定接口（不阻塞跳转）
      uni
        .login({ provider: 'weixin' })
        .then((lr: any) => {
          if (!lr || !lr.code) return
          const payload = {
            source: 'wechat_mini_program',
            socialCode: lr.code,
            socialState: 'state',
          }
          bindMiniProgramAccountAPI(payload).catch(() => {})
        })
        .catch(() => {})

      setTimeout(redirectBack, 600)
    } else {
      uni.showToast({ title: res?.msg || '登录失败', icon: 'none' })
    }
  } catch (err: any) {
    uni.showToast({ title: err?.msg || err?.message || '登录失败', icon: 'none' })
  } finally {
    submitting.value = false
  }
}

onLoad((opt) => {
  // 记录下从哪里来
  console.log('login onLoad', opt)
})
</script>

<style lang="scss" scoped></style>
