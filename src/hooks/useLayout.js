import { ref, computed } from 'vue'

export function useLayout(options = {}) {
  // 计算安全区域
  const safeAreaInsets = computed(() => {
    const systemInfo = uni.getSystemInfoSync()
    return systemInfo.safeAreaInsets
  })

  // 胶囊按钮高度
  let menuButtonBoundingClientRect = {
    top: 30,
    bottom: 60,
    height: 30,
  }
  if (uni.getMenuButtonBoundingClientRect) {
    menuButtonBoundingClientRect = uni.getMenuButtonBoundingClientRect()
  }

  // 顶部安全区域
  const topSafeArea = ref(safeAreaInsets.value.top)
  // 底部安全区域
  const bottomSafeArea = ref(safeAreaInsets.value.bottom)

  // 顶部导航高度 - 支持传入自定义值
  const topNavHeight = ref((options.topNavHeight || 100) + 'rpx')
  const headerHeight = ref(
    (options.topNavHeight && topNavHeight.value) || menuButtonBoundingClientRect.bottom + 'px',
  )
  // 底部导航高度 - 支持传入自定义值
  const footerHeight = ref((options.footerHeight || 160) + 'rpx')
  // 主体高度
  const mainHeight = computed(() => {
    return `calc(100vh  - ${headerHeight.value} - ${footerHeight.value})`
  })

  return {
    safeAreaInsets,
    menuButtonBoundingClientRect,
    topSafeArea,
    bottomSafeArea,
    headerHeight,
    footerHeight,
    mainHeight,
  }
}
