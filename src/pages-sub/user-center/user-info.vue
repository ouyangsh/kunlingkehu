<route lang="json5">
{
  style: {
    navigationBarTitleText: '个人信息',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="个人信息" headerClass="!bg-#FFFFFF">
    <div class="h10rpx"></div>
    <div class="user-info-container">
      <!-- 信息列表 -->
      <div class="info-list">
        <!-- 姓名 -->
        <div class="info-item">
          <text class="label">姓名</text>
          <text class="value">{{ userInfo.realName || '聂坤' }}</text>
        </div>

        <!-- 手机号 -->
        <div class="info-item">
          <text class="label">手机号</text>
          <text class="value">{{ userInfo.phone || '13668338779' }}</text>
        </div>

        <!-- 邮箱 -->
        <div class="info-item">
          <text class="label">邮箱</text>
          <text class="value">{{ userInfo.email || 'niekun@gmail.com' }}</text>
        </div>

        <!-- 单位 -->
        <div class="info-item">
          <text class="label">单位</text>
          <text class="value">{{ userInfo.company || '北京汇丰银行' }}</text>
        </div>

        <!-- 账号期限 -->
        <div class="info-item">
          <text class="label">账号期限</text>
          <text class="value">{{ userInfo.expireDate || '2025-05-20' }}</text>
        </div>
      </div>
    </div>
  </buju>
</template>

<script setup lang="js">
import { useUserStore } from '@/store'

const userStore = useUserStore()

// 用户信息
const userInfo = computed(() => userStore.userInfo)

// 页面加载时获取用户信息
onMounted(async () => {
  console.log('个人信息页面加载，当前用户信息：', userInfo.value)
  
  // 如果用户已登录但缺少详细信息，则获取详细信息
  if (userStore.isLogined && !userInfo.value.realName) {
    try {
      uni.showLoading({
        title: '加载用户信息...',
      })
      await userStore.fetchUserInfo()
      console.log('用户详细信息获取完成：', userInfo.value)
    } catch (error) {
      console.error('获取用户详细信息失败：', error)
      uni.showToast({
        title: '获取用户信息失败',
        icon: 'error',
      })
    } finally {
      uni.hideLoading()
    }
  }
})
</script>

<style lang="scss" scoped>
.user-info-container {
}

.info-list {
  background-color: #fff;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 40rpx;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.label {
  font-size: 28rpx;
  font-weight: 400;
  color: #777;
}

.value {
  font-size: 28rpx;
  font-weight: 400;
  color: #333;
  text-align: right;
}
</style>
