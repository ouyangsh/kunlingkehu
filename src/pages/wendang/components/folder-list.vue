<template>
  <view class="folder-list">
    <template v-for="(item, index) in folderList" :key="'folder-' + index">
      <view
        class="section_3 flex-row"
        :class="{
          section_4: index === 1,
          section_5: index === 2,
          'opacity-50': item.selected && isAllSelected,
        }"
        @click="handleFolderClick(item)"
      >
        <image class="image_3" referrerpolicy="no-referrer" :src="item.icon" />
        <view class="text-group_33 flex-col">
          <text class="text_6">{{ item.name }}</text>
          <text class="text_7">{{ item.date }}</text>
        </view>
        <image
          class="label_6"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wendang/SketchPng02436086c2092674a945161418af30e40396dd2e3262527fbdd0f29f81760ea6.png"
        />
        <text class="text_8">{{ item.count }}</text>
        <image
          class="label_7"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wendang/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
        />
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
