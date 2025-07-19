<route lang="json5">
{
  style: {
    navigationBarTitleText: '筛查',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <div class="h340rpx w-full bg-[#D8EBFE] fixed top-0">
    <view :style="{ height: statusBarHeight + 'px' }"></view>
    <div class="h-44px flex justify-center items-center text-38rpx font-500">筛查</div>
  </div>
  <div class="h340rpx w-full fixed top-0">
    <view :style="{ height: statusBarHeight + 'px' }"></view>
    <div class="w-full justify-center flex" style="margin-top: 44px">
      <div
        class="w690rpx h200rpx bg-[#ffffffff] z-10 rounded-16rpx flex flex-col justify-evenly pl-30rpx color-[#333333] text-26rpx"
      >
        <div class="bg-[D8B14A6B] flex">
          <div class="h-60rpx flex justify-center items-center mr-20rpx">状态：</div>
          <div class="h-60rpx bg-[#F4F6FA] flex justify-center mr-20rpx items-center px-2">
            全部
          </div>
          <div class="h-60rpx bg-[#F4F6FA] flex justify-center mr-20rpx items-center px-2">
            已归档
          </div>
          <div class="h-60rpx bg-[#F4F6FA] flex justify-center mr-20rpx items-center px-2">
            未归档
          </div>
        </div>
        <div class="bg-[5498745E] flex">
          <div>日期：</div>
          <div class="w-460rpx h-60rpx overflow-hidden flex justify-center items-center bg-amber">
            <wd-datetime-picker label="日期选择" v-model="value" @confirm="handleConfirm" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <buju title="筛查">
    <!--      <div :style="{ height: footerHeight }"></div>-->
    <template #footer>
      <dibu />
    </template>
  </buju>
</template>
<script setup lang="js">
import dibu from '../index/dibu.vue'
const statusBarHeight = ref(0)
const value = ref(['', Date.now()])

function handleConfirm({ value }) {
  console.log(new Date(value))
}
onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
})
</script>
<style lang="scss" scoped></style>
