<route lang="json5">
{
  style: {
    navigationBarTitleText: '文档',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju>
    <template #header>
      <view class="group_1 flex-col fixed-header">
        <view class="block_8 flex-row justify-between">
          <text class="text_2">文档</text>
          <image class="image_1" referrerpolicy="no-referrer" />
        </view>
      </view>
    </template>

    <view class="page flex-col">
      <view class="box_12 flex-col">
        <function-grid :items="functionItems" @itemClick="handleFunctionItemClick" />
      </view>
      <view class="group_3 flex-col">
        <view class="block_9 flex-row">
          <view class="text-wrapper_1">
            <text class="text_3">所有文档</text>
            <text class="text_4"></text>
            <text class="text_5">(6)</text>
          </view>
          <image
            @click="tiaozhuan"
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
          <!-- 使用文件夹列表组件 -->
          <folder-list :folder-list="folderList" @folder-click="toggleSelectFolder" />

          <!-- 使用文件列表组件 -->
          <file-list :file-list="fileList" @file-click="toggleSelectFile" />
        </view>
      </view>
    </view>
    <!--      <div :style="{ height: footerHeight }"></div>-->
    <template #footer>
      <dibu />
    </template>
  </buju>
</template>
<script setup lang="js">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import buju from '@/components/buju/buju.vue'
import dibu from '../index/dibu.vue'
import FolderList from './components/folder-list.vue'
import FileList from './components/file-list.vue'
import FunctionGrid from './components/function-grid.vue'
import { getDirectoryListAPI, fileUpload } from '@/service/foo'

const functionItems = ref([
  {
    icon: 'icon-icon-xiangcedaoru',
    text: '相册导入',
    color: '#2563EB',
  },
  {
    icon: 'icon-icon-paizhao',
    text: '拍照',
    color: '#37C3C8',
  },
  {
    icon: 'icon-icon-xinjianwenjianjia',
    text: '新建文件夹',
    color: '#37C3C8',
  },
])

// 上传文件的通用函数
const uploadFile = async (filePath) => {
  uni.showLoading({
    title: '上传中...',
  })

  try {
    const uploadRes = await fileUpload({
      filePath,
      name: 'file', // 后端接收文件的字段名
      formData: {},
    })

    if (uploadRes.code === 200) {
      uni.showToast({
        title: '上传成功',
        icon: 'success',
      })
      // 上传成功后刷新数据
      fetchData()
      // 跳转到预览页面，传递文件ID和图片路径
      uni.navigateTo({
        url:
          '/pages-sub/shougongshaicha_xiangce/index?imagePath=' +
          encodeURIComponent(filePath) +
          '&fileId=' +
          encodeURIComponent(uploadRes.data.id),
      })
    } else {
      uni.showToast({
        title: uploadRes.msg || '上传失败',
        icon: 'none',
      })
    }
  } catch (error) {
    console.error('上传失败', error)
    uni.showToast({
      title: error.message || '上传失败',
      icon: 'none',
    })
  } finally {
    uni.hideLoading()
  }
}

const takePhoto = () => {
  // 显示选择图片的选项
  uni.showActionSheet({
    itemList: ['拍照', '从相册选择'],
    success: (res) => {
      if (res.tapIndex === 0) {
        // 拍照
        uni.chooseImage({
          count: 1,
          sourceType: ['camera'],
          success: (result) => {
            console.log('拍照成功', result.tempFilePaths[0])
            // 上传文件
            uploadFile(result.tempFilePaths[0])
          },
          fail: (err) => {
            console.log('拍照失败', err)
            uni.showToast({
              title: '拍照失败',
              icon: 'error',
            })
          },
        })
      } else if (res.tapIndex === 1) {
        // 从相册选择
        uni.chooseImage({
          count: 1,
          sourceType: ['album'],
          success: (result) => {
            console.log('选择相册图片成功', result.tempFilePaths[0])
            // 上传文件
            uploadFile(result.tempFilePaths[0])
          },
          fail: (err) => {
            console.log('选择相册图片失败', err)
            uni.showToast({
              title: '选择图片失败',
              icon: 'error',
            })
          },
        })
      }
    },
  })
}

// 相册导入功能
const importFromAlbum = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['album'], // 只允许从相册选择
    success: async (res) => {
      const tempFilePath = res.tempFilePaths[0]
      uploadFile(tempFilePath)
    },
    fail: (err) => {
      console.log('选择图片失败', err)
      uni.showToast({
        title: '选择图片失败',
        icon: 'none',
      })
    },
  })
}

