<route lang="json5" type="page">
{
  style: { navigationBarTitleText: '邮箱登录' },
}
</route>

<template>
  <view class="px-40rpx py-40rpx">
    <view class="text-center mt-40rpx mb-60rpx">
      <image src="/static/used-images/logo.png" class="w-120rpx h-120rpx rounded-16rpx" mode="aspectFit" />
      <view class="text-36rpx font-600 mt-20rpx">欢迎登录</view>
      <view class="text-26rpx text-gray-500 mt-10rpx">请输入邮箱验证码登录/注册</view>
    </view>

    <!-- Email Login Form -->
    <uv-form ref="emailFormRef" :model="emailForm" :rules="emailRules" labelWidth="0">
      <uv-form-item prop="email">
        <uv-input v-model="emailForm.email" placeholder="请输入邮箱地址" prefixIcon="email" clearable border="surround" />
      </uv-form-item>
      <uv-form-item prop="code" class="mt-30rpx">
        <view class="flex items-center w-full">
           <view class="flex-1">
             <uv-input v-model="emailForm.code" placeholder="请输入验证码" prefixIcon="chat" clearable border="surround" />
           </view>
           <view class="ml-20rpx">
             <uv-button size="small" type="primary" :plain="true" :disabled="countdown > 0" @click="sendCode">
               {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
             </uv-button>
           </view>
        </view>
      </uv-form-item>
    </uv-form>

    <view class="mt-60rpx">
      <uv-button type="primary" shape="circle" :loading="submitting" :disabled="submitting" @click="onSubmit">
        登录
      </uv-button>
    </view>

    <view class="mt-30rpx text-center text-24rpx text-gray-500">
      未注册邮箱将自动注册账户
    </view>
  </view>
</template>

<script lang="ts" setup>
import { currRoute } from '@/utils'
import { useUserStore } from '@/store'
import { sendEmailCodeAPI, emailLoginAPI } from '@/service/auth'

const userStore = useUserStore()

const emailFormRef = ref()
const submitting = ref(false)
const countdown = ref(0)
let timer: any = null

const emailForm = reactive({
  email: '',
  code: '',
})

const emailRules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: ['blur', 'change'] }],
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const sendCode = async () => {
  if (countdown.value > 0) return
  
  // Validate email first
  try {
     // Manually validate single field somewhat or use form validateField if available, 
     // but simplest is just check regex here for UX
     if (!emailForm.email) {
       uni.showToast({ title: '请输入邮箱', icon: 'none' })
       return
     }
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     if (!emailRegex.test(emailForm.email)) {
       uni.showToast({ title: '邮箱格式不正确', icon: 'none' })
       return
     }
     
     uni.showLoading({ title: '发送中' })
     const res = await sendEmailCodeAPI({ email: emailForm.email })
     uni.hideLoading()
     
     uni.showToast({ title: res.msg || '验证码已发送', icon: 'success' })
     
     countdown.value = 60
     timer = setInterval(() => {
       countdown.value--
       if (countdown.value <= 0) {
         clearInterval(timer)
       }
     }, 1000)
     
  } catch (err: any) {
    uni.hideLoading()
    uni.showToast({ title: err?.msg || '发送失败', icon: 'none' })
  }
}

const redirectBack = () => {
  const { query } = currRoute()
  if (query.redirect) {
    uni.redirectTo({ url: query.redirect })
  } else {
    uni.reLaunch({ url: '/pages/index/index' })
  }
}

const onSubmit = async () => {
  if (submitting.value) return
  
  try {
       await emailFormRef.value.validate()
       submitting.value = true
       const params = {
         email: emailForm.email,
         code: emailForm.code
       }
       const res = await emailLoginAPI(params)
       // Email login returns 'access' and 'refresh' (simplejwt default)
        const accessToken = res.data?.access
        const refreshToken = res.data?.refresh
        
        if (accessToken) {
           userStore.setUserInfo({
             token: accessToken,
             refreshToken,
             userId: res.data.userId,
             name: res.data.name,
             avatar: res.data.avatar,
           })
           uni.showToast({ title: '登录成功', icon: 'success' })
           
           // Fetch full user info
           // userStore.fetchUserInfo().catch(err => console.log('Fetch info err', err))

           setTimeout(redirectBack, 600)
        } else {
           throw new Error(res.msg || '登录失败')
        }
  } catch (err: any) {
    uni.showToast({ title: err?.msg || err?.message || '登录失败', icon: 'none' })
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped>
</style>
