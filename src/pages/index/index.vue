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
          <view class="block_10 flex-col">
            <!-- 使用文件夹列表组件 -->
            <folder-list :folder-list="folderList" @folder-click="toggleSelectFolder" />

            <!-- 使用文件列表组件 -->
            <file-list :file-list="fileList" @file-click="toggleSelectFile" />
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
import FolderList from '@/pages/wendang/components/folder-list.vue'
import FileList from '@/pages/wendang/components/file-list.vue'
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
<style lang="css" scoped>
@import '../common/common.css';
@import './assets/style/index.rpx.css';

.block_10 {
  margin-top: 36rpx;
}
</style>
