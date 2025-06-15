<template>
  <view class="page flex-col">
    <view class="group_1 flex-row">
      <view class="group_2 flex-col">
        <view class="group_3 flex-row">
          <text class="text_1">9:41</text>
          <image
            class="label_1"
            referrerpolicy="no-referrer"
            src="/static/lanhu_chakanxiangqing/SketchPnge35654d53ce717b3024a7db5c700a031a88f292713d7c15ccf9494a12a579b50.png"
          />
          <image
            class="label_2"
            referrerpolicy="no-referrer"
            src="/static/lanhu_chakanxiangqing/SketchPng845d152ca0c7ccc10c1dfe753a2ddc0482626089b8b85e8fddb3a7ec218231f5.png"
          />
          <image
            class="label_3"
            referrerpolicy="no-referrer"
            src="/static/lanhu_chakanxiangqing/SketchPng1948f52150dfb3c6de9594271ccdc88e06a20fb4de9956375ee74f76ef2ac84a.png"
          />
        </view>
        <view class="group_4 flex-row">
          <image
            class="label_4"
            referrerpolicy="no-referrer"
            src="/static/lanhu_chakanxiangqing/SketchPng5e0f5da6d5d7fe42a3ec79921870ab846be8bae892ebd969d03888edd8e1038c.png"
          />
          <text class="text_2">合规筛查报告</text>
          <view class="image-wrapper_1 flex-row">
            <image
              class="image_1"
              referrerpolicy="no-referrer"
              src="/static/lanhu_chakanxiangqing/f0ba8d521f6149149fc18799aaba9322_mergeImage.png"
            />
            <image
              class="label_5"
              referrerpolicy="no-referrer"
              src="/static/lanhu_chakanxiangqing/9ece4d7271ab4a12a18989eec0e6acf2_mergeImage.png"
            />
            <image
              class="label_6"
              referrerpolicy="no-referrer"
              src="/static/lanhu_chakanxiangqing/f3bc65d5119a451fba21508eac20dbb6_mergeImage.png"
            />
          </view>
        </view>
        <view class="group_5 flex-row justify-between">
          <view class="text-wrapper_1 flex-col">
            <text class="text_3">查询对象基本信息</text>
          </view>
          <view class="text-wrapper_2 flex-col">
            <text class="text_4">提取对象提取信息</text>
          </view>
          <view class="text-wrapper_3 flex-col">
            <text class="text_5">合规筛查结果详情</text>
          </view>
        </view>
        <view class="text-wrapper_4 flex-row justify-between">
          <text class="text_6">查询机构:</text>
          <text class="text_7">XXX有限公司</text>
        </view>
        <view class="text-wrapper_5 flex-row justify-between">
          <text class="text_8">查询账号:</text>
          <text class="text_9">admin</text>
        </view>
        <view class="text-wrapper_6 flex-row justify-between">
          <text class="text_10">查询时间:</text>
          <text class="text_11">2025-06-10&nbsp;17:28:43</text>
        </view>
        <text class="text_12">一、查询对象基本信息</text>
        <view class="group_6 flex-col">
          <view class="text-wrapper_7 flex-row justify-between">
            <text class="text_13">单据文件名称：</text>
            <text class="text_14">预录入单.pdf</text>
          </view>
          <view class="list_1 flex-row">
            <view
              class="text-wrapper_8 flex-col"
              v-for="(item, index) in loopData0"
              :key="index"
            >
              <text
                class="text_15"
                :style="{ color: item.lanhufontColor0 }"
                v-html="item.lanhutext0"
              ></text>
              <text
                class="text_16"
                :style="{ color: item.lanhufontColor1 }"
                v-html="item.lanhutext1"
              ></text>
            </view>
          </view>
        </view>
        <text class="text_17">二、查询对象提取信息</text>
        <view class="group_7 flex-col">
          <text class="text_18">单据信息段</text>
          <view class="list_2 flex-row">
            <view
              class="text-wrapper_9 flex-col"
              v-for="(item, index) in loopData1"
              :key="index"
            >
              <text
                class="text_19"
                :style="{ color: item.lanhufontColor0 }"
                v-html="item.lanhutext0"
              ></text>
              <text
                class="text_20"
                :style="{ color: item.lanhufontColor1 }"
                v-html="item.lanhutext1"
              ></text>
            </view>
          </view>
        </view>
      </view>
      <view class="group_8 flex-col">
        <view class="text-wrapper_10 flex-col">
          <text class="text_21">查看筛查报告</text>
        </view>
        <view class="section_1 flex-col"></view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      loopData0: [
        {
          lanhutext0: '单据类型：',
          lanhufontColor0: 'rgba(119,119,119,1)',
          lanhutext1: '单据类型：',
          lanhufontColor1: 'rgba(119,119,119,1)'
        },
        {
          lanhutext0: '出口报关单',
          lanhufontColor0: 'rgba(25,33,61,1)',
          lanhutext1: '出口报关单',
          lanhufontColor1: 'rgba(25,33,61,1)'
        }
      ],
      loopData1: [
        {
          lanhutext0: '海关编码：',
          lanhufontColor0: 'rgba(119,119,119,1)',
          lanhutext1: '单据类型：',
          lanhufontColor1: 'rgba(119,119,119,1)'
        },
        {
          lanhutext0: '出口报关单',
          lanhufontColor0: 'rgba(25,33,61,1)',
          lanhutext1: '出口报关单',
          lanhufontColor1: 'rgba(25,33,61,1)'
        }
      ],
      constants: {}
    };
  },
  methods: {}
};
</script>
<style lang='css'>
@import '../common/common.css';
@import './assets/style/index.rpx.css';
</style>
