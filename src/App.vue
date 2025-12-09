<script setup lang="js">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useUserStore } from '@/store'
import { autoLogin } from '@/utils/autoLogin'
import { setLoginPromise } from '@/utils/loginWaiter'

const userStore = useUserStore()

onLaunch(async () => {
  console.log('App Launch')
  uni.hideTabBar()

  // 应用启动时自动登录
  const loginPromise = autoLogin()
  setLoginPromise(loginPromise)
  try {
    await loginPromise
    console.log('自动登录完成，当前登录状态：', userStore.isLogined)
  } catch (error) {
    console.log('自动登录失败：', error?.message || error || '未知错误')
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
