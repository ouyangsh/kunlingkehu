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
    <div class="h-80% p-20rpx">
      <!-- 文档预览区域 -->
      <div
        v-if="!isCropping"
        class="w-full h-full rounded-16rpx flex justify-center items-center relative"
      >
        <image
          :src="currentDisplayImage"
          mode="aspectFit"
          class="w-full h-full"
          :style="{ transform: `rotate(${rotationAngle}deg)` }"
          @click="previewFullScreen()"
          @load="onImageLoad"
        />
      </div>

      <!-- 裁剪区域 -->
      <div v-else class="w-full h-full">
        <qf-image-cropper
          ref="imageCropper"
          :src="currentDisplayImage"
          :width="400"
          :height="400"
          :showBorder="true"
          :showGrid="true"
          :showAngle="true"
          :choosable="true"
          @crop="onCropComplete"
        />
      </div>
    </div>

    <template #footer>
      <!-- 底部区域 -->
      <div class="bg-white pt-20rpx pb-30rpx pb-safe">
        <!-- 缩略图选择区域 -->

        <!-- 底部操作按钮区域 -->
        <div class="flex justify-between items-center px-30rpx">
          <!-- 裁剪模式下的操作按钮 -->
          <div v-if="isCropping" class="flex justify-between items-center w-full">
            <view @click="cancelCrop" class="flex flex-col items-center">
              <i class="font_family icon-icon-quxiao !text-45rpx text-gray-600"></i>
              <text class="text-18rpx text-gray-600">取消</text>
            </view>

            <view @click="confirmCrop" class="flex flex-col items-center">
              <i class="font_family icon-icon-queding !text-45rpx text-blue-600"></i>
              <text class="text-18rpx text-blue-600">确认裁剪</text>
            </view>
          </div>

          <!-- 正常模式下的操作按钮 -->
          <div v-else class="flex gap-[80rpx] ml2">
            <view @click="retakePhoto" class="flex flex-col items-center">
              <i class="font_family icon-icon-zhongpai !text-45rpx text-gray-600"></i>
              <text class="text-18rpx text-gray-600">重拍</text>
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
            v-if="!isCropping"
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
import { correctDocumentAPI, fileUpload } from '@/service/foo'
import QfImageCropper from '@/uni_modules/qf-image-cropper/components/qf-image-cropper/qf-image-cropper.vue'

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

// 裁剪相关状态
const isCropping = ref(false) // 是否处于裁剪模式
const imageCropper = ref(null) // 裁剪组件引用
const rotationAngle = ref(0) // 图片旋转角度

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
  const imageUrl = currentDisplayImage.value
  if (!imageUrl) {
    uni.showToast({
      title: '暂无图片可预览',
      icon: 'none',
    })
    return
  }

  uni.previewImage({
    urls: [imageUrl],
    current: imageUrl,
    fail: (error) => {
      console.error('预览失败：', error)
      uni.showToast({
        title: '预览失败',
        icon: 'error',
      })
    },
  })
}

// 重新拍摄
const retakePhoto = () => {
  uni.showActionSheet({
    itemList: ['拍照', '从相册选择'],
    success: (res) => {
      const sourceType = res.tapIndex === 0 ? ['camera'] : ['album']

      // 显示加载提示
      uni.showLoading({
        title: res.tapIndex === 0 ? '正在打开相机...' : '正在打开相册...',
        mask: true,
      })

      uni.chooseImage({
        count: 1,
        sourceType,
        sizeType: ['original', 'compressed'], // 支持原图和压缩图
        success: async (result) => {
          try {
            // 验证图片是否有效
            if (!result.tempFilePaths || result.tempFilePaths.length === 0) {
              throw new Error('未选择有效图片')
            }

            const newImagePath = result.tempFilePaths[0]

            // 更新图片路径
            previewImagePath.value = newImagePath
            enhancedImagePath.value = newImagePath

            // 重置所有状态
            rotationAngle.value = 0
            selectedImageType.value = 0 // 重置为原图显示
            isCropping.value = false // 退出裁剪模式

            // 显示上传提示
            uni.showLoading({
              title: '正在上传图片...',
              mask: true,
            })

            // 调用上传接口获取新图片ID
            console.log('开始上传图片，路径：', newImagePath)

            const uploadResult = await fileUpload({
              filePath: newImagePath,
              name: 'file',
              formData: {
                // 可以添加其他需要的参数
              },
            })

            console.log('上传原始结果：', uploadResult)

            if (uploadResult && uploadResult.data) {
              let responseData
              try {
                responseData =
                  typeof uploadResult.data === 'string'
                    ? JSON.parse(uploadResult.data)
                    : uploadResult.data
                console.log('解析后的响应数据：', responseData)
              } catch (parseError) {
                console.error('解析上传响应失败：', parseError)
                console.error('原始数据：', uploadResult.data)
                throw new Error('响应数据格式错误')
              }

              console.log('检查响应码：', responseData.code)
              console.log('检查数据：', responseData.data)

              // 检查两种可能的响应格式
              if (responseData.code === 200) {
                // 标准格式：{code: 200, data: {id: "xxx"}}
                if (responseData.data && responseData.data.id) {
                  fileId.value = responseData.data.id
                  console.log('重拍上传成功，新文件ID：', fileId.value)

                  uni.hideLoading()
                  uni.showToast({
                    title: '图片已更新',
                    icon: 'success',
                    duration: 1500,
                  })
                } else {
                  console.error('数据结构异常：', responseData.data)
                  throw new Error('上传成功但未返回文件ID')
                }
              } else if (responseData.id) {
                // 直接返回数据格式：{id: "xxx", fileName: "xxx", ...}
                fileId.value = responseData.id
                console.log('重拍上传成功（直接格式），新文件ID：', fileId.value)

                uni.hideLoading()
                uni.showToast({
                  title: '图片已更新',
                  icon: 'success',
                  duration: 1500,
                })
              } else {
                console.error('响应格式不匹配：', responseData)
                throw new Error(responseData.msg || '上传失败')
              }
            } else {
              console.error('上传结果异常：', uploadResult)
              throw new Error('上传响应异常')
            }

            console.log('重拍成功，新图片路径：', newImagePath)
          } catch (error) {
            uni.hideLoading()
            console.error('重拍处理失败：', error)

            // 如果上传失败，清空文件ID
            fileId.value = ''

            uni.showToast({
              title: error.message || '图片处理失败',
              icon: 'error',
            })
          }
        },
        fail: (error) => {
          uni.hideLoading()
          console.error('重拍失败：', error)

          // 根据不同错误类型给出不同提示
          let errorMessage = '操作失败'
          if (error.errMsg) {
            if (error.errMsg.includes('cancel')) {
              errorMessage = '已取消选择'
            } else if (error.errMsg.includes('permission')) {
              errorMessage = '请授权相机或相册权限'
            } else if (error.errMsg.includes('camera')) {
              errorMessage = '相机启动失败'
            } else if (error.errMsg.includes('album')) {
              errorMessage = '相册打开失败'
            }
          }

          uni.showToast({
            title: errorMessage,
            icon: 'none',
            duration: 2000,
          })
        },
      })
    },
    fail: () => {
      // 用户取消选择操作方式
      console.log('用户取消选择操作方式')
    },
  })
}

