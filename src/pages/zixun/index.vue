<route lang="json5">
{
  style: {
    navigationBarTitleText: '筛查详情',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <div class="absolute h-0 top--100">
    <wd-datetime-picker
      ref="datetimePickerRef"
      v-model="dateRange"
      @confirm="handleConfirm"
    ></wd-datetime-picker>
  </div>
  <buju headerClass="!bg-[#2563EB]">
    <template #header>
      <div class="h60px w-full z1 relative">
        <div class="text-40rpx text-#fff absolute bottom-30rpx left-30rpx">资讯</div>
      </div>
      <div class="h176rpx w100vw bg-#FFFFFF text-#333333 p30rpx box-border">
        <div class="flex justify-around text-26rpx">
          <picker
            :range="pickerData.regionTypes"
            :range-key="'dictValue'"
            :value="pickerIndex.region"
            @change="(e) => onPickerChange('region', e)"
          >
            <div class="flex justify-center items-center">
              <div>{{ selectedLabels.region }}</div>
              <i class="font_family icon-trangle-down text-#BAC3D1 ml-5rpx"></i>
            </div>
          </picker>
          <picker
            :range="pickerData.countryTypes"
            :range-key="'dictValue'"
            :value="pickerIndex.country"
            @change="(e) => onPickerChange('country', e)"
          >
            <div class="flex justify-center items-center">
              <div>{{ selectedLabels.country }}</div>
              <i class="font_family icon-trangle-down text-#BAC3D1 ml-5rpx"></i>
            </div>
          </picker>
          <picker
            :range="pickerData.subjectTypes"
            :range-key="'dictValue'"
            :value="pickerIndex.subject"
            @change="(e) => onPickerChange('subject', e)"
          >
            <div class="flex justify-center items-center">
              <div>{{ selectedLabels.subject }}</div>
              <i class="font_family icon-trangle-down text-#BAC3D1 ml-5rpx"></i>
            </div>
          </picker>
          <picker
            :range="pickerData.industryTypes"
            :range-key="'dictValue'"
            :value="pickerIndex.industry"
            @change="(e) => onPickerChange('industry', e)"
          >
            <div class="flex justify-center items-center">
              <div>{{ selectedLabels.industry }}</div>
              <i class="font_family icon-trangle-down text-#BAC3D1 ml-5rpx"></i>
            </div>
          </picker>
        </div>

        <div class="flex text-26rpx mt-28rpx space-x-20rpx">
          <div
            @click="setDateRange('7days')"
            class="h60rpx px-20rpx bg-#F4F6FA flex justify-center items-center cursor-pointer"
          >
            近7天
          </div>
          <div
            @click="setDateRange('1month')"
            class="h60rpx px-20rpx bg-#F4F6FA flex justify-center items-center cursor-pointer"
          >
            近1月
          </div>
          <div
            @click="setDateRange('1year')"
            class="h60rpx px-20rpx bg-#F4F6FA flex justify-center items-center cursor-pointer"
          >
            1年内
          </div>
          <div
            @click="openPicker"
            class="h60rpx px-20rpx bg-#F4F6FA flex justify-center items-center"
          >
            <i class="font_family icon-icon-rili text-#BAC3D1 mr-10rpx"></i>
            <div class="flex flex-col text-center leading-tight">
              <div class="text-22rpx">{{ startDateDisplay }}</div>
              <div class="text-22rpx">{{ endDateDisplay }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="h10rpx bg-#F2F5FA"></div>
    </template>

    <scroll-view
      scroll-y="true"
      class="news-list-scroll-view"
      :scroll-into-view="scrollIntoViewId"
      @scrolltolower="onScrollToLower"
      style="height: calc(100vh - 350rpx)"
    >
      <div
        @click="tiaozhuan(newsItem.id)"
        class="bg-#FFFFFF p30rpx box-border h184rpx mb-1px"
        v-for="newsItem in newsList"
        :key="newsItem.id"
      >
        <div class="flex">
          <div
            class="h80rpx text-30rpx text-#19213D min-w-560rpx overflow-hidden text-ellipsis line-clamp-2"
          >
            {{ newsItem.tittleChn }}
          </div>
          <image
            v-if="newsItem.imageProperty"
            :src="`https://spm-1312877696.cos.ap-beijing.myqcloud.com/news/${newsItem.imageProperty}.png`"
            class="w120rpx h80rpx shrink-0 ml2 rounded-8rpx"
            mode="aspectFill"
            :lazy-load="true"
          />
        </div>
        <div class="text-24rpx flex justify-between mt-25rpx text-#666666">
          <div>{{ newsItem.publishDate.split(' ')[0] }}</div>
          <div>{{ newsItem.publishCountry }}</div>
          <div>{{ newsItem.publishOrg }}</div>
          <div>{{ newsItem.subjectType }}</div>
        </div>
      </div>
      <div v-if="isLoading" class="text-center py-20rpx text-#666">加载中...</div>
      <div
        v-if="!hasMore && !isLoading && newsList.length > 0"
        class="text-center py-20rpx text-#666"
      >
        没有更多数据了
      </div>
    </scroll-view>
    <template #footer>
      <dibu />
    </template>
  </buju>
</template>
<script setup lang="js">
import dibu from '../index/dibu.vue'
import { http } from '@/utils/http'

const statusBarHeight = ref(0)
const activeTab = ref(0)
const datetimePickerRef = ref()
const dateRange = ref(['', Date.now()]) // For v-model
const startDate = ref('') // For display
const endDate = ref('') // For display

// 自定义日期显示文本
const startDateDisplay = computed(() => {
  return startDate.value || '开始日期'
})

const endDateDisplay = computed(() => {
  return endDate.value || '结束日期'
})
const pageslength = computed(() => getCurrentPages().length)

// 新闻列表数据
const newsList = ref([])
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

// picker组件数据
const pickerData = reactive({
  regionTypes: [], // 所在区域
  countryTypes: [], // 司法管辖区
  subjectTypes: [], // 所在主题
  industryTypes: [], // 所属行业
})

// picker选中的索引
const pickerIndex = reactive({
  region: 0,
  country: 0,
  subject: 0,
  industry: 0,
})

// 当前选中的值显示
const selectedLabels = reactive({
  region: '所在区域',
  country: '司法管辖区',
  subject: '所在主题',
  industry: '所属行业',
})

// scroll-view相关
const scrollViewRef = ref()
const scrollIntoViewId = ref('')
const guidang = ref(false)
const guidanghanshu = (value) => {
  guidang.value = false
  if (value) {
    // 归档操作
  }
}
const shanchu = ref(false)
const shanchuhanshu = (value) => {
  shanchu.value = false
  if (value) {
    // 删除操作
  }
}

// 标签页数据
const tabs = ['查询对象基本信息', '提取对象提取信息', '合规筛查结果详情', '船舶']

// 商品信息数据
const goodsInfo = ref([
  {
    checked: true,
    name: '同轴连接器',
    category: 'CN',
    code: '8536909000',
    description:
      '用于功能或环路改或连接控制的电气设备，电压不超过1000V（不包拓继电器，自动断路器及其他开关设备）及其零件（电话机除外）',
    publishCountry: '欧盟(EU)',
    controlList: '欧盟对华调控清单(EUCTICRL)',
    searchCode: '无',
    customsCode: '853690',
    controlCountry: '马来兰(UKR)',
    tariffCode: '',
    chemicalCode: '',
    supervisionGroup: '',
  },
  {
    checked: false,
    name: '同轴连接器',
    category: 'CN',
    code: '8536909000',
    description:
      '用于功能或环路改或连接控制的电气设备，电压不超过1000V（不包括继电器，自动断路器及其他开关设备，雷电设备及其零件）',
    publishCountry: '欧盟(EU)',
    controlList: '欧盟对华调控清单(EUCTICRL)',
    searchCode: '无',
    customsCode: '853690',
    controlCountry: '马来兰(UKR)',
    tariffCode: '',
    chemicalCode: '',
    supervisionGroup: '',
  },
])

// 全选相关的计算属性和方法
const isAllChecked = computed(() => {
  return goodsInfo.value.length > 0 && goodsInfo.value.every((item) => item.checked)
})

const checkedCount = computed(() => {
  return goodsInfo.value.filter((item) => item.checked).length
})

const toggleAllSelection = () => {
  const shouldCheck = !isAllChecked.value
  goodsInfo.value.forEach((item) => {
    item.checked = shouldCheck
  })
}

const toggleItemSelection = (index) => {
  goodsInfo.value[index].checked = !goodsInfo.value[index].checked
}

// 滚动到指定区域的函数
const scrollToSection = (index) => {
  console.log('滚动到区域:', index, '对应的tabs:', tabs[index])

  // 更新选中状态
  activeTab.value = index

  // 使用scroll-view的scroll-into-view功能
  const targetId = `section-${index}`
  console.log('设置scrollIntoViewId为:', targetId)

  // 设置滚动目标ID
  scrollIntoViewId.value = targetId

  // 清空ID，允许下次滚动
  setTimeout(() => {
    scrollIntoViewId.value = ''
  }, 1000)
}

// 交易方信息数据
const traderInfo = ref({
  domesticCountry: '宁波杰顿科技控股有限公司',
  locationType: 'R.F. Industries, ltd.',
  entityName: '',
  entityAlias: '',
  domesticProvince: '中国浙江',
  cityName: '宁波',
  unCode: '',
  iataCode: '',
  icaoCode: '',
})

// 位置信息数据
const locationInfo = ref({
  country: '中国',
  province: '浙江省',
  city: '宁波市',
  address: '高新区研发园C区',
  postalCode: '315000',
  longitude: '121.5967',
  latitude: '29.8683',
})

// 船舶信息数据
const shipInfo = ref({
  name: 'XXXXX',
  buildYear: 'XXXXX',
  type: 'XXXXX',
  imoNumber: 'XXXXX',
  permit: '中国浙江',
  proposal: '宁波',
  isControlled: '',
  sanctionTime: '',
  sanctionCountry: '',
  sanctionReason: '',
  typeList: '',
})

// 国家信息数据
const countryInfo = ref({
  chineseFullName: 'XXXXX',
  englishFullName: 'XXXXX',
  businessDeployment: 'XXXXX',
  twoDigitCode: 'XXXXX',
  continentCode: 'XXXXX',
  chineseShortName: '',
  englishShortName: '',
  domesticType: '',
  typeList: '',
})

// 修改报告
const editReport = () => {
  uni.showModal({
    title: '修改报告',
    content: '确定要修改这份筛查报告吗？',
    confirmText: '确认',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '正在进入编辑模式...',
          icon: 'loading',
          duration: 1500,
        })
        // 这里可以跳转到编辑页面
        // uni.navigateTo({ url: '/pages-sub/edit-report/index' })
      }
    },
  })
}

