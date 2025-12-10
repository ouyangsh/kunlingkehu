<template>
  <view class="tab-bar-placeholder"></view>
  <view class="tab-bar">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="tab-bar-item"
      @click="switchTab(item, index)"
    >
      <image
        class="tab-icon"
        :src="currentPath === item.pagePath ? item.selectedIconPath : item.iconPath"
      />
      <view
        class="tab-text"
        :style="{ color: currentPath === item.pagePath ? selectedColor : color }"
      >
        {{ item.text }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const color = '#999999'
const selectedColor = '#018d71'
const list = [
  {
    pagePath: 'pages/index/index',
    text: '首页',
    iconPath: '/static/tabbar/home.png',
    selectedIconPath: '/static/tabbar/homeHL.png',
  },
  {
    pagePath: 'pages/shaicha/index',
    text: '分类',
    iconPath: '/static/tabbar/search.png',
    selectedIconPath: '/static/tabbar/searchHL.png',
  },
  {
    pagePath: 'pages/zixun/index',
    text: '购物车',
    iconPath: '/static/tabbar/news.png',
    selectedIconPath: '/static/tabbar/newsHL.png',
  },
  {
    pagePath: 'pages/user-center/index',
    text: '我的',
    iconPath: '/static/tabbar/personal.png',
    selectedIconPath: '/static/tabbar/personalHL.png',
  },
]

const currentPath = ref('')

onMounted(() => {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  if (page) {
    // Remove leading slash if present for comparison
    const route = page.route || ''
    currentPath.value = route.startsWith('/') ? route.substring(1) : route
  }
})

const switchTab = (item: any, index: number) => {
  const url = '/' + item.pagePath
  uni.switchTab({
    url,
  })
}
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #ffffff;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.05);
  z-index: 9999;
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
}

.tab-text {
  font-size: 10px;
}

/* Placeholder to prevent content from being hidden behind the tab bar */
.tab-bar-placeholder {
  height: 50px;
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
