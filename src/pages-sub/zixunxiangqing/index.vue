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
    <div class="p-30rpx">
      <div>
        La Agencia Tributaria ha devuelto a cierre de año más de 12.900 millones de euros a
        15.852.000 contribuyentes
      </div>
      <div class="grid grid-cols-2 gap-10rpx my-30rpx">
        <div class="flex text-24rpx text-#666666">
          <div>发布国家：</div>
          <div class="text-#19213D">西班牙</div>
        </div>

        <div class="flex text-24rpx text-#666666">
          <div>发布日期：</div>
          <div class="text-#19213D">2025-01-03</div>
        </div>

        <div class="flex text-24rpx text-#666666">
          <div>发布机构：</div>
          <div class="text-#19213D">西班牙</div>
        </div>

        <div class="flex text-24rpx text-#666666">
          <div>所选主题：</div>
          <div class="text-#19213D">新闻</div>
        </div>
      </div>

      <div class="border-t-1px border-t-solid border-#E5E7EB my-30rpx"></div>

      <div class="flex space-x-20rpx">
        <div
          class="w92rpx h60rpx bg-#2563EB text-#fff text-26rpx flex justify-center items-center rounded-8rpx"
        >
          中文
        </div>
        <div
          class="w92rpx h60rpx bg-#F4F6FA text-#333333 text-26rpx flex justify-center items-center rounded-8rpx"
        >
          原文
        </div>
      </div>
      <div class="text-30rpx text-#19213D mt30rpx">
        2023年个人所得税申报活动 已完成97.4%的退税申请，且已支付相应申请金额的94.9%
        数字辅助渠道在申报活动结束后仍保持活跃，全年为使用这些工具解决所得税申报及纳税疑问的纳税人提供了113.6万次答复
        截至年底已提交的2413.1万份申报中，超195.9万份是通过在办公室或电话方式获得的个性化协助完成的，比上一年增加了近11万份，同时通过“应用程序”提交的申报数量增加了23.4%
        2025年1月3日 - 西班牙税务总局已向2023年个人所得税（IRPF
        2023）的1585.2万名纳税人退还了129.07亿欧元，截至12月30日，已完成97.4%的退税申请数量，且已支付相应申请金额的94.9%，与上一年情况相符。
        年底时，已支付的退税金额同比大幅增长（数量上增长7.9%，金额上增长14.5%），这与纳税人提交的退税申请自身的发展情况相符。与此同时，截至目前已提交的申报总数为2413.1万份，比上一年增加了4.9%，其中67.5%（1627.9万份）有退税结果，623.9万份有应缴余额。
        就申报方式而言，“致电我们”电话申报计划仍是主要的个性化协助系统，有近112.8万份申报，比上一年增加了5.4%，占通过个性化协助完成的申报总数的57.5%。同时，在办公室完成了83.16万份申报，比上一年增加了6.6%。
        如此一来，超195.9万份申报是通过在办公室或电话方式为纳税人提供特定协助完成的，这比上一年增加了近11万份，证实了对于那些不太习惯需要个性化协助的新技术（无论是否需要前往实体办公室）的纳税人来说，这两种替代方式是被接受的。
        截至目前，超2.65万名纳税人在收到税务总局的预防性通知后更正了他们的申报，从而避免了税务总局随后可能进行的核查、利息的产生以及可能的处罚。对于这些纳税人，所得税网上申报平台本身会提供已纳入数据的补充申报建议。
      </div>
    </div>
  </buju>
</template>
<script setup lang="js">
const statusBarHeight = ref(0)
const activeTab = ref(0)
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

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight
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