// 归档报告
const archiveReport = () => {
  uni.showModal({
    title: '归档报告',
    content: '确定要将这份报告归档吗？归档后可在历史记录中查看。',
    confirmText: '归档',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '正在归档...',
          icon: 'loading',
          duration: 1500,
        })
        setTimeout(() => {
          uni.showToast({
            title: '归档成功',
            icon: 'success',
          })
        }, 1500)
      }
    },
  })
}

// 导出筛查报告
const exportReport = () => {
  uni.showActionSheet({
    itemList: ['导出为PDF', '导出为Excel', '导出为Word'],
    success: (res) => {
      const formats = ['PDF', 'Excel', 'Word']
      const selectedFormat = formats[res.tapIndex]

      uni.showToast({
        title: `正在生成${selectedFormat}报告...`,
        icon: 'loading',
        duration: 2000,
      })

      setTimeout(() => {
        uni.showToast({
          title: `${selectedFormat}报告生成完成`,
          icon: 'success',
        })
      }, 2000)
    },
  })
}

// 删除报告
const deleteReport = () => {
  uni.showModal({
    title: '删除报告',
    content: '确定要删除这份筛查报告吗？删除后无法恢复。',
    confirmText: '删除',
    confirmColor: '#ff4d4f',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '正在删除...',
          icon: 'loading',
          duration: 1500,
        })
        setTimeout(() => {
          uni.showToast({
            title: '删除成功',
            icon: 'success',
          })
          // 删除成功后可以返回上一页
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }, 1500)
      }
    },
  })
}

