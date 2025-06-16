<template>
  <view class="box_13 flex-col">
    <view class="list_12 flex-row">
      <view
        class="image-text_37 flex-col"
        v-for="(item, index) in loopData1"
        :key="index"
        @click="handleTabClick(index)"
      >
        <text
          :class="['font_family', item.lanhuimage0]"
          :style="{ color: currentIndex === index ? '#2150C3' : item.lanhufontColor0 }"
        ></text>
        <text
          class="text-group_8"
          :style="{ color: currentIndex === index ? '#2150C3' : item.lanhufontColor0 }"
        >
          {{ item.lanhutext0 }}
        </text>
      </view>
    </view>
    <view class="box_14 flex-col"></view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)

const handleTabClick = (index) => {
  currentIndex.value = index
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

<style lang="css">
@import '../common/common.css';
@import './assets/style/index.rpx.css';
</style>
