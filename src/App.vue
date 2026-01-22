<script setup lang="js">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { registerPushCIDAPI } from '@/service/signin'
import { useUserStore } from '@/store/user'
import { autoLogin } from '@/utils/autoLogin'
import { setLoginPromise } from '@/utils/loginWaiter'

const userStore = useUserStore()

const registerPush = () => {
  // #ifdef APP-PLUS
  console.log('检查推送环境...')
  uni.getPushClientId({
    success: (res) => {
      const { cid } = res
      console.log('获取推送 CID 成功:', cid)
      if (cid) {
        registerPushCIDAPI(cid)
          .then(() => console.log('CID 注册接口调用成功'))
          .catch((err) => console.error('CID 注册接口调用失败:', err))
      } else {
        console.warn('获取到的 CID 为空')
      }
    },
    fail: (err) => {
      console.error('获取推送 CID 失败 (可能是模拟器限制):', err)
    }
  })

  // 监听推送消息
  uni.onPushMessage((res) => {
    console.log('收到推送消息:', res)
  })
  // #endif
}

// 监听登录状态，登录成功后立即注册推送
watch(() => userStore.isLogined, (newVal) => {
  console.log('登录状态变化:', newVal)
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