// 原有的方法保留
function handleConfirm(e) {
  if (Array.isArray(e.value) && e.value.length === 2) {
    const [start, end] = e.value
    startDate.value = formatDate(start)
    endDate.value = formatDate(end)
    dateRange.value = [start, end]

    // 更新查询参数
    queryParams.publishDateBegin = startDate.value
    queryParams.publishDateEnd = endDate.value

    // 重新获取数据
    queryParams.pageNum = 1
    newsList.value = []
    fetchNewsList()
  }
}

const tiaozhuan = (id) => {
  uni.navigateTo({
    url: `/pages-sub/zixunxiangqing/index?id=${id}`,
  })
}

const jieguo = () => {
  uni.navigateTo({
    url: '/pages-sub/shougongshaicha/index',
  })
}

// 设置预定义的日期范围
const setDateRange = (type) => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  let startTime, endTime

  switch (type) {
    case '7days':
      startTime = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000) // 7天前
      endTime = today
      break
    case '1month':
      startTime = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()) // 1个月前
      endTime = today
      break
    case '1year':
      startTime = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()) // 1年前
      endTime = today
      break
    default:
      return
  }

  // 更新日期范围
  startDate.value = formatDate(startTime.getTime())
  endDate.value = formatDate(endTime.getTime())
  dateRange.value = [startTime.getTime(), endTime.getTime()]

  // 更新查询参数
  queryParams.publishDateBegin = startDate.value
  queryParams.publishDateEnd = endDate.value

  // 重新获取数据
  queryParams.pageNum = 1
  newsList.value = []
  fetchNewsList()
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

