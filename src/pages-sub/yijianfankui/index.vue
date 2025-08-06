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
          placeholder="请填写10个字以上的内容， 以便我们为您提供更好的内容"
          class="w-full h400rpx pb-20rpx"
          :auto-height="false"
          :maxlength="1000"
          :show-confirm-bar="false"
        />
        <div class="relative">
          <wd-upload
            :file-list="fileList"
            image-mode="aspectFill"
            :action="action"
            @change="handleChange"
          ></wd-upload>
        </div>
      </div>
      <div class="xiamianwenzi my20rpx">
        您可以在上传相关证明文件或截图，最多3张，仅支持jpg/jepg/png格式
      </div>

      <div class="lianxifangshi p-30rpx box-border">
        <div class="font-500 text-32rpx">联系方式</div>
        <input class="mt-40rpx" type="text" placeholder="请输入手机号/邮箱" />
      </div>
    </div>
    <template #footer>
      <div class="p-30rpx pb-safe">
        <div
          @click="viewReport"
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

const fileList = ref([
  {
    url: 'https://img12.360buyimg.com//n0/jfs/t1/29118/6/4823/55969/5c35c16bE7c262192/c9fdecec4b419355.jpg',
  },
])

const action = 'https://mockapi.eolink.com/zhTuw2P8c29bc981a741931bdd86eb04dc1e8fd64865cb5/upload'

function handleChange({ fileList: files }) {
  fileList.value = files
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
</style>

<style lang="scss">
.beijingse {
  background: linear-gradient(180deg, #d5e9fe 0%, #f2f5fa 100%);
}
</style>
