<route lang="json5">
{
  style: {
    navigationBarTitleText: '打卡日历',
  },
}
</route>

<template>
  <view class="calendar-page bg-[#f8f9fd] min-h-100vh flex flex-col box-border">
    <!-- Header Area -->
    <view class="pt-30rpx pb-20rpx px-30rpx bg-[#f8f9fd] sticky top-0 z-20">
      <!-- Month Navigator -->
      <view class="flex items-center justify-between mb-30rpx px-10rpx">
        <view class="flex flex-col">
          <text class="text-24rpx text-gray-400 mb-6rpx pl-4rpx">当前月份</text>
          <view class="flex items-center">
            <text class="text-48rpx font-800 text-[#333] tracking-tight mr-20rpx leading-none">
              {{ currentYear }}.{{ String(currentMonth).padStart(2, '0') }}
            </text>
            <view
              class="flex bg-white rounded-full p-6rpx shadow-sm border border-gray-100 ml-10rpx"
            >
              <view
                class="w-50rpx h-50rpx flex items-center justify-center rounded-full hover:bg-gray-50 active:scale-95 transition-all"
                @click="prevMonth"
              >
                <view class="i-carbon-chevron-left text-32rpx text-gray-600" />
              </view>
              <view class="w-2rpx h-24rpx bg-gray-100 my-auto mx-4rpx"></view>
              <view
                class="w-50rpx h-50rpx flex items-center justify-center rounded-full hover:bg-gray-50 active:scale-95 transition-all"
                @click="nextMonth"
              >
                <view class="i-carbon-chevron-right text-32rpx text-gray-600" />
              </view>
            </view>
          </view>
        </view>

        <!-- Today Button -->
        <view
          class="px-24rpx h-70rpx rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center active:scale-95 transition-all text-[#333]"
          @click="goToToday"
        >
          <text class="text-26rpx font-600">回到今天</text>
        </view>
      </view>

      <!-- Group Selector (Dropdown) -->
      <view class="relative px-10rpx mb-20rpx z-[100]">
        <!-- Trigger Button -->
        <view
          class="flex items-center justify-between bg-white px-30rpx py-20rpx rounded-20rpx border border-gray-100 shadow-sm active:bg-gray-50 transition-all"
          @click="isDropdownOpen = !isDropdownOpen"
        >
          <view class="flex items-center flex-1 overflow-hidden mr-20rpx">
            <view class="i-carbon-filter text-32rpx text-gray-400 mr-12rpx flex-shrink-0" />
            <text class="text-28rpx text-[#333] font-600 truncate">
              {{
                isAllSelected
                  ? '全选'
                  : selectedGroupIds.length === 0
                    ? '未选择'
                    : `已选 ${selectedGroupIds.length} 个群组`
              }}
            </text>
          </view>
          <view
            class="i-carbon-chevron-down text-32rpx text-gray-400 transition-transform duration-300"
            :class="isDropdownOpen ? 'rotate-180' : ''"
          />
        </view>

        <!-- Dropdown Menu -->
        <view
          v-if="isDropdownOpen"
          class="fixed top-[230rpx] left-40rpx right-40rpx bg-white rounded-24rpx shadow-2xl border border-gray-100 overflow-hidden z-[9999] origin-top animate-dropdown-in"
        >
          <scroll-view scroll-y class="max-h-500rpx">
            <!-- Select All Option -->
            <view
              class="flex items-center justify-between px-30rpx py-24rpx border-b border-gray-50 active:bg-gray-50 transition-colors"
              @tap="selectAll"
            >
              <text
                class="text-28rpx"
                :class="isAllSelected ? 'text-pink-500 font-bold' : 'text-[#333]'"
              >
                全选
              </text>
              <view v-if="isAllSelected" class="i-carbon-checkmark text-pink-500 text-32rpx" />
            </view>

            <!-- Group Options -->
            <view
              v-for="group in groupList"
              :key="group.id"
              class="flex items-center justify-between px-30rpx py-24rpx border-b border-gray-50 active:bg-gray-50 transition-colors"
              @tap="toggleGroup(group.id)"
            >
              <view class="flex items-center">
                <view
                  class="w-16rpx h-16rpx rounded-full mr-20rpx"
                  :style="{ background: getGroupColor(group) }"
                ></view>
                <text
                  class="text-28rpx"
                  :class="
                    selectedGroupIds.includes(group.id) ? 'text-pink-500 font-bold' : 'text-[#333]'
                  "
                >
                  {{ group.name }}
                </text>
              </view>
              <view
                v-if="selectedGroupIds.includes(group.id)"
                class="i-carbon-checkmark text-pink-500 text-32rpx"
              />
            </view>
          </scroll-view>

          <!-- Footer Actions -->
          <view class="p-20rpx bg-gray-50 flex justify-end">
            <view
              class="px-40rpx py-16rpx bg-[#333] text-white rounded-full text-26rpx font-600 active:scale-95 transition-all shadow-md"
              @tap="confirmSelection"
            >
              确定
            </view>
          </view>
        </view>

        <!-- Overlay -->
        <view
          v-if="isDropdownOpen"
          class="fixed inset-0 bg-black/20 z-[9998] backdrop-blur-sm animate-fade-in"
          @tap="closeDropdown"
          @touchmove.stop.prevent
        ></view>
      </view>
    </view>

    <!-- Calendar Card -->
    <view class="flex-1 px-30rpx pb-safe">
      <view
        class="bg-white rounded-32rpx shadow-[0_8rpx_40rpx_rgb(0,0,0,0.03)] border border-gray-50 p-30rpx min-h-600rpx relative overflow-hidden"
      >
        <!-- Decorative bg blur -->
        <view
          class="absolute -top-40rpx -right-40rpx w-200rpx h-200rpx bg-pink-50 rounded-full blur-3xl opacity-60 pointer-events-none"
        ></view>
        <view
          class="absolute bottom-0 left-0 w-150rpx h-150rpx bg-blue-50 rounded-full blur-2xl opacity-40 pointer-events-none"
        ></view>

        <!-- Weekday Headers -->
        <view class="grid grid-cols-7 mb-30rpx relative z-10">
          <view
            v-for="day in weekDays"
            :key="day"
            class="text-center text-24rpx text-gray-400 font-600"
          >
            {{ day }}
          </view>
        </view>

        <!-- Days Grid -->
        <view class="grid grid-cols-7 gap-y-20rpx relative z-10 text-center">
          <!-- Empty slots -->
          <view v-for="n in emptySlots" :key="'empty-' + n" class="h-100rpx"></view>

          <!-- Actual Days -->
          <view
            v-for="day in daysInMonth"
            :key="day.dateStr"
            class="flex flex-col items-center h-100rpx relative"
          >
            <!-- Day Number Circle -->
            <view
              class="w-64rpx h-64rpx flex items-center justify-center rounded-20rpx mb-[12px] transition-all duration-300"
              :class="[
                isToday(day.dateStr)
                  ? 'bg-pink-400 text-white shadow-lg shadow-pink-200 scale-105'
                  : 'text-[#333]',
                hasCheckIn(day.dateStr) && !isToday(day.dateStr) ? 'bg-gray-50' : '',
              ]"
            >
              <text class="text-28rpx font-600">{{ day.dayNum }}</text>
            </view>

            <!-- Status Dots (可多行显示) -->
            <view
              class="flex flex-wrap justify-center items-center gap-[3px] min-h-[12px] px-[2px] pb-[4px]"
            >
              <view
                v-for="(status, idx) in getDayStatuses(day.dateStr)"
                :key="idx"
                class="w-[5px] h-[5px] rounded-full transition-all"
                :style="getDotStyle(status)"
              ></view>
            </view>
          </view>
        </view>
      </view>

      <!-- Footer Legend -->
      <view
        class="mt-40rpx flex items-center justify-center space-x-40rpx text-24rpx text-gray-400"
      >
        <view class="flex items-center">
          <view class="w-12rpx h-12rpx rounded-full bg-pink-400 mr-10rpx shadow-sm"></view>
          <text>已打卡</text>
        </view>
        <view class="flex items-center">
          <view class="w-12rpx h-12rpx rounded-full bg-blue-400 mr-10rpx shadow-sm"></view>
          <text>友情</text>
        </view>
        <view class="flex items-center">
          <view class="w-12rpx h-12rpx rounded-full bg-gray-200 mr-10rpx"></view>
          <text>未完成</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'
