<route lang="json5">
{
  style: {
    navigationBarTitleText: '筛查详情',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="合规筛查报告">
    <!-- 标签页 -->
    <div
      class="flex border-b border-gray-200 mx-30rpx fixed w-100vw z10 bg-#f2f5fa py2 overflow-auto"
    >
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="scrollToSection(index)"
        :class="[
          'flex justify-center whitespace-nowrap items-center mr4 text-center px2 h60rpx  text-28rpx relative transition-all rounded-8rpx duration-200',
          activeTab === index
            ? 'text-blue-600 font-600 bg-#DDE6F9'
            : 'text-gray-600 font-400 bg-#FFFFFF',
        ]"
      >
        {{ tab }}
      </div>
    </div>

    <!-- 内容区域 -->
    <scroll-view
      ref="scrollViewRef"
      class="flex-1 scroll-container"
      scroll-y
      :scroll-into-view="scrollIntoViewId"
      :scroll-with-animation="true"
    >
      <div id="section-0" class="px-30rpx mb-3 mt13">
        <!-- 查询信息 -->
        <div v-if="reportDetail" class="bg-white rounded-16rpx p-30rpx mb-30rpx">
          <div class="space-y-16rpx text-26rpx">
            <div class="flex">
              <span class="text-#777777 w-160rpx">查询机构：</span>
              <span class="text-#333333">{{ reportDetail.tenantName || 'XXX有限公司' }}</span>
            </div>
            <div class="flex">
              <span class="text-#777777 w-160rpx">查询账号：</span>
              <span class="text-#333333">{{ reportDetail.loginUserName || 'admin' }}</span>
            </div>
            <div class="flex">
              <span class="text-#777777 w-160rpx">查询时间：</span>
              <span class="text-#333333">{{ reportDetail.riskDate || '2025-06-10 17:28:43' }}</span>
            </div>
          </div>
        </div>

        <!-- 查询对象基本信息 -->
        <div v-if="reportDetail && reportDetail.basicInfo" class="mb-30rpx">
          <div class="text-32rpx mb-20rpx">查询对象基本信息</div>
          <div class="bg-white rounded-16rpx p-30rpx">
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777 w-160rpx">单据文件名称：</span>
                <span class="text-#333333">{{ reportDetail.basicInfo.fileName || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">单据类型：</span>
                <span class="text-#333333">
                  {{ reportDetail.basicInfo.documentTemplateName || '暂无' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">客户名称：</span>
                <span class="text-#333333">
                  {{ reportDetail.basicInfo.customerName || '暂无' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 查询对象提取信息 -->
        <div v-if="reportDetail && reportDetail.retrieveInfo" class="mb-30rpx">
          <div class="text-32rpx mb-20rpx">查询对象提取信息</div>
          
          <!-- 单据信息段 -->
          <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
            <div class="text-28rpx font-600 mb-20rpx">单据信息段</div>
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777 w-160rpx">海关编号：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.customsCode || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">申报日期：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.declareDate || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">提运单号：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.billOfLadingNo || '暂无' }}</span>
              </div>
            </div>
          </div>

          <!-- 交易方信息段 -->
          <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
            <div class="text-28rpx font-600 mb-20rpx">交易方信息段</div>
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777 w-160rpx">境内发货人：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.domesticConsignor || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">境外收货人：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.overseasConsignee || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">生产销售单位：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.productionSalesCompany || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">申报单位：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.declareCompany || '暂无' }}</span>
              </div>
            </div>
          </div>

          <!-- 物流信息段 -->
          <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
            <div class="text-28rpx font-600 mb-20rpx">物流信息段</div>
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777 w-160rpx">运输方式：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.transportMode || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">运输工具名称：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.transportToolName || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">航次号：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.voyageNo || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">集装箱号：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.containerNo || '暂无' }}</span>
              </div>
            </div>
          </div>

          <!-- 位置信息段 -->
          <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
            <div class="text-28rpx font-600 mb-20rpx">位置信息段</div>
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777 w-160rpx">境内发货人城市：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.senderCity || '暂无' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">离境口岸：</span>
                <span class="text-#333333">
                  {{ getDeparturePortName() || '暂无' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">贸易国(地区)：</span>
                <span class="text-#333333">
                  {{ getTradeCountryName() || '暂无' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">指运港：</span>
                <span class="text-#333333">
                  {{ getDestinationPortName() || '暂无' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">原产国(地区)：</span>
                <span class="text-#333333">
                  {{ getOriginCountryName() || '暂无' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">最终目的国(地区)：</span>
                <span class="text-#333333">
                  {{ getFinalDestinationCountryName() || '暂无' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="text-32rpx mt40rpx">商品信息</div>
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
      <div class="bottom-toolbar box-border">
        <!-- 底部操作栏 -->
        <div class="flex items-center justify-around h-full px-30rpx">
          <div class="flex flex-col items-center justify-center" @click="editReport">
            <i class="icon-icon-bianji font_family !text-35rpx"></i>
            <text class="text-18rpx mt2 text-#444444">修改</text>
          </div>

          <div class="flex flex-col items-center" @click="guidang = true">
            <i class="icon-icon-guidang font_family !text-35rpx"></i>
            <text class="text-18rpx mt2 text-#444444">归档</text>
          </div>

          <div class="flex flex-col items-center" @click="exportReport">
            <i class="icon-icon-daochu font_family !text-35rpx"></i>
            <text class="text-18rpx mt2 text-#444444">导出筛查报告</text>
          </div>

          <div class="flex flex-col items-center" @click="shanchu = true">
            <i class="icon-icon0shanchu font_family !text-35rpx text-red"></i>
            <text class="text-18rpx mt2 text-red">删除</text>
          </div>
        </div>
      </div>
    </template>
  </buju>

  <wd-popup v-model="guidang" custom-style="height: 364rpx; width: 630rpx; border-radius: 20rpx ">
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">归档</div>
      <div class="text-32rpx my20rpx">确认归档？</div>
      <div class="h-88rpx rounded-md flex items-center justify-evenly mt40rpx w-630rpx mb-20rpx">
        <div
          @click="guidanghanshu(false)"
          class="text-32rpx w270rpx h88rpx bg-#F4F6FA flex justify-center items-center rounded-md"
        >
          取消
        </div>
        <div
          @click="guidanghanshu(true)"
          class="text-32rpx w270rpx h88rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
  <wd-popup v-model="shanchu" custom-style="height: 364rpx; width: 630rpx; border-radius: 20rpx ">
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">删除提示</div>
      <div class="text-32rpx my20rpx">请确认是否删除此分类？</div>
      <div class="h-88rpx rounded-md flex items-center justify-evenly mt40rpx w-630rpx mb-20rpx">
        <div
          @click="shanchuhanshu(false)"
          class="text-32rpx w270rpx h88rpx bg-#F4F6FA flex justify-center items-center rounded-md"
        >
          取消
        </div>
        <div
          @click="shanchuhanshu(true)"
          class="text-32rpx w270rpx h88rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
</template>
<script setup lang="js">
import { ref, onMounted, computed } from 'vue'

const statusBarHeight = ref(0)
// 报告详情数据
const reportDetail = ref(null)
const activeTab = ref(0)
const datetimePickerRef = ref()
const dateRange = ref(['', Date.now()]) // For v-model
const startDate = ref('') // For display
const endDate = ref('') // For display

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

  // 获取报告详情数据
  const reportData = uni.getStorageSync('reportDetail')
  if (reportData) {
    reportDetail.value = reportData
    console.log('获取到报告详情数据:', reportData)

    // 更新页面数据
    updatePageData()

    // 清除存储的数据
    uni.removeStorageSync('reportDetail')
  } else {
    console.log('没有找到报告详情数据')
  }
})

// 更新页面数据的函数
const updatePageData = () => {
  if (!reportDetail.value) return

  // 更新商品信息
  if (reportDetail.value.commodityList) {
    goodsInfo.value = reportDetail.value.commodityList.map((item, index) => ({
      checked: index === 0,
      name: item.itemValue || '',
      category: item.itemCategoryDes || '',
      code: item.itemCode || '',
      description: item.itemDesCn || item.itemDes || '',
      publishCountry: item.countryName || '',
      controlList: item.keywordShortNameCn || '',
      searchCode: item.searchWordsCn || '',
      customsCode: item.taricCode || '',
      controlCountry: item.restrictedRegionName || '',
      tariffCode: item.taricCode || '',
      chemicalCode: item.casCode || '',
      supervisionGroup: item.matchScore || '',
    }))
  }

  // 更新交易方信息 - 使用trades数组
  if (reportDetail.value.trades && reportDetail.value.trades.length > 0) {
    // 从trades数组中提取交易方信息
    const tradeMap = {}
    reportDetail.value.trades.forEach((trade) => {
      tradeMap[trade.key] = trade.value
    })

    traderInfo.value = {
      domesticCountry: tradeMap['境内发货人'] || '',
      locationType: tradeMap['境外收货人'] || '',
      entityName: tradeMap['申报单位'] || '',
      entityAlias: reportDetail.value.counterpartyList?.[0]?.matchScore || '非敏感名单',
      domesticProvince: '',
      cityName: '',
      unCode: '',
      iataCode: '',
      icaoCode: '',
    }
  }

  // 更新位置信息
  if (reportDetail.value.locationList && reportDetail.value.locationList.length > 0) {
    const location = reportDetail.value.locationList[0]
    locationInfo.value = {
      country: location.countryName || '',
      province: location.province || '',
      city: location.city || '',
      address: location.locationName || location.itemValue || '',
      postalCode: location.caccPortCode || '',
      longitude: '',
      latitude: '',
    }
  }

  // 更新船舶信息
  if (reportDetail.value.logisticsList && reportDetail.value.logisticsList.length > 0) {
    const ship = reportDetail.value.logisticsList[0]
    shipInfo.value = {
      name: ship.shipname || ship.itemValue || '',
      buildYear: ship.builddate || '',
      type: ship.shiptype || '',
      imoNumber: ship.imo || '',
      permit: ship.callsign || '',
      proposal: ship.mmsi || '',
      isControlled: ship.isSan ? '是' : '否',
      sanctionTime: ship.sanDate || '',
      sanctionCountry: ship.sanPublishCountry || '',
      sanctionReason: ship.sanReason || '',
      typeList: ship.restrictionNames || '',
    }
  }
}
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
