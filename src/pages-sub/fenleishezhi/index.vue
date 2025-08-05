<route lang="json5">
{
  style: {
    navigationBarTitleText: '分类设置',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju headerClass="bg-[#ffffffff]">
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
            @click="xuanzhong(item, index)"
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
  </buju>
  <!-- 分类设置 -->
  <wd-popup
    v-model="showfenlei"
    position="bottom"
    custom-style="height: 400rpx; border-radius: 20rpx 20rpx 0 0"
  >
    <div class="bg-#F4F6FA h-88rpx flex justify-between items-center mx30rpx">
      <div class="text-32rpx">单据</div>
      <div class="text-32rpx">
        <uni-icons type="clear" color="#CCCCCC" size="22" @click="showfenlei = false"></uni-icons>
      </div>
    </div>
    <div class="mx30rpx h-88rpx flex items-center" @click="chongmingmingqueren">
      <i class="icon-icon-bianji font_family mr20rpx text-50rpx" style="font-size: 40rpx"></i>
      <div>重命名</div>
    </div>
    <div class="flex justify-center">
      <div class="border-b-1 border-b-solid w690rpx border-#DDDDDD"></div>
    </div>
    <div class="mx30rpx h-88rpx flex items-center text-#EA635C" @click="shanchu = true">
      <i class="font_family icon-icon-shanchu2 mr20rpx" style="font-size: 40rpx"></i>
      <div>删除</div>
    </div>
  </wd-popup>
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

  <wd-popup
    v-model="chongming"
    position="bottom"
    custom-style="height: 400rpx; border-radius: 20rpx 20rpx 0 0"
  >
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">重命名</div>
      <div class="w-690rpx bg-#F4F6FA; h-88rpx rounded-md flex items-center pl10rpx">
        <input
          type="text"
          class="w-690rpx bg-#F4F6FA; h-88rpx rounded-md ml10rpx"
          v-model="chongmingvalue"
        />
        <div class="w-88rpx h-88rpx bg-#F4F6FA; rounded-md flex items-center justify-center">
          <uni-icons
            type="clear"
            color="#CCCCCC"
            size="22"
            @click="chongmingvalue = ''"
          ></uni-icons>
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
          @click="chongmingfun"
          class="text-32rpx w330rpx h80rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
  <wd-popup v-model="shanchu" custom-style="height: 364rpx; width: 630rpx; border-radius: 20rpx ">
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">删除提示</div>
      <div class="text-32rpx my20rpx">请确认是否删除此分类？</div>
      <div class="h-88rpx rounded-md flex items-center justify-evenly mt40rpx w-630rpx mb-20rpx">
        <div
          @click="shanchuhanshu(false)"
          class="text-32rpx w270rpx h88rpx bg-#F4F6FA flex justify-center items-center rounded-md"
        >
          取消
        </div>
        <div
          @click="shanchuhanshu(true)"
          class="text-32rpx w270rpx h88rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
  <wd-popup
    v-model="shanchutishi"
    custom-style="height: 364rpx; width: 630rpx; border-radius: 20rpx "
  >
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">删除提示</div>
      <div class="text-32rpx my20rpx">请先清空分类下文件，才可以删除</div>
      <div class="h-88rpx rounded-md flex items-center justify-evenly mt40rpx w-630rpx mb-20rpx">
        <div
          @click="shanchuhanshu(true)"
          class="text-32rpx w570rpx h88rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          知道了
        </div>
      </div>
    </div>
  </wd-popup>

  <wd-popup v-model="tishi" custom-style="height: 364rpx; width: 630rpx; border-radius: 20rpx ">
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">删除提示</div>
      <div class="text-32rpx my20rpx">请先清空分类下文件，才可以删除</div>
      <div class="h-88rpx rounded-md flex items-center justify-evenly mt40rpx w-630rpx mb-20rpx">
        <div
          @click="tishi = false"
          class="text-32rpx w570rpx h88rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          知道了
        </div>
      </div>
    </div>
  </wd-popup>
</template>

<script setup>
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
  chongming.value = false
}

const xuanzhong = (item, index) => {
  showfenlei.value = true
  xuanzhongindex.value = index
  console.log(xuanzhongindex.value)
}

const shanchuhanshu = (can) => {
  if (can) {
    loopData0.value.splice(xuanzhongindex.value, 1)
  }
  shanchu.value = false
  showfenlei.value = false
}

const chongmingfun = () => {
  loopData0.value[xuanzhongindex.value].lanhutext0 = chongmingvalue.value
  chongming.value = false
}

const chongmingmingqueren = () => {
  chongmingvalue.value = loopData0.value[xuanzhongindex.value].lanhutext0
  chongming.value = true
}

const xuanzhongindex = ref(0)
const show = ref(false)
const chongming = ref(false)
const chongmingvalue = ref('')
const showfenlei = ref(false)
const shanchu = ref(false)
const tishi = ref(false)
const shanchutishi = ref(false)

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
