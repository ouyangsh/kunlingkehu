<route lang="json5">
{
  style: {
    navigationBarTitleText: '相册导入',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <div class="h180rpx w-full fixed top-0 bg-[#ffffffff] z10">
    <view :style="{ height: statusBarHeight + 'px' }"></view>
    <div class="wfull flex justify-start items-center h-44px px-30rpx box-border">
      <uni-icons v-if="pageslength > 1" type="left" size="22" @click="navigateBack"></uni-icons>
      <uni-icons v-else type="home" size="22" @click="navigateBack"></uni-icons>
      <!-- 文字超出显示省略 不换行 虚线边框 虚线间隔大一些-->
      <div
        class="w386rpx text-ellipsis ml3 overflow-hidden text-26rpx font-500 whitespace-nowrap border-b-1px border-b-dashed border-b-#000000FF"
      >
        贸易合规助手2025-05-23 14.阿的说法是短发
      </div>
      <i class="font_family icon-icon-bianji !text-35rpx ml3"></i>
    </div>
  </div>

  <buju title="筛查">
    <div class="bg-amber h-100%"></div>
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

  <!-- 导入单据弹窗 -->
  <view
    v-if="showImportModal"
    class="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-end"
    @click="closeImportModal"
  >
    <view class="w-full h-[75vh] bg-white rounded-t-[32rpx] overflow-hidden" @click.stop>
      <!-- 弹窗头部 -->
      <view
        class="flex justify-between bg-#F4F6FA h-100rpx box-border items-center px-30rpx py-30rpx border-b border-gray-100"
      >
        <view @click="closeImportModal" class="w-60rpx h-60rpx flex justify-center items-center">
          <i class="font_family icon-guanbi text-#666666"></i>
        </view>
        <text class="text-32rpx font-500 text-black">导入单据</text>
        <view
          @click="confirmImport"
          class="w-120rpx h-60rpx bg-#FFFFFF flex justify-center items-center rounded-16rpx"
        >
          <text class="text-28rpx text-#2563EB">确定</text>
        </view>
      </view>

      <scroll-view scroll-y class="h-[calc(75vh_-_110rpx)]">
        <view class="px-30rpx py-30rpx">
          <!-- 选择模板 -->
          <view class="mb-40rpx">
            <text class="text-32rpx font-500 text-black mb-20rpx block">选择模板</text>
            <view class="flex flex-wrap gap-[20rpx]">
              <view
                v-for="(template, index) in templateOptions"
                :key="index"
                @click="selectTemplate(index)"
                :class="[
                  'px-20rpx py-15rpx rounded-12rpx text-28rpx',
                  selectedTemplate === index
                    ? 'bg-blue-100 text-blue-600 border border-blue-200'
                    : 'bg-gray-100 text-gray-600',
                ]"
              >
                {{ template }}
              </view>
            </view>
          </view>

          <!-- 单据上传 -->
          <view class="mb-40rpx">
            <text class="text-32rpx font-500 text-black mb-20rpx block">单据上传</text>
            <view class="flex border-b border-gray-200">
              <view
                @click="selectUploadType(0)"
                :class="[
                  'py-10rpx text-28rpx relative mr-4',
                  selectedUploadType === 0 ? 'text-blue-600' : 'text-gray-600',
                ]"
              >
                线上文件
                <view
                  v-if="selectedUploadType === 0"
                  class="absolute bottom-0 wfull h-4rpx bg-blue-600 rounded-t-[2rpx]"
                ></view>
              </view>
              <view
                @click="selectUploadType(1)"
                :class="[
                  ' py-10rpx text-28rpx relative',
                  selectedUploadType === 1 ? 'text-blue-600' : 'text-gray-600',
                ]"
              >
                本地上传
                <view
                  v-if="selectedUploadType === 1"
                  class="absolute bottom-0 wfull h-4rpx bg-blue-600 rounded-t-[2rpx]"
                ></view>
              </view>
            </view>
          </view>
          <!--       线上   单据上传-->
          <view
            v-if="selectedUploadType === 0"
            class="bg-#F2F5FA border-1px border-solid border-#DDDDDD"
          >
            <!-- 文件分类 -->
            <view class="p-20rpx">
              <view class="flex gap-[20rpx]">
                <view
                  v-for="(category, index) in fileCategories"
                  :key="index"
                  @click="selectCategory(index)"
                  :class="[
                    'px-30rpx py-15rpx rounded-8rpx text-26rpx',
                    selectedCategory === index
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600',
                  ]"
                >
                  {{ category }}
                </view>
              </view>
            </view>
            <div class="border-b-1px border-b-solid border-#DDDDDD wfull"></div>
            <!-- 文件列表 -->

            <view
              v-for="(file, index) in filteredFiles"
              :key="file.id"
              :class="[
                'flex items-center p-20rpx not-last:border-b-1px not-last:border-b-solid border-#DDDDDD',
                index !== filteredFiles.length - 1 ? 'border-b border-gray-200' : '',
              ]"
            >
              <!-- 文件图标 -->
              <view class="w-65rpx h-82rpx mr-20rpx flex justify-center items-center rounded-8rpx">
                <view
                  v-if="file.type === 'pdf'"
                  class="w-full h-full bg-red-500 rounded-8rpx flex flex-col justify-center items-center"
                >
                  <text class="text-white text-20rpx font-500">PDF</text>
                </view>
                <view
                  v-else
                  class="w-full h-full bg-gray-100 rounded-8rpx flex justify-center items-center"
                >
                  <view class="w-50rpx h-60rpx bg-blue-300 rounded-6rpx relative overflow-hidden">
                    <view
                      class="absolute top-8rpx left-8rpx right-8rpx h-4rpx bg-blue-500 rounded-2rpx"
                    ></view>
                    <view
                      class="absolute top-16rpx left-8rpx right-8rpx h-4rpx bg-blue-500 rounded-2rpx"
                    ></view>
                    <view
                      class="absolute top-24rpx left-8rpx right-8rpx h-4rpx bg-blue-500 rounded-2rpx"
                    ></view>
                  </view>
                </view>
              </view>

              <!-- 文件信息 -->
              <view class="flex-1">
                <text class="text-30rpx text-black block mb-10rpx">{{ file.name }}</text>
                <text class="text-24rpx text-gray-500">{{ file.time }}</text>
              </view>
            </view>
          </view>
          <!--       本地   单据上传-->

          <view
            v-if="selectedUploadType === 1"
            class="bg-#F2F5FA border-1px border-solid border-#DDDDDD h330rpx flex justify-evenly items-center"
          >
            <div
              class="w210rpx h158rpx flex flex-col justify-evenly items-center bg-#FFFFFF rounded-16rpx"
            >
              <i class="font_family icon-icon-xiangcedaoru text-#2563EB !text-60rpx"></i>
              <div>拍照</div>
            </div>
            <div
              class="w210rpx h158rpx flex flex-col justify-evenly items-center bg-#FFFFFF rounded-16rpx"
            >
              <i class="font_family icon-icon-paizhao text-#37C3C8 !text-60rpx"></i>
              <div>相册导入</div>
            </div>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script setup lang="js">
