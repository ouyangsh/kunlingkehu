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
        <div class="h-240rpx"></div>
        <view class="box_1 flex-col fixed z-10">
          <view class="group_3 flex-row">
            <text class="text_21">9:41</text>
            <image
              class="label_23"
              referrerpolicy="no-referrer"
              src="/static/lanhu_shouye/SketchPngfa3e9c17559b05304a7055007fe69446ab72b55218ea989668008946555da0b9.png"
            />
            <image
              class="label_24"
              referrerpolicy="no-referrer"
              src="/static/lanhu_shouye/SketchPng1f3f33d99e0f4fd84628fabef7d3909e20dffc161c0e4067f6ba2e8e0eb422c8.png"
            />
            <image
              class="label_25"
              referrerpolicy="no-referrer"
              src="/static/lanhu_shouye/SketchPnge2c47cc8cb6c8c02a92be914c360f50a86c5c36ab6e6383b2fe346e933f88550.png"
            />
          </view>
          <view class="image-wrapper_13 flex-row">
            <image
              class="image_1"
              referrerpolicy="no-referrer"
              src="/static/lanhu_shouye/SketchPngcaf8364700cbc749e328f9311a74ceff1258de5c12926aff01419af9b1b49474.png"
            />
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
        <view class="box_25 flex-col">
          <view class="list_11 flex-row">
            <view class="image-text_1 flex-col" v-for="(item, index) in loopData0" :key="index">
              <image class="image_3" referrerpolicy="no-referrer" :src="item.lanhuimage0" />
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
          <view class="section_12 flex-row justify-between">
            <view class="image-text_35 flex-row justify-between">
              <view class="image-wrapper_3 flex-col">
                <image
                  class="image_7"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_shouye/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png"
                />
              </view>
              <view class="text-group_32 flex-col">
                <text class="text_13">贸易合规助手2025-05-21&nbsp;10.46</text>
                <text class="text_14">2025/05/21&nbsp;12:36</text>
              </view>
            </view>
            <view class="block_1 flex-col"></view>
          </view>
          <view class="section_13 flex-row justify-between">
            <view class="image-text_36 flex-row justify-between">
              <view class="image-wrapper_4 flex-col">
                <image
                  class="image_8"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_shouye/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png"
                />
              </view>
              <view class="text-group_33 flex-col">
                <text class="text_15">贸易合规助手2025-05-21&nbsp;10.46</text>
                <text class="text_16">2025/05/21&nbsp;12:36</text>
              </view>
            </view>
            <view class="box_12 flex-col"></view>
          </view>
        </view>
      </view>
    </template>
    <template #footer>
      <dibu />
    </template>
  </buju>
</template>
<script setup>
import { ref } from 'vue'
import dibu from './dibu.vue'
import buju from '@/components/buju/buju.vue'

const loopData0 = ref([
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng81f1dc5b07271a7cad32f05456c834c83b265f48fd2bc8666a3502349eebf1db',
    lanhutext0: '相册导入',
  },
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPnga2e6be1c4ec73bdd8a8329cd8d9d6eaac4ed9ba6663def86855ed56f6ece782e',
    lanhutext0: '拍照',
  },
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng9499e61910eff935c08686d0fe96a568e18a938e0ab31d61f809dbc4d9d3fa4b',
    lanhutext0: '知识库',
  },
])
const constants = ref({})
</script>
<style lang="css">
@import '../common/common.css';
@import './assets/style/index.rpx.css';
</style>
