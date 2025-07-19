<route lang="json5">
{
  style: {
    navigationBarTitleText: '手工筛查',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <!-- The hidden picker for daterange -->
  <div class="absolute h-0">
    <wd-datetime-picker
      ref="datetimePickerRef"
      v-model="dateRange"
      @confirm="handleConfirm"
    ></wd-datetime-picker>
  </div>

  <div class="h340rpx w-full fixed top-0 bg-[#D8EBFE]">
    <view :style="{ height: statusBarHeight + 'px' }"></view>
    <div class="wfull flex justify-between items-center h-44px px-30rpx box-border">
      <uni-icons v-if="pageslength > 1" type="left" size="22" @click="navigateBack"></uni-icons>
      <uni-icons v-else type="home" size="22" @click="navigateBack"></uni-icons>
      <div class="h-44px flex justify-center items-center text-38rpx font-500">手工筛查</div>
      <uni-icons class="opacity-0" type="left" size="22" @click="navigateBack"></uni-icons>
    </div>
    <div class="w-full justify-center flex">
      <div
        class="w690rpx h200rpx bg-[#ffffffff] z-10 rounded-16rpx flex flex-col justify-evenly pl-30rpx color-[#333333] text-26rpx"
      >
        <div class="bg-[D8B14A6B] flex">
          <div class="h-60rpx flex justify-center items-center mr-20rpx">状态：</div>
          <div
            @click="indexa = 0"
            :class="indexa === 0 ? 'bg-[#2563EB] text-[#ffffffff]' : 'bg-[#F4F6FA] '"
            class="h-60rpx flex rounded-1 justify-center mr-20rpx items-center px-2"
          >
            全部
          </div>
          <div
            @click="indexa = 1"
            :class="indexa === 1 ? 'bg-[#2563EB] text-[#ffffffff]' : 'bg-[#F4F6FA] '"
            class="h-60rpx rounded-1 flex justify-center mr-20rpx items-center px-2"
          >
            已归档
          </div>
          <div
            @click="indexa = 2"
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

  <buju title="筛查">
    <div class="h200rpx"></div>
    <div v-for="i in 10" :key="i" class="w-690rpx bg-#fff rounded-16rpx m-30rpx p30rpx box-border">
      <div class="flex justify-start itcems-center not-first:mt24rpx" v-for="i in 6" :key="i">
        <div class="h28rpx text-28rpx mr10rpx">ID：19269404193915576</div>
        <div
          class="text-#EF9913 bg-#FCEBD0 w82rpx h36rpx text-22rpx flex justify-center items-center rounded-1"
        >
          未归档
        </div>
      </div>
    </div>
    <!--      <div :style="{ height: footerHeight }"></div>-->
  </buju>
</template>
<script setup lang="js">
import { onMounted, ref } from 'vue'
import dibu from '../index/dibu.vue'

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
