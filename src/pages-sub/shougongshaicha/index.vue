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
          @click="handleImport"
          class="w690rpx box-border h88rpx bg-[#ffffffff] rounded-16rpx flex flex-col justify-evenly color-[#2563EB] text-28rpx"
        >
          <div class="bg-[D8B14A6B] flex justify-center items-center">
            <i class="font_family icon-icon-daochu text-#2563EB text-20rpx mr1"></i>
            <div>导入单据</div>
          </div>
        </div>
      </div>
      <div class="h100rpx"></div>
      <!-- 原有的模板数据 -->
      <div
        v-for="(items, category) in displayItems"
        :key="category"
        class="w-690rpx bg-#fff rounded-16rpx m-30rpx p30rpx box-border"
      >
        <div class="not-first:mt24rpx text-28rpx">
          <div class="mb-20rpx">{{ category }}</div>
          <div v-for="(item, index) in items" :key="index">
            <div class="flex mb-10rpx justify-start items-center">
              <view class="w220rpx mr10rpx relative">
                <picker
                  :value="getSelectedIndex(category, item)"
                  :range="getPickerOptions(category)"
                  @change="onPickerChange($event, category, item, index)"
                >
                  <view
                    class="px-2 box-border rounded-8rpx h60rpx bg-#F4F6FA flex justify-between items-center color-[#333333]"
                  >
                    <view class="text-24rpx">{{ getSelectedValue(category, item) || item }}</view>
                    <i class="font_family icon-trangle-down text-20rpx"></i>
                  </view>
                </picker>
              </view>
              <input
                class="w320rpx mr10rpx rounded-8rpx h60rpx bg-#F4F6FA pl-2"
                type="text"
                :value="analysisDataMap[item] || ''"
                :placeholder="'请输入' + item"
              />
              <div
                class="mr10rpx h60rpx bg-#F4F6FA rounded-8rpx px2 flex justify-center items-center"
              >
                <i class="font_family mr10rpx icon-icon0shanchu text-20rpx"></i>
              </div>
            </div>
          </div>
          <div class="mt-20rpx color-[#999999] text-24rpx">提示:宁波杰腾科通讯设备有限公司R.F.</div>
        </div>
      </div>
      <!--      <div :style="{ height: footerHeight }"></div>-->
    </div>
    <template #footer>
      <div class="h-180rpx w-full bg-[#ffffffff] flex justify-evenly items-center pb-2 box-border">
        <div
          @click="handleSave"
          class="w-330rpx h-88rpx bg-[#F2F5FA] rounded-1 flex justify-center items-center cursor-pointer"
        >
          保存
        </div>
        <div
          @click="handleSearch"
          class="w-330rpx h-88rpx bg-[#2563EB] text-[#ffffff] rounded-1 flex justify-center items-center cursor-pointer"
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
                {{ template.templateName }}
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
              <scroll-view scroll-x="true" class="whitespace-nowrap">
                <view class="flex gap-[20rpx] inline-flex">
                  <view
                    v-for="(category, index) in fileCategories"
                    :key="index"
                    @click="selectCategory(index)"
                    :class="[
                      'px-30rpx py-15rpx rounded-8rpx text-26rpx flex-shrink-0',
                      selectedCategory === index
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600',
                    ]"
                  >
                    {{ category.name }}
                  </view>
                </view>
              </scroll-view>
            </view>
            <div class="border-b-1px border-b-solid border-#DDDDDD wfull"></div>
            <!-- 文件列表 -->

            <view
              v-for="(file, index) in filteredFiles"
              :key="file.id"
              @click="selectFile(file)"
              :class="[
                'flex items-center p-20rpx not-last:border-b-1px not-last:border-b-solid border-#DDDDDD cursor-pointer',
                index !== filteredFiles.length - 1 ? 'border-b border-gray-200' : '',
              ]"
            >
              <!-- 文件图标 -->
              <view class="w-65rpx h-82rpx mr-20rpx flex justify-center items-center rounded-8rpx">
                <i
                  v-if="file.type === 'pdf'"
                  class="font_family icon-pdf !text-80rpx text-#F05542"
                ></i>
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
                <text class="text-30rpx text-black block mb-10rpx truncate w-70vw">
                  {{ file.name }}
                </text>
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
              @click="importFromAlbum"
              class="w210rpx h158rpx flex flex-col justify-evenly items-center bg-#FFFFFF rounded-16rpx"
            >
              <i class="font_family icon-icon-xiangcedaoru text-#2563EB !text-60rpx"></i>
              <div class="text-24rpx">相册导入</div>
            </div>
            <div
              @click="takePhoto"
              class="w210rpx h158rpx flex flex-col justify-evenly items-center bg-#FFFFFF rounded-16rpx"
            >
              <i class="font_family icon-icon-paizhao text-#37C3C8 !text-60rpx"></i>
              <div class="text-24rpx">拍照</div>
            </div>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script setup lang="js">