const indexa = ref(0)
const statusBarHeight = ref(0)
const datetimePickerRef = ref()
const dateRange = ref(['', Date.now()]) // For v-model
const startDate = ref('') // For display
const endDate = ref('') // For display
const pageslength = computed(() => getCurrentPages().length)

// 导入单据弹窗相关状态
const showImportModal = ref(false)
const selectedTemplate = ref(0) // 选择的模板索引
const selectedUploadType = ref(0) // 上传方式索引：0-线上文件，1-本地上传
const selectedCategory = ref(0) // 选择的分类索引

// 模板选项
const templateOptions = ['出口报关单', '进口报关单', '提货单', '其它单据']

// 文件分类
const fileCategories = ['分类1', '分类2']

// 模拟文件列表数据 - 匹配设计图显示
const fileList = ref([
  { id: 1, name: '文件1', type: 'pdf', time: '2025.05.01 12:23', category: 0 },
  { id: 2, name: '文件2', type: 'pdf', time: '2025.05.01 12:23', category: 0 },
  { id: 3, name: '文件1', type: 'pdf', time: '2025.05.01 12:23', category: 0 },
  { id: 4, name: '文件1', type: 'doc', time: '2025.05.01 12:23', category: 0 },
  { id: 5, name: '文件1', type: 'doc', time: '2025.05.01 12:23', category: 0 },
  { id: 6, name: '文件1', type: 'doc', time: '2025.05.01 12:23', category: 0 },
])

// 根据当前选择的分类过滤文件
const filteredFiles = computed(() => {
  return fileList.value.filter((file) => file.category === selectedCategory.value)
})

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

// 导入单据相关方法
const handleImport = () => {
  showImportModal.value = true
}

const closeImportModal = () => {
  showImportModal.value = false
}

const confirmImport = () => {
  // 确定导入逻辑
  console.log('确定导入', {
    template: templateOptions[selectedTemplate.value],
    uploadType: selectedUploadType.value,
    selectedFiles: filteredFiles.value,
  })
  showImportModal.value = false
}

const selectTemplate = (index) => {
  selectedTemplate.value = index
}

const selectUploadType = (index) => {
  selectedUploadType.value = index
}

const selectCategory = (index) => {
  selectedCategory.value = index
}

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight
})
</script>
<style lang="scss" scoped>
/* 这里只保留真正需要的自定义样式 */
</style>
