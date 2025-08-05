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
        <folder-list :folder-list="folderList" @folder-click="toggleSelectFolder" />

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
          uni.downloadFile({
            // H5端暂不支持，可自行实现
            url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', // 使用一个公开的PDF文件作为测试下载地址
            success: (res) => {
              if (res.statusCode === 200) {
                uni.saveFile({
                  tempFilePath: res.tempFilePath,
                  success: (saveRes) => {
                    uni.openDocument({
                      filePath: saveRes.savedFilePath,
                      showMenu: true,
                      success: function (res) {
                        console.log('打开文档成功')
                      },
                    })
                    resolve(saveRes.savedFilePath)
                  },
                  fail: () => {
                    reject(new Error('保存失败'))
                  },
                })
              } else {
                reject(new Error('下载失败'))
              }
            },
            fail: () => {
              reject(new Error('下载失败'))
            },
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