// 获取字典数据
const fetchDictData = async (dictType) => {
  try {
    const res = await http({
      url: `/system/dict/data/type/${dictType}`,
      method: 'GET',
    })
    console.log(`字典数据响应 ${dictType}:`, res)
    if (res.code === 200 && res.data) {
      return res.data
    }
    console.warn(`字典数据业务逻辑失败 ${dictType}:`, res)
    return []
  } catch (error) {
    console.error(`获取字典数据失败: ${dictType}`, error)
    return []
  }
}

// 初始化picker数据
const initPickerData = async () => {
  try {
    const [regionTypes, countryTypes, subjectTypes, industryTypes] = await Promise.all([
      fetchDictData('news_region_type'), // 所在区域
      fetchDictData('news_country_type'), // 司法管辖区
      fetchDictData('news_subject_type'), // 所在主题
      fetchDictData('news_industry_type'), // 所属行业
    ])

    // 转换数据格式为picker需要的格式
    pickerData.regionTypes = [{ dictValue: '所在区域', dictLabel: '' }, ...regionTypes]
    pickerData.countryTypes = [{ dictValue: '司法管辖区', dictLabel: '' }, ...countryTypes]
    pickerData.subjectTypes = [{ dictValue: '所在主题', dictLabel: '' }, ...subjectTypes]
    pickerData.industryTypes = [{ dictValue: '所属行业', dictLabel: '' }, ...industryTypes]

    console.log('所有picker数据初始化完成')
  } catch (error) {
    console.error('初始化picker数据失败', error)
  }
}

// picker事件处理
const onPickerChange = (type, e) => {
  const index = e.detail.value
  pickerIndex[type] = index

  let selectedData
  switch (type) {
    case 'region':
      selectedData = pickerData.regionTypes[index]
      break
    case 'country':
      selectedData = pickerData.countryTypes[index]
      break
    case 'subject':
      selectedData = pickerData.subjectTypes[index]
      break
    case 'industry':
      selectedData = pickerData.industryTypes[index]
      break
  }

  if (selectedData) {
    // 更新显示标签
    selectedLabels[type] = selectedData.dictValue

    // 更新查询参数
    switch (type) {
      case 'region':
        queryParams.regionType = selectedData.dictLabel
        break
      case 'country':
        queryParams.countryType = selectedData.dictLabel
        break
      case 'subject':
        queryParams.subjectType = selectedData.dictLabel
        break
      case 'industry':
        queryParams.industryType = selectedData.dictLabel
        break
    }

    // 重新获取数据
    queryParams.pageNum = 1
    newsList.value = []
    fetchNewsList()
  }
}

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
        newsList.value = [...newsList.value, ...res.rows]
      } else {
        newsList.value = res.rows
      }
      total.value = res.total
      hasMore.value = newsList.value.length < total.value
    }
  } catch (error) {
    console.error('获取新闻列表失败', error)
  } finally {
    isLoading.value = false
  }
}

const isLoading = ref(false)
const hasMore = ref(true)

const onScrollToLower = () => {
  if (hasMore.value) {
    queryParams.pageNum++
    fetchNewsList(true)
  }
}

onMounted(async () => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight

  // 等待自动登录完成后再获取数据
  try {
    const { autoLogin } = await import('@/utils/autoLogin')
    await autoLogin()
    console.log('自动登录完成，开始初始化数据')
    
    // 并行获取picker数据和新闻数据
    await Promise.all([
      initPickerData(),
      fetchNewsList()
    ])
    
    console.log('所有数据初始化完成')
  } catch (error) {
    console.error('自动登录失败，但仍尝试获取数据:', error)
    // 即使自动登录失败，也尝试获取数据（可能已经有token了）
    await Promise.all([
      initPickerData(),
      fetchNewsList()
    ])
  }
})
</script>
<style lang="scss" scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

.custom-checkbox {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  background-color: rgb(255 255 255 / 100%);
  border: 2px solid rgb(204 204 204 / 100%);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.custom-checkbox.selected {
  background-color: rgb(37 99 235 / 100%);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 8l3 3l7-7'/%3e%3c/svg%3e");
  border: 2px solid rgb(37 99 235 / 100%);
}
/* scroll-view样式 */
.news-list-scroll-view {
  height: 100%;
}
/* 确保scroll-view有合适的高度 */
:deep(.uni-scroll-view) {
  height: 100% !important;
}

:deep(.uni-scroll-view-content) {
  min-height: 100%;
}
/* 底部工具栏 */
.bottom-toolbar {
  width: 750rpx;
  height: 180rpx;
  padding-bottom: 35rpx;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}
/* 下拉选择器样式 */
.rotate-180 {
  transition: transform 0.3s ease;
  transform: rotate(180deg);
}

.dropdown-option {
  transition: background-color 0.2s ease;
}

.dropdown-option:hover {
  background-color: #f5f5f5;
}
</style>