import { getGroupListAPI, getCheckInCalendarAPI } from '@/service/signin'
import { onLoad } from '@dcloudio/uni-app'

const currentYear = ref(dayjs().year())
const currentMonth = ref(dayjs().month() + 1)
const selectedGroupIds = ref([])
const isDropdownOpen = ref(false)
const groupList = ref([])
const calendarData = ref({}) // { "2026-02-01": [ { group_id, type, is_complete } ] }

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const emptySlots = computed(() => {
  const firstDay = dayjs(`${currentYear.value}-${currentMonth.value}-01`).day() // 0 is Sunday
  return firstDay
})

const daysInMonth = computed(() => {
  const days = dayjs(`${currentYear.value}-${currentMonth.value}-01`).daysInMonth()
  const arr = []
  for (let i = 1; i <= days; i++) {
    arr.push({
      dayNum: i,
      dateStr: dayjs(`${currentYear.value}-${currentMonth.value}-${i}`).format('YYYY-MM-DD'),
    })
  }
  return arr
})

onLoad(async () => {
  await fetchGroups()
  fetchCalendarData()
})

const fetchGroups = async () => {
  try {
    const res = await getGroupListAPI()
    groupList.value = res.data?.results || res.data || []
    // 默认全选所有群组
    selectedGroupIds.value = groupList.value.map((g) => g.id)
  } catch (e) {
    console.error(e)
  }
}