// 旋转图片（左旋90度）
const rotateImage = () => {
  rotationAngle.value = (rotationAngle.value - 90) % 360
  uni.showToast({
    title: '图片已左转90度',
    icon: 'success',
  })
}

// 图片加载完成事件
const onImageLoad = (e) => {
  // 获取图片实际显示尺寸（如果需要的话）
  console.log('图片加载完成', e.detail)
}

// 进入裁剪模式
const cropImage = () => {
  isCropping.value = true
  uni.showToast({
    title: '进入裁剪模式',
    icon: 'none',
  })
}

// 取消裁剪
const cancelCrop = () => {
  isCropping.value = false
  uni.showToast({
    title: '已取消裁剪',
    icon: 'none',
  })
}

// 裁剪完成回调
const onCropComplete = (e) => {
  console.log('裁剪完成:', e)
  // 更新图片显示为裁剪后的图片
  enhancedImagePath.value = e.tempFilePath
  selectedImageType.value = 1

  // 退出裁剪模式
  isCropping.value = false

  uni.showToast({
    title: '裁剪完成',
    icon: 'success',
  })
}

// 确认裁剪
const confirmCrop = () => {
  // 触发裁剪组件的裁剪方法
  if (imageCropper.value) {
    imageCropper.value.crop()
  }
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
const confirmImage = async () => {
  try {
    // 获取当前显示的图片路径
    const currentImagePath = currentDisplayImage.value

    if (!currentImagePath) {
      uni.showToast({
        title: '没有可确认的图片',
        icon: 'error',
      })
      return
    }

    // 显示上传提示
    uni.showLoading({
      title: '正在上传图片...',
      mask: true,
    })

    console.log('开始确认上传图片，路径：', currentImagePath)

    // 调用上传接口
    const uploadResult = await fileUpload({
      filePath: currentImagePath,
      name: 'file',
      formData: {
        // 可以添加其他需要的参数
      },
    })

    console.log('确认上传原始结果：', uploadResult)

    if (uploadResult && uploadResult.data) {
      let responseData
      try {
        responseData =
          typeof uploadResult.data === 'string' ? JSON.parse(uploadResult.data) : uploadResult.data
        console.log('确认上传解析后的响应数据：', responseData)
      } catch (parseError) {
        console.error('解析确认上传响应失败：', parseError)
        throw new Error('响应数据格式错误')
      }

      // 检查两种可能的响应格式
      if (responseData.code === 200) {
        // 标准格式：{code: 200, data: {id: "xxx"}}
        if (responseData.data && responseData.data.id) {
          fileId.value = responseData.data.id
          console.log('确认上传成功，文件ID：', fileId.value)
        }
      } else if (responseData.id) {
        // 直接返回数据格式：{id: "xxx", fileName: "xxx", ...}
        fileId.value = responseData.id
        console.log('确认上传成功（直接格式），文件ID：', fileId.value)
      } else {
        throw new Error(responseData.msg || '上传失败')
      }

      uni.hideLoading()
      uni.showToast({
        title: '图片上传完成',
        icon: 'success',
        duration: 1500,
      })

      // 通知主页面刷新数据
      uni.$emit('refreshMainPage')

      setTimeout(() => {
        uni.navigateBack({
          success: () => {
            // 返回成功后，通过页面间通信刷新上一页数据
            const pages = getCurrentPages()
            if (pages.length > 1) {
              const prevPage = pages[pages.length - 2]
              // 如果上一页有fetchData方法，则调用刷新（支持主页面和文档页面）
              if (prevPage.$vm && typeof prevPage.$vm.fetchData === 'function') {
                prevPage.$vm.fetchData()
              }
            }
          },
        })
      }, 1500)
    } else {
      throw new Error('上传响应异常')
    }
  } catch (error) {
    uni.hideLoading()
    console.error('确认上传失败：', error)

    uni.showToast({
      title: error.message || '上传失败',
      icon: 'error',
      duration: 2000,
    })
  }
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
/* 保留必要的样式 */
</style>
