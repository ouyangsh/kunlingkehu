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
          <!-- 循环渲染多个交易方 -->
          <div
            v-for="(trader, index) in traderInfo"
            :key="index"
            class="bg-white rounded-16rpx p-30rpx mb-30rpx"
          >
            <div class="space-y-[16rpx] text-26rpx">
              <div class="flex justify-between">
                <div class="">
                  <text class="text-#777777">筛查项目：</text>
                  <text class="flex-1 leading-6">{{ trader.locationType }}</text>
                </div>
                <view class="custom-checkbox mr-15rpx" :class="{ selected: true }"></view>
              </div>
              <div class="">
                <text class="text-#777777">筛查内容：</text>
                <text class="flex-1 leading-6">{{ trader.domesticCountry }}</text>
              </div>
              <div class="">
                <text class="text-#777777">中文名称：</text>
                <text class="flex-1 leading-6">{{ trader.cnName || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">英文名称：</text>
                <text class="flex-1 leading-6">{{ trader.enName || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">实体类型：</text>
                <text class="flex-1 leading-6">{{ trader.entityName || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">名单类型：</text>
                <text class="flex-1 leading-6">{{ trader.entityAlias || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">国籍：</text>
                <text class="flex-1 leading-6">{{ trader.domesticProvince || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">关键字：</text>
                <text class="flex-1 leading-6">{{ trader.cityName || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">发布机构：</text>
                <text class="flex-1 leading-6">{{ trader.unCode || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">发布日期：</text>
                <text class="flex-1 leading-6">{{ trader.iataCode || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">匹配分值：</text>
                <text class="flex-1 leading-6 font-medium">
                  {{ trader.icaoCode }}
                </text>
              </div>
              <div v-if="trader.listLabels" class="">
                <text class="text-#777777">名单标签：</text>
                <text class="flex-1 leading-6">{{ trader.listLabels }}</text>
              </div>
            </div>
          </div>
          <!-- 如果没有交易方信息显示提示 -->
          <div
            v-if="traderInfo.length === 0"
            class="bg-white rounded-16rpx p-30rpx text-center text-#999"
          >
            暂无
          </div>
        </div>

        <!-- 国家信息 -->
        <div id="section-2" class="mb-60rpx">
          <div class="text-32rpx mb-30rpx">国家信息</div>
          <!-- 循环渲染多个国家 -->
          <div
            v-for="(country, index) in locationInfo"
            :key="index"
            class="bg-white rounded-16rpx p-30rpx mb-30rpx"
          >
            <div class="space-y-[16rpx] text-26rpx">
              <div class="flex justify-between">
                <div class="">
                  <text class="text-#777777">筛查项目：</text>
                  <text class="flex-1 leading-6">{{ country.itemName }}</text>
                </div>
                <view class="custom-checkbox mr-15rpx" :class="{ selected: true }"></view>
              </div>
              <div class="">
                <text class="text-#777777">筛查内容：</text>
                <text class="flex-1 leading-6">{{ country.itemValue }}</text>
              </div>
              <div class="">
                <text class="text-#777777">中文名称：</text>
                <text class="flex-1 leading-6">{{ country.cnName || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">英文名称：</text>
                <text class="flex-1 leading-6">{{ country.enName || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">中文简称：</text>
                <text class="flex-1 leading-6">{{ country.cnShortName || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">英文简称：</text>
                <text class="flex-1 leading-6">{{ country.enShortName || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">国家2字码：</text>
                <text class="flex-1 leading-6">{{ country.code2 || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">国家3字码：</text>
                <text class="flex-1 leading-6">{{ country.code3 || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">数字缩写：</text>
                <text class="flex-1 leading-6">{{ country.nmCode || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">归属大洲：</text>
                <text class="flex-1 leading-6">{{ country.continent || '暂无' }}</text>
              </div>
              <div v-if="country.restrictionNames" class="">
                <text class="text-#777777">限制来源：</text>
                <text class="flex-1 leading-6">{{ country.restrictionNames }}</text>
              </div>
            </div>
          </div>
          <!-- 如果没有国家信息显示提示 -->
          <div
            v-if="locationInfo.length === 0"
            class="bg-white rounded-16rpx p-30rpx text-center text-#999"
          >
            暂无
          </div>
        </div>

        <!-- 船舶信息 -->
        <div id="section-3" class="mb-60rpx">
          <div class="text-32rpx mb-30rpx">船舶信息</div>
          <!-- 循环渲染多个船舶 -->
          <div
            v-for="(ship, index) in shipInfo"
            :key="index"
            class="bg-white rounded-16rpx p-30rpx mb-30rpx"
          >
            <div class="space-y-[16rpx] text-26rpx">
              <div class="flex justify-between">
                <div class="">
                  <text class="text-#777777">筛查项目：</text>
                  <text class="flex-1 leading-6">{{ ship.itemName }}</text>
                </div>
                <view class="custom-checkbox mr-15rpx" :class="{ selected: true }"></view>
              </div>
              <div class="">
                <text class="text-#777777">筛查内容：</text>
                <text class="flex-1 leading-6">{{ ship.itemValue }}</text>
              </div>
              <div class="">
                <text class="text-#777777">船舶名称：</text>
                <text class="flex-1 leading-6">{{ ship.shipname || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">建造日期：</text>
                <text class="flex-1 leading-6">{{ ship.builddate || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">船舶类型：</text>
                <text class="flex-1 leading-6">{{ ship.shiptype || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">IMO编号：</text>
                <text class="flex-1 leading-6">{{ ship.imo || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">船舶呼号：</text>
                <text class="flex-1 leading-6">{{ ship.callsign || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">MMSI：</text>
                <text class="flex-1 leading-6">{{ ship.mmsi || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">总吨位：</text>
                <text class="flex-1 leading-6">{{ ship.gt || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">载重吨：</text>
                <text class="flex-1 leading-6">{{ ship.dwt || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">船籍国：</text>
                <text class="flex-1 leading-6">{{ ship.flagcountry || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">船舶所有公司：</text>
                <text class="flex-1 leading-6">{{ ship.shipowner || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">船舶管理公司：</text>
                <text class="flex-1 leading-6">{{ ship.shipmanager || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">船舶经营公司：</text>
                <text class="flex-1 leading-6">{{ ship.shipoperator || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">DOC公司：</text>
                <text class="flex-1 leading-6">{{ ship.doccompany || '暂无' }}</text>
              </div>
              <div class="">
                <text class="text-#777777">是否被制裁：</text>
                <text class="flex-1 leading-6">
                  {{ ship.isSan ? '是' : '否' }}
                </text>
              </div>
              <div v-if="ship.sanDate" class="">
                <text class="text-#777777">制裁时间：</text>
                <text class="flex-1 leading-6">{{ ship.sanDate }}</text>
              </div>
              <div v-if="ship.sanPublishCountry" class="">
                <text class="text-#777777">制裁发布国家：</text>
                <text class="flex-1 leading-6">{{ ship.sanPublishCountry }}</text>
              </div>
              <div v-if="ship.sanReason" class="">
                <text class="text-#777777">制裁原因：</text>
                <text class="flex-1 leading-6">{{ ship.sanReason }}</text>
              </div>
              <div v-if="ship.restrictionNames" class="">
                <text class="text-#777777">限制来源：</text>
                <text class="flex-1 leading-6">{{ ship.restrictionNames }}</text>
              </div>
            </div>
          </div>
          <!-- 如果没有船舶信息显示提示 -->
          <div
            v-if="shipInfo.length === 0"
            class="bg-white rounded-16rpx p-30rpx text-center text-#999"
          >
            暂无
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
const goodsInfo = ref([])

// 更新商品信息
const updateGoodsInfo = () => {
  if (searchResultData.value?.commodityList) {
    goodsInfo.value = searchResultData.value.commodityList.map((item, index) => ({
      checked: index === 0, // 默认第一个选中
      name: item.itemValue || item.itemDesCn || '暂无', // 商品名称使用itemDesCn或itemValue
      category: item.itemCategoryDes || 'CN编码', // 物项分类中文
      code: item.itemValue || '8536909000', // 筛查内容（商品编码）
      description:
        item.itemDesCn ||
        '电机及其部件；录音机和放音机、电视图像和声音记录与重放设备及其部件和配件', // 商品名称-中文
      publishCountry: `${item.countryName || '欧盟'}(${item.countryCode3 || 'EU'})`, // 发布国家/地区
      controlList: item.keywordShortNameCn || '欧盟特定限制', // 名单关键字中文简称
      searchCode: item.searchWordsCn || '无', // 检索词文本中文释义
      customsCode: item.hsCode?.split(';')?.[0] || '850110', // 6位HS编码（取第一个）
      controlCountry: `${item.restrictedRegionName || '朝鲜'}(${item.restrictedRegion || 'PRK'})`, // 受影响的国家
      tariffCode: item.taricCode || '', // TARIC行业代码
      chemicalCode: item.casCode || '', // CAS化学品编码
      supervisionGroup: item.matchScore || '中分值[60]', // 匹配分值
    }))
  }
}

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

// 交易方信息数据 - 改为数组支持多个交易方
const traderInfo = ref([])

// 更新交易方信息
const updateTraderInfo = () => {
  console.log('更新交易方信息，counterpartyList:', searchResultData.value?.counterpartyList)

  if (searchResultData.value?.counterpartyList?.length > 0) {
    // 循环处理所有交易方信息
    traderInfo.value = searchResultData.value.counterpartyList.map((counterparty) => ({
      domesticCountry: counterparty.itemValue || counterparty.primaryName || '', // 筛查内容或主要名称
      locationType: counterparty.itemName || '', // 筛查项目
      entityName: counterparty.entityTypeName || '', // 实体类型名称
      entityAlias: counterparty.listSubtypeName || '', // 名单类型名称
      domesticProvince: counterparty.countryName || '', // 国籍
      cityName: counterparty.keywordName || '', // 名单关键字名称
      unCode: counterparty.listPublishOrg || '', // 发布机构
      iataCode: counterparty.publishDate || '', // 发布日期
      icaoCode: counterparty.matchScore || '', // 匹配分值
      cnName: counterparty.cnName || '', // 中文名称
      enName: counterparty.enName || '', // 英文名称
      listLabels: counterparty.listLabels || '', // 名单标签
    }))
    console.log('使用counterpartyList数据，共', traderInfo.value.length, '个交易方')
  } else {
    console.log('没有交易方数据')
    traderInfo.value = []
  }

  console.log('最终交易方信息:', traderInfo.value)
}

// 位置信息数据 - 改为数组支持多个国家
const locationInfo = ref([])

// 更新位置信息
const updateLocationInfo = () => {
  console.log('更新位置信息，countryList:', searchResultData.value?.countryList)

  if (searchResultData.value?.countryList?.length > 0) {
    // 循环处理所有国家信息
    locationInfo.value = searchResultData.value.countryList.map((country) => ({
      itemName: country.itemName || '', // 筛查项
      itemValue: country.itemValue || '', // 筛查名称
      code2: country.code2 || '', // 国家2字码
      code3: country.code3 || '', // 国家3字码
      nmCode: country.nmCode || '', // 国家数字缩写
      cnShortName: country.cnShortName || '', // 国家中文名称缩写
      enShortName: country.enShortName || '', // 国家英文名称缩写
      cnName: country.cnName || '', // 国家中文名称
      enName: country.enName || '', // 国家英文名称
      continent: country.continent || '', // 归属大洲
      restrictionNames: country.restrictionNames || '', // 限制来源名称
    }))
    console.log('使用countryList数据，共', locationInfo.value.length, '个国家')
  } else {
    console.log('没有国家数据')
    locationInfo.value = []
  }

  console.log('最终位置信息:', locationInfo.value)
}

// 船舶信息数据 - 改为数组支持多个船舶
const shipInfo = ref([])

// 更新船舶信息
const updateShipInfo = () => {
  console.log('更新船舶信息，logisticsList:', searchResultData.value?.logisticsList)

  if (searchResultData.value?.logisticsList?.length > 0) {
    // 循环处理所有船舶信息
    shipInfo.value = searchResultData.value.logisticsList.map((ship) => ({
      itemName: ship.itemName || '', // 筛查项目
      itemValue: ship.itemValue || '', // 筛查内容
      shipname: ship.shipname || '', // 船名
      builddate: ship.builddate || '', // 创建日期
      shiptype: ship.shiptype || '', // 船型
      imo: ship.imo || '', // 船舶IMO
      callsign: ship.callsign || '', // 船舶呼号
      mmsi: ship.mmsi || '', // 水上移动通信业务标识码
      gt: ship.gt || '', // 总吨位
      dwt: ship.dwt || '', // 载重吨
      flagcountry: ship.flagcountry || '', // 船籍国
      shipowner: ship.shipowner || '', // 船舶所有公司
      shipmanager: ship.shipmanager || '', // 船舶管理公司
      shipoperator: ship.shipoperator || '', // 船舶经营公司
      doccompany: ship.doccompany || '', // DOC公司
      isSan: ship.isSan || false, // 是否被制裁
      sanDate: ship.sanDate || '', // 被制裁时间
      sanPublishCountry: ship.sanPublishCountry || '', // 制裁发布国家
      sanReason: ship.sanReason || '', // 被制裁的原因
      restrictionNames: ship.restrictionNames || '', // 限制源名称
    }))
    console.log('使用logisticsList数据，共', shipInfo.value.length, '个船舶')
  } else {
    console.log('没有船舶数据')
    shipInfo.value = []
  }

  console.log('最终船舶信息:', shipInfo.value)
}

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

// 存储筛查结果数据
const searchResultData = ref(null)
const basicInfo = ref({})
const retrieveInfo = ref({})

// 解析JSON字符串的辅助函数
const parseJsonValue = (value) => {
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    try {
      const parsed = JSON.parse(value)
      return parsed.name || parsed.code || value
    } catch (e) {
      return value
    }
  }
  return value
}

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight

  // 获取筛查结果数据
  const searchResult = uni.getStorageSync('searchResult')
  console.log('从存储中获取的数据:', searchResult)

  if (searchResult && searchResult.resultData) {
    searchResultData.value = searchResult.resultData
    console.log('筛查结果数据:', searchResultData.value)

    // 解析基础信息 - 数据直接在resultData中
    basicInfo.value = searchResultData.value.basicInfo || {}
    retrieveInfo.value = searchResultData.value.retrieveInfo || {}

    console.log('基础信息:', basicInfo.value)
    console.log('检索信息:', retrieveInfo.value)
    console.log('商品列表:', searchResultData.value.commodityList)
    console.log('交易方列表:', searchResultData.value.counterpartyList)
    console.log('位置列表:', searchResultData.value.locationList)
    console.log('物流列表:', searchResultData.value.logisticsList)

    // 更新商品信息
    updateGoodsInfo()
    // 更新交易方信息
    updateTraderInfo()
    // 更新位置信息
    updateLocationInfo()
    // 更新船舶信息
    updateShipInfo()

    // 清除存储的数据
    uni.removeStorageSync('searchResult')
  } else {
    console.log('没有找到搜索结果数据，使用模拟数据')
    // 如果没有数据，使用一些模拟数据进行测试
    goodsInfo.value = [
      {
        checked: true,
        name: '同轴连接器',
        category: 'CN编码',
        code: '8536909000',
        description: '电机及其部件；录音机和放音机、电视图像和声音记录与重放设备及其部件和配件',
        publishCountry: '欧盟(EU)',
        controlList: '欧盟特定限制',
        searchCode: '无',
        customsCode: '853690',
        controlCountry: '朝鲜(PRK)',
        tariffCode: '',
        chemicalCode: '',
        supervisionGroup: '中分值[60]',
      },
    ]

    traderInfo.value = {
      domesticCountry: '义乌市善吉报关有限公司',
      locationType: 'R.F. Industries, Ltd.',
      entityName: '申报单位',
      entityAlias: '非敏感名单',
      domesticProvince: '',
      cityName: '',
      unCode: '',
      iataCode: '',
      icaoCode: '',
    }

    locationInfo.value = {
      country: '中国',
      province: '',
      city: '',
      address: '洋山港',
      postalCode: '311002',
      longitude: '',
      latitude: '',
    }

    shipInfo.value = {
      name: 'EMERALD',
      buildYear: '1990年04月',
      type: 'Yacht',
      imoNumber: '1000239',
      permit: '9HA3400',
      proposal: '478',
      isControlled: '否',
      sanctionTime: '',
      sanctionCountry: '',
      sanctionReason: '',
      typeList: '',
    }
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
