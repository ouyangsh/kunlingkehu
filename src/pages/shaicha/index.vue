<route lang="json5">
{
  style: {
    navigationBarTitleText: '筛查',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="筛查">
    <!-- The hidden picker for daterange -->
    <div class="absolute h-0">
      <wd-datetime-picker
        ref="datetimePickerRef"
        v-model="dateRange"
        @confirm="handleConfirm"
      ></wd-datetime-picker>
    </div>
    <div class="h340rpx w-full bg-[#D8EBFE] fixed top-0">
      <view :style="{ height: statusBarHeight + 'px' }"></view>
      <div class="h-44px flex justify-center items-center text-38rpx font-500">筛查</div>
    </div>
    <div class="h340rpx w-full fixed top-0">
      <view :style="{ height: statusBarHeight + 'px' }"></view>
      <div class="w-full justify-center flex" style="margin-top: 44px">
        <div
          class="w690rpx box-border h200rpx bg-[#ffffffff] z-10 rounded-16rpx flex flex-col justify-evenly pl-30rpx color-[#333333] text-26rpx"
        >
          <div class="bg-[D8B14A6B] flex">
            <div class="h-60rpx flex justify-center items-center mr-20rpx">状态：</div>
            <div
              @click="handleStatusChange(0)"
              :class="indexa === 0 ? 'bg-[#2563EB] text-[#ffffffff]' : 'bg-[#F4F6FA] '"
              class="h-60rpx flex rounded-1 justify-center mr-20rpx items-center px-2"
            >
              全部
            </div>
            <div
              @click="handleStatusChange(1)"
              :class="indexa === 1 ? 'bg-[#2563EB] text-[#ffffffff]' : 'bg-[#F4F6FA] '"
              class="h-60rpx rounded-1 flex justify-center mr-20rpx items-center px-2"
            >
              已归档
            </div>
            <div
              @click="handleStatusChange(2)"
              :class="indexa === 2 ? 'bg-[#2563EB] text-[#ffffffff]' : 'bg-[#F4F6FA] '"
              class="h-60rpx rounded-1 flex justify-center mr-20rpx items-center px-2"
            >
              未归档
            </div>
          </div>
          <view class="flex">
            <view class="flex items-center">
              <div class="h-60rpx flex justify-center items-center mr-20rpx">日期：</div>
              <view
                @click="openPicker"
                class="w-460rpx h-60rpx overflow-hidden flex justify-evenly items-center bg-#F4F6FA"
              >
                <i class="font_family icon-icon-rili text-#666666 text-20rpx"></i>
                <div class="text-#2563EB">{{ startDate ? startDate : '开始日期' }}</div>
                <div class="text-#666666">至</div>
                <div class="text-#2563EB">{{ endDate ? endDate : '结束日期' }}</div>
                <!-- <view class="p-4 text-center">
                  <view class="mt-4 text-xs">
                    <text>开始: {{ startDate || 'N/A' }}</text>
                    <text class="ml-2">结束: {{ endDate || 'N/A' }}</text>
                  </view>
                </view> -->
              </view>
            </view>
          </view>
        </div>
      </div>
    </div>
    <div class="h220rpx"></div>

    <!-- 使用 scroll-view 实现可靠的滚动加载 -->
    <scroll-view
      class="scroll-container"
      scroll-y
      @scrolltolower="handleScrollToLower"
      lower-threshold="100"
    >
      <!-- 加载提示 -->
      <div v-if="loading && screeningList.length === 0" class="text-center py-8">
        <text class="text-gray-500">加载中...</text>
      </div>

      <!-- 筛查列表 -->
      <div
        @click="jieguo(item)"
        v-for="item in screeningList"
        :key="item.id"
        class="w-690rpx bg-#fff rounded-16rpx m-30rpx p-30rpx box-border"
      >
        <!-- ID和状态 -->
        <div class="flex justify-start items-center mb-20rpx">
          <div class="flex items-center mr2">
            <text class="text-28rpx font-500 color-#333333">ID：{{ item.id }}</text>
          </div>
          <div
            :class="item.status === 99 ? 'text-#6B7280 bg-#F3F4F6' : 'text-#EF9913 bg-#FCEBD0'"
            class="px-16rpx py-8rpx text-22rpx rounded-8rpx"
          >
            {{ item.status === 99 ? '已归档' : '未归档' }}
          </div>
        </div>

        <!-- 交易方信息 -->
        <div class="flex mb-16rpx">
          <text class="text-24rpx color-#666666 w-120rpx flex-shrink-0">交易方：</text>
          <text class="text-24rpx color-#333333 flex-1 break-all">
            {{ getTradePartyInfo(item.tradePartyParam) }}
          </text>
        </div>

        <!-- 商品信息 -->
        <div class="flex mb-16rpx">
          <text class="text-24rpx color-#666666 w-120rpx flex-shrink-0">商品信息：</text>
          <text class="text-24rpx color-#333333 flex-1 break-all">
            {{ getCommodityInfo(item.commodityParam) }}
          </text>
        </div>

        <!-- 国家信息 -->
        <div class="flex mb-16rpx">
          <text class="text-24rpx color-#666666 w-120rpx flex-shrink-0">国家信息：</text>
          <text class="text-24rpx color-#333333 flex-1 break-all">
            {{ getCountryInfo(item.countryParam) }}
          </text>
        </div>

        <!-- 船舶信息 -->
        <div class="flex mb-16rpx">
          <text class="text-24rpx color-#666666 w-120rpx flex-shrink-0">船舶信息：</text>
          <text class="text-24rpx color-#333333 flex-1 break-all">
            {{ getTransportInfo(item.transportParam) }}
          </text>
        </div>

        <!-- 机构名称 -->
        <div class="flex">
          <text class="text-24rpx color-#666666 w-120rpx flex-shrink-0">机构名称：</text>
          <text class="text-24rpx color-#333333 flex-1">
            {{ item.tenantName || 'XXX有限公司' }}
          </text>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="!loading && screeningList.length === 0" class="text-center py-16">
        <text class="text-gray-500">暂无数据</text>
      </div>

      <!-- 视口触发器 - 用于检测是否需要加载更多 -->
      <div
        v-if="screeningList.length > 0 && screeningList.length < total"
        class="load-trigger text-center py-4"
        @click="loadMore"
      >
        <text v-if="loading" class="text-gray-500">加载中...</text>
        <text v-else class="text-gray-400">
          点击或上拉加载更多 ({{ screeningList.length }}/{{ total }})
        </text>
      </div>

      <!-- 没有更多数据提示 -->
      <div
        v-if="screeningList.length > 0 && screeningList.length >= total"
        class="text-center py-4"
      >
        <text class="text-gray-400">没有更多数据了</text>
      </div>
    </scroll-view>

    <!-- 浮动按钮 -->
    <div class="fixed bottom-190rpx right-30rpx">
      <image
        @click="tiaozhuan"
        class="w-88rpx h-88rpx"
        src="@/static/used-images/SketchPng5f6fde3afd1ee831a9e0ca2a045fc7b393f024f4af7028a4efeb23de0580afb2.png"
      ></image>
    </div>

    <template #footer>
      <dibu />
    </template>
  </buju>
</template>
<script setup lang="js">
import dibu from '../index/dibu.vue'
import { getDocumentScreeningListAPI } from '@/service/foo'
import { useUserStore } from '@/store'

// 获取页面激活状态
const currentPage = inject('currentPage', ref('index'))
const isPageActive = computed(() => currentPage.value === 'shaicha')

// 用户状态管理
const userStore = useUserStore()

const indexa = ref(0)
const statusBarHeight = ref(0)
const datetimePickerRef = ref()
const dateRange = ref(['', Date.now()]) // For v-model
const startDate = ref('') // For display
const endDate = ref('') // For display

// 筛查列表数据
const screeningList = ref([])
const total = ref(0)
const loading = ref(false)
const pageNum = ref(1)
const pageSize = ref(20)

// Intersection Observer 实例
let intersectionObserver = null

// 获取筛查列表数据
const getScreeningList = async (isRefresh = false) => {
  if (loading.value) return

  // 检查登录状态
  if (!userStore.isLogined) {
    return
  }

  loading.value = true

  try {
    // 重置页码
    if (isRefresh) {
      pageNum.value = 1
    }

    // 构建请求参数
    const params = {
      pageNum: pageNum.value,
      pageSize: pageSize.value,
      type: 2,
    }

    // 添加状态筛选
    if (indexa.value === 1) {
      params.status = 99 // 已归档
    } else if (indexa.value === 2) {
      params.status = 1 // 未归档
    }
    // indexa.value === 0 时不添加status参数，表示全部

    // 添加日期筛选
    if (startDate.value && endDate.value) {
      params.beginCreateTime = `${startDate.value} 00:00:00`
      params.endCreateTime = `${endDate.value} 23:59:59`
    }

    const result = await getDocumentScreeningListAPI(params)

    if (result.code === 200) {
      if (isRefresh || pageNum.value === 1) {
        screeningList.value = result.rows || []
      } else {
        screeningList.value = [...screeningList.value, ...(result.rows || [])]
      }
      total.value = result.total || 0

      // 数据更新后重新初始化观察器（只在页面激活时）
      if (isPageActive.value) {
        reinitObserver()
      }
    } else {
      uni.showToast({
        title: result.msg || '获取数据失败',
        icon: 'error',
      })
    }
  } catch (error) {
    uni.showToast({
      title: '网络错误',
      icon: 'error',
    })
  } finally {
    loading.value = false
  }
}

// 状态切换
const handleStatusChange = (status) => {
  indexa.value = status
  getScreeningList(true)
}

function handleConfirm(e) {
  if (Array.isArray(e.value) && e.value.length === 2) {
    const [start, end] = e.value
    // Assuming the value is a timestamp, format it for display
    startDate.value = formatDate(start)
    endDate.value = formatDate(end)
    dateRange.value = [start, end] // Update the model value

    // 日期改变后重新获取数据
    getScreeningList(true)
  }
}
const tiaozhuan = () => {
  uni.navigateTo({
    url: '/pages-sub/shougongshaicha/index',
  })
}

const jieguo = (item) => {
  // 将 analysisElement 数据存储到本地缓存
  const jumpData = {
    analysisElement: item.analysisElement || {},
    documentId: item.documentId || '0', // 筛查记录ID，0 表示新增，如果有 ID 则是修改
    attachmentId: item.attachmentId || '', // 附件ID，可以为空
    // attachmentId: '', // 附件ID，可以为空
    templateCode: item.templateCode || 'yulurudan', // 选择的文档解析模版
  }

  uni.setStorageSync('jumpData', jumpData)
  uni.navigateTo({
    url: '/pages-sub/shougongshaicha/index',
  })
}

// 数据处理函数
const getTradePartyInfo = (tradePartyParam) => {
  if (!tradePartyParam) return ''
  const parties = tradePartyParam.split(';')
  return parties.slice(0, 2).join(';') // 只显示前两个
}

const getCommodityInfo = (commodityParam) => {
  if (!commodityParam) return ''
  return commodityParam.replace(/;/g, ',') // 用逗号分隔
}

const getCountryInfo = (countryParam) => {
  if (!countryParam) return ''
  const countries = countryParam.split(';')
  return countries.slice(0, 2).join(',') // 只显示前两个，用逗号分隔
}

const getTransportInfo = (transportParam) => {
  if (!transportParam) return ''
  return transportParam.replace(/;/g, ' ') // 用空格分隔
}

// scroll-view 滚动到底部事件处理
const handleScrollToLower = () => {
  if (isPageActive.value) {
    loadMore()
  }
}

// 防抖标记
let loadMoreTimer = null

// 加载更多数据
const loadMore = () => {
  // 如果正在加载或已经没有更多数据，则不执行
  if (loading.value || screeningList.value.length >= total.value) {
    return
  }

  // 防抖处理，避免重复触发
  if (loadMoreTimer) {
    clearTimeout(loadMoreTimer)
  }

  loadMoreTimer = setTimeout(() => {
    pageNum.value += 1
    getScreeningList(false)
    loadMoreTimer = null
  }, 300)
}

// 初始化 Intersection Observer
const initIntersectionObserver = () => {
  // 销毁之前的观察器
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }

  // 创建新的观察器
  intersectionObserver = uni.createIntersectionObserver()

  // 设置观察区域：距离视口底部 100px 时触发
  intersectionObserver.relativeToViewport({ bottom: 100 })

  // 观察 .load-trigger 元素
  intersectionObserver.observe('.load-trigger', (res) => {
    if (res.intersectionRatio > 0) {
      // 元素进入视口，触发加载更多
      loadMore()
    }
  })
}

// 重新初始化观察器（在数据更新后调用）
const reinitObserver = () => {
  nextTick(() => {
    initIntersectionObserver()
  })
}
function openPicker() {
  if (datetimePickerRef.value) {
    datetimePickerRef.value.open()
  }
}

function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 注意：不再使用 onReachBottom，改用 scroll-view 的 @scrolltolower 事件

// 监听页面激活状态，首次激活时加载数据
watch(
  isPageActive,
  (newVal, oldVal) => {
    if (newVal && !oldVal && screeningList.value.length === 0 && userStore.isLogined) {
      getScreeningList(true)
    }
    // 页面激活时初始化观察器
    if (newVal) {
      nextTick(() => {
        initIntersectionObserver()
      })
    }
  },
  { immediate: true },
)

// 监听登录状态变化
watch(
  () => userStore.isLogined,
  (newVal, oldVal) => {
    if (newVal === true && oldVal === false) {
      getScreeningList(true)
    }
  },
  { immediate: false }, // 不在组件初始化时立即执行，只在变化时执行
)

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight

  // 只有在用户已登录时才获取数据
  if (userStore.isLogined) {
    getScreeningList(true)
  }
})

// 页面显示时检查登录状态
onShow(() => {
  if (userStore.isLogined && screeningList.value.length === 0) {
    getScreeningList(true)
  }
})

// 页面卸载时清理观察器
onUnmounted(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
})
</script>
<style lang="scss" scoped>
.scroll-container {
  width: 100%;
  height: calc(100vh - 340rpx - 210rpx); /* 减去顶部筛选区域和底部导航的高度 */
}
</style>
