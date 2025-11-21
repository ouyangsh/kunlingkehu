<route lang="json5">
{
  style: {
    navigationBarTitleText: '资讯详情',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="资讯详情" quanjucolor="!bg-#fff">
    <!-- 标签页 -->
    <div class="p-30rpx" v-if="newsDetail">
      <div>
        {{ newsDetail.tittleChn }}
      </div>
      <div class="grid grid-cols-2 gap-10rpx my-30rpx">
        <div class="flex text-24rpx text-#666666">
          <div>发布国家：</div>
          <div class="text-#19213D">{{ newsDetail.publishCountry }}</div>
        </div>

        <div class="flex text-24rpx text-#666666">
          <div>发布日期：</div>
          <div class="text-#19213D">{{ newsDetail.publishDate.split(' ')[0] }}</div>
        </div>

        <div class="flex text-24rpx text-#666666">
          <div>发布机构：</div>
          <div class="text-#19213D">{{ newsDetail.publishOrg }}</div>
        </div>

        <div class="flex text-24rpx text-#666666">
          <div>所选主题：</div>
          <div class="text-#19213D">{{ newsDetail.subjectType }}</div>
        </div>
      </div>

      <div class="border-t-1px border-t-solid border-#E5E7EB my-30rpx"></div>

      <div class="flex space-x-20rpx">
        <div
          @click="showChinese = true"
          :class="[
            'w92rpx h60rpx text-26rpx flex justify-center items-center rounded-8rpx',
            showChinese ? 'bg-#2563EB text-#fff' : 'bg-#F4F6FA text-#333333',
          ]"
        >
          中文
        </div>
        <div
          @click="showChinese = false"
          :class="[
            'w92rpx h60rpx text-26rpx flex justify-center items-center rounded-8rpx',
            !showChinese ? 'bg-#2563EB text-#fff' : 'bg-#F4F6FA text-#333333',
          ]"
        >
          原文
        </div>
      </div>
      <div
        class="text-30rpx text-#19213D mt30rpx max-w-100vw"
        v-html="
          showChinese
            ? newsDetail.detailTextHtmlChn || newsDetail.detailTextHtmlUnified
            : newsDetail.detailTextHtmlUnified
        "
      ></div>
    </div>
  </buju>
</template>
<script setup lang="js">
import { ref, computed, onMounted } from 'vue'
import { http } from '@/utils/http'

const statusBarHeight = ref(0)
// 新闻详情数据
const newsDetail = ref(null)
const activeTab = ref(0)
// 控制显示中文还是原文，true为中文，false为原文
const showChinese = ref(true)
const datetimePickerRef = ref()
const dateRange = ref(['', Date.now()]) // For v-model
const startDate = ref('') // For display
const endDate = ref('') // For display

// scroll-view相关
const scrollViewRef = ref()
const scrollIntoViewId = ref('')

// 标签页数据
const tabs = ['商品信息', '交易方信息', '位置信息', '船舶']

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

// 查看筛查报告
const viewReport = () => {
  uni.showToast({
    title: '正在生成报告...',
    icon: 'loading',
    duration: 2000,
  })

  setTimeout(() => {
    uni.showToast({
      title: '报告生成完成',
      icon: 'success',
    })
  }, 2000)
  uni.navigateTo({
    url: '/pages-sub/shaichaxiangqing/index',
  })
}

// 原有的方法保留
function handleConfirm(e) {
  if (Array.isArray(e.value) && e.value.length === 2) {
    const [start, end] = e.value
    startDate.value = formatDate(start)
    endDate.value = formatDate(end)
    dateRange.value = [start, end]
  }
}

const tiaozhuan = () => {
  uni.navigateTo({
    url: '/pages-sub/shougongshaicha/index',
  })
}

const jieguo = () => {
  uni.navigateTo({
    url: '/pages-sub/shougongshaicha/index',
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

// 获取新闻详情
const fetchNewsDetail = async (id) => {
  try {
    const res = await http({
      url: '/tscc/news/detail',
      method: 'POST',
      data: {
        id,
      },
    })
    if (res.code === 200 && res.data) {
      const parseHtmlContent = (htmlString) => {
        // 移除 <!DOCTYPE html>、<html>、<head>、<body> 标签及其内容，保留其他HTML标签
        let cleanedHtml = htmlString.replace(/<!DOCTYPE[^>]*>/i, '')
        cleanedHtml = cleanedHtml.replace(/<html[^>]*>/i, '').replace(/<\/html>/i, '')
        cleanedHtml = cleanedHtml.replace(/<head[^>]*>([\s\S]*?)<\/head>/i, '')
        cleanedHtml = cleanedHtml.replace(/<body[^>]*>([\s\S]*?)<\/body>/i, '$1')
        return cleanedHtml.trim()
      }
      res.data.detailTextHtmlChn = parseHtmlContent(res.data.detailTextHtmlChn || '')
      res.data.detailTextHtmlUnified = parseHtmlContent(res.data.detailTextHtmlUnified || '')
      newsDetail.value = res.data
    }
  } catch (error) {
    console.error('获取新闻详情失败', error)
  }
}

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight

  // 获取URL中的新闻ID
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}
  if (options.id) {
    fetchNewsDetail(options.id)
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
.scroll-container {
  width: 100%;
  height: 100%;
}
/* 确保scroll-view有合适的高度 */
:deep(.uni-scroll-view) {
  height: 100% !important;
}

:deep(.uni-scroll-view-content) {
  min-height: 100%;
}
</style>
