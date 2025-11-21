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
                src="https://wx-1312877696.cos.ap-guangzhou.myqcloud.com/ren%402x.png"
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
      <!-- 问题列表 -->
      <div class="info-list" v-for="(group, groupIndex) in questionList" :key="groupIndex">
        <!-- 分组标题 -->
        <div class="text-32rpx font-500 pt30rpx pl30rpx">{{ group.title }}</div>

        <!-- 问题项 -->
        <div
          class="info-item"
          v-for="(item, itemIndex) in group.items"
          :key="itemIndex"
          @click="openQuestion(item)"
        >
          <text class="label">{{ itemIndex + 1 }}.{{ item.title }}</text>
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
          <div class="relative" @click="navigateTo('/pages-sub/lianxikefu/index')">
            <button open-type="contact" class="absolute w10 h10 opacity-0 z-10"></button>
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
import { http } from '@/utils/http'

const userStore = useUserStore()

// 问题列表数据
const questionList = ref([])

// 获取问题列表
const fetchQuestionList = async () => {
  try {
    const res = await http({
      url: '/tcss/common/find-article',
      method: 'POST',
    })
    if (res.code === 200 && res.data) {
      questionList.value = res.data
    }
  } catch (error) {
    console.error('获取问题列表失败:', error)
  }
}

// 打开问题详情
const openQuestion = (item) => {
  if (item && item.id) {
    // 跳转到问题详情页面,传递问题ID和标题
    uni.navigateTo({
      url: `/pages-sub/wenti/index?id=${item.id}&title=${encodeURIComponent(item.title)}`,
    })
  }
}

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

// 页面加载时获取用户信息和问题列表
onMounted(() => {
  console.log('常见问题页面加载，用户信息：', userInfo.value)
  fetchQuestionList()
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
