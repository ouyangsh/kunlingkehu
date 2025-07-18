<route lang="json5">
{
  style: {
    navigationBarTitleText: '全部文档',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju :title="folder.name">
    <view class="overflow-auto">
      <!--      <view-->
      <!--        class="inline-block h-80rpx bg-[#ffffffff] mt&#45;&#45;3rpx z-10 justify-between px-30rpx box-border fixed items-center w-full"-->
      <!--      >-->
      <!--        <text class="text_3" @click="goBackToHome">取消</text>-->
      <!--        <text class="text_4" @click="toggleSelectAll">-->
      <!--          {{ isAllSelected ? '取消全选' : '全选' }}-->
      <!--        </text>-->
      <!--      </view>-->
      <!--      <div class="h-80rpx"></div>-->
      <view class="group_4 flex-col pb-140rpx">
        <!-- 使用文件夹列表组件 -->
        <!--        <folder-list-->
        <!--          :isAllSelected="true"-->
        <!--          :folder-list="folder"-->
        <!--          @folder-click="toggleSelectFolder"-->
        <!--        />-->
        <!--        使用文件列表组件-->
        <file-list
          :isShowIcon="false"
          :file-list="folder.fileList"
          @file-click="toggleSelectFile"
        />
      </view>
    </view>
    <template #footer>
      <div class="h-180rpx w-full bg-[#ffffffff] flex justify-evenly items-center pb-2 box-border">
        <div class="w-330rpx h-88rpx bg-[#F2F5FA] rounded-1 flex justify-center items-center">
          新建文件夹
        </div>
        <div
          class="w-330rpx h-88rpx bg-[#2563EB] text-[#ffffff] rounded-1 flex justify-center items-center"
        >
          移动({{ selectedCount }})
        </div>
      </div>
    </template>
  </buju>
</template>
<script setup lang="js">
import FolderList from '@/pages/wendang/components/folder-list.vue'
import FileList from '@/pages/wendang/components/file-list.vue'
import { folder, fileList, folderList } from '../quanbu-wendang-xuanze/zhuangtai'

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

// 计算属性：选中的文件数量
const selectedCount = computed(() => {
  return fileList.value.filter((file) => file.selected).length
})

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