import { http } from '@/utils/http'

const indexa = ref(0)
const statusBarHeight = ref(0)
const datetimePickerRef = ref()
const dateRange = ref(['', Date.now()]) // For v-model
const startDate = ref('') // For display
const endDate = ref('') // For display
const pageslength = computed(() => getCurrentPages().length)

// 接口获取的单据项模板数据
const itemTemplates = ref({})

// 存储从筛查页面传递过来的数据
const analysisData = ref([])

// 创建一个映射对象，方便根据key查找value
const analysisDataMap = ref({})

// 存储选中的下拉框值
const selectedValues = ref({})

// 存储从跳转页面传递过来的参数
const jumpParams = ref({
  documentId: '0',
  attachmentId: '',
  templateCode: 'yulurudan',
})

// 计算需要显示的表单项
const displayItems = computed(() => {
  const result = {}

  console.log('计算 displayItems, analysisDataMap 长度:', Object.keys(analysisDataMap.value).length)
  console.log('analysisDataMap 内容:', analysisDataMap.value)
  console.log('itemTemplates 内容:', itemTemplates.value)

  // 如果有筛查数据，显示所有有key的项（无论value是否为空）
  if (Object.keys(analysisDataMap.value).length > 0) {
    Object.keys(itemTemplates.value).forEach((category) => {
      const categoryItems = itemTemplates.value[category]
      const matchedItems = categoryItems.filter((item) =>
        Object.prototype.hasOwnProperty.call(analysisDataMap.value, item),
      )

      console.log(`类别 ${category} 匹配到的项目:`, matchedItems)

      if (matchedItems.length > 0) {
        result[category] = matchedItems
      }
    })
  } else {
    // 如果没有筛查数据，每个类别显示两条
    Object.keys(itemTemplates.value).forEach((category) => {
      const categoryItems = itemTemplates.value[category]
      if (categoryItems && categoryItems.length > 0) {
        // 每个类别显示前两条
        result[category] = categoryItems.slice(0, 2)
      }
    })
  }

  console.log('最终的 displayItems:', result)
  return result
})

// 导入单据弹窗相关状态
const showImportModal = ref(false)
const selectedTemplate = ref(0) // 选择的模板索引
const selectedUploadType = ref(0) // 上传方式索引：0-线上文件，1-本地上传
const selectedCategory = ref(0) // 选择的分类索引

// 模板选项
const templateOptions = ref([])

// 文件分类
const fileCategories = ref([])
const fileCategoriesLoading = ref(false)

// 文件列表数据
const fileList = ref([])
const fileListLoading = ref(false)
const fileListPagination = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0,
})

// 获取文件分类列表
const getFileCategories = async () => {
  try {
    fileCategoriesLoading.value = true

    const response = await http({
      url: '/tscc/attachment-directory/list',
      method: 'POST',
      data: {},
    })

    if (response.code === 200) {
      // 添加"全部"选项作为第一个选项
      const allCategory = {
        id: '0',
        name: '全部',
        fileCount: 0,
      }

      // 映射接口数据到模板需要的格式
      const categories = (response.data || []).map((item) => ({
        id: item.id,
        name: item.dirName,
        fileCount: item.fileCount,
      }))

      // 将"全部"选项放在最前面
      fileCategories.value = [allCategory, ...categories]
    } else {
      uni.showToast({
        title: response.msg || '获取文件分类失败',
        icon: 'error',
      })
    }
  } catch (error) {
    console.error('获取文件分类失败:', error)
    uni.showToast({
      title: '获取文件分类失败',
      icon: 'error',
    })
  } finally {
    fileCategoriesLoading.value = false
  }
}

