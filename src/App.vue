<script setup lang="js">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { registerPushCIDAPI } from '@/service/signin'
import { useUserStore } from '@/store/user'
import { autoLogin } from '@/utils/autoLogin'
import { setLoginPromise } from '@/utils/loginWaiter'

import { watch } from 'vue'

const userStore = useUserStore()

// 1. 顶层监听推送消息，确保在 App 启动的第一时间就开始监听
// #ifdef APP-PLUS
uni.onPushMessage((res) => {
  console.log('【收到推送消息核心回调】:', JSON.stringify(res))
  // 无论什么类型，都先弹出一个简单提示协助排查
  if (res.type === 'receive') {
    uni.showModal({
      title: res.data?.title || '新消息',
      content: res.data?.content || '您收到一条新消息',
      showCancel: false
    })
  }
})
// #endif

const registerPush = () => {
  // #ifdef APP-PLUS
  if (!userStore.isLogined) {
    console.log('未登录，跳过 CID 注册')
    return
  }
  
  console.log('--- 开始注册推送 CID ---')
  uni.getPushClientId({
    success: (res) => {
      const { cid } = res
      console.log('App.vue - 当前设备的最新 CID:', cid)
      console.log('App.vue - 当前登录用户 ID:', userStore.userInfo.userId)
      if (cid) {
        registerPushCIDAPI(cid)
          .then(() => console.log('✅ CID 后端绑定成功'))
          .catch((err) => console.error('❌ CID 后端绑定失败:', err))
      }
    },
    fail: (err) => {
      console.error('获取推送 CID 失败:', err)
    }
  })
  
  // 检查 iOS 通知权限状态
  if (uni.getSystemInfoSync().platform === 'ios') {
    plus.push.getClientInfoAsync((info) => {
       console.log('iOS 推送详情:', JSON.stringify(info))
    })
  }
  // #endif
}

// 监听登录状态
watch(() => userStore.isLogined, (newVal) => {
  console.log('App.vue - 登录状态监听触发:', newVal)
  if (newVal) {
    registerPush()
  }
}, { immediate: true })

onLaunch(async () => {
  console.log('App Launch')
  uni.hideTabBar()

  // 应用启动时自动登录
  const loginPromise = autoLogin()
  setLoginPromise(loginPromise)
  try {
    await loginPromise
    console.log('自动登录完成，当前登录状态：', userStore.isLogined)
    if (!userStore.isLogined) {
      throw new Error('未登录')
    }
  } catch (error) {
    console.log('自动登录失败或未登录：', error?.message || error || '未知错误')
    // 如果不在登录页，则跳转
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    if (!currentPage || currentPage.route !== 'pages/login/index') {
      uni.reLaunch({ url: '/pages/login/index' })
    }
  }
})

onShow(() => {
  console.log('App Show')
  // 每次显示时尝试注册一次，确保 CID 最早时间同步
  registerPush()
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
  overflow: hidden;
}

image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
