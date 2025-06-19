<route lang="json5">
{
  style: {
    navigationBarTitleText: '分类设置',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju :showFooter="false">
    <dingbu>
      <template #title>
        <text>全部文档</text>
      </template>
    </dingbu>
    <template #main>
      <view class="box_2 flex-col">
        <view class="list_7 flex-col">
          <view
            class="list-items_1 flex-row box-border"
            v-for="(item, index) in loopData0"
            :key="index"
          >
            <image
              class="image_2"
              referrerpolicy="no-referrer"
              src="/static/lanhu_fenleishezhi/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png"
            />
            <text class="text_3">{{ item.lanhutext0 }}</text>

            <image
              class="label_4"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wendang/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
            />
          </view>
        </view>
      </view>
      <div class="fixed bottom-60rpx w-full flex justify-center">
        <view class="text-wrapper_1 flex-col box-border" @click="handleAddCategory">
          <text class="text_4">新建分类</text>
        </view>
      </div>
    </template>
  </buju>
  <wd-popup
    v-model="show"
    position="bottom"
    custom-style="height: 400rpx; border-radius: 20rpx 20rpx 0 0"
  >
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">分类标题</div>
      <div class="w-690rpx bg-#F4F6FA; h-88rpx rounded-md flex items-center pl10rpx">
        <input
          type="text"
          class="w-690rpx bg-#F4F6FA; h-88rpx rounded-md ml10rpx"
          v-model="inputValue"
        />
        <div class="w-88rpx h-88rpx bg-#F4F6FA; rounded-md flex items-center justify-center">
          <uni-icons type="clear" color="#CCCCCC" size="22" @click="inputValue = ''"></uni-icons>
        </div>
      </div>
      <div class="w-690rpx h-88rpx rounded-md flex items-center justify-between mt40rpx">
        <div
          @click="handleClose"
          class="text-32rpx w330rpx h80rpx bg-#F4F6FA flex justify-center items-center rounded-md"
        >
          取消
        </div>
        <div
          @click="handleConfirm"
          class="text-32rpx w330rpx h80rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
</template>

<script setup>
import { log } from 'console'
import { ref } from 'vue'

const inputValue = ref('')

// 数据定义，使用ref替代data选项
const loopData0 = ref([
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
    lanhutext0: '分类2',
  },
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
    lanhutext0: '分类2',
  },
  {
    lanhuimage0:
      'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
    lanhutext0: '分类3',
    slot3: 3,
  },
])

// 方法定义，直接作为函数
const handleClose = () => {
  show.value = false
}
const show = ref(false)
// 新增分类的处理函数
const handleAddCategory = () => {
  show.value = true
  inputValue.value = ''
  // 这里可以添加新建分类的逻辑
}
const handleConfirm = () => {
  if (inputValue.value) {
    loopData0.value.push({
      lanhuimage0:
        'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
      lanhutext0: inputValue.value,
    })
  }
  show.value = false
}
</script>

<style lang="css" scoped>
@import '../../static/common/common.css';
@import './assets/style/index.rpx.css';
</style>