// 获取文件列表
const getFileList = async (pageNum = 1, dirId = '0') => {
  try {
    fileListLoading.value = true

    const response = await http({
      url: '/tscc/document-attachment/list',
      method: 'POST',
      data: {
        pageNum,
        pageSize: fileListPagination.value.pageSize,
        dirId,
      },
    })

    if (response.code === 200) {
      // 映射接口数据到模板需要的格式
      fileList.value = (response.rows || []).map((item) => ({
        id: item.id,
        name: item.fileName,
        type: item.fileType,
        time: '2025.05.01 12:23', // 接口暂无时间字段，使用默认值
        category: 0, // 默认分类
        fileSize: item.fileSize,
        directoryId: item.directoryId,
      }))

      fileListPagination.value = {
        pageNum,
        pageSize: fileListPagination.value.pageSize,
        total: response.total || 0,
      }
    } else {
      uni.showToast({
        title: response.message || '获取文件列表失败',
        icon: 'error',
      })
    }
  } catch (error) {
    console.error('获取文件列表失败:', error)
    uni.showToast({
      title: '获取文件列表失败',
      icon: 'error',
    })
  } finally {
    fileListLoading.value = false
  }
}

// 直接显示文件列表，不需要过滤（因为接口已经根据dirId返回对应分类的文件）
const filteredFiles = computed(() => {
  return fileList.value
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
    template: templateOptions.value[selectedTemplate.value].templateName,
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

  // 获取选中分类的ID
  const selectedCategoryData = fileCategories.value[index]
  const dirId = selectedCategoryData?.id || '0'

  // 重新调用文件列表接口
  getFileList(1, dirId)
}

// 选中文件并调用文档解析接口
const selectFile = async (file) => {
  try {
    uni.showLoading({
      title: '解析中...',
    })

    // 调用文档解析接口，传递文件ID
    const response = await http({
      url: '/tscc/document/analysis',
      method: 'POST',
      data: {
        templateCode: templateOptions.value[selectedTemplate.value]?.templateCode || 'yulurudan',
        textFilter: false,
        attachmentId: file.id, // 使用文件ID而不是base64
      },
      timeout: 600000, // 设置超时时间为10分钟（600秒）
    })

    uni.hideLoading()

    if (response.code === 200) {
      uni.showToast({
        title: '解析成功',
        icon: 'success',
      })

      // 处理解析结果，更新页面数据
      if (response.data) {
        let parsedData = null
        const dataMap = {}

        console.log('完整的文件解析响应数据:', response)

        // 处理新的数据结构（按组分类的对象）
        // 检查 response.data 是否直接包含分组数据
        if (response.data && typeof response.data === 'object' && !response.data.analysisElement) {
          parsedData = response.data
          console.log('接收到的文件解析数据:', parsedData)

          // 遍历所有组，将数据扁平化到 dataMap
          Object.keys(parsedData).forEach((groupName) => {
            const groupData = parsedData[groupName]
            console.log(`处理文件解析组 ${groupName}:`, groupData)

            if (Array.isArray(groupData)) {
              // 处理数组类型的组（如商品信息组）
              groupData.forEach((item, index) => {
                Object.keys(item).forEach((key) => {
                  const mapKey = index > 0 ? `${key}${index + 1}` : key
                  dataMap[mapKey] = getDisplayValue(item[key] || '')
                  console.log(`文件解析数组项 ${mapKey}:`, dataMap[mapKey])
                })
              })
            } else if (typeof groupData === 'object') {
              // 处理对象类型的组
              Object.keys(groupData).forEach((key) => {
                dataMap[key] = getDisplayValue(groupData[key] || '')
                console.log(`文件解析对象项 ${key}:`, dataMap[key])
              })
            }
          })

          analysisDataMap.value = dataMap
          console.log('最终的文件解析 analysisDataMap:', analysisDataMap.value)
        }
        // 兼容旧的 analysisElement 格式
        else if (response.data.analysisElement) {
          const analysisElement = response.data.analysisElement
          let oldParsedData = analysisElement

          if (typeof analysisElement === 'string') {
            try {
              oldParsedData = JSON.parse(analysisElement)
            } catch (e) {
              oldParsedData = []
            }
          }

          if (Array.isArray(oldParsedData)) {
            analysisData.value = oldParsedData
            oldParsedData.forEach((item) => {
              if (item.key) {
                dataMap[item.key] = getDisplayValue(item.value || '')
              }
            })
            analysisDataMap.value = dataMap
            console.log('文件解析成功（旧格式），更新数据:', dataMap)
          }
        }

        // 更新跳转参数
        if (response.data.documentId) {
          jumpParams.value.documentId = response.data.documentId
        }
        if (response.data.attachmentId) {
          jumpParams.value.attachmentId = response.data.attachmentId
        }

        // 关闭导入弹窗
        showImportModal.value = false

        uni.showToast({
          title: '文件导入成功',
          icon: 'success',
        })
      }
    } else {
      uni.showToast({
        title: response.message || '解析失败',
        icon: 'error',
      })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('文件解析失败:', error)
    uni.showToast({
      title: '解析失败',
      icon: 'error',
    })
  }
}

// 处理显示值，如果是JSON字符串则解析并显示name
const getDisplayValue = (value) => {
  if (!value) return ''

  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    try {
      const parsed = JSON.parse(value)
      return parsed.name || value
    } catch (e) {
      return value
    }
  }
  return String(value)
}

// 获取下拉框选项
const getPickerOptions = (category) => {
  if (!itemTemplates.value[category]) return []
  return itemTemplates.value[category]
}

// 获取选中的索引
const getSelectedIndex = (category, item) => {
  const key = `${category}_${item}`
  const selectedValue = selectedValues.value[key]
  if (!selectedValue) return 0

  const options = getPickerOptions(category)
  const index = options.findIndex((option) => option === selectedValue)
  return index >= 0 ? index : 0
}

// 获取选中的值
const getSelectedValue = (category, item) => {
  const key = `${category}_${item}`
  return selectedValues.value[key] || item
}

// 下拉框选择事件
const onPickerChange = (event, category, item, index) => {
  const selectedIndex = event.detail.value
  const options = getPickerOptions(category)
  const selectedOption = options[selectedIndex]

  const key = `${category}_${item}`
  selectedValues.value[key] = selectedOption

  console.log('选择了：', selectedOption, '分类：', category, '项目：', item)
}

// 通用的保存函数
const saveDocument = async (opType, loadingTitle = '保存中...') => {
  try {
    // 构建筛查项目列表
    const itemParamList = []

    // 遍历所有显示的表单项，收集用户输入的数据
    Object.keys(displayItems.value).forEach((category) => {
      const items = displayItems.value[category]
      items.forEach((item) => {
        const key = `${category}_${item}`
        const selectedValue = selectedValues.value[key] || item

        // 获取对应的输入框值（这里需要根据实际的输入框实现来获取值）
        // 暂时使用筛查数据中的值或空字符串
        const inputValue = analysisDataMap.value[item] || ''

        itemParamList.push({
          key: selectedValue,
          value: inputValue,
        })
      })
    })

    // 构建请求参数
    const requestData = {
      documentId: jumpParams.value.documentId,
      attachmentId: jumpParams.value.attachmentId,
      templateCode: jumpParams.value.templateCode,
      itemParamList,
      type: 2, // 类型，固定为 2
      opType, // 操作类型，1 仅保存，2 保存并且筛查
    }

    console.log('准备发送的数据:', requestData)

    // 显示加载提示
    uni.showLoading({
      title: loadingTitle,
    })

    // 调用保存接口
    const response = await http({
      url: '/tscc/document/save',
      method: 'POST',
      data: requestData,
    })

    uni.hideLoading()

    if (response.code === 200) {
      uni.showToast({
        title: opType === 1 ? '保存成功' : '筛查成功',
        icon: 'success',
      })

      // 根据操作类型执行不同的后续操作
      if (opType === 2) {
        // 搜索操作成功后跳转到筛查结果页面，传递返回的结果数据
        setTimeout(() => {
          // 将筛查结果存储到本地存储中
          uni.setStorageSync('searchResult', {
            resultData: response.data || response,
            searchParams: requestData,
          })

          // 跳转到筛查结果页面
          uni.navigateTo({
            url: '/pages-sub/shaichajieguo/index',
          })
        }, 1500)
      }
    } else {
      uni.showToast({
        title: response.message || '保存失败',
        icon: 'error',
      })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('保存失败:', error)
    uni.showToast({
      title: '保存失败，请重试',
      icon: 'error',
    })
  }
}

// 保存按钮点击事件 - 仅保存
const handleSave = async () => {
  await saveDocument(1, '保存中...')
}

// 搜索按钮点击事件 - 保存并筛查
const handleSearch = async () => {
  await saveDocument(2, '筛查中...')
}

// 将图片文件转换为base64编码
const imageToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    uni.getFileSystemManager().readFile({
      filePath,
      encoding: 'base64',
      success: (res) => {
        // 获取文件扩展名来确定MIME类型
        const extension = filePath.split('.').pop().toLowerCase()
        let mimeType = 'image/jpeg'
        if (extension === 'png') {
          mimeType = 'image/png'
        } else if (extension === 'gif') {
          mimeType = 'image/gif'
        } else if (extension === 'webp') {
          mimeType = 'image/webp'
        }
        // 返回带有data URL前缀的完整base64编码
        const base64String = `data:${mimeType};base64,${res.data}`
        resolve(base64String)
      },
      fail: (err) => {
        console.error('转换base64失败:', err)
        reject(err)
      },
    })
  })
}

