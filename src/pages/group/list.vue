<route lang="json5">
{
  style: {
    navigationBarTitleText: '我的签到群组',
  },
}
</route>

<template>
  <view class="page-container">
    <z-paging ref="paging" v-model="groupList" @query="queryList">
      <template #top>
        <!-- Header area if needed -->
      </template>

      <view class="p-20rpx">
        <uv-button type="primary" shape="circle" icon="plus" text="加入群组" @click="goToJoin"></uv-button>
      </view>

      <view class="list-container p-20rpx">
        <view
          v-for="(item, index) in groupList"
          :key="index"
          class="group-card bg-white p-30rpx rounded-16rpx mb-20rpx shadow-sm flex justify-between items-center"
          @click="goToDetail(item)"
        >
          <view>
            <view class="text-32rpx font-bold text-gray-800">{{ item.name }}</view>
            <view class="text-24rpx text-gray-500 mt-10rpx flex justify-between">
              <text>创建时间: {{ item.create_datetime?.split(' ')[0] }}</text>
              <text class="text-primary">{{ item.member_count || 1 }} 人</text>
            </view>
          </view>
          <uv-icon name="arrow-right" color="#999" size="16"></uv-icon>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { getGroupListAPI } from '@/service/signin'

const paging = ref(null)
const groupList = ref([])

const queryList = async (pageNo, pageSize) => {
  try {
    const res = await getGroupListAPI()
    // The API might return paging structure or list directly depending on viewset
    // CustomModelViewSet usually returns { code: 200, data: { results: [], ... } } or data: []
    // But get_queryset in view returns all, default pagination might be on.
    // Let's assume standard response structure.
    const list = res.data?.results || res.data || []
    paging.value.complete(list)
  } catch (e) {
    paging.value.complete(false)
  }
}

const goToJoin = () => {
  uni.navigateTo({ url: '/pages/group/join' })
}

const goToDetail = (item) => {
  uni.navigateTo({ url: `/pages/group/detail?id=${item.id}&name=${encodeURIComponent(item.name)}` })
}

// Refresh list when coming back
onShow(() => {
    if(paging.value) paging.value.reload()
})
</script>

<style lang="scss" scoped>
.page-container {
  height: 100vh;
  background-color: #f5f5f5;
}
.shadow-sm {
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}
</style>
