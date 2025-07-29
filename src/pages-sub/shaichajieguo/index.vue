<route lang="json5">
{
  style: {
    navigationBarTitleText: '筛查',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="筛查">
    <div class="h200rpx"></div>
    <div
      @click="jieguo"
      v-for="i in 10"
      :key="i"
      class="w-690rpx bg-#fff rounded-16rpx m-30rpx p30rpx box-border"
    >
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
    <div class="fixed bottom-190rpx right-30rpx">
      <image
        @click="tiaozhuan"
        class="w-88rpx h-88rpx"
        src="@/static/lanhu_shaicha/SketchPng5f6fde3afd1ee831a9e0ca2a045fc7b393f024f4af7028a4efeb23de0580afb2.png"
      ></image>
    </div>
  </buju>
</template>
<script setup lang="js">
const statusBarHeight = ref(0)
const datetimePickerRef = ref()
const dateRange = ref(['', Date.now()]) // For v-model
const startDate = ref('') // For display
const endDate = ref('') // For display

function handleConfirm(e) {
  if (Array.isArray(e.value) && e.value.length === 2) {
    const [start, end] = e.value
    // Assuming the value is a timestamp, format it for display
    startDate.value = formatDate(start)
    endDate.value = formatDate(end)
    dateRange.value = [start, end] // Update the model value
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
<style lang="scss" scoped></style>
