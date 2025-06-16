<template>
  <view class="box_13 flex-col">
    <view class="list_12 flex-row">
      <view class="image-text_37 flex-col" v-for="(item, index) in loopData1" :key="index">
        <image class="label_10" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
        <rich-text
          class="text-group_8"
          :style="{ color: item.lanhufontColor0 }"
          :nodes="item.lanhutext0"
        ></rich-text>
      </view>
    </view>
    <view class="box_14 flex-col"></view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const loopData1 = ref([
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPnge61ac9b3a5e30ecfc27a2d8a6630289faea139666e7a28df04bc11019b1dd923',
    lanhutext0: '首页',
    lanhufontColor0: 'rgba(37,99,235,1)',
  },
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb255df52457498ae98d457e97a2cca7c1c4a3cc5a21504f4472ee0274131f05f',
    lanhutext0: '文档',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng412f475b515a7a9ba8e295b5c55651d99ec4e5956b62f387b2f38124aa799626',
    lanhutext0: '筛查',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngd5e8738ed23c29644589a9a5847ef4ec203cb7664625350e3199a7206235a3bc',
    lanhutext0: '资讯',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng9dabdd3756b4d85c78a84fd8b09b70332cd27752f56c80ff77f276753145c7ab',
    lanhutext0: '我的',
    lanhufontColor0: 'rgba(106,122,135,1)',
  },
])
</script>

<style lang="css">
@import '../common/common.css';
@import './assets/style/index.rpx.css';
</style>
