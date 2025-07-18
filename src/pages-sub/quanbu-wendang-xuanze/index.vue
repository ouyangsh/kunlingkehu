<route lang="json5">
{
  style: {
    navigationBarTitleText: '全部文档',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="全部文档">
    <view class="overflow-auto">
      <view
        class="inline-block h-80rpx bg-[#ffffffff] mt--3rpx z-10 justify-between px-30rpx box-border fixed items-center w-full"
      >
        <text class="text_3" @click="goBackToHome">取消</text>
        <text class="text_4" @click="toggleSelectAll">
          {{ isAllSelected ? '取消全选' : '全选' }}
        </text>
      </view>
      <div class="h-80rpx"></div>
      <view class="group_4 flex-col pb-140rpx">
        <!-- 使用文件夹列表组件 -->
        <folder-list :folder-list="folderList" @folder-click="toggleSelectFolder" />

        <!-- 使用文件列表组件 -->
        <file-list :file-list="fileList" @file-click="toggleSelectFile" />
      </view>
    </view>
    <div class="h-20rpx"></div>
    <template #footer>
      <view
        class="group_6 flex-col fixed bottom-0 left-0 w-full bg-white z-10 border-t border-gray-200 h-140rpx pb-safe"
        style="padding: 10px 0; margin-top: 0"
      >
        <view class="list_8 flex-row justify-around py-2" style="width: 100%; height: auto">
          <view
            class="image-text_40 flex-col items-center"
            @click="dibuClick(item)"
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
    </template>
  </buju>
</template>
<script setup lang="js">
import FolderList from '@/pages/wendang/components/folder-list.vue'
import FileList from '@/pages/wendang/components/file-list.vue'
import { folderList, fileList } from './zhuangtai'

// 计算属性：是否全部选中
const isAllSelected = computed(() => {
  const foldersSelected = folderList.value.every((folder) => folder.selected)
  const filesSelected = fileList.value.every((file) => file.selected)
  return (
    foldersSelected && filesSelected && (folderList.value.length > 0 || fileList.value.length > 0)
  )
})

// 返回首页
const goBackToHome = () => {
  uni.redirectTo({
    url: '/pages/index/index',
  })
}

// 全选/取消全选
const toggleSelectAll = () => {
  const newStatus = !isAllSelected.value

  // 更新文件夹选中状态
  folderList.value.forEach((folder) => {
    folder.selected = newStatus
  })

  // 更新文件选中状态
  fileList.value.forEach((file) => {
    file.selected = newStatus
  })

  console.log('全选/取消全选状态:', newStatus)
}

// 文件夹选择切换
const toggleSelectFolder = (folder) => {
  folder.selected = !folder.selected
  console.log('切换文件夹选择状态:', folder.name, folder.selected)
}

// 文件选择切换
const toggleSelectFile = (file) => {
  file.selected = !file.selected
  console.log('切换文件选择状态:', file.name, file.selected)
}

const dibuClick = (item) => {
  // 检测是否有选中文件
  const selectedFiles = fileList.value.filter((file) => file.selected)
  if (selectedFiles.length === 0) {
    uni.showToast({
      title: '请先选择文件',
      icon: 'none',
    })
    return
  }

  uni.navigateTo({
    url: item.path,
  })
}

const loopData0 = ref([
  {
    lanhuimage0: 'icon-icon-yidong',
    lanhutext0: '移动',
    path: '/pages-sub/yidong/index',
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
@import '../../static/common/common.css';
@import 'assets/style/index.rpx.css';
</style>
