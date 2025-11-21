<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '物项查询',
  },
}
</route>
<template>
  <buju title="物项查询" quanjucolor=" bg-#FFFFFF!">
    <div class="h-100% bg-amber flex flex-col">
      <div>asdfasdf</div>
      <scroll-view scroll-y="true" @scrolltolower="onScrollToLower">
        <view class="h90vh bg-emerald">
          <!-- 物项综合查询卡片 -->
          <view class="search-card">
            <view class="card-header">
              <view class="card-title">物项综合查询</view>
              <view class="card-subtitle">整合全球物项管制清单，助力规避贸易风险</view>
            </view>

            <view class="search-box">
              <view class="search-input-wrapper w690rpx">
                <uni-icons
                  type="search"
                  size="18"
                  color="#999"
                  class="search-icon ml-25rpx"
                ></uni-icons>
                <input
                  v-model="searchKeyword"
                  class="search-input w-460rpx"
                  type="text"
                  placeholder="请输入物项关键词"
                  placeholder-style="color: #999;"
                />
              </view>
              <button class="search-btn absolute right-50rpx">查询</button>
            </view>

            <view class="examples">
              <view class="example-list">
                <text class="example-label">示例：</text>
                <text
                  class="example-item"
                  v-for="(item, index) in recomentList"
                  :key="index"
                  @click="selectExample(item)"
                >
                  {{ item }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </div>
  </buju>
</template>

<script setup>
import dibu from '@/pages/index/dibu.vue'
import { ref, reactive, onMounted } from 'vue'
import { http } from '@/utils/http'
import { waitForLogin } from '@/utils/loginWaiter'

// 新闻列表数据
const lawList = ref([])
const total = ref(0)
const queryParams = reactive({
  countryType: '',
  keyword: '',
  regionType: '',
  subjectType: '',
  industryType: '',
  publishDateBegin: '',
  publishDateEnd: '',
  publishDate: [],
  source: '',
  pageNum: 1,
  pageSize: 10,
})

const isLoading = ref(false)
const hasMore = ref(true)

// 搜索关键词
const searchKeyword = ref('')

// 示例推荐列表
const recomentList = ref([])

// 获取字典数据
const getDicts = async (dictType) => {
  try {
    const res = await http({
      url: `/system/dict/data/type/${dictType}`,
      method: 'GET',
    })
    if (res.code === 200 && res.data) {
      return res.data
    }
    return []
  } catch (error) {
    console.error('获取字典数据失败:', error)
    return []
  }
}

// 获取示例推荐数据
const fetchRecomentList = async () => {
  try {
    const dict = await getDicts('oblist_tips')
    recomentList.value = dict.map((item) => item.dictValue)
  } catch (error) {
    console.error('获取示例数据失败:', error)
  }
}

// 获取新闻列表
const fetchNewsList = async (append = false) => {
  if (isLoading.value || (append && !hasMore.value)) return
  isLoading.value = true
  try {
    const res = await http({
      url: '/tscc/news/list',
      method: 'POST',
      data: queryParams,
    })
    if (res.code === 200 && res.rows) {
      if (append) {
        lawList.value = [...lawList.value, ...res.rows]
      } else {
        lawList.value = res.rows
      }
      total.value = res.total
      hasMore.value = lawList.value.length < total.value
    }
  } catch (error) {
    console.error('获取新闻列表失败', error)
  } finally {
    isLoading.value = false
  }
}

// 滚动到底部加载更多
const onScrollToLower = () => {
  if (hasMore.value) {
    queryParams.pageNum++
    fetchNewsList(true)
  }
}

// 选择示例项
const selectExample = (value) => {
  searchKeyword.value = value
}

// 跳转到详情页
const tiaozhuan = (id) => {
  uni.navigateTo({
    url: `/pages-sub/zixunxiangqing/index?id=${id}`,
  })
}

onMounted(async () => {
  // 获取URL参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const keyword = currentPage.$route?.query?.keyword || currentPage.options?.keyword || ''

  // 如果有搜索关键词,填入搜索框
  if (keyword) {
    searchKeyword.value = decodeURIComponent(keyword)
    queryParams.keyword = decodeURIComponent(keyword)
  }

  // 等待自动登录完成后再获取数据
  try {
    await waitForLogin()
    console.log('登录等待完成，开始获取数据')
    // 并行获取示例数据和新闻数据
    await Promise.all([fetchRecomentList(), fetchNewsList()])
    console.log('数据初始化完成')
  } catch (error) {
    console.error('等待登录失败，但仍尝试获取数据:', error)
    // 即使等待失败，也尝试获取数据（可能已经有token了）
    await Promise.all([fetchRecomentList(), fetchNewsList()])
  }
})
</script>

<style lang="scss" scoped>
/* New Home Page Styles */

.page-content {
  background-color: #f5f7fa;
  padding-bottom: 150rpx; /* Space for footer */
}

.header-container {
  width: 100%;
}

.header-bg {
  width: 100%;
  /* Remove gradient, use image */
  /* background: linear-gradient(135deg, #4e84f5 0%, #2563eb 100%); */
}

/* Removed .header-bg-image style as it is no longer used */

.header-content {
  z-index: 1;
  padding-left: 32rpx;
  padding-right: 32rpx;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10rpx;
}

.nav-title {
  font-size: 44rpx;
  font-weight: bold;
  color: #fff;
}

.header-slogan {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 10rpx;
}

.search-card {
  margin-bottom: 30rpx;
  background: #fff;
  padding: 40rpx 30rpx;
  position: relative;
  z-index: 1;
}

.card-header {
  text-align: center;
  margin-bottom: 30rpx;
}

.card-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 12rpx;
}

.card-subtitle {
  font-size: 24rpx;
  color: #999;
}

.search-box {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.search-input-wrapper {
  flex: 1;
  background: #f5f7fa;
  border-radius: 8rpx;
  height: 110rpx;
  display: flex;
  align-items: center;
}

.search-icon {
  margin-right: 16rpx;
}

.search-input {
  font-size: 28rpx;
  color: #333;
  height: 100%;
}

.search-btn {
  width: 120rpx;
  height: 100rpx;
  background: #2563eb;
  color: #fff;
  font-size: 30rpx;
  border-radius: 8rpx;
  line-height: 88rpx;
  text-align: center;
  margin: 0;
  padding: 0;
  border: none;
}

.search-btn::after {
  border: none;
}

.examples {
  display: flex;
  flex-wrap: wrap;
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
}

.example-label {
  margin-right: 10rpx;
}

.example-item {
  color: #2563eb;
  margin-right: 20rpx;
  margin-bottom: 10rpx;
}

.laws-section {
  margin-top: 20rpx;
  background: #fff;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
  padding: 30rpx 30rpx 0;
}

.law-list-scroll-view {
  height: 100%;
}

/* 确保scroll-view有合适的高度 */
:deep(.uni-scroll-view) {
  height: 100% !important;
}

:deep(.uni-scroll-view-content) {
  min-height: 100%;
}

/* Preserved Styles for Footer (dibu.vue) */
.box_13 {
  padding: 18rpx 0 1rpx;
}

.list_12 {
  justify-content: space-around;
  width: 100%;
  height: 75rpx;
}

.image-text_37 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-group_8 {
  margin-top: 9rpx;
  font-family: PingFangSC-Medium;
  font-size: 22rpx;
  font-weight: 500;
  line-height: 30rpx;
  text-align: center;
  overflow-wrap: break-word;
  white-space: nowrap;
}
</style>
