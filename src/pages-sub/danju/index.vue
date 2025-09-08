<route lang="json5">
{
  style: {
    navigationBarTitleText: '全部文档',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="全部文档" headerClass="bg-[#ffffffff]">
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
        <!--        <folder-list :folder-list="folderList" @folder-click="toggleSelectFolder" />-->

        <!-- 使用文件列表组件 -->
        <file-list :file-list="fileList" @file-click="toggleSelectFile" />
      </view>
    </view>
    <template #footer>
      <view
        class="group_6 flex-col left-0 w-full bg-white z-10 border-t border-gray-200 h-140rpx pb-safe"
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
  <wd-popup
    v-model="chongming"
    position="bottom"
    custom-style="height: 400rpx; border-radius: 20rpx 20rpx 0 0"
  >
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">重命名</div>
      <div class="w-690rpx bg-#F4F6FA; h-88rpx rounded-md flex items-center pl10rpx">
        <input
          type="text"
          class="w-690rpx bg-#F4F6FA; h-88rpx rounded-md ml10rpx"
          v-model="chongmingvalue"
        />
        <div class="w-88rpx h-88rpx bg-#F4F6FA; rounded-md flex items-center justify-center">
          <uni-icons
            type="clear"
            color="#CCCCCC"
            size="22"
            @click="chongmingvalue = ''"
          ></uni-icons>
        </div>
      </div>
      <div class="w-690rpx h-88rpx rounded-md flex items-center justify-between mt40rpx">
        <div
          @click="chongming = false"
          class="text-32rpx w330rpx h80rpx bg-#F4F6FA flex justify-center items-center rounded-md"
        >
          取消
        </div>
        <div
          @click="chongmingfun"
          class="text-32rpx w330rpx h80rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
  <wd-popup v-model="shanchu" custom-style="height: 364rpx; width: 630rpx; border-radius: 20rpx ">
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">删除提示</div>
      <div class="text-32rpx my20rpx">请确认是否删除此文档？</div>
      <div class="h-88rpx rounded-md flex items-center justify-evenly mt40rpx w-630rpx mb-20rpx">
        <div
          @click="shanchu = false"
          class="text-32rpx w270rpx h88rpx bg-#F4F6FA flex justify-center items-center rounded-md"
        >
          取消
        </div>
        <div
          @click="shanchuwendang"
          class="text-32rpx w270rpx h88rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
</template>
<script setup lang="js">
import { onShow } from '@dcloudio/uni-app'
import FolderList from '@/pages/wendang/components/folder-list.vue'
import FileList from '@/pages/wendang/components/file-list.vue'
import { folderList, fileList, fetchData } from '../quanbu-wendang-xuanze/zhuangtai'
import { downloadAttachmentAPI, getDocumentListAPI } from '@/service/foo'

// 计算属性：是否全部选中
const isAllSelected = computed(() => {
  const foldersSelected = folderList.value.every((folder) => folder.selected)
  const filesSelected = fileList.value.every((file) => file.selected)
  return (
    foldersSelected && filesSelected && (folderList.value.length > 0 || fileList.value.length > 0)
  )
})

const selectedFolderId = ref()
onLoad((options) => {
  console.log('optionsaaa', options)
  selectedFolderId.value = options.id
  getDocumentList()
})
// const fileList = ref([])
const getDocumentList = async () => {
  const res = await getDocumentListAPI({
    pageNum: 1,
    pageSize: 10,
    dirId: selectedFolderId.value,
  })
  console.log('res', res)
  if (res.code === 200) {
    fileList.value = res.rows.map((file) => {
      return {
        id: file.id,
        icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png', // 默认图标
        name: file.fileName,
        date: '' + new Date().toLocaleString(), // 假设使用当前日期时间
        selected: false,
      }
    })
  }
}

onShow(() => {
  // fetchData()
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
  item.fun()
}
const shanchu = ref(false)
const chongming = ref(false)
const chongmingvalue = ref('')

const chongmingfun = () => {
  fileList.value
    .filter((file) => file.selected)
    .forEach((file) => {
      file.name = chongmingvalue.value
    })
  chongming.value = false
}

const shanchuwendang = () => {
  // 删除选中
  fileList.value = fileList.value.filter((file) => !file.selected)
  shanchu.value = false
}

const loopData0 = ref([
  {
    lanhuimage0: 'icon-icon-yidong',
    lanhutext0: '移动',
    fun: () => {
      uni.navigateTo({
        url: '/pages-sub/yidong/index',
      })
    },
  },
  {
    lanhuimage0: 'icon-icon-zhongmingming',
    lanhutext0: '重命名',
    fun: () => {
      chongming.value = true
      const selectedFiles = fileList.value.filter((file) => file.selected)
      chongmingvalue.value = selectedFiles[0].name
    },
  },
  {
    lanhuimage0: 'icon-icon0shanchu',
    lanhutext0: '删除',
    fun: () => {
      shanchu.value = true
    },
  },
  {
    lanhuimage0: 'icon-icon-baocundaobendi',
    lanhutext0: '保存到本地',
    fun: () => {
      const selectedFiles = fileList.value.filter((file) => file.selected)
      if (selectedFiles.length === 0) {
        uni.showToast({
          title: '请先选择文件',
          icon: 'none',
        })
        return
      }

      uni.showLoading({
        title: '下载中...',
      })

      const downloadTasks = selectedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          // #ifdef MP-WEIXIN || APP-PLUS
          downloadAttachmentAPI({ attachmentId: file.id })
            .then((res) => {
              const fs = uni.getFileSystemManager()
              // Sanitize the file name to remove problematic characters
              const originalFileName = file.name || 'downloaded_file' // Fallback if file.name is empty
              const fileExtension = originalFileName.split('.').pop() || 'tmp'
              const baseFileName =
                originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName

              // Remove invalid characters and replace spaces
              const cleanBaseFileName = baseFileName.replace(/[^\w.-]/g, '_').replace(/\s/g, '_')
              const fileName = `${cleanBaseFileName}.${fileExtension}`

              const filePath = `${uni.env.USER_DATA_PATH}/${fileName}`
              fs.writeFile({
                filePath,
                data: res, // res is ArrayBuffer
                encoding: 'binary',
                success: () => {
                  // File is already saved at filePath, so we can directly open it
                  uni.openDocument({
                    filePath, // Use the path where we just wrote the file
                    showMenu: true,
                    success: function (res) {
                      console.log('打开文档成功')
                    },
                    fail: (error) => {
                      reject(new Error(`打开文档失败: ${error.errMsg}`))
                    },
                  })
                  resolve(filePath) // Resolve with the saved file path
                },
                fail: (error) => {
                  reject(new Error(`写入文件失败: ${error.errMsg}`))
                },
              })
            })
            .catch((error) => {
              reject(new Error(`下载失败: ${error.errMsg || error.message}`))
            })
          // #endif
        })
      })

      Promise.all(downloadTasks)
        .then(() => {
          uni.hideLoading()
          uni.showToast({
            title: '保存成功',
            icon: 'success',
          })
        })
        .catch((error) => {
          uni.hideLoading()
          uni.showToast({
            title: error.message || '保存失败',
            icon: 'none',
          })
        })
    },
  },
])
</script>
<style lang="css" scoped>
@import '../../static/common/common.css';
@import 'assets/style/index.rpx.css';
</style>
