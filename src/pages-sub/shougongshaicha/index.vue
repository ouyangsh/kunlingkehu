<route lang="json5">
{
  style: {
    navigationBarTitleText: '手工筛查',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <div class="h340rpx w-full fixed top-0 bg-[#D8EBFE] z1">
    <view :style="{ height: statusBarHeight + 'px' }"></view>
    <div class="wfull flex justify-between items-center h-44px px-30rpx box-border">
      <uni-icons v-if="pageslength > 1" type="left" size="22" @click="navigateBack"></uni-icons>
      <uni-icons v-else type="home" size="22" @click="navigateBack"></uni-icons>
      <div class="h-44px flex justify-center items-center text-38rpx font-500">手工筛查</div>
      <uni-icons class="opacity-0" type="left" size="22" @click="navigateBack"></uni-icons>
    </div>
  </div>

  <buju title="筛查">
    <div class="relative z-1">
      <div class="w-full justify-center h130rpx items-center flex z10 fixed bg-[#D8EBFE]">
        <div
          class="w690rpx box-border h88rpx bg-[#ffffffff] rounded-16rpx flex flex-col justify-evenly pl-30rpx color-[#2563EB] text-28rpx"
        >
          <div class="bg-[D8B14A6B] flex justify-center items-center">
            <i class="font_family icon-icon-daochu text-#2563EB text-20rpx"></i>
            <div>导入单据</div>
          </div>
        </div>
      </div>
      <div class="h100rpx"></div>
      <div
        v-for="i in 10"
        :key="i"
        class="w-690rpx bg-#fff rounded-16rpx m-30rpx p30rpx box-border"
      >
        <div class="not-first:mt24rpx text-28rpx">
          <div class="mb-20rpx">交易方信息</div>
          <div class="flex mb-10rpx justify-start items-center">
            <div
              class="w220rpx mr10rpx px-2 box-border rounded-8rpx h60rpx bg-#F4F6FA flex justify-between items-center color-[#333333]"
            >
              <div>境内发货人</div>
              <i class="font_family icon-trangle-down text-20rpx"></i>
            </div>
            <input
              class="w320rpx mr10rpx rounded-8rpx h60rpx bg-#F4F6FA pl-2"
              type="text"
              placeholder="请输入境内发货人"
            />
            <div
              class="mr10rpx h60rpx bg-#F4F6FA rounded-8rpx px2 flex justify-center items-center"
            >
              <i class="font_family mr10rpx icon-icon0shanchu text-20rpx"></i>
            </div>
          </div>
          <div class="flex justify-start items-center">
            <div
              class="w220rpx mr10rpx px-2 box-border rounded-8rpx h60rpx bg-#F4F6FA flex justify-between items-center color-[#333333]"
            >
              <div>境内发货人</div>
              <i class="font_family icon-trangle-down text-20rpx"></i>
            </div>
            <input
              class="w320rpx mr10rpx rounded-8rpx h60rpx bg-#F4F6FA pl-2"
              type="text"
              placeholder="请输入境内发货人"
            />
            <div
              class="mr10rpx h60rpx bg-#F4F6FA rounded-8rpx px2 flex justify-center items-center"
            >
              <i class="font_family mr10rpx icon-icon-zengjia text-20rpx"></i>
            </div>
          </div>
          <div class="mt-20rpx color-[#999999] text-24rpx">提示:宁波杰腾科通讯设备有限公司R.F.</div>
        </div>
      </div>
      <!--      <div :style="{ height: footerHeight }"></div>-->
    </div>
    <template #footer>
      <div class="h-180rpx w-full bg-[#ffffffff] flex justify-evenly items-center pb-2 box-border">
        <div class="w-330rpx h-88rpx bg-[#F2F5FA] rounded-1 flex justify-center items-center">
          保存
        </div>
        <div
          class="w-330rpx h-88rpx bg-[#2563EB] text-[#ffffff] rounded-1 flex justify-center items-center"
        >
          搜索
        </div>
      </div>
    </template>
  </buju>
</template>
<script setup lang="js">
const indexa = ref(0)
const statusBarHeight = ref(0)
const datetimePickerRef = ref()
const dateRange = ref(['', Date.now()]) // For v-model
const startDate = ref('') // For display
const endDate = ref('') // For display
const pageslength = computed(() => getCurrentPages().length)

const navigateBack = () => {
  console.log('asdf')
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
  } else {
    uni.reLaunch({
      url: '/pages/index/index',
    })
  }
}

function handleConfirm(e) {
  if (Array.isArray(e.value) && e.value.length === 2) {
    const [start, end] = e.value
    // Assuming the value is a timestamp, format it for display
    startDate.value = formatDate(start)
    endDate.value = formatDate(end)
    dateRange.value = [start, end] // Update the model value
  }
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
<style lang="scss" scoped></style>