// 处理功能项点击
const handleFunctionItemClick = ({ item, index }) => {
  console.log('点击功能按钮:', item.text, index)
  if (item.text === '相册导入') {
    importFromAlbum()
  } else if (item.text === '拍照') {
    takePhoto()
  } else if (item.text === '新建文件夹') {
    uni.navigateTo({
      url: '/pages-sub/fenleishezhi/index',
    })
  }
  // 这里可以根据不同的功能执行不同的操作
}

// 文件夹列表
const folderList = ref([])

// 文件列表
const fileList = ref([])

// 获取数据函数
const fetchData = async () => {
  try {
    const res = await getDirectoryListAPI()
    if (res.code === 200) {
      folderList.value = res.data.dirs?.map((dir) => ({
        id: dir.id,
        icon: '/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
        name: dir.dirName,
        date: '' + new Date().toLocaleString(), // 假设使用当前日期时间
        count: dir.fileCount,
        selected: false,
      }))

      fileList.value = res.data.files.map((file) => {
        return {
          id: file.id,
          icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png', // 默认图标
          name: file.fileName,
          date: '' + new Date().toLocaleString(), // 假设使用当前日期时间
          selected: false,
        }
      })
    }
  } catch (error) {
    console.error('获取数据失败', error)
    uni.showToast({
      title: '获取数据失败',
      icon: 'error',
    })
  }
}

onShow(() => {
  fetchData()
})

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

const constants = ref({})
const tiaozhuan = () => {
  uni.navigateTo({
    url: '/pages-sub/fenleishezhi/index',
  })
}
</script>
<style lang="scss" scoped>
@import '../../static/common/common.css';

.page {
  position: relative;
  width: 750rpx;
  overflow: auto;
  background-color: rgb(242 245 250 / 100%);
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99;
}

.h-180rpx {
  height: 200rpx; /* 根据 .group_1 的实际高度调整 */
}

.group_1 {
  padding: 29rpx 14rpx 45rpx 30rpx;
  background-color: rgb(37 99 235 / 100%);
}

.block_8 {
  width: 706rpx;
  margin-top: 34rpx;
}

.text_2 {
  margin-top: 25rpx;
  font-family: PingFangSC-Medium;
  font-size: 38rpx;
  font-weight: 500;
  line-height: 40rpx;
  color: rgb(255 255 255 / 100%);
  text-align: left;
  overflow-wrap: break-word;
  white-space: nowrap;
}

.image_1 {
  width: 155rpx;
  height: 57rpx;
  margin-bottom: 8rpx;
}

.box_12 {
  padding: 30rpx 30rpx 31rpx;
}

.group_3 {
  padding: 30rpx 30rpx 34rpx;
  margin-top: -1rpx;
  background-color: rgb(255 255 255 / 100%);
}

.text-wrapper_1 {
  width: 151rpx;
  height: 32rpx;
  font-family: PingFangSC-Medium;
  font-size: 0;
  font-weight: 500;
  line-height: 32rpx;
  text-align: left;
  overflow-wrap: break-word;
  white-space: nowrap;
}

.text_3 {
  font-family: PingFangSC-Medium;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 32rpx;
  color: rgb(25 33 61 / 100%);
  text-align: left;
  overflow-wrap: break-word;
  white-space: nowrap;
}

.text_4 {
  font-family: PingFangSC-Medium;
  font-size: 24rpx;
  font-weight: 500;
  line-height: 32rpx;
  color: rgb(25 33 61 / 100%);
  text-align: left;
  overflow-wrap: break-word;
  white-space: nowrap;
}

.text_5 {
  font-size: 24rpx;
  font-weight: nan;
  line-height: 32rpx;
  color: rgb(102 102 102 / 100%);
  text-align: left;
  overflow-wrap: break-word;
  white-space: nowrap;
}

.label_4 {
  width: 32rpx;
  height: 32rpx;
  margin-left: 455rpx;
}

.label_5 {
  width: 32rpx;
  height: 32rpx;
  margin-left: 20rpx;
}

.block_10 {
  margin-top: 36rpx;
}
/* 字体图标样式 */
.font_family {
  font-family: iconfont;
}
</style>