// 调用文档解析接口
const analyzeDocument = async (imageBase64) => {
  try {
    uni.showLoading({
      title: '解析中...',
    })

    // 将base64格式化为数组格式，保留完整的data URL前缀
    const imageBase64Array = [imageBase64]

    const response = await http({
      url: '/tscc/document/analysis',
      method: 'POST',
      data: {
        templateCode: templateOptions.value[selectedTemplate.value]?.templateCode || 'yulurudan',
        textFilter: false,
        imageBase64: imageBase64Array,
      },
      timeout: 600000, // 设置超时时间为10分钟（600秒）
    })

    uni.hideLoading()

    if (response.code === 200) {
      uni.showToast({
        title: '解析成功',
        icon: 'success',
      })

      // 处理解析结果，更新页面数据
      if (response.data) {
        let parsedData = null
        const dataMap = {}

        console.log('完整的响应数据:', response)

        // 处理新的数据结构（按组分类的对象）
        // 检查 response.data 是否直接包含分组数据
        if (response.data && typeof response.data === 'object' && !response.data.analysisElement) {
          parsedData = response.data
          console.log('接收到的解析数据:', parsedData)

          // 遍历所有组，将数据扁平化到 dataMap
          Object.keys(parsedData).forEach((groupName) => {
            const groupData = parsedData[groupName]
            console.log(`处理组 ${groupName}:`, groupData)

            if (Array.isArray(groupData)) {
              // 处理数组类型的组（如商品信息组）
              groupData.forEach((item, index) => {
                Object.keys(item).forEach((key) => {
                  const mapKey = index > 0 ? `${key}${index + 1}` : key
                  dataMap[mapKey] = getDisplayValue(item[key] || '')
                  console.log(`数组项 ${mapKey}:`, dataMap[mapKey])
                })
              })
            } else if (typeof groupData === 'object') {
              // 处理对象类型的组
              Object.keys(groupData).forEach((key) => {
                dataMap[key] = getDisplayValue(groupData[key] || '')
                console.log(`对象项 ${key}:`, dataMap[key])
              })
            }
          })

          analysisDataMap.value = dataMap
          console.log('最终的 analysisDataMap:', analysisDataMap.value)
          console.log('当前 itemTemplates:', itemTemplates.value)
        }
        // 兼容旧的 analysisElement 格式
        else if (response.data.analysisElement) {
          const analysisElement = response.data.analysisElement
          let oldParsedData = analysisElement

          if (typeof analysisElement === 'string') {
            try {
              oldParsedData = JSON.parse(analysisElement)
            } catch (e) {
              oldParsedData = []
            }
          }

          if (Array.isArray(oldParsedData)) {
            analysisData.value = oldParsedData
            oldParsedData.forEach((item) => {
              if (item.key) {
                dataMap[item.key] = getDisplayValue(item.value || '')
              }
            })
            analysisDataMap.value = dataMap
            console.log('文档解析成功（旧格式），更新数据:', dataMap)
          }
        }

        // 更新跳转参数
        if (response.data.documentId) {
          jumpParams.value.documentId = response.data.documentId
        }
        if (response.data.attachmentId) {
          jumpParams.value.attachmentId = response.data.attachmentId
        }

        // 关闭导入弹窗
        showImportModal.value = false

        uni.showToast({
          title: '图片导入成功',
          icon: 'success',
        })
      }
    } else {
      uni.showToast({
        title: response.message || '解析失败',
        icon: 'error',
      })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('文档解析失败:', error)
    uni.showToast({
      title: '解析失败，请重试',
      icon: 'error',
    })
  }
}

// 处理图片选择和解析
const handleImageAndAnalyze = async (filePath) => {
  try {
    // 将图片转换为base64
    const base64String = await imageToBase64(filePath)
    // 调用文档解析接口
    await analyzeDocument(base64String)
  } catch (error) {
    console.error('处理图片失败:', error)
    uni.showToast({
      title: '处理图片失败',
      icon: 'error',
    })
  }
}

// 相册导入功能
const importFromAlbum = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['album'],
    success: (result) => {
      console.log('选择相册图片成功', result.tempFilePaths[0])
      handleImageAndAnalyze(result.tempFilePaths[0])
    },
    fail: (err) => {
      console.log('选择相册图片失败', err)
      uni.showToast({
        title: '选择图片失败',
        icon: 'error',
      })
    },
  })
}

