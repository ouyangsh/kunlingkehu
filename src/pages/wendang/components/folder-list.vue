<template>
  <view class="folder-list">
    <template v-for="(item, index) in folderList" :key="'folder-' + index">
      <view
        class="section_3 flex-row"
        :class="{
          section_4: index === 1,
          section_5: index === 2,
          'opacity-50': item.selected && isAllSelected,
          'pointer-events-none': item.selected && isAllSelected,
        }"
        @click="handleFolderClick(item)"
      >
        <i class="font_family icon-icon-wenjianjia text-#37C3C8 !text-70rpx"></i>
        <view class="text-group_33 flex-col">
          <text class="text_6">{{ item.name }}</text>
          <div class="flex">
            <text class="text_7">{{ item.date }}</text>
            <i class="font_family icon-icon-wenjian text-60rpx !text-25rpx mt-16rpx ml-2 mr-1"></i>
            <text class="text-24rpx mt-12rpx">{{ item.count }}</text>
          </div>
        </view>

        <i class="font_family icon-sangedian text-60rpx !text-25rpx mt-20rpx"></i>
      </view>
    </template>
  </view>
</template>

<script setup>
const props = defineProps({
  isAllSelected: {
    type: Boolean,
    default: false,
  },
  folderList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['folderClick'])

const handleFolderClick = (folder) => {
  // 如果文件夹已选中且处于全选状态，则不响应点击
  if (folder.selected && props.isAllSelected) {
    return
  }
  emit('folderClick', folder)
}
</script>

<style lang="scss" scoped>
@import '../../../static/common/common.css';
/* 文件夹样式 */
.folder-list {
  .section_3,
  .section_4,
  .section_5 {
    display: flex;
    flex-direction: row;
    padding: 21rpx 20rpx 18rpx 30rpx;
    margin-bottom: 16rpx;
    background-color: rgb(244 246 250 / 100%);
    border-radius: 8px;
  }

  .image_3 {
    width: 68rpx;
    height: 68rpx;
    margin-bottom: 3rpx;
  }

  .text-group_33 {
    flex: 1;
    margin: 1rpx 0 2rpx 20rpx;
  }

  .text_6 {
    margin-right: 146rpx;
    font-family: PingFangSC-Medium;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 28rpx;
    color: rgb(25 33 61 / 100%);
    text-align: left;
    white-space: nowrap;
  }

  .text_7 {
    margin-top: 16rpx;
    font-size: 24rpx;
    line-height: 24rpx;
    color: rgb(102 102 102 / 100%);
    text-align: left;
    white-space: nowrap;
  }

  .label_6 {
    width: 24rpx;
    height: 24rpx;
    margin: 47rpx 0 0 24rpx;
  }

  .text_8 {
    margin: 47rpx 0 0 4rpx;
    font-size: 24rpx;
    line-height: 24rpx;
    color: rgb(102 102 102 / 100%);
    text-align: left;
    white-space: nowrap;
  }

  .label_7 {
    width: 32rpx;
    height: 32rpx;
    margin: 20rpx 0 19rpx 251rpx;
  }

  .section_4 {
    margin-top: 16rpx;
  }

  .section_5 {
    margin-top: 16rpx;
  }
}
</style>
