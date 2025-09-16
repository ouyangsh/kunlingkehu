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
        <folder-list
          :isAllSelected="true"
          :folder-list="folderList"
          @folder-click="toggleSelectFolder"
        />
        <!--        使用文件列表组件-->
        <!--        <file-list :file-list="fileList" @file-click="toggleSelectFile" />-->
      </view>
    </view>
    <template #footer>
      <div class="h-180rpx w-full bg-[#ffffffff] flex justify-evenly items-center pb-2 box-border">
        <div
          class="w-330rpx h-88rpx bg-[#F2F5FA] rounded-1 flex justify-center items-center"
          @click="createNewFolder"
        >
          新建文件夹
        </div>
        <div
          class="w-330rpx h-88rpx bg-[#2563EB] text-[#ffffff] rounded-1 flex justify-center items-center"
          :class="{ 'opacity-50': true }"
        >
          移动({{ selectedCount }})
        </div>
      </div>
    </template>
  </buju>

  <!-- 新建文件夹弹窗 -->
  <wd-popup
    v-model="show"
    position="bottom"
    custom-style="height: 400rpx; border-radius: 20rpx 20rpx 0 0"
  >
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">新建文件夹</div>
      <div class="w-690rpx bg-#F4F6FA; h-88rpx rounded-md flex items-center pl10rpx">
        <input
          type="text"
          class="w-690rpx bg-#F4F6FA; h-88rpx rounded-md ml10rpx"
          v-model="inputValue"
          placeholder="请输入文件夹名称"
        />
        <div class="w-88rpx h-88rpx bg-#F4F6FA; rounded-md flex items-center justify-center">
          <uni-icons type="clear" color="#CCCCCC" size="22" @click="inputValue = ''"></uni-icons>
        </div>
      </div>
      <div class="w-690rpx h-88rpx rounded-md flex items-center justify-between mt40rpx">
        <div
          @click="handleClose"
          class="text-32rpx w330rpx h80rpx bg-#F4F6FA flex justify-center items-center rounded-md"
        >
          取消
        </div>
        <div
          @click="handleConfirm"
          class="text-32rpx w330rpx h80rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
</template>
<script setup lang="js">
import FolderList from '@/pages/wendang/components/folder-list.vue'
import FileList from '@/pages/wendang/components/file-list.vue'
import { folderList, fileList, fetchData } from '../quanbu-wendang-xuanze/zhuangtai'
import { addCategoryAPI } from '@/service/foo'

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

// 进入文件夹
const toggleSelectFolder = (folder) => {
  uni.navigateTo({
    url: '/pages-sub/yidong2/index?targetDirId=' + folder.id,
  })
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

// 新建文件夹弹窗状态
const show = ref(false)
const inputValue = ref('')

// 新建文件夹功能
const createNewFolder = () => {
  show.value = true
  inputValue.value = ''
}

// 关闭弹窗
const handleClose = () => {
  show.value = false
}

// 确认新建文件夹
const handleConfirm = async () => {
  if (!inputValue.value) {
    uni.showToast({
      title: '文件夹名称不能为空',
      icon: 'none',
    })
    return
  }

  try {
    const res = await addCategoryAPI(inputValue.value)
    if (res.code === 200) {
      uni.showToast({
        title: '创建成功',
        icon: 'success',
      })
      // 刷新文件夹列表
      await fetchData()
    } else {
      uni.showToast({
        title: res.message || '创建失败',
        icon: 'none',
      })
    }
  } catch (error) {
    console.error('创建文件夹失败', error)
    uni.showToast({
      title: '创建失败',
      icon: 'none',
    })
  }

  show.value = false
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