const fetchCalendarData = async () => {
  try {
    const res = await getCheckInCalendarAPI(currentYear.value, currentMonth.value)
    calendarData.value = res.data || {}
  } catch (e) {
    console.error(e)
  }
}

const prevMonth = () => {
  let m = currentMonth.value - 1
  let y = currentYear.value
  if (m < 1) {
    m = 12
    y--
  }
  currentYear.value = y
  currentMonth.value = m
  fetchCalendarData()
}

const nextMonth = () => {
  let m = currentMonth.value + 1
  let y = currentYear.value
  if (m > 12) {
    m = 1
    y++
  }
  currentYear.value = y
  currentMonth.value = m
  fetchCalendarData()
}

const goToToday = () => {
  const now = dayjs()
  currentYear.value = now.year()
  currentMonth.value = now.month() + 1
  fetchCalendarData()
}

const isToday = (dateStr) => {
  return dateStr === dayjs().format('YYYY-MM-DD')
}

const isCurrentMonth = (dateStr) => {
  return true
}

// 核心逻辑:获取某天的显示状态 (点)
const getDayStatuses = (dateStr) => {
  const dayRecords = calendarData.value[dateStr] || []

  // 获取要显示的分组列表
  let targetGroups = groupList.value
  if (selectedGroupIds.value.length > 0) {
    targetGroups = targetGroups.filter((g) => selectedGroupIds.value.includes(g.id))
  }

  // 为每个选中的分组生成状态点
  return targetGroups.map((group) => {
    // 查找该分组在这天的打卡记录
    const record = dayRecords.find((r) => r.group_id === group.id)

    if (record) {
      // 有记录:根据完成状态和类型显示颜色
      let color = '#ddd' // 默认灰色(未完成)
      if (record.is_complete) {
        if (record.type === 10)
          color = '#f472b6' // 爱情 pink
        else if (record.type === 20)
          color = '#60a5fa' // 友情 blue
        else if (record.type === 30) color = '#34d399' // 个人 green
      }
      return { color, is_complete: record.is_complete }
    } else {
      // 没有记录:显示灰色点(未打卡)
      return { color: '#e5e7eb', is_complete: false }
    }
  })
}

const toggleGroup = (id) => {
  const idx = selectedGroupIds.value.indexOf(id)
  if (idx > -1) {
    selectedGroupIds.value.splice(idx, 1)
  } else {
    selectedGroupIds.value.push(id)
  }
}

const getDotStyle = (status) => {
  return `background-color: ${status.color};`
}

const hasCheckIn = (dateStr) => {
  const statuses = getDayStatuses(dateStr)
  return statuses.length > 0
}

const getGroupColor = (group) => {
  if (group.group_type === 10) return '#f472b6' // Pink
  if (group.group_type === 20) return '#60a5fa' // Blue
  return '#34d399' // Green
}

// 计算是否全选
const isAllSelected = computed(() => {
  if (groupList.value.length === 0) return false
  return selectedGroupIds.value.length === groupList.value.length
})

// 全选所有群组
const selectAll = () => {
  selectedGroupIds.value = groupList.value.map((g) => g.id)
}

// 清空选择(显示全部)
const selectNone = () => {
  selectedGroupIds.value = []
}

const confirmSelection = () => {
  console.log('confirmSelection called, closing dropdown')
  isDropdownOpen.value = false
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}
</script>

<style scoped>
/* Hidden scrollbar */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  appearance: none;
  background: transparent;
}
/* Dropdown Animation */
@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: scaleY(0.9) translateY(-10px);
  }

  to {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
}

.animate-dropdown-in {
  animation: dropdown-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
/* Overlay Fade */
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease;
}
</style>
