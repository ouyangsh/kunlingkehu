<route lang="json5">
{
  style: {
    navigationBarTitleText: '意见反馈',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="意见反馈" quanjucolor="beijingse">
    <div class="px-30rpx">
      <div class="text-60rpx font-500 mt64rpx">你好！</div>
      <div class="text-32rpx text-#777777 mt16rpx">有什么好的建议可以分享下哦～</div>
      <div class="fankuineirong mt26rpx flex justify-center items-center">
        <div class="text-32rpx font-500">反馈内容</div>
        <i class="font_family icon-sijiaoxing ml-2 pb-3"></i>
      </div>
      <div class="shuru p-30rpx text-32rpx text-#999999 box-border">
        <textarea
          v-model="feedbackContent"
          placeholder="请填写10个字以上的内容， 以便我们为您提供更好的内容"
          class="w-full h400rpx pb-20rpx"
          :auto-height="false"
          :maxlength="1000"
          :show-confirm-bar="false"
        />
        <div class="relative">
          <!-- 自定义上传区域 -->
          <div class="upload-container">
            <!-- 已上传的图片列表 -->
            <div class="uploaded-images" v-if="fileList.length > 0">
              <div v-for="(file, index) in fileList" :key="index" class="image-item">
                <image
                  :src="file.url"
                  class="uploaded-image"
                  mode="aspectFill"
                  @click="previewImage(file.url)"
                />
                <div class="remove-btn" @click="removeImage(index)">×</div>
                <!-- 上传进度 -->
                <div v-if="file.status === 'uploading'" class="upload-progress">
                  <div class="progress-bar" :style="{ width: file.progress + '%' }"></div>
                </div>
                <!-- 上传失败标识 -->
                <div v-if="file.status === 'error'" class="upload-error">上传失败</div>
              </div>
            </div>

            <!-- 添加图片按钮 -->
            <div v-if="fileList.length < 3" class="add-image-btn" @click="chooseImage">
              <div class="add-icon">+</div>
              <div class="add-text">添加图片</div>
            </div>
          </div>
        </div>
      </div>
      <div class="xiamianwenzi my20rpx">
        您可以在上传相关证明文件或截图，最多3张，仅支持jpg/jepg/png格式
      </div>

      <div class="lianxifangshi p-30rpx box-border">
        <div class="font-500 text-32rpx">联系方式</div>
        <input v-model="contactInfo" class="mt-40rpx" type="text" placeholder="请输入手机号/邮箱" />
      </div>
    </div>
    <template #footer>
      <div class="p-30rpx pb-safe">
        <div
          @click="submitFeedback"
          class="w-full h-88rpx bg-blue-600 rounded-16rpx flex justify-center items-center"
        >
          <text class="text-white text-32rpx font-500">提交</text>
        </div>
      </div>
    </template>
  </buju>
</template>

<script setup lang="js">
import { useUserStore } from '@/store'
import { fileUpload, submitFeedbackAPI } from '@/service/foo'

const userStore = useUserStore()

// 计算属性
const pageslength = computed(() => getCurrentPages().length)

const navigateBack = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
  } else {
    uni.reLaunch({
      url: '/pages/index/index',
    })
  }
}

const fileList = ref([])

// 选择图片
const chooseImage = () => {
  uni.chooseImage({
    count: 3 - fileList.value.length, // 最多选择剩余数量
    sizeType: ['compressed'], // 压缩图
    sourceType: ['album', 'camera'], // 相册和相机
    success: (res) => {
      console.log('选择图片成功:', res)
      // 为每个选中的图片创建文件对象并开始上传
      res.tempFilePaths.forEach((filePath) => {
        uploadImage(filePath)
      })
    },
    fail: (error) => {
      console.error('选择图片失败:', error)
      uni.showToast({
        title: '选择图片失败',
        icon: 'error',
      })
    },
  })
}

// 上传单个图片
const uploadImage = async (filePath) => {
  // 创建文件对象
  const fileObj = {
    url: filePath,
    status: 'uploading',
    progress: 0,
    uploadId: null,
  }

  // 添加到文件列表
  fileList.value.push(fileObj)
  const fileIndex = fileList.value.length - 1

  try {
    console.log('开始上传文件:', filePath)

    // 模拟上传进度
    const progressTimer = setInterval(() => {
      if (fileList.value[fileIndex] && fileList.value[fileIndex].progress < 90) {
        fileList.value[fileIndex].progress += 10
      }
    }, 200)

    const uploadResult = await fileUpload({
      filePath,
      name: 'file',
      formData: {
        dirId: '', // 可以为空
      },
    })

    clearInterval(progressTimer)
    console.log('上传结果:', uploadResult)

    if (uploadResult.code === 200) {
      // 更新文件状态，保持本地url用于预览
      fileList.value[fileIndex] = {
        ...fileList.value[fileIndex],
        // url 保持本地路径用于预览
        serverFileName: uploadResult.data.fileName, // 保存服务器返回的fileName
        uploadId: uploadResult.data.id,
        status: 'success',
        progress: 100,
      }

      uni.showToast({
        title: '上传成功',
        icon: 'success',
      })
    } else {
      throw new Error(uploadResult.msg || '上传失败')
    }
  } catch (error) {
    console.error('上传失败:', error)

    // 更新文件状态为失败
    if (fileList.value[fileIndex]) {
      fileList.value[fileIndex].status = 'error'
    }

    uni.showToast({
      title: '上传失败',
      icon: 'error',
    })
  }
}

