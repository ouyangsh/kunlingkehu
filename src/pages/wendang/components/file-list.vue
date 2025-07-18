<template>
  <view class="file-list">
    <template v-for="(item, index) in fileList" :key="'file-' + index">
      <view class="block_11 flex-row justify-between" @click="handleFileClick(item)">
        <view class="image-text_34 flex-row justify-between">
          <view class="image-wrapper_1 flex-col">
            <image class="image_6" referrerpolicy="no-referrer" :src="item.icon" />
          </view>
          <view class="text-group_36 flex-col">
            <text class="text_15">{{ item.name }}</text>
            <text class="text_16">{{ item.date }}</text>
          </view>
        </view>
        <view
          class="block_1 flex-col self-center"
          :class="{ selected: item.selected, 'opacity-0': !isShowIcon }"
        ></view>
      </view>
    </template>
  </view>
</template>

<script setup>
const props = defineProps({
  isShowIcon: {
    type: Boolean,
    default: true,
  },
  fileList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['fileClick'])

const handleFileClick = (file) => {
  emit('fileClick', file)
}
</script>

<style lang="scss" scoped>
@import '../../../static/common/common.css';
/* 文件样式 */
.file-list {
  .block_11 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 690rpx;
    margin-top: 20rpx;
  }

  .image-text_34 {
    display: flex;
    flex-direction: row;
    width: 548rpx;
  }

  .image-wrapper_1 {
    display: flex;
    flex-direction: column;
    padding: 20rpx 2rpx;
    background-color: rgb(255 255 255 / 100%);
    border: 1px solid rgb(221 221 221 / 100%);
    border-radius: 8px;
  }

  .image_6 {
    width: 112rpx;
    height: 76rpx;
  }

  .text-group_36 {
    display: flex;
    flex-direction: column;
    margin: 24rpx 0;
  }

  .text_15 {
    font-family: PingFangSC-Medium;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 28rpx;
    color: rgb(25 33 61 / 100%);
    text-align: left;
    white-space: nowrap;
  }

  .text_16 {
    margin-top: 16rpx;
    font-size: 24rpx;
    line-height: 24rpx;
    color: rgb(102 102 102 / 100%);
    text-align: left;
    white-space: nowrap;
  }

  .block_1 {
    width: 32rpx;
    height: 32rpx;
    background-color: rgb(255 255 255 / 100%);
    border: 2px solid rgb(204 204 204 / 100%);
    border-radius: 4px;
  }

  .block_1.selected {
    background-color: rgb(37 99 235 / 100%);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 8l3 3l7-7'/%3e%3c/svg%3e");
    border: 2px solid rgb(37 99 235 / 100%);
  }
}
</style>
