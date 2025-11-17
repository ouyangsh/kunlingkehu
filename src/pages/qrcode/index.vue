<route lang="json5">
{
  style: {
    navigationBarTitleText: '绑定',
    navigationStyle: 'default',
  },
}
</route>

<template>
  <view class="qrcode-page">
    <!-- 页面头部 -->
    <view class="header-section">
      <view class="title">小程序绑定</view>
    </view>

    <!--    <view v-if="bindingUuid || bindingWeixinCode" class="binding-info">-->
    <!--      <view class="info-title">当前绑定参数</view>-->
    <!--      <view class="info-content">{{ bindingPayloadDisplay }}</view>-->
    <!--    </view>-->

    <!-- 扫码结果显示 -->
    <!--    <view v-if="scanResult" class="scan-result">-->
    <!--      <view class="result-title">扫码结果</view>-->
    <!--      <view class="result-content">{{ scanResult }}</view>-->
    <!--      <view class="result-actions">-->
    <!--        <button class="copy-btn" @click="copyResult">复制结果</button>-->
    <!--        <button class="clear-btn" @click="clearResult">清除</button>-->
    <!--      </view>-->
    <!--    </view>-->
  </view>
</template>

<script setup lang="js">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/store'
import { bindWeixinMiniProgramAPI } from '@/service/auth'
import { autoLogin } from '@/utils/autoLogin'

const userStore = useUserStore()

// 二维码相关状态
const qrcodeUrl = ref('')
const qrcodeText = ref('')
const scanResult = ref('')
const bindingUuid = ref('')
const bindingWeixinCode = ref('')
const bindingLoading = ref(false)
const bindingPayloadDisplay = computed(() => {
  const uuid = bindingUuid.value || '空'
  const code = bindingWeixinCode.value || '空'
  return `{ uuid: ${uuid}, weixinCode: ${code} }`
})

const getUuidFromOptions = (options) => {
  if (!options) return ''
  if (options.uuid) return options.uuid
  if (options.scene) {
    try {
      const decoded = decodeURIComponent(options.scene)
      const pairs = decoded.split('&')
      for (const pair of pairs) {
        const [key, value] = pair.split('=')
        if (key === 'uuid' && value) {
          return value
        }
      }
      return decoded
    } catch (error) {
      return options.scene
    }
  }
  return ''
}

const bindWeixinWithUuid = async (uuid) => {
  if (!uuid || bindingLoading.value) return
  bindingLoading.value = true
  try {
    const loginRes = await uni.login({ provider: 'weixin' })
    if (!loginRes || !loginRes.code) {
      throw new Error('获取微信授权失败')
    }
    bindingWeixinCode.value = loginRes.code
    const response = await bindWeixinMiniProgramAPI({
      uuid,
      weixinCode: loginRes.code,
    })

    // 检查返回的 code
    if (response?.code === 500) {
      uni.showToast({
        title: response.msg || '授权过期',
        icon: 'none',
        duration: 2000,
      })
      return
    }

    // 检查绑定是否成功（返回access_token表示成功）
    const accessToken = response && response.data && response.data.access_token
    if (accessToken) {
      uni.showToast({
        title: response.msg || '绑定成功',
        icon: 'success',
      })

      // 绑定成功后调用autoLogin
      try {
        await autoLogin()
        console.log('绑定成功后自动登录完成')
      } catch (error) {
        console.log('绑定成功后自动登录失败：', error?.message || error)
      }

      // 延迟跳转到首页
      setTimeout(() => {
        uni.reLaunch({ url: '/pages/my/index' })
      }, 1000)
    } else {
      uni.showToast({
        title: response?.msg || '绑定失败',
        icon: 'none',
      })
    }
  } catch (error) {
    uni.showToast({
      title: error?.msg || '绑定失败',
      icon: 'none',
    })
  } finally {
    bindingLoading.value = false
  }
}

onLoad((options) => {
  const uuid = getUuidFromOptions(options)
  if (!uuid) return
  bindingUuid.value = uuid
  bindWeixinWithUuid(uuid)
})

// 扫一扫功能
const openScan = () => {
  uni.scanCode({
    success: (res) => {
      scanResult.value = res.result
      uni.showToast({
        title: '扫码成功',
        icon: 'success',
      })
    },
    fail: (err) => {
      uni.showToast({
        title: '扫码失败',
        icon: 'none',
      })
    },
  })
}

// 生成二维码
const generateQRCode = () => {
  uni.showModal({
    title: '生成二维码',
    content: '请输入要生成二维码的文本',
    editable: true,
    placeholderText: '请输入文本内容',
    success: (res) => {
      if (res.confirm && res.content) {
        createQRCode(res.content)
      }
    },
  })
}