// 删除图片
const removeImage = (index) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这张图片吗？',
    success: (res) => {
      if (res.confirm) {
        fileList.value.splice(index, 1)
        console.log('图片已删除，当前列表:', fileList.value)
      }
    },
  })
}

// 预览图片
const previewImage = (url) => {
  // 获取所有成功上传的图片URL
  const urls = fileList.value.filter((file) => file.status === 'success').map((file) => file.url)

  uni.previewImage({
    current: url,
    urls,
  })
}

// 反馈内容和联系方式
const feedbackContent = ref('')
const contactInfo = ref('')

// 提交反馈
const submitFeedback = async () => {
  if (!feedbackContent.value || feedbackContent.value.length < 10) {
    uni.showToast({
      title: '请填写10个字以上的反馈内容',
      icon: 'none',
    })
    return
  }

  // 获取已上传的文件名列表
  const uploadedFiles = fileList.value
    .filter((file) => file.status === 'success')
    .map((file) => file.serverFileName)

  // 准备提交数据
  const submitData = {
    content: feedbackContent.value,
    contact: contactInfo.value || '',
  }

  // 如果有上传的图片，添加第一张图片的URL
  if (uploadedFiles.length > 0) {
    submitData.imageUrl = uploadedFiles[0]
  }

  try {
    console.log('提交反馈数据:', submitData)
    
    const result = await submitFeedbackAPI(submitData)
    
    if (result.code === 200) {
      uni.showToast({
        title: '反馈提交成功',
        icon: 'success',
      })
      
      // 清空表单
      feedbackContent.value = ''
      contactInfo.value = ''
      fileList.value = []
      
      // 延迟返回上一页
      setTimeout(() => {
        navigateBack()
      }, 1500)
    } else {
      throw new Error(result.msg || '提交失败')
    }
  } catch (error) {
    console.error('提交反馈失败:', error)
    uni.showToast({
      title: '提交失败，请重试',
      icon: 'error',
    })
  }
}

// 用户信息
const userInfo = computed(() => userStore.userInfo)

// 页面加载时获取用户信息
onMounted(() => {
  console.log('个人信息页面加载，用户信息：', userInfo.value)
})
</script>

<style lang="scss" scoped>
.user-info-container {
}

.info-list {
  background-color: #fff;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 40rpx;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.lianxifangshi {
  width: 690rpx;
  height: 200rpx;
  background: #fff;
  border-radius: 16rpx;
}

.label {
  font-size: 28rpx;
  font-weight: 400;
  color: #000;
}

.value {
  font-size: 28rpx;
  font-weight: 400;
  color: #333;
  text-align: right;
}

.shuru {
  width: 690rpx;
  height: 640rpx;
  background: #fff;
  border-radius: 0rpx 16rpx 16rpx;
}

.xiamianwenzi {
  width: 690rpx;
  height: 96rp x;
  font-size: 28rpx;
  font-style: normal;
  font-weight: 400;
  line-height: 48rpx;
  color: #999;
  text-align: left;
}

.tuptj {
  width: 160rpx;
  height: 160rpx;
  background: #f1f3f4;
  border-radius: 16rpx;
}

.fankuineirong {
  width: 200rpx;
  height: 64rpx;
  background: linear-gradient(90deg, #a5f8fe 0%, #bdffe0 71%, rgb(185 254 229 / 0%) 100%);
  border-radius: 16rpx 0rpx 0rpx;
}
/* 自定义上传组件样式 */
.upload-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.uploaded-images {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.image-item {
  position: relative;
  width: 160rpx;
  height: 160rpx;
  overflow: hidden;
  border-radius: 16rpx;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
}

.remove-btn {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: white;
  background: #ff4757;
  border-radius: 50%;
}

.upload-progress {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 6rpx;
  background: rgb(0 0 0 / 30%);
}

.progress-bar {
  height: 100%;
  background: #2d8cf0;
  transition: width 0.3s ease;
}

.upload-error {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 4rpx 0;
  font-size: 20rpx;
  color: white;
  text-align: center;
  background: rgb(255 71 87 / 90%);
}

.add-image-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160rpx;
  height: 160rpx;
  color: #999;
  background: #f1f3f4;
  border: 2rpx dashed #ddd;
  border-radius: 16rpx;
}

.add-icon {
  font-size: 60rpx;
  font-weight: 300;
  line-height: 1;
}

.add-text {
  margin-top: 10rpx;
  font-size: 24rpx;
}
</style>

<style lang="scss">
.beijingse {
  background: linear-gradient(180deg, #d5e9fe 0%, #f2f5fa 100%);
}
</style>