// 拍照功能
const takePhoto = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['camera'],
    success: (result) => {
      console.log('拍照成功', result.tempFilePaths[0])
      handleImageAndAnalyze(result.tempFilePaths[0])
    },
    fail: (err) => {
      console.log('拍照失败', err)
      uni.showToast({
        title: '拍照失败',
        icon: 'error',
      })
    },
  })
}

const fetchItemTemplates = async () => {
  try {
    const res = await http({
      url: '/tscc/document/item-template-list',
      method: 'POST',
      data: {
        templateType: 'DOCUMENT',
      },
    })
    if (res.code === 200 && res.data) {
      itemTemplates.value = res.data
    }
  } catch (error) {
    console.error('获取单据项模板失败', error)
  }
}

const fetchTemplateOptions = async () => {
  try {
    const res = await http({
      url: '/tscc/manage/document-template/all-list',
      method: 'POST',
      data: {
        templateType: 'DOCUMENT',
      },
    })
    if (res.code === 200 && res.data) {
      templateOptions.value = res.data
    }
  } catch (error) {
    console.error('获取模板选项失败', error)
  }
}

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight

  // 获取文件分类列表
  getFileCategories()

  // 获取文件列表 - 先获取所有文件（dirId为"0"）
  getFileList(1, '0')

  // 获取从筛查页面传递的数据
  const jumpData = uni.getStorageSync('jumpData')
  if (jumpData) {
    console.log('获取到的跳转数据：', jumpData)

    const analysisElement = jumpData.analysisElement || {}
    console.log('analysisElement 数据：', analysisElement)
    console.log('documentId：', jumpData.documentId)
    console.log('attachmentId：', jumpData.attachmentId)
    let parsedData = analysisElement
    if (typeof analysisElement === 'string') {
      try {
        parsedData = JSON.parse(analysisElement)
      } catch (e) {
        parsedData = []
      }
    }
    if (Array.isArray(parsedData)) {
      analysisData.value = parsedData
      const dataMap = {}
      parsedData.forEach((item) => {
        if (item.key) {
          dataMap[item.key] = getDisplayValue(item.value || '')
        }
      })
      analysisDataMap.value = dataMap
    } else {
      analysisData.value = []
      analysisDataMap.value = {}
    }

    console.log('跳转参数:', jumpParams.value)
    uni.removeStorageSync('jumpData')
  } else {
    console.log('未获取到跳转数据')
    analysisData.value = []
  }

  fetchTemplateOptions()
  fetchItemTemplates()
})
</script>
<style lang="scss" scoped>
/* 这里只保留真正需要的自定义样式 */
</style>