// 创建二维码
const createQRCode = (text) => {
  qrcodeText.value = text

  // 这里使用一个简单的二维码生成API
  // 实际项目中可能需要使用专门的二维码生成库
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`
  qrcodeUrl.value = qrApiUrl

  uni.showToast({
    title: '二维码生成成功',
    icon: 'success',
  })
}

// 保存二维码到相册
const saveQRCode = () => {
  if (!qrcodeUrl.value) return

  uni.downloadFile({
    url: qrcodeUrl.value,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({
              title: '保存成功',
              icon: 'success',
            })
          },
          fail: () => {
            uni.showToast({
              title: '保存失败',
              icon: 'none',
            })
          },
        })
      }
    },
    fail: () => {
      uni.showToast({
        title: '下载失败',
        icon: 'none',
      })
    },
  })
}

// 清除二维码
const clearQRCode = () => {
  qrcodeUrl.value = ''
  qrcodeText.value = ''
}

// 复制扫码结果
const copyResult = () => {
  if (!scanResult.value) return

  uni.setClipboardData({
    data: scanResult.value,
    success: () => {
      uni.showToast({
        title: '复制成功',
        icon: 'success',
      })
    },
    fail: () => {
      uni.showToast({
        title: '复制失败',
        icon: 'none',
      })
    },
  })
}

// 清除扫码结果
const clearResult = () => {
  scanResult.value = ''
}
</script>

<style lang="scss" scoped>
.qrcode-page {
  min-height: 100vh;
  padding: 40rpx;
  background-color: #f5f7fa;
}

.header-section {
  margin-bottom: 60rpx;
  text-align: center;

  .title {
    margin-bottom: 20rpx;
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
  }

  .subtitle {
    font-size: 28rpx;
    color: #666;
  }
}

.function-section {
  margin-bottom: 60rpx;
}

.function-card {
  display: flex;
  align-items: center;
  padding: 40rpx;
  margin-bottom: 20rpx;
  background: white;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgb(0 0 0 / 10%);
  transition: all 0.3s ease;

  &:active {
    background-color: #f8f9fa;
    transform: scale(0.98);
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80rpx;
    height: 80rpx;
    margin-right: 30rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16rpx;

    i {
      font-size: 40rpx;
      color: white;
    }
  }

  .card-content {
    flex: 1;

    .card-title {
      margin-bottom: 10rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #333;
    }

    .card-desc {
      font-size: 26rpx;
      color: #666;
    }
  }

  .card-arrow {
    margin-left: 20rpx;
  }
}

.qrcode-display {
  padding: 40rpx;
  margin-bottom: 40rpx;
  text-align: center;
  background: white;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgb(0 0 0 / 10%);

  .display-title {
    margin-bottom: 30rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
  }

  .qrcode-container {
    display: flex;
    justify-content: center;
    margin-bottom: 30rpx;

    .qrcode-image {
      width: 400rpx;
      height: 400rpx;
      border: 2rpx solid #eee;
      border-radius: 8rpx;
    }
  }

  .qrcode-text {
    padding: 20rpx;
    margin-bottom: 40rpx;
    font-size: 28rpx;
    color: #666;
    word-break: break-all;
    background: #f8f9fa;
    border-radius: 8rpx;
  }

  .action-buttons {
    display: flex;
    gap: 20rpx;
    justify-content: center;

    button {
      flex: 1;
      max-width: 200rpx;
      height: 80rpx;
      font-size: 28rpx;
      border: none;
      border-radius: 40rpx;
    }

    .save-btn {
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .clear-btn {
      color: #666;
      background: #f8f9fa;
      border: 2rpx solid #eee;
    }
  }
}

.scan-result {
  padding: 40rpx;
  text-align: center;
  background: white;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgb(0 0 0 / 10%);

  .result-title {
    margin-bottom: 30rpx;
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
  }

  .result-content {
    padding: 30rpx;
    margin-bottom: 40rpx;
    font-size: 28rpx;
    color: #333;
    word-break: break-all;
    background: #f8f9fa;
    border-left: 4rpx solid #667eea;
    border-radius: 8rpx;
  }

  .result-actions {
    display: flex;
    gap: 20rpx;
    justify-content: center;

    button {
      flex: 1;
      max-width: 200rpx;
      height: 80rpx;
      font-size: 28rpx;
      border: none;
      border-radius: 40rpx;
    }

    .copy-btn {
      color: white;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .clear-btn {
      color: #666;
      background: #f8f9fa;
      border: 2rpx solid #eee;
    }
  }
}

.binding-info {
  padding: 30rpx;
  margin-bottom: 40rpx;
  background: white;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 12rpx rgb(0 0 0 / 6%);

  .info-title {
    margin-bottom: 16rpx;
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
  }

  .info-content {
    padding: 20rpx;
    font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 26rpx;
    color: #555;
    word-break: break-all;
    background: #f8f9fb;
    border-radius: 12rpx;
  }
}
</style>
