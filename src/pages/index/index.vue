<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <buju :show-header="false">
    <template #main>
      <view class="page flex-col">
        <view class="h-240rpx"></view>
        <view class="box_1 flex-col fixed top-0 left-0 z-10">
          <image class="box_1_background" src="@/static/lanhu_shouye/qwer.png" mode="aspectFill" />
          <view class="box_1_content flex-col">
            <view class="image-wrapper_13 flex-row">
              <image class="image_1" referrerpolicy="no-referrer" />
            </view>
            <view class="text-wrapper_6 flex-row">
              <text class="text_2">贸易合规，国货领航！</text>
            </view>
            <view class="image-wrapper_14 flex-row">
              <image
                class="image_2"
                referrerpolicy="no-referrer"
                src="/static/lanhu_shouye/SketchPng90d6059e3c0b86e5c9b56bf40c7b4c9d17beb6da4b70b2778e006005f96729b4.png"
              />
            </view>
          </view>
        </view>
        <view class="box_25 flex-col">
          <view class="list_11 flex-row">
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
        <view class="box_4 flex-col">
          <view class="section_10 flex-row justify-between">
            <text class="text_3">最近使用</text>
            <view class="image-text_32 flex-row justify-between">
              <text class="text-group_2">全部文档</text>
              <image
                class="thumbnail_1"
                referrerpolicy="no-referrer"
                src="/static/lanhu_shouye/SketchPng0c59d307ad6b7e2bdfdf2318d36012ee119fa9b3ceac3a5c743401e1beeee2ca.png"
              />
            </view>
          </view>
          <view class="section_11 flex-col">
            <view class="box_7 flex-row">
              <image
                class="image_4"
                referrerpolicy="no-referrer"
                src="/static/lanhu_shouye/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png"
              />
              <view class="text-group_29 flex-col">
                <text class="text_4">单据</text>
                <text class="text_5">2025/05/21&nbsp;12:36</text>
              </view>
              <image
                class="label_4"
                referrerpolicy="no-referrer"
                src="/static/lanhu_shouye/SketchPng02436086c2092674a945161418af30e40396dd2e3262527fbdd0f29f81760ea6.png"
              />
              <text class="text_6">2</text>
              <image
                class="label_5"
                referrerpolicy="no-referrer"
                src="/static/lanhu_shouye/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
              />
            </view>
            <view class="box_8 flex-row">
              <view class="image-text_33 flex-row justify-between">
                <image
                  class="image_5"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_shouye/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png"
                />
                <view class="text-group_30 flex-col">
                  <text class="text_7">分类2</text>
                  <text class="text_8">2025/05/21&nbsp;12:36</text>
                </view>
              </view>
              <image
                class="label_6"
                referrerpolicy="no-referrer"
                src="/static/lanhu_shouye/SketchPng02436086c2092674a945161418af30e40396dd2e3262527fbdd0f29f81760ea6.png"
              />
              <text class="text_9">2</text>
              <image
                class="label_7"
                referrerpolicy="no-referrer"
                src="/static/lanhu_shouye/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
              />
            </view>
            <view class="box_9 flex-row">
              <view class="image-text_34 flex-row justify-between">
                <image
                  class="image_6"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_shouye/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png"
                />
                <view class="text-group_31 flex-col">
                  <text class="text_10">分类3</text>
                  <text class="text_11">2025/05/21&nbsp;12:36</text>
                </view>
              </view>
              <image
                class="label_8"
                referrerpolicy="no-referrer"
                src="/static/lanhu_shouye/SketchPng02436086c2092674a945161418af30e40396dd2e3262527fbdd0f29f81760ea6.png"
              />
              <text class="text_12">0</text>
              <image
                class="label_9"
                referrerpolicy="no-referrer"
                src="/static/lanhu_shouye/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
              />
            </view>
          </view>

          <view
            class="section_12 flex-row justify-between"
            v-for="item in recentList"
            :key="item.id"
            @click="toggleSelect(item)"
          >
            <view class="image-text_35 flex-row justify-between">
              <view class="image-wrapper_3 flex-col">
                <image class="image_7" referrerpolicy="no-referrer" :src="item.image" />
              </view>
              <view class="text-group_32 flex-col">
                <text class="text_13">{{ item.title }}</text>
                <text class="text_14">{{ item.subtitle }}</text>
              </view>
            </view>
            <view class="block_1 flex-col" :class="{ selected: item.selected }"></view>
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
<script setup>
import dibu from './dibu.vue'
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
    lanhuimage0: 'icon-icon-zhishiku',
    lanhutext0: '知识库',
    yanse0: '#F45C27',
  },
])

const recentList = ref([
  {
    id: 1,
    image:
      '/static/lanhu_shouye/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-21 10.46',
    subtitle: '2025/05/21 12:36',
    selected: false,
  },

  {
    id: 1,
    image:
      '/static/lanhu_shouye/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-21 10.46',
    subtitle: '2025/05/21 12:36',
    selected: false,
  },
  {
    id: 1,
    image:
      '/static/lanhu_shouye/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-21 10.46',
    subtitle: '2025/05/21 12:36',
    selected: false,
  },
  {
    id: 1,
    image:
      '/static/lanhu_shouye/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-21 10.46',
    subtitle: '2025/05/21 12:36',
    selected: false,
  },
  {
    id: 2,
    image:
      '/static/lanhu_shouye/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-22 11.47',
    subtitle: '2025/05/22 12:37',
    selected: true,
  },
])

const toggleSelect = (item) => {
  item.selected = !item.selected
}
const constants = ref({})
</script>
<style lang="css">
@import '../common/common.css';
@import './assets/style/index.rpx.css';
</style>
