<route lang="json5">
{
  style: {
    navigationBarTitleText: '文档',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju :show-header="false">
    <template #main>
      <view class="page flex-col">
        <view class="group_1 flex-col fixed-header">
          <view class="block_8 flex-row justify-between">
            <text class="text_2">文档</text>
            <image class="image_1" referrerpolicy="no-referrer" />
          </view>
        </view>
        <view class="h-180rpx"></view>
        <view class="box_12 flex-col">
          <view class="list_13 flex flex-row justify-around">
            <view
              class="image-text_1 flex-col justify-center items-center"
              v-for="(item, index) in loopData0"
              :key="index"
            >
              <span
                class="text-64rpx"
                :class="['font_family', item.lanhuimage0]"
                :style="{ color: item.yanse0 }"
              ></span>
              <rich-text class="text-group_1" :nodes="item.lanhutext0"></rich-text>
            </view>
          </view>
        </view>
        <view class="group_3 flex-col">
          <view class="block_9 flex-row">
            <view class="text-wrapper_1">
              <text class="text_3">所有文档</text>
              <text class="text_4"></text>
              <text class="text_5">(6)</text>
            </view>
            <image
              class="label_4"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wendang/SketchPng010d95ac2a9e84192e9b3a69673847ba55fc67e70b4dc42b120e9c24d2b053c5.png"
            />
            <image
              class="label_5"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wendang/SketchPng890113b4a2f35b211f7f22a50480e91a53ea2213e1b7abde9f3837164f1098c5.png"
            />
          </view>
          <view class="block_10 flex-col">
            <template v-for="(item, index) in documentList" :key="index">
              <!-- Folder View -->
              <view
                v-if="item.type === 'folder'"
                class="section_3 flex-row"
                :class="{ section_4: index === 1, section_5: index === 2 }"
                @click="toggleSelect(item)"
              >
                <image class="image_3" referrerpolicy="no-referrer" :src="item.icon" />
                <view class="text-group_33 flex-col">
                  <text class="text_6">{{ item.name }}</text>
                  <text class="text_7">{{ item.date }}</text>
                </view>
                <image
                  class="label_6"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_wendang/SketchPng02436086c2092674a945161418af30e40396dd2e3262527fbdd0f29f81760ea6.png"
                />
                <text class="text_8">{{ item.count }}</text>
                <image
                  class="label_7"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_wendang/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
                />
              </view>

              <!-- File View -->
              <view
                v-if="item.type === 'file'"
                class="block_11 flex-row justify-between"
                @click="toggleSelect(item)"
              >
                <view class="image-text_34 flex-row justify-between">
                  <view class="image-wrapper_1 flex-col">
                    <image class="image_6" referrerpolicy="no-referrer" :src="item.icon" />
                  </view>
                  <view class="text-group_36 flex-col">
                    <text class="text_15">{{ item.name }}</text>
                    <text class="text_16">{{ item.date }}</text>
                  </view>
                </view>
                <view
                  class="block_1 flex-col self-center"
                  :class="{ selected: item.selected }"
                ></view>
              </view>
            </template>
          </view>
        </view>
      </view>
      <div :style="{ height: footerHeight }"></div>
    </template>
    <template #footer>
      <dibu />
    </template>
  </buju>
</template>
<script setup lang="js">
import { ref } from 'vue'
import buju from '@/components/buju/buju.vue'
import dibu from '../index/dibu.vue'
const { footerHeight } = useLayout()

const loopData0 = ref([
  {
    lanhuimage0: 'icon-icon-xiangcedaoru',
    lanhutext0: '相册导入',
    yanse0: '#2563EB',
  },
  {
    lanhuimage0: 'icon-icon-paizhao',
    lanhutext0: '拍照',
    yanse0: '#37C3C8',
  },
  {
    lanhuimage0: 'icon-icon-xinjianwenjianjia',
    lanhutext0: '新建文件夹',
    yanse0: '#F45C27',
  },
])

const documentList = ref([
  {
    type: 'folder',
    icon: '/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
    name: '单据',
    date: '2025/05/21 12:36',
    count: 2,
    selected: false,
  },
  {
    type: 'folder',
    icon: '/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
    name: '分类2',
    date: '2025/05/21 12:36',
    count: 2,
    selected: false,
  },
  {
    type: 'folder',
    icon: '/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
    name: '分类3',
    date: '2025/05/21 12:36',
    count: 0,
    selected: false,
  },
  {
    type: 'file',
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    type: 'file',
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    type: 'file',
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    type: 'file',
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    type: 'file',
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    type: 'file',
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
])

const toggleSelect = (item) => {
  if (item.type === 'file') {
    item.selected = !item.selected
  }
}

const constants = ref({})
</script>
<style lang="scss">
@import '../common/common.css';
@import './assets/style/index.rpx.css';
</style>
