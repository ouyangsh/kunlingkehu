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
             <view class="flex bg-white rounded-full p-6rpx shadow-sm border border-gray-100 ml-10rpx">
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

      <!-- Group Tabs (Chips) -->
      <scroll-view scroll-x class="w-full whitespace-nowrap" :show-scrollbar="false">
        <view class="flex items-center space-x-20rpx py-10rpx pl-4rpx">
          <view
            class="px-32rpx py-14rpx rounded-full text-26rpx font-700 transition-all border flex items-center flex-shrink-0"
            :class="selectedGroupId === null 
              ? 'bg-[#333] text-white border-[#333] shadow-lg shadow-gray-200' 
              : 'bg-white text-gray-500 border-gray-100 shadow-sm'"
            @click="selectedGroupId = null"
          >
            全部
          </view>
          <view
            v-for="group in groupList"
            :key="group.id"
            class="px-32rpx py-14rpx rounded-full text-26rpx font-700 transition-all border flex items-center flex-shrink-0"
            :class="selectedGroupId === group.id 
              ? 'bg-pink-50 border-pink-200 text-pink-500 shadow-sm' 
              : 'bg-white text-gray-500 border-gray-100 shadow-sm'"
            @click="selectedGroupId = group.id"
          >
            <!-- Badge dot -->
            <view 
              class="w-12rpx h-12rpx rounded-full mr-12rpx shadow-sm" 
              :style="{ background: getGroupColor(group) }"
            ></view>
            {{ group.name }}
          </view>
          <!-- Padding for scroll -->
          <view class="w-10rpx h-1rpx"></view>
        </view>
      </scroll-view>
    </view>

    <!-- Calendar Card -->
    <view class="flex-1 px-30rpx pb-safe">
      <view class="bg-white rounded-32rpx shadow-[0_8rpx_40rpx_rgb(0,0,0,0.03)] border border-gray-50 p-30rpx min-h-600rpx relative overflow-hidden">
        
        <!-- Decorative bg blur -->
        <view class="absolute -top-40rpx -right-40rpx w-200rpx h-200rpx bg-pink-50 rounded-full blur-3xl opacity-60 pointer-events-none"></view>
        <view class="absolute bottom-0 left-0 w-150rpx h-150rpx bg-blue-50 rounded-full blur-2xl opacity-40 pointer-events-none"></view>

        <!-- Weekday Headers -->
        <view class="grid grid-cols-7 mb-30rpx relative z-10">
          <view v-for="day in weekDays" :key="day" class="text-center text-24rpx text-gray-400 font-600">
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
                  class="w-64rpx h-64rpx flex items-center justify-center rounded-20rpx mb-6rpx transition-all duration-300"
                  :class="[
                     isToday(day.dateStr) ? 'bg-pink-400 text-white shadow-lg shadow-pink-200 scale-105' : 'text-[#333]',
                     hasCheckIn(day.dateStr) && !isToday(day.dateStr) ? 'bg-gray-50' : ''
                  ]"
              >
                  <text class="text-28rpx font-600">{{ day.dayNum }}</text>
              </view>

              <!-- Status Dots (Max 3 to avoid clutter) -->
              <view class="flex justify-center space-x-4rpx h-8rpx">
                  <view 
                      v-for="(status, idx) in getDayStatuses(day.dateStr).slice(0, 3)" 
                      :key="idx"
                      class="w-8rpx h-8rpx rounded-full transition-all"
                      :style="getDotStyle(status)"
                  ></view>
                  <!-- Overflow indicator if more than 3 -->
                  <view v-if="getDayStatuses(day.dateStr).length > 3" class="w-8rpx h-8rpx rounded-full bg-gray-300"></view>
              </view>
          </view>
        </view>
      </view>
      
      <!-- Footer Legend -->
      <view class="mt-40rpx flex items-center justify-center space-x-40rpx text-24rpx text-gray-400">
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
const selectedGroupId = ref(null)
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
            dateStr: dayjs(`${currentYear.value}-${currentMonth.value}-${i}`).format('YYYY-MM-DD')
        })
    }
    return arr
})

onLoad(() => {
    fetchGroups()
    fetchCalendarData()
})

const fetchGroups = async () => {
    try {
        const res = await getGroupListAPI()
        groupList.value = res.data?.results || res.data || []
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

// 核心逻辑：获取某天的显示状态 (点)
const getDayStatuses = (dateStr) => {
    const dayData = calendarData.value[dateStr] || []
    
    // 如果该天没有数据 -> 空
    if (dayData.length === 0) return []

    // 过滤：如果选了特定分组
    let target = dayData
    if (selectedGroupId.value) {
        target = dayData.filter(item => item.group_id === selectedGroupId.value)
    }

    // 映射为颜色/状态
    return target.map(item => {
        let color = '#ddd' // default gray
        if (item.is_complete) {
            // 根据 group_type 给颜色
            if (item.type === 10) color = '#f472b6' // 爱情 pink
            else if (item.type === 20) color = '#60a5fa' // 友情 blue
            else color = '#34d399' // 个人 green
        }
        return { color, is_complete: item.is_complete }
    })
}

const getDotStyle = (status) => {
    return {
        background: status.color
    }
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

</script>

<style scoped>
/* Hidden scrollbar */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
</style>
