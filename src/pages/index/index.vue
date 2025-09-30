<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <buju title="首页">
    <template #header>
      <view class="box_1 flex-col fixed top-0 left-0 z-10">
        <image class="box_1_background" src="/static/used-images/qwer.png" mode="" />
        <view class="box_1_content flex-col">
          <view class="image-wrapper_13 flex-row">
            <image class="image_1" referrerpolicy="no-referrer" />
          </view>
          <view class="text-wrapper_6 flex-row">
            <text class="text_2">贸易合规，国货领航！</text>
          </view>
          <view class="image-wrapper_14 flex-row">
            <!--            <image-->
            <!--              class="image_2"-->
            <!--              referrerpolicy="no-referrer"-->
            <!--              src="/static/used-images/SketchPng90d6059e3c0b86e5c9b56bf40c7b4c9d17beb6da4b70b2778e006005f96729b4.png"-->
            <!--            />-->
          </view>
        </view>
      </view>
    </template>
    <view class="page flex-col">
      <view class="h-80rpx"></view>
      <view class="box_25 flex-col">
        <function-grid :items="functionItems" @itemClick="handleFunctionItemClick" />
      </view>
      <view class="box_4 flex-col">
        <view class="section_10 flex-row justify-between">
          <text class="text_3">最近使用</text>
          <view class="image-text_32 flex-row justify-between" @click="navigateToAllDocs">
            <text class="text-group_2">全部文档</text>
            <image
              class="thumbnail_1"
              referrerpolicy="no-referrer"
              src="/static/used-images/SketchPng0c59d307ad6b7e2bdfdf2318d36012ee119fa9b3ceac3a5c743401e1beeee2ca.png"
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
    <template #footer>
      <dibu />
    </template>
  </buju>
</template>
<script setup>
import dibu from './dibu.vue'
import FolderList from '@/pages/wendang/components/folder-list.vue'
import FileList from '@/pages/wendang/components/file-list.vue'
import FunctionGrid from '@/pages/wendang/components/function-grid.vue'
import { onMounted, watch } from 'vue'
import { http } from '@/utils/http'
import { downloadAttachmentAPI, fileUpload } from '@/service/foo'
import { useUserStore } from '@/store'
const { footerHeight } = useLayout()
const loopData0 = ref([
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
const folderList = ref([])

// 文件列表
const fileList = ref([])

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

// 文件夹选择切换
const toggleSelectFolder = async (folder) => {
  // 跳转到分类设置页面，传递文件夹信息
  const folderId = folder.id || ''
  const folderName = encodeURIComponent(folder.name || '')
  const url = `/pages-sub/fenleishezhi/index?folderId=${folderId}&folderName=${folderName}`

  uni.navigateTo({
    url,
    success: () => {
      console.log('跳转到分类设置页面成功')
    },
    fail: (err) => {
      console.error('跳转到分类设置页面失败:', err)
      uni.showToast({
        title: '页面跳转失败',
        icon: 'error',
      })
    },
  })
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
      '/static/used-images/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-21 10.46',
    subtitle: '2025/05/21 12:36',
    selected: false,
  },

  {
    id: 1,
    image:
      '/static/used-images/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-21 10.46',
    subtitle: '2025/05/21 12:36',
    selected: false,
  },
  {
    id: 1,
    image:
      '/static/used-images/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-21 10.46',
    subtitle: '2025/05/21 12:36',
    selected: false,
  },
  {
    id: 1,
    image:
      '/static/used-images/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-21 10.46',
    subtitle: '2025/05/21 12:36',
    selected: false,
  },
  {
    id: 2,
    image:
      '/static/used-images/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
    title: '贸易合规助手2025-05-22 11.47',
    subtitle: '2025/05/22 12:37',
    selected: true,
  },
])

const toggleSelect = (item) => {
  item.selected = !item.selected
}
const constants = ref({})

const functionItems = ref([
  {
    icon: 'icon-icon-xiangcedaoru',
    text: '相册导入',
    color: '#2563EB',
    fun: () => {
      uni.chooseImage({
        count: 1,
        sourceType: ['album'], // 只允许从相册选择
        success: async (res) => {
          const tempFilePath = res.tempFilePaths[0]
          uni.showLoading({
            title: '上传中...',
          })
          try {
            const uploadRes = await fileUpload({
              filePath: tempFilePath,
              name: 'file', // 后端接收文件的字段名
              formData: {},
            })

            if (uploadRes.code === 200) {
              uni.showToast({
                title: '上传成功',
                icon: 'success',
              })
              // 上传成功后可以刷新数据或者进行其他操作
              fetchData()
            } else {
              uni.showToast({
                title: uploadRes.msg || '上传失败',
                icon: 'none',
              })
            }
          } catch (error) {
            uni.showToast({
              title: error.message || '上传失败',
              icon: 'none',
            })
          } finally {
            uni.hideLoading()
          }
        },
        fail: (err) => {
          console.log('选择图片失败', err)
          uni.showToast({
            title: '选择图片失败',
            icon: 'none',
          })
        },
      })
    },
  },
  {
    icon: 'icon-icon-paizhao',
    text: '拍照',
    color: '#37C3C8',
    fun: () => {
      takePhoto()
    },
  },
  {
    icon: 'icon-icon-zhishiku',
    text: '知识库',
    color: '#F45C27',
    fun: () => {
      // 知识库逻辑
    },
  },
])

// 处理功能项点击
const handleFunctionItemClick = ({ item, index }) => {
  if (item.fun) {
    item.fun()
  }
  // 这里可以根据不同的功能执行不同的操作
}

// 跳转到全部文档选择页面
const navigateToAllDocs = () => {
  uni.navigateTo({
    url: '/pages-sub/quanbu-wendang-xuanze/index',
  })
}

const fetchData = async () => {
  try {
    const res = await http({ url: '/tscc/attachment-directory/last', method: 'POST' })

    if (res.code === 200) {
      folderList.value = res.data.dirs.map((dir) => ({
        id: dir.id,
        icon: '/static/used-images/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png', // 默认图标
        name: dir.dirName,
        date: '' + new Date().toLocaleString(), // 假设使用当前日期时间
        count: dir.fileCount,
        selected: false,
      }))

      fileList.value = res.data.files.map((file) => {
        return {
          id: file.id,
          icon: '/static/used-images/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png', // 默认图标
          name: file.fileName,
          date: '' + new Date().toLocaleString(), // 假设使用当前日期时间
          selected: false,
        }
      })
    }
  } catch (error) {
    console.error('获取数据失败', error)
    // uni.showToast({
    //   title: '获取数据失败',
    //   icon: 'error',
    // })
  }
}

onMounted(() => {
  if (userStore.isLogined) {
    fetchData()
  }
})

const userStore = useUserStore()

watch(
  () => userStore.isLogined,
  (newVal, oldVal) => {
    if (newVal === true && oldVal === false) {
      fetchData()
    }
  },
  { immediate: false }, // 不在组件初始化时立即执行，只在变化时执行
)
</script>
<style lang="css" scoped>
@import '../../static/common/common.css';
@import './assets/style/index.rpx.css';

.block_10 {
  margin-top: 36rpx;
}
</style>
