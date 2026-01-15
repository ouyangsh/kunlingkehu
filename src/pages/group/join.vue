<route lang="json5">
{
  style: {
    navigationBarTitleText: '加入签到群组',
  },
}
</route>

<template>
  <view class="p-40rpx">
    <view class="bg-white rounded-16rpx p-40rpx shadow-sm">
      <view class="text-32rpx font-bold mb-40rpx text-center">加入签到群组</view>
      
      <view class="mb-40rpx text-center text-gray-500 text-26rpx">
        输入对方的邮箱地址，即可加入TA的签到群组
      </view>
      
      <uv-form ref="formRef" :model="form" :rules="rules" labelPosition="top">
        <uv-form-item label="对方邮箱" prop="email" required>
          <uv-input 
            v-model="form.email" 
            placeholder="请输入对方的邮箱地址" 
            border="surround"
            type="email"
          ></uv-input>
        </uv-form-item>
      </uv-form>

      <view class="mt-60rpx">
        <uv-button type="primary" shape="circle" :loading="submitting" @click="submit">立即加入</uv-button>
      </view>
      
      <view class="mt-30rpx text-center text-24rpx text-gray-400">
        加入后，您可以在对方的群组中签到
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { joinGroupByEmailAPI } from '@/service/signin'

const formRef = ref()
const submitting = ref(false)
const form = reactive({
  email: '',
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: ['blur', 'change'] }
  ]
}

const submit = async () => {
  try {
    await formRef.value.validate()
    submitting.value = true
    const res = await joinGroupByEmailAPI(form)
    uni.showToast({ title: res.msg || '加入成功', icon: 'success' })
    setTimeout(() => {
      uni.navigateBack()
    }, 1000)
  } catch (e) {
    if (e.msg || e.message) {
      uni.showToast({ title: e.msg || e.message || '加入失败', icon: 'none' })
    }
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped>
page {
  background-color: #f5f5f5;
}
.shadow-sm {
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.06);
}
</style>
