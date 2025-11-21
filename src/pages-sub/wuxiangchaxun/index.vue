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
    <div class="flex flex-col items-center mt35rpx">
      <view class="search-box relative">
        <view class="search-input-wrapper w690rpx">
          <uni-icons type="search" size="18" color="#999" class="search-icon ml-25rpx"></uni-icons>
          <input
            v-model="searchKeyword"
            class="search-input w-460rpx"
            type="text"
            placeholder="请输入物项关键词"
            placeholder-style="color: #999;"
          />
        </view>
        <button class="search-btn absolute right-30rpx">查询</button>
      </view>

      <!-- 筛选条件 -->
      <view class="filter-container">
        <view class="filter-item flex items-center" @click="showCountryPicker = true">
          <text class="filter-label">{{ selectedCountry || '发布国家' }}</text>
          <i class="font_family icon-down !text-17rpx text-#19213D"></i>
        </view>
        <view class="filter-item flex items-center" @click="showSubjectPicker = true">
          <text class="filter-label">{{ selectedSubject || '法规分类' }}</text>
          <i class="font_family icon-down !text-17rpx text-#19213D"></i>
        </view>
        <view class="filter-item flex items-center" @click="showRegionPicker = true">
          <text class="filter-label">{{ selectedRegion || '被限制国家和地区' }}</text>
          <i class="font_family icon-down !text-17rpx text-#19213D"></i>
        </view>
      </view>

      <scroll-view scroll-y="true" @scrolltolower="onScrollToLower">
        <div
          class="w690rpx h100rpx bg-#F3F3F3 rounded-8rpx mx-auto mt-20rpx flex items-center pl-30rpx text-#9DA2A7"
        >
          搜索到 2 条
        </div>
      </scroll-view>
    </div>
  </buju>

  <!-- 发布国家选择器 -->
  <uni-popup
    ref="countryPopup"
    type="bottom"
    :show="showCountryPicker"
    @close="showCountryPicker = false"
  >
    <view class="picker-container">
      <view class="picker-header">
        <text class="picker-cancel" @click="showCountryPicker = false">取消</text>
        <text class="picker-title">选择发布国家</text>
        <text class="picker-confirm" @click="showCountryPicker = false">确定</text>
      </view>
      <scroll-view scroll-y class="picker-content">
        <view
          v-for="item in countryList"
          :key="item.dictValue"
          class="picker-item"
          @click="handleCountrySelect(item)"
        >
          <text>{{ item.dictLabel }}</text>
          <uni-icons
            v-if="selectedCountry === item.dictLabel"
            type="checkmarkempty"
            size="20"
            color="#2563eb"
          ></uni-icons>
        </view>
      </scroll-view>
    </view>
  </uni-popup>

  <!-- 法规分类选择器 -->
  <uni-popup
    ref="subjectPopup"
    type="bottom"
    :show="showSubjectPicker"
    @close="showSubjectPicker = false"
  >
    <view class="picker-container">
      <view class="picker-header">
        <text class="picker-cancel" @click="showSubjectPicker = false">取消</text>
        <text class="picker-title">选择法规分类</text>
        <text class="picker-confirm" @click="showSubjectPicker = false">确定</text>
      </view>
      <scroll-view scroll-y class="picker-content">
        <view
          v-for="item in subjectList"
          :key="item.dictValue"
          class="picker-item"
          @click="handleSubjectSelect(item)"
        >
          <text>{{ item.dictLabel }}</text>
          <uni-icons
            v-if="selectedSubject === item.dictLabel"
            type="checkmarkempty"
            size="20"
            color="#2563eb"
          ></uni-icons>
        </view>
      </scroll-view>
    </view>
  </uni-popup>

  <!-- 被限制国家和地区选择器 -->
  <uni-popup
    ref="regionPopup"
    type="bottom"
    :show="showRegionPicker"
    @close="showRegionPicker = false"
  >
    <view class="picker-container">
      <view class="picker-header">
        <text class="picker-cancel" @click="showRegionPicker = false">取消</text>
        <text class="picker-title">选择被限制国家和地区</text>
        <text class="picker-confirm" @click="showRegionPicker = false">确定</text>
      </view>
      <scroll-view scroll-y class="picker-content">
        <view
          v-for="item in regionList"
          :key="item.dictValue"
          class="picker-item"
          @click="handleRegionSelect(item)"
        >
          <text>{{ item.dictLabel }}</text>
          <uni-icons
            v-if="selectedRegion === item.dictLabel"
            type="checkmarkempty"
            size="20"
            color="#2563eb"
          ></uni-icons>
        </view>
      </scroll-view>
    </view>
  </uni-popup>
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

// 筛选条件相关
const showCountryPicker = ref(false)
const showSubjectPicker = ref(false)
const showRegionPicker = ref(false)

const selectedCountry = ref('')
const selectedSubject = ref('')
const selectedRegion = ref('')

const countryList = ref([])
const subjectList = ref([])
const regionList = ref([])

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

// 处理筛选条件选择
const handleCountrySelect = (item) => {
  selectedCountry.value = item.dictLabel
  queryParams.countryType = item.dictValue
  showCountryPicker.value = false
  // 重置分页并重新查询
  queryParams.pageNum = 1
  fetchNewsList()
}

const handleSubjectSelect = (item) => {
  selectedSubject.value = item.dictLabel
  queryParams.subjectType = item.dictValue
  showSubjectPicker.value = false
  // 重置分页并重新查询
  queryParams.pageNum = 1
  fetchNewsList()
}

const handleRegionSelect = (item) => {
  selectedRegion.value = item.dictLabel
  queryParams.regionType = item.dictValue
  showRegionPicker.value = false
  // 重置分页并重新查询
  queryParams.pageNum = 1
  fetchNewsList()
}

// 获取筛选条件字典数据
const fetchFilterDicts = async () => {
  try {
    const [countries, subjects, regions] = await Promise.all([
      getDicts('country_type'),
      getDicts('subject_type'),
      getDicts('region_type'),
    ])
    countryList.value = countries
    subjectList.value = subjects
    regionList.value = regions
  } catch (error) {
    console.error('获取筛选条件字典数据失败:', error)
  }
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
    // 并行获取示例数据、筛选条件字典和新闻数据
    await Promise.all([fetchRecomentList(), fetchFilterDicts(), fetchNewsList()])
    console.log('数据初始化完成')
  } catch (error) {
    console.error('等待登录失败，但仍尝试获取数据:', error)
    // 即使等待失败，也尝试获取数据（可能已经有token了）
    await Promise.all([fetchRecomentList(), fetchFilterDicts(), fetchNewsList()])
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

/* 筛选条件样式 */
.filter-container {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background: #fff;
  width: 100vw;
  border-bottom: 1rpx solid #f0f0f0;
  border-top: 1rpx solid #f0f0f0;
}

.filter-item {
  font-size: 28rpx;

  &:first-child {
    margin-left: 30rpx;
  }

  &:last-child {
    margin-right: 30rpx;
  }
}

.filter-label {
  font-size: 27rpx;
  color: #666;
  margin-right: 8rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 选择器弹窗样式 */
.picker-container {
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
}

.picker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.picker-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.picker-cancel,
.picker-confirm {
  font-size: 28rpx;
  color: #666;
}

.picker-confirm {
  color: #2563eb;
}

.picker-content {
  flex: 1;
  max-height: 50vh;
}

.picker-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  font-size: 28rpx;
  color: #333;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background: #f5f7fa;
  }
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
