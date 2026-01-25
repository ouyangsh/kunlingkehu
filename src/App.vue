<script setup lang="js">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { registerPushCIDAPI } from '@/service/signin'
import { useUserStore } from '@/store/user'
import { useGlobalStore } from '@/store/global'
import { autoLogin } from '@/utils/autoLogin'
import { setLoginPromise } from '@/utils/loginWaiter'

import { watch } from 'vue'

const userStore = useUserStore()
const globalStore = useGlobalStore()

// 核心：监听全局推送
const handlePush = (res) => {
    console.log('【收到推送消息回调】:', JSON.stringify(res))
    // 触发全局刷新信号（关键）
    globalStore.triggerRefresh()

    const data = res.data || {}
    const payload = data.payload || data

    // 针对“通过申请”做特殊提示
    if (res.type === 'receive' && (payload.type === 'join_approved' || payload.payload?.type === 'join_approved')) {
         uni.showModal({
            title: '🎉 关系申请已通过',
            content: data.content || '您现在可以进入新的空间了',
            showCancel: false,
            success: (modalRes) => {
                if (modalRes.confirm) {
                    // 再次确认刷新
                    globalStore.triggerRefresh()
                }
            }
        })
    }
}

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
    },
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
watch(
  () => userStore.isLogined,
  (newVal) => {
    console.log('App.vue - 登录状态监听触发:', newVal)
    if (newVal) {
      registerPush()
      globalStore.connectWebSocket()
    } else {
        globalStore.closeWebSocket()
    }
  },
  { immediate: true },
)

onLaunch(async () => {
  console.log('App Launch')
  // #ifdef APP-PLUS
  uni.onPushMessage(handlePush)
  // #endif
  uni.hideTabBar()

  // 应用启动时自动登录
  const loginPromise = autoLogin()
  setLoginPromise(loginPromise)
  try {
    await loginPromise
    console.log('App.vue - 自动登录完成，当前登录状态：', userStore.isLogined)
    if (!userStore.isLogined) {
      throw new Error('未登录')
    }
  } catch (error) {
    console.log('App.vue - 自动登录失败或未登录：', error?.message || error || '未知错误')
    // 延迟跳转，确保页面栈初始化完成
    setTimeout(() => {
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const currentPath = currentPage ? currentPage.route : ''
      console.log('App.vue - 当前页面路径:', currentPath)

      if (currentPath !== 'pages/login/index') {
        console.log('App.vue - 执行重定向到登录页')
        uni.reLaunch({
          url: '/pages/login/index',
          success: () => console.log('App.vue - 重定向成功'),
          fail: (err) => console.error('App.vue - 重定向失败:', err),
        })
      }
    }, 100)
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
