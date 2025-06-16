<template>
  <!-- 上面添加阴影 -->
  <view class="box_13 flex-col shadow-t-lg shadow-gray-200">
    <view class="list_12 flex-row">
      <view
        class="image-text_37 flex-col"
        v-for="(item, index) in loopData1"
        :key="index"
        @click="handleTabClick(index)"
      >
        <span
          class="text-32rpx"
          :class="['font_family', item.lanhuimage0]"
          :style="{ color: currentIndex === index ? '#2150C3' : item.lanhufontColor0 }"
        ></span>
        <text
          class="text-group_8"
          :style="{ color: currentIndex === index ? '#2150C3' : item.lanhufontColor0 }"
        >
          {{ item.lanhutext0 }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="js">
import { onShow } from '@dcloudio/uni-app'

const currentIndex = ref(0)
const pages = [
  '/pages/index/index',
  '/pages/wendang/index',
  '', // 筛查页面路径待定
  '', // 资讯页面路径待定
  '',
]

onShow(() => {
  const currentRoute = getCurrentPages().pop().route
  const index = pages.findIndex((page) => `/${currentRoute}` === page)
  if (index !== -1) {
    currentIndex.value = index
  }
})

const handleTabClick = (index) => {
  const url = pages[index]
  if (url && url !== `/${getCurrentPages().pop().route}`) {
    uni.reLaunch({
      url,
    })
  }
}

// 添加选中和未选中状态图标
const loopData1 = ref([
  {
    lanhuimage0: 'icon-icon-shouye',
    lanhutext0: '首页',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
  {
    lanhuimage0: 'icon-icon-quanbuwendang',
    lanhutext0: '文档',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
  {
    lanhuimage0: 'icon-hechaxinxiliebiao',
    lanhutext0: '筛查',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
  {
    lanhuimage0: 'icon-icon-zixun',
    lanhutext0: '资讯',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
  {
    lanhuimage0: 'icon-icon-wode',
    lanhutext0: '我的',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
])
</script>

<style lang="scss">
@import '../common/common';
@import './assets/style/index.rpx.css';
</style>
