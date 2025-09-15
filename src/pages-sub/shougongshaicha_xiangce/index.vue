<route lang="json5">
{
  style: {
    navigationBarTitleText: '相册导入',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <div class="h180rpx w-full fixed top-0 bg-[#ffffffff] z10">
    <view :style="{ height: statusBarHeight + 'px' }"></view>
    <div class="wfull flex justify-start items-center h-44px px-30rpx box-border">
      <uni-icons v-if="pageslength > 1" type="left" size="22" @click="navigateBack"></uni-icons>
      <uni-icons v-else type="home" size="22" @click="navigateBack"></uni-icons>
      <!-- 文字超出显示省略 不换行 虚线边框 虚线间隔大一些-->
      <div
        class="w386rpx text-ellipsis ml3 overflow-hidden text-26rpx font-500 whitespace-nowrap border-b-1px border-b-dashed border-b-#000000FF"
      >
        贸易合规助手2025-05-23 14.阿的说法是短发
      </div>
      <i class="font_family icon-icon-bianji !text-35rpx ml3"></i>
    </div>
  </div>

  <buju title="筛查">
    <!-- 主要内容区域 -->
    <div class="h-full p-20rpx">
      <!-- 文档预览区域 -->
      <div class="w-full h-full rounded-16rpx p-20rpx flex justify-center items-center">
        <image
          :src="currentDisplayImage"
          mode="aspectFit"
          class="w-full h-full"
          @click="previewFullScreen"
        />
      </div>
    </div>

    <template #footer>
      <!-- 底部区域 -->
      <div class="bg-white pt-20rpx pb-30rpx pb-safe">
        <!-- 缩略图选择区域 -->


        <!-- 底部操作按钮区域 -->
        <div class="flex justify-between items-center px-30rpx">
          <div class="flex gap-[80rpx] ml2">
            <view @click="retakePhoto" class="flex flex-col items-center">
              <i class="font_family icon-icon-zhongpai !text-45rpx text-gray-600"></i>

              <text class="text-18rpx text-gray-600">重拍这张</text>
            </view>

            <view @click="rotateImage" class="flex flex-col items-center">
              <i class="font_family icon-icon-zuozhuan !text-45rpx text-gray-600"></i>

              <text class="text-18rpx text-gray-600">左转</text>
            </view>

            <view @click="cropImage" class="flex flex-col items-center">
              <i class="font_family icon-icon-caijian !text-45rpx text-gray-600"></i>
              <text class="text-18rpx text-gray-600">裁剪</text>
            </view>

            <view @click="enhanceImage" class="flex flex-col items-center">
              <i class="font_family icon-icon-jiaozheng !text-45rpx text-gray-600"></i>
              <text class="text-18rpx text-gray-600">矫正</text>
            </view>
          </div>

          <!-- 确认按钮 -->
          <view
            @click="confirmImage"
            class="w-122rpx h-60rpx bg-blue-600 rounded-8rpx flex justify-center items-center"
          >
            <uni-icons type="checkmarkempty" size="30" color="white"></uni-icons>
          </view>
        </div>
      </div>
    </template>
  </buju>
</template>
<script setup lang="js">
import { correctDocumentAPI } from '@/service/foo'

const statusBarHeight = ref(0)
const pageslength = computed(() => getCurrentPages().length)

const navigateBack = () => {
  console.log('asdf')
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
  } else {
    uni.reLaunch({
      url: '/pages/index/index',
    })
  }
}

// 图片预览相关
const previewImagePath = ref('')
const selectedImageType = ref(1) // 默认选择增强文本解析
const enhancedImagePath = ref('')
const fileId = ref('') // 存储文件ID

// 当前显示的图片
const currentDisplayImage = computed(() => {
  return selectedImageType.value === 0 ? previewImagePath.value : enhancedImagePath.value
})

// 获取传入的图片路径和文件ID
const getImagePath = () => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}

  if (options.imagePath) {
    previewImagePath.value = decodeURIComponent(options.imagePath)
    // 模拟增强图片（实际应该是处理后的图片）
    enhancedImagePath.value = previewImagePath.value
    console.log('接收到图片路径：', previewImagePath.value)
  }
  
  if (options.fileId) {
    fileId.value = decodeURIComponent(options.fileId)
    console.log('接收到文件ID：', fileId.value)
  }
}

// 选择图片类型
const selectImageType = (type) => {
  selectedImageType.value = type
}

// 全屏预览
const previewFullScreen = () => {
  uni.previewImage({
    urls: [previewImagePath.value],
    current: previewImagePath.value,
  })
}

// 重新拍摄
const retakePhoto = () => {
  uni.showActionSheet({
    itemList: ['拍照', '从相册选择'],
    success: (res) => {
      const sourceType = res.tapIndex === 0 ? ['camera'] : ['album']
      uni.chooseImage({
        count: 1,
        sourceType,
        success: (result) => {
          previewImagePath.value = result.tempFilePaths[0]
          uni.showToast({
            title: '图片已更新',
            icon: 'success',
          })
        },
      })
    },
  })
}

// 旋转图片
const rotateImage = () => {
  uni.showToast({
    title: '图片已旋转',
    icon: 'success',
  })
}

// 裁剪图片
const cropImage = () => {
  uni.showToast({
    title: '进入裁剪模式',
    icon: 'none',
  })
}

// 矫正图片
const enhanceImage = async () => {
  if (!fileId.value) {
    uni.showToast({
      title: '文件ID不存在，无法矫正',
      icon: 'error',
    })
    return
  }

  uni.showLoading({
    title: '正在矫正...',
  })

  try {
    const result = await correctDocumentAPI(fileId.value)
    
    if (result.code === 200 && result.data && result.data.length > 0) {
      // 使用返回的base64图片数据替换增强图片
      enhancedImagePath.value = result.data[0]
      // 自动切换到增强图片显示
      selectedImageType.value = 1
      
      uni.showToast({
        title: '矫正完成',
        icon: 'success',
      })
      console.log('矫正结果：', result)
    } else {
      uni.showToast({
        title: result.msg || '矫正失败',
        icon: 'error',
      })
    }
  } catch (error) {
    console.error('矫正失败：', error)
    uni.showToast({
      title: error.message || '矫正失败',
      icon: 'error',
    })
  } finally {
    uni.hideLoading()
  }
}

// 确认图片
const confirmImage = () => {
  uni.showModal({
    title: '确认',
    content: '确定要使用这张图片吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '图片处理完成',
          icon: 'success',
        })

        setTimeout(() => {
          uni.navigateBack()
        }, 1500)
      }
    },
  })
}

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight
  // 获取图片路径
  getImagePath()
})
</script>
<style lang="scss" scoped>
/* 这里只保留真正需要的自定义样式 */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
