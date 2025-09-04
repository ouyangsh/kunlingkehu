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
          <div class="flex justify-center items-center">
            <div>所在区域</div>
            <i class="font_family icon-trangle-down text-#BAC3D1"></i>
          </div>
          <div class="flex justify-center items-center">
            <div>司法管辖区</div>
            <i class="font_family icon-trangle-down text-#BAC3D1"></i>
          </div>
          <div class="flex justify-center items-center">
            <div>所在主题</div>
            <i class="font_family icon-trangle-down text-#BAC3D1"></i>
          </div>
          <div class="flex justify-center items-center">
            <div>所属行业</div>
            <i class="font_family icon-trangle-down text-#BAC3D1"></i>
          </div>
        </div>

        <div class="flex text-26rpx mt-28rpx space-x-20rpx">
          <div class="h60rpx px-20rpx bg-#F4F6FA flex justify-center items-center">近7天</div>
          <div class="h60rpx px-20rpx bg-#F4F6FA flex justify-center items-center">近1月</div>
          <div class="h60rpx px-20rpx bg-#F4F6FA flex justify-center items-center">1年内</div>
          <div
            @click="openPicker"
            class="h60rpx px-20rpx bg-#F4F6FA flex justify-center items-center"
          >
            <i class="font_family icon-icon-rili text-#BAC3D1"></i>
            <div>自定义日期</div>
          </div>
        </div>
      </div>
      <div class="h10rpx bg-#F2F5FA"></div>
    </template>

    <div>
      <div
        @click="tiaozhuan(newsItem.id)"
        class="bg-#FFFFFF p30rpx box-border h184rpx mb-1px"
        v-for="newsItem in newsList"
        :key="newsItem.id"
      >
        <div class="flex">
          <div class="h80rpx text-30rpx text-#19213D min-w-560rpx">
            {{ newsItem.tittleChn }}
          </div>
          <div v-if="newsItem.imageProperty" class="w120rpx h80rpx bg-#F4F6FA shrink-0 ml2"></div>
        </div>
        <div class="text-24rpx flex justify-between mt-25rpx text-#666666">
          <div>{{ newsItem.publishDate.split(' ')[0] }}</div>
          <div>{{ newsItem.publishCountry }}</div>
          <div>{{ newsItem.publishOrg }}</div>
          <div>{{ newsItem.subjectType }}</div>
        </div>
      </div>
    </div>
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

const fetchNewsList = async () => {
  try {
    const res = await http({
      url: '/tscc/news/list',
      method: 'POST',
      data: queryParams,
    })
    if (res.code === 200 && res.rows) {
      newsList.value = res.rows
      total.value = res.total
    }
  } catch (error) {
    console.error('获取新闻列表失败', error)
  }
}

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight
  fetchNewsList()
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
/* 底部工具栏 */
.bottom-toolbar {
  width: 750rpx;
  height: 180rpx;
  padding-bottom: 35rpx;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}
</style>
