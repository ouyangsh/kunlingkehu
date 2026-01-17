<route lang="json5" type="page">
{
  style: { 
    navigationStyle: 'custom', 
    navigationBarTitleText: '邮箱登录',
    backgroundColor: '#fffcfc',
    backgroundColorBottom: '#fffcfc',
    backgroundColorTop: '#fffcfc',
    disableScroll: true
  },
}
</route>

<template>
  <view class="fixed inset-0 flex flex-col items-center px-40rpx overflow-hidden bg-[#fffcfc]">
    <!-- Custom Header -->
    <view class="w-full h-88rpx flex items-center justify-center flex-shrink-0" :style="{ paddingTop: statusBarHeight + 'px' }">
      <text class="text-34rpx font-500 text-[#333]">邮箱登录</text>
    </view>

    <!-- Featured Image & Welcome Section -->
    <view class="w-full flex-1 flex flex-col items-center justify-center min-h-0 py-30rpx">
      <view class="w-400rpx h-520rpx rounded-32rpx overflow-hidden shadow-lg border-[12rpx] border-white relative flex-shrink-0">
        <image 
          src="/static/used-images/login_featured.png" 
          class="w-full h-full" 
          mode="aspectFill" 
        />
        <view class="absolute bottom-30rpx left-0 right-0 text-center">
          <view class="text-white text-24rpx font-500 tracking-wider shadow-sm">Family & Love</view>
        </view>
      </view>
      
      <view class="mt-20rpx text-center flex-shrink-0">
        <view class="text-40rpx font-600 text-[#333] tracking-wider mb-8rpx">欢迎回家</view>
        <view class="text-24rpx text-gray-400">记载每一个相爱的时刻</view>
      </view>
    </view>

    <!-- Login Card -->
    <view class="w-full bg-white rounded-40rpx p-50rpx  mb-40rpx flex-shrink-0">
      <uv-form ref="emailFormRef" :model="emailForm" :rules="emailRules" labelWidth="0">
        <uv-form-item prop="email" :border-bottom="false" :customStyle="{ paddingBottom: '10rpx' }">
          <view class="bg-[#fcfafa] rounded-24rpx px-30rpx py-8rpx min-h-88rpx flex items-center w-full">
            <view class="flex-1">
              <uv-input 
                v-model="emailForm.email" 
                placeholder="请输入您的邮箱" 
                prefixIcon="email" 
                :border="'none'"
                placeholderStyle="color: #ccc; font-size: 26rpx"
              />
            </view>
          </view>
        </uv-form-item>
        <uv-form-item prop="code" :border-bottom="false" :customStyle="{ paddingTop: '10rpx' }">
          <view class="bg-[#fcfafa] rounded-24rpx px-30rpx py-8rpx flex items-center w-full min-h-88rpx">
            <view class="flex-1">
               <uv-input 
                v-model="emailForm.code" 
                placeholder="验证码" 
                prefixIcon="chat" 
                :border="'none'"
                placeholderStyle="color: #ccc; font-size: 26rpx"
               />
             </view>
             <view class="ml-20rpx border-l border-gray-100 pl-20rpx">
               <text 
                class="text-24rpx font-500" 
                :class="countdown > 0 ? 'text-gray-300' : 'text-[#ff9a9e]'"
                @click="sendCode"
               >
                 {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
               </text>
             </view>
          </view>
        </uv-form-item>
      </uv-form>

      <view class="mt-40rpx">
        <uv-button 
          type="primary" 
          shape="circle" 
          :loading="submitting" 
          :disabled="submitting" 
          @click="onSubmit"
          customStyle="background: linear-gradient(to right, #ff9a9e, #fad0c4); border: none; height: 88rpx; font-size: 30rpx; font-weight: 500;"
        >
          安全登录
        </uv-button>
      </view>

      <view class="mt-24rpx text-center text-22rpx text-gray-300">
        未注册账号将为您自动创建
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { currRoute } from '@/utils'
import { useUserStore } from '@/store'
import { sendEmailCodeAPI, emailLoginAPI } from '@/service/auth'

const statusBarHeight = uni.getSystemInfoSync().statusBarHeight || 0
const userStore = useUserStore()

const emailFormRef = ref()
const submitting = ref(false)
const countdown = ref(0)
let timer: any = null

const emailForm = reactive({
  email: '',
  code: '',
})

const emailRules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
} as any
  

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

<style lang="scss">
page {
  background-color: #fffcfc !important;
}
</style>

<style lang="scss" scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
</style>
