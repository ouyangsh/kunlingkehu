<template>
  <!-- 上面添加阴影 -->
  <view
    class="box_13 flex-col dibuggao bg-[#ffffffff] box-border shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.2)]"
  >
    <view class="list_12 flex-row">
      <view
        class="image-text_37 flex-col flex-1"
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
import { useNavigationStore } from '@/store/navigation'

const navigationStore = useNavigationStore()
const pages = [
  '/pages/index/index',
  '/pages/wendang/index',
  '/pages/shaicha/index',
  '/pages/zixun/index',
  '/pages/user-center/index',
]

// 页面名称到索引的映射
const pageNameToIndex = {
  index: 0,
  wendang: 1,
  shaicha: 2,
  zixun: 3,
  userCenter: 4,
}

// 根据 store 中的 suoyin 计算当前索引
const currentIndex = computed(() => {
  return pageNameToIndex[navigationStore.suoyin] || 0
})

onShow(() => {
  const currentRoute = getCurrentPages().pop().route
  const index = pages.findIndex((page) => `/${currentRoute}` === page)
  if (index !== -1) {
    navigationStore.setSuoyin(index)
  }
})

const handleTabClick = (index) => {
  // 更新 store 中的 suoyin 状态
  navigationStore.setSuoyin(index)
}

// 添加选中和未选中状态图标
const loopData1 = ref([
  {
    lanhuimage0: 'icon-icon-shouye',
    lanhutext0: '首页',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
  // {
  //   lanhuimage0: 'icon-icon-quanbuwendang',
  //   lanhutext0: '文档',
  //   lanhufontColor0: 'rgba(106,122,135,1)',
  // },
  {
    lanhuimage0: 'icon-hechaxinxiliebiao',
    lanhutext0: '单笔筛查',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
  {
    lanhuimage0: 'icon-icon-zixun',
    lanhutext0: '法律法规',
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
@import '../../static/common/common';
@import './assets/style/index.rpx.css';

.dibuggao {
  /* #ifdef MP-WEIXIN */
  /* stylelint-disable-next-line declaration-property-value-no-unknown */
  padding-bottom: 60rpx;

  // background-color: #fff;
  /* #endif */
}
</style>
