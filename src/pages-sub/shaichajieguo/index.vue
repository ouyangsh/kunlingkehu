<route lang="json5">
{
  style: {
    navigationBarTitleText: '筛查结果',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="手工筛查">
    <template #header>
      <div class="h44px flex items-center px-[30rpx] w100vw box-border">
        <view class="flex justify-between w100vw box-border">
          <uni-icons v-if="pageslength > 1" type="left" size="22" @click="navigateBack"></uni-icons>
          <uni-icons v-else type="home" size="22" @click="navigateBack"></uni-icons>
          <text class="text-38rpx font500">手工筛查</text>
          <uni-icons class="opacity-0" type="left" size="22" @click="navigateBack"></uni-icons>
        </view>
      </div>
      <div class="flex border-b border-gray-200 mx-30rpx z10 bg-#f2f5fa wfull py2">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          @click="scrollToSection(index)"
          :class="[
            'flex justify-center items-center mr4 text-center px2 h60rpx  text-28rpx relative transition-all rounded-8rpx duration-200',
            activeTab === index
              ? 'text-blue-600 font-600 bg-#DDE6F9'
              : 'text-gray-600 font-400 bg-#FFFFFF',
          ]"
        >
          {{ tab }}
        </div>
      </div>
    </template>
    <!-- 标签页 -->

    <!-- 内容区域 -->
    <scroll-view
      ref="scrollViewRef"
      class="flex-1 scroll-container"
      scroll-y
      :scroll-into-view="scrollIntoViewId"
      :scroll-with-animation="true"
    >
      <div id="section-0" class="px-30rpx mb-3">
        <div class="text-32rpx pt25rpx">商品信息</div>
        <div
          class="w92rpx h60rpx my30rpx bg-#DDE6F9 text-#2866EB flex justify-center items-center rounded-30rpx"
        >
          欧盟
        </div>
        <!-- 商品信息 -->
        <div class="space-y-[20rpx] mb-60rpx">
          <!-- 商品信息卡片 -->
          <div
            v-for="(item, index) in goodsInfo"
            :key="index"
            class="bg-white rounded-16rpx p-30rpx"
          >
            <div
              class="flex items-center justify-between mb-20rpx"
              @click="toggleItemSelection(index)"
            >
              <text class="text-32rpx font-500 text-black">{{ item.name }}</text>
              <view class="custom-checkbox mr-15rpx" :class="{ selected: item.checked }"></view>
            </div>

            <div class="space-y-[16rpx] text-26rpx">
              <div class="">
                <text class="text-#777777">物项/商品分类：</text>
                <text class="flex-1 leading-6">{{ item.category }}</text>
              </div>
              <div class="">
                <text class="text-#777777">物项/商品编码：</text>
                <text class="flex-1 leading-6">{{ item.code }}</text>
              </div>
              <div class="">
                <text class="text-#777777">物项/商品描述中文：</text>
                <text class="flex-1 leading-6">{{ item.description }}</text>
              </div>
              <div class="">
                <text class="text-#777777">发布国家/地区：</text>
                <text class="flex-1 leading-6">{{ item.publishCountry }}</text>
              </div>
              <div class="">
                <text class="text-#777777">管制清单中文：</text>
                <text class="flex-1 leading-6">{{ item.controlList }}</text>
              </div>
              <div class="">
                <text class="text-#777777">检索码：</text>
                <text class="flex-1 leading-6">{{ item.searchCode }}</text>
              </div>
              <div class="">
                <text class="text-#777777">海关商品编码：</text>
                <text class="flex-1 leading-6">{{ item.customsCode }}</text>
              </div>
              <div class="">
                <text class="text-#777777">管制国家/地区：</text>
                <text class="flex-1 leading-6">{{ item.controlCountry }}</text>
              </div>
              <div class="">
                <text class="text-#777777">综合关税编码：</text>
                <text class="flex-1 leading-6">{{ item.tariffCode }}</text>
              </div>
              <div class="">
                <text class="text-#777777">化学品编码：</text>
                <text class="flex-1 leading-6">{{ item.chemicalCode }}</text>
              </div>
              <div class="">
                <text class="text-#777777">监管分组：</text>
                <text class="flex-1 leading-6">{{ item.supervisionGroup }}</text>
              </div>
            </div>
          </div>
        </div>

        <!-- 交易方信息 -->
        <div id="section-1" class="mb-60rpx">
          <div class="text-32rpx mb-30rpx">交易方信息</div>
          <div class="bg-white rounded-16rpx p-30rpx">
            <div class="space-y-[16rpx] text-26rpx">
              <div class="flex justify-between">
                <div class="">
                  <text class="text-#777777">内贸国家：</text>
                  <text class="flex-1 leading-6">{{ traderInfo.domesticCountry }}</text>
                </div>
                <view class="custom-checkbox mr-15rpx" :class="{ selected: true }"></view>
              </div>
              <div class="">
                <text class="text-#777777">位置类型：</text>
                <text class="flex-1 leading-6">{{ traderInfo.locationType }}</text>
              </div>
              <div class="">
                <text class="text-#777777">实体名称：</text>
                <text class="flex-1 leading-6">{{ traderInfo.entityName }}</text>
              </div>
              <div class="">
                <text class="text-#777777">实体别名：</text>
                <text class="flex-1 leading-6">{{ traderInfo.entityAlias }}</text>
              </div>
              <div class="">
                <text class="text-#777777">内贸省份：</text>
                <text class="flex-1 leading-6">{{ traderInfo.domesticProvince }}</text>
              </div>
              <div class="">
                <text class="text-#777777">城市名：</text>
                <text class="flex-1 leading-6">{{ traderInfo.cityName }}</text>
              </div>
              <div class="">
                <text class="text-#777777">联合国三字码：</text>
                <text class="flex-1 leading-6">{{ traderInfo.unCode }}</text>
              </div>
              <div class="">
                <text class="text-#777777">国际航空运输协会三字码：</text>
                <text class="flex-1 leading-6">{{ traderInfo.iataCode }}</text>
              </div>
              <div class="">
                <text class="text-#777777">国际民用航空组织四字代码：</text>
                <text class="flex-1 leading-6">{{ traderInfo.icaoCode }}</text>
              </div>
            </div>
          </div>
        </div>

        <!-- 位置信息 -->
        <div id="section-2" class="mb-60rpx">
          <div class="text-32rpx mb-30rpx">位置信息</div>
          <div class="bg-white rounded-16rpx p-30rpx">
            <div class="space-y-[16rpx] text-26rpx">
              <div class="flex justify-between">
                <div class="">
                  <text class="text-#777777">国家/地区：</text>
                  <text class="flex-1 leading-6">{{ locationInfo.country }}</text>
                </div>
                <view class="custom-checkbox mr-15rpx" :class="{ selected: true }"></view>
              </div>

              <div class="">
                <text class="text-#777777">省份/州：</text>
                <text class="flex-1 leading-6">{{ locationInfo.province }}</text>
              </div>
              <div class="">
                <text class="text-#777777">城市：</text>
                <text class="flex-1 leading-6">{{ locationInfo.city }}</text>
              </div>
              <div class="">
                <text class="text-#777777">详细地址：</text>
                <text class="flex-1 leading-6">{{ locationInfo.address }}</text>
              </div>
              <div class="">
                <text class="text-#777777">邮政编码：</text>
                <text class="flex-1 leading-6">{{ locationInfo.postalCode }}</text>
              </div>
              <div class="">
                <text class="text-#777777">经度：</text>
                <text class="flex-1 leading-6">{{ locationInfo.longitude }}</text>
              </div>
              <div class="">
                <text class="text-#777777">纬度：</text>
                <text class="flex-1 leading-6">{{ locationInfo.latitude }}</text>
              </div>
            </div>
          </div>
        </div>

        <!-- 船舶信息 -->
        <div id="section-3" class="mb-60rpx">
          <div class="text-32rpx mb-30rpx">船舶信息</div>
          <div class="bg-white rounded-16rpx p-30rpx">
            <div class="space-y-[16rpx] text-26rpx">
              <div class="flex justify-between">
                <div class="">
                  <text class="text-#777777">船舶名称：</text>
                  <text class="flex-1 leading-6">{{ shipInfo.name }}</text>
                </div>
                <view class="custom-checkbox mr-15rpx" :class="{ selected: true }"></view>
              </div>
              <div class="">
                <text class="text-#777777">建造年份：</text>
                <text class="flex-1 leading-6">{{ shipInfo.buildYear }}</text>
              </div>
              <div class="">
                <text class="text-#777777">船舶类型：</text>
                <text class="flex-1 leading-6">{{ shipInfo.type }}</text>
              </div>
              <div class="">
                <text class="text-#777777">IMO编号：</text>
                <text class="flex-1 leading-6">{{ shipInfo.imoNumber }}</text>
              </div>
              <div class="">
                <text class="text-#777777">许可：</text>
                <text class="flex-1 leading-6">{{ shipInfo.permit }}</text>
              </div>
              <div class="">
                <text class="text-#777777">总拟：</text>
                <text class="flex-1 leading-6">{{ shipInfo.proposal }}</text>
              </div>
              <div class="">
                <text class="text-#777777">是否管制的：</text>
                <text class="flex-1 leading-6">{{ shipInfo.isControlled }}</text>
              </div>
              <div class="">
                <text class="text-#777777">制裁时间：</text>
                <text class="flex-1 leading-6">{{ shipInfo.sanctionTime }}</text>
              </div>
              <div class="">
                <text class="text-#777777">制裁发布国家：</text>
                <text class="flex-1 leading-6">{{ shipInfo.sanctionCountry }}</text>
              </div>
              <div class="">
                <text class="text-#777777">制裁原因：</text>
                <text class="flex-1 leading-6">{{ shipInfo.sanctionReason }}</text>
              </div>
              <div class="">
                <text class="text-#777777">类型类清单：</text>
                <text class="flex-1 leading-6">{{ shipInfo.typeList }}</text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>

    <template #footer>
      <div class="bg-white p-30rpx pb-safe">
        <div
          @click="viewReport"
          class="w-full h-88rpx bg-blue-600 rounded-16rpx flex justify-center items-center"
        >
          <text class="text-white text-32rpx font-500">查看筛查报告</text>
        </div>
      </div>
    </template>
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
const pageslength = computed(() => getCurrentPages().length)

const scrollIntoViewId = ref('')
const navigateBack = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
  } else {
    uni.reLaunch({
      url: '/pages/index/index',
    })
  }
}

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
