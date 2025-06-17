<route lang="json5">
{
  style: {
    navigationBarTitleText: '全部文档',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view class="page flex-col">
    <view class="group_1 flex-col">
      <view class="group_22 flex-row justify-between">
        <text class="text_2">全部文档</text>
        <image class="image_1" referrerpolicy="no-referrer" />
      </view>
      <view class="text-wrapper_8 flex-row justify-between">
        <text class="text_3">取消</text>
        <text class="text_4">全选</text>
      </view>
    </view>
    <view class="group_4 flex-col pb-140rpx">
      <!-- 使用文件夹列表组件 -->
      <folder-list :folder-list="folderList" @folder-click="toggleSelectFolder" />

      <!-- 使用文件列表组件 -->
      <file-list :file-list="fileList" @file-click="toggleSelectFile" />
    </view>
    <view
      class="group_6 flex-col fixed bottom-0 left-0 w-full bg-white z-10 border-t border-gray-200 h-140rpx pb-safe"
      style="padding: 10px 0; margin-top: 0"
    >
      <view class="list_8 flex-row justify-around py-2" style="width: 100%; height: auto">
        <view
          class="image-text_40 flex-col items-center"
          v-for="(item, index) in loopData0"
          :key="index"
          style="margin-right: 0"
        >
          <span
            class="text-40rpx"
            :class="['font_family', item.lanhuimage0]"
            style="color: #444"
          ></span>
          <text class="text-group_6" style="width: auto; text-align: center">
            {{ item.lanhutext0 }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="js">
import { ref } from 'vue'
import FolderList from '@/pages/wendang/components/folder-list.vue'
import FileList from '@/pages/wendang/components/file-list.vue'
// 文件夹列表
const folderList = ref([
  {
    icon: '/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
    name: '单据',
    date: '2025/05/21 12:36',
    count: 2,
    selected: false,
  },
  {
    icon: '/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
    name: '分类2',
    date: '2025/05/21 12:36',
    count: 2,
    selected: false,
  },
  {
    icon: '/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
    name: '分类3',
    date: '2025/05/21 12:36',
    count: 0,
    selected: false,
  },
])

// 文件列表
const fileList = ref([
  {
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
  {
    icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    name: '贸易合规助手2025-05-21 10.46',
    date: '2025/05/21 12:36',
    selected: false,
  },
])

// 文件夹选择切换
const toggleSelectFolder = (folder) => {
  // 文件夹的选择逻辑（如果需要）
  console.log('点击文件夹:', folder.name)
}

// 文件选择切换
const toggleSelectFile = (file) => {
  file.selected = !file.selected
  console.log('切换文件选择状态:', file.name, file.selected)
}

const loopData0 = ref([
  {
    lanhuimage0: 'icon-icon-yidong',
    lanhutext0: '移动',
  },
  {
    lanhuimage0: 'icon-icon-zhongmingming',
    lanhutext0: '重命名',
  },
  {
    lanhuimage0: 'icon-icon0shanchu',
    lanhutext0: '删除',
  },
  {
    lanhuimage0: 'icon-icon-baocundaobendi',
    lanhutext0: '保存到本地',
  },
])
</script>
<style lang="css" scoped>
@import '../common/common.css';
@import './assets/style/index.rpx.css';
</style>
