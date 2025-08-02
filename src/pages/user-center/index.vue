<route lang="json5">
{
  style: {
    navigationBarTitleText: '用户中心',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju quanjucolor="bg-[linear-gradient(180deg,_#c8d6f5_0%,_#f5f7fa_100%)]">
    <template #header>
      <div></div>
    </template>
    <div>
      <!-- 用户信息区域 -->
      <div class="user-info-section">
        <div class="flex items-center px-40rpx py-40rpx pt100rpx" @click="goToUserInfo">
          <!-- 头像 -->
          <image
            :src="userInfo.avatar || '/static/logo.png'"
            class="w-140rpx h-140rpx rounded-140rpx mr-40rpx"
            mode="aspectFill"
          />

          <!-- 用户信息 -->
          <div class="flex-1">
            <div class="text-40rpx font-600 text-black mb-20rpx">
              {{ formatPhoneNumber(userInfo.phone) || '136****9779' }}
            </div>
            <div class="text-28rpx text-gray-500">
              {{ userInfo.memberLevel || '普通会员' }}
            </div>
          </div>
        </div>
      </div>

      <!-- 功能菜单区域 -->
      <div class="menu-section bg-white mx-40rpx rounded-16rpx">
        <!-- 扫一扫 -->
        <div
          @click="openScan"
          class="menu-item flex items-center justify-between px-40rpx py-32rpx border-b border-gray-100"
        >
          <div class="flex items-center">
            <i class="font_family icon-icon-saoyisao !text-40rpx text-#19213D mr-20rpx"></i>
            <text class="text-32rpx text-black">扫一扫</text>
          </div>
          <uni-icons type="right" size="18"></uni-icons>
        </div>

        <!-- 服务协议 -->
        <div
          @click="viewServiceAgreement"
          class="menu-item flex items-center justify-between px-40rpx py-32rpx border-b border-gray-100"
        >
          <div class="flex items-center">
            <i class="font_family icon-icon-xieyi !text-40rpx text-#19213D mr-20rpx"></i>

            <text class="text-32rpx text-black">服务协议</text>
          </div>
          <uni-icons type="right" size="18"></uni-icons>
        </div>

        <!-- 常见问题 -->
        <div
          @click="viewFAQ"
          class="menu-item flex items-center justify-between px-40rpx py-32rpx border-b border-gray-100"
        >
          <div class="flex items-center">
            <i class="font_family icon-icon-changjianwenti !text-40rpx text-#19213D mr-20rpx"></i>

            <text class="text-32rpx text-black">常见问题</text>
          </div>
          <uni-icons type="right" size="18"></uni-icons>
        </div>

        <!-- 联系客服 -->
        <div
          @click="contactService"
          class="menu-item flex items-center justify-between px-40rpx py-32rpx"
        >
          <div class="flex items-center">
            <i class="font_family icon-icon-lianxikefu !text-40rpx text-#19213D mr-20rpx"></i>

            <text class="text-32rpx text-black">联系客服</text>
          </div>
          <uni-icons type="right" size="18"></uni-icons>
        </div>
      </div>
    </div>
    <template #footer>
      <dibu></dibu>
    </template>
  </buju>
</template>

<script setup lang="js">
import dibu from '../index/dibu.vue'
import { useUserStore } from '@/store'
import { logoutAPI } from '@/service/auth'
import { manualWechatLogin } from '@/utils/autoLogin'

const userStore = useUserStore()

// 计算属性
const userInfo = computed(() => userStore.userInfo)
const isLogined = computed(() => userStore.isLogined)

// 格式化手机号
const formatPhoneNumber = (phone) => {
  if (!phone) return null
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

// 跳转到个人信息页面
const goToUserInfo = () => {
  uni.navigateTo({
    url: '/pages-sub/user-center/user-info',
  })
}

// 扫一扫
const openScan = () => {
  uni.scanCode({
    success: (res) => {
      console.log('扫码结果：', res.result)
      uni.showToast({
        title: '扫码成功',
        icon: 'success',
      })
    },
    fail: (err) => {
      console.log('扫码失败：', err)
      uni.showToast({
        title: '扫码失败',
        icon: 'none',
      })
    },
  })
}

// 服务协议
const viewServiceAgreement = () => {
  uni.navigateTo({
    url: '/pages-sub/fuwuxieyi/index',
  })
}

// 常见问题
const viewFAQ = () => {
  uni.showModal({
    title: '常见问题',
    content: '1. 如何使用筛查功能？\n2. 如何查看历史记录？\n3. 如何联系客服？\n...',
    showCancel: false,
    confirmText: '我知道了',
  })
}

// 联系客服
const contactService = () => {
  // 优先使用微信官方客服功能
  if (uni.openCustomerServiceChat) {
    uni.openCustomerServiceChat({
      extInfo: {
        // 可以传递一些额外信息给客服
        userId: userInfo.value.userId || '',
        source: 'user-center',
      },
      success: (res) => {
        console.log('打开客服成功', res)
      },
      fail: (err) => {
        console.log('打开客服失败，使用备用方案', err)
        // 备用方案：显示联系方式选项
        showContactOptions()
      },
    })
  } else {
    // 备用方案：在不支持官方客服的环境中使用
    showContactOptions()
  }
}

// 显示联系方式选项（备用方案）
const showContactOptions = () => {
  uni.showActionSheet({
    itemList: ['客服电话', '邮箱反馈', '在线客服'],
    success: (res) => {
      switch (res.tapIndex) {
        case 0:
          // 客服电话
          uni.showModal({
            title: '客服电话',
            content: '400-123-4567\n\n工作时间：9:00-18:00（工作日）',
            showCancel: true,
            confirmText: '拨打电话',
            cancelText: '取消',
            success: (modalRes) => {
              if (modalRes.confirm) {
                uni.makePhoneCall({
                  phoneNumber: '4001234567',
                  success: () => {
                    console.log('拨打电话成功')
                  },
                  fail: (err) => {
                    console.log('拨打电话失败', err)
                    uni.showToast({
                      title: '拨打失败，请手动拨打',
                      icon: 'none',
                    })
                  },
                })
              }
            },
          })
          break
        case 1:
          // 邮箱反馈
          uni.showModal({
            title: '邮箱反馈',
            content: 'service@example.com\n\n请发送邮件描述您的问题，我们会在24小时内回复',
            showCancel: true,
            confirmText: '复制邮箱',
            cancelText: '取消',
            success: (modalRes) => {
              if (modalRes.confirm) {
                uni.setClipboardData({
                  data: 'service@example.com',
                  success: () => {
                    uni.showToast({
                      title: '邮箱已复制',
                      icon: 'success',
                    })
                  },
                })
              }
            },
          })
          break
        case 2:
          // 在线客服（如果有第三方客服系统）
          uni.showToast({
            title: '正在连接在线客服...',
            icon: 'loading',
            duration: 2000,
          })
          // 这里可以跳转到第三方客服系统或网页
          // uni.navigateTo({ url: '/pages/customer-service/index' })
          break
      }
    },
    fail: () => {
      console.log('用户取消选择联系方式')
    },
  })
}

// 页面加载时检查登录状态
onMounted(() => {
  console.log('用户中心页面加载，当前登录状态：', isLogined.value)
  console.log('用户信息：', userInfo.value)
})
</script>

<style lang="scss" scoped>
.user-info-section {
  padding-top: env(safe-area-inset-top);
}

.menu-section {
  margin-top: 60rpx;
  box-shadow: 0rpx 4rpx 10rpx 0rpx rgb(0 0 0 / 10%);
}

.menu-item {
  transition: background-color 0.2s ease;
}

.menu-item:active {
  background-color: #f8f9fa;
}

.menu-item:last-child {
  border-bottom: none;
}
</style>
