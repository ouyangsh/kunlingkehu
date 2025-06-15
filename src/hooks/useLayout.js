import { ref, computed } from 'vue'

export function useLayout() {
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

  // 顶部导航高度
  const headerHeight = ref((menuButtonBoundingClientRect.bottom || 50) + 'px')
  // 底部导航高度
  const footerHeight = ref(50 + bottomSafeArea.value + 'px')
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
