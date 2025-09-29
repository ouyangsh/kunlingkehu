<route lang="json5">
{
  style: {
    navigationBarTitleText: '常见问题',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="常见问题" headerClass=" beijingse">
    <template #header>
      <view class="mx-[30rpx] box-border w100vw">
        <div class="flex justify-between wfull h44px items-center">
          <uni-icons v-if="pageslength > 1" type="left" size="22" @click="navigateBack"></uni-icons>
          <uni-icons v-else type="home" size="22" @click="navigateBack"></uni-icons>
          <text class="text-38rpx font-500">常见问题</text>
          <uni-icons class="opacity-0" type="left" size="22" @click="navigateBack"></uni-icons>
        </div>
        <div class="pb-3">
          <div class="flex mt99rpx flex justify-between">
            <div class="text-40rpx w390rpx font-500">
              你好！
              <br />
              有什么可能帮助您？
            </div>
            <div>
              <image
                src="/static/used-images/ren@2x.png"
                class="w260rpx h146rpx pr-3"
                mode="scaleToFill"
              />
            </div>
          </div>
          <div class="w690rpx h88rpx rounded-16rpx bg-#FFFFFF flex items-center">
            <i class="font_family icon-sousuo !text-40rpx text-#19213D mx30rpx"></i>
            <input type="text" placeholder="请输入想要搜索的问题" class="mr-2 h88rpx wfull" />
          </div>
        </div>
      </view>
    </template>
    <div class="h10rpx"></div>
    <div class="user-info-container">
      <!-- 信息列表 -->
      <div class="info-list">
        <!-- 姓名 -->
        <div class="text-32rpx font-500 pt30rpx pl30rpx">查询相关</div>

        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>

        <!-- 手机号 -->
        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>

        <!-- 邮箱 -->
        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>

        <!-- 单位 -->
        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>

        <!-- 账号期限 -->
        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>
      </div>

      <div class="info-list">
        <!-- 姓名 -->
        <div class="text-32rpx font-500 pt30rpx pl30rpx">查询相关</div>

        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>

        <!-- 手机号 -->
        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>

        <!-- 邮箱 -->
        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>

        <!-- 单位 -->
        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>

        <!-- 账号期限 -->
        <div class="info-item">
          <text class="label">1.三只羊控股集团有限公司</text>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="h180rpx box-border wfull flex justify-evenly pt30rpx">
        <div class="flex items-center flex-col">
          <div @click="navigateTo('/pages-sub/yijianfankui/index')">
            <i class="font_family icon-yijianfankui !text-40rpx text-#19213D"></i>
          </div>
          <div class="text-18rpx">意见反馈</div>
        </div>
        <div class="flex items-center flex-col">
          <div @click="navigateTo('/pages-sub/lianxikefu/index')">
            <i class="font_family icon-icon-lianxikefu !text-40rpx text-#19213D"></i>
          </div>
          <div class="text-18rpx">联系客服</div>
        </div>
      </div>
    </template>
  </buju>
</template>

<script setup lang="js">
import { useUserStore } from '@/store'

const userStore = useUserStore()

const navigateTo = (url) => {
  uni.navigateTo({
    url,
  })
}

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
</style>

<style lang="scss">
.beijingse {
  background: linear-gradient(180deg, #d5e9fe 0%, #f2f5fa 100%);
}
</style>
