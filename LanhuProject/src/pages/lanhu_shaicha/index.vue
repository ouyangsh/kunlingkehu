<template>
  <view class="page flex-col">
    <view class="group_11 flex-row">
      <view class="block_6 flex-col">
        <view class="list_7 flex-col">
          <view
            class="list-items_1 flex-col"
            v-for="(item, index) in loopData0"
            :key="index"
          >
            <view class="block_7 flex-row justify-between">
              <text class="text_1" v-html="item.lanhutext0"></text>
              <view
                class="text-wrapper_1 flex-col"
                :style="{ background: item.lanhuBg2 }"
              >
                <text
                  class="text_2"
                  :style="{ color: item.lanhufontColor1 }"
                  v-html="item.lanhutext1"
                ></text>
              </view>
            </view>
            <view class="text-wrapper_20 flex-row justify-between">
              <text class="text_3" v-html="item.lanhutext2"></text>
              <text class="text_4" v-html="item.lanhutext3"></text>
            </view>
            <view class="text-wrapper_21 flex-row">
              <text class="text_5" v-html="item.lanhutext4"></text>
              <text class="text_6" v-html="item.lanhutext5"></text>
            </view>
            <view class="text-wrapper_22 flex-row">
              <text class="text_7" v-html="item.lanhutext6"></text>
              <text class="text_8" v-html="item.lanhutext7"></text>
            </view>
            <view class="text-wrapper_23 flex-row">
              <text class="text_9" v-html="item.lanhutext8"></text>
              <text class="text_10" v-html="item.lanhutext9"></text>
            </view>
            <view class="text-wrapper_24 flex-row">
              <text class="text_11" v-html="item.lanhutext10"></text>
              <text class="text_12" v-html="item.lanhutext11"></text>
            </view>
          </view>
        </view>
        <image
          class="image_1"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaicha/SketchPng5f6fde3afd1ee831a9e0ca2a045fc7b393f024f4af7028a4efeb23de0580afb2.png"
        />
      </view>
      <view class="group_3 flex-col">
        <view class="list_8 flex-row">
          <view
            class="image-text_4 flex-col"
            v-for="(item, index) in loopData1"
            :key="index"
          >
            <image
              class="label_2"
              referrerpolicy="no-referrer"
              :src="item.lanhuimage0"
            />
            <text
              class="text-group_1"
              :style="{ color: item.lanhufontColor0 }"
              v-html="item.lanhutext0"
            ></text>
          </view>
        </view>
        <view class="section_1 flex-col"></view>
      </view>
    </view>
    <view class="group_4 flex-col">
      <view class="box_13 flex-row">
        <text class="text_25">9:41</text>
        <image
          class="label_15"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaicha/SketchPnge35654d53ce717b3024a7db5c700a031a88f292713d7c15ccf9494a12a579b50.png"
        />
        <image
          class="label_16"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaicha/SketchPng845d152ca0c7ccc10c1dfe753a2ddc0482626089b8b85e8fddb3a7ec218231f5.png"
        />
        <image
          class="label_17"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaicha/SketchPng1948f52150dfb3c6de9594271ccdc88e06a20fb4de9956375ee74f76ef2ac84a.png"
        />
      </view>
      <view class="box_14 flex-row justify-between">
        <text class="text_14">筛查</text>
        <view class="image-wrapper_1 flex-row">
          <image
            class="image_2"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaicha/76e3ad2fbf9e480c9e66cbae0a519958_mergeImage.png"
          />
          <image
            class="label_6"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaicha/6fac4a274ada46789aa264b9a335b7a4_mergeImage.png"
          />
          <image
            class="label_7"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaicha/ec8f82c7c49a4edeaba145a73ea6c8c1_mergeImage.png"
          />
        </view>
      </view>
      <view class="box_4 flex-col">
        <view class="block_8 flex-row justify-between">
          <text class="text_15">状态：</text>
          <view class="block_9 flex-row justify-between">
            <view class="text-wrapper_7 flex-col">
              <text class="text_16">全部</text>
            </view>
            <view class="text-wrapper_8 flex-col">
              <text class="text_17">已归档</text>
            </view>
            <view class="text-wrapper_9 flex-col">
              <text class="text_18">未归档</text>
            </view>
          </view>
        </view>
        <view class="block_10 flex-row justify-between">
          <text class="text_19">日期：</text>
          <view class="group_7 flex-row">
            <image
              class="label_8"
              referrerpolicy="no-referrer"
              src="/static/lanhu_shaicha/SketchPng231758693d28ef77922caf99c99cfe826099090a7c6c61568bce5641a3ab4d61.png"
            />
            <text class="text_20">开始日期</text>
            <text class="text_21">至</text>
            <text class="text_22">结束日期</text>
          </view>
        </view>
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
          lanhutext0: 'ID：1926940419391557634',
          lanhuBg2: 'rgba(239,153,19,0.200000)',
          lanhutext1: '未归档',
          lanhufontColor1: 'rgba(239,153,19,1)',
          lanhutext2: '交易方：',
          lanhutext3: '宁波杰腾科通设备有限公司;R.F.&nbsp;Industrie…',
          lanhutext4: '商品信息：',
          lanhutext5: '同轴连接器;8536909000',
          lanhutext6: '国家信息：',
          lanhutext7: 'USA;伊朗',
          lanhutext8: '船舶信息：',
          lanhutext9: 'HMM&nbsp;EMERALD',
          lanhutext10: '机构名称：',
          lanhutext11: 'XXX有限公司'
        },
        {
          lanhutext0: 'ID：1926940419391557634',
          lanhuBg2: 'rgba(55,195,200,0.200000)',
          lanhutext1: '已归档',
          lanhufontColor1: 'rgba(55,195,200,1)',
          lanhutext2: '交易方：',
          lanhutext3: '宁波杰腾科通设备有限公司;R.F.&nbsp;Industrie…',
          lanhutext4: '商品信息：',
          lanhutext5: '同轴连接器;8536909000',
          lanhutext6: '国家信息：',
          lanhutext7: 'USA;伊朗',
          lanhutext8: '船舶信息：',
          lanhutext9: 'HMM&nbsp;EMERALD',
          lanhutext10: '机构名称：',
          lanhutext11: 'XXX有限公司'
        }
      ],
      loopData1: [
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng13eae8aadf4eaadefa7ef616c1eae5d39c6a9660ab778c5ca41f723d0ab19bbd',
          lanhutext0: '首页',
          lanhufontColor0: 'rgba(106,122,135,1)'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngb255df52457498ae98d457e97a2cca7c1c4a3cc5a21504f4472ee0274131f05f',
          lanhutext0: '文档',
          lanhufontColor0: 'rgba(106,122,135,1)'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng29cb3575ea954669147d68580e87e554ee08ff8dbe8ec60c66839a35f958dc9a',
          lanhutext0: '筛查',
          lanhufontColor0: 'rgba(37,99,235,1)'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngd5e8738ed23c29644589a9a5847ef4ec203cb7664625350e3199a7206235a3bc',
          lanhutext0: '资讯',
          lanhufontColor0: 'rgba(106,122,135,1)'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng9dabdd3756b4d85c78a84fd8b09b70332cd27752f56c80ff77f276753145c7ab',
          lanhutext0: '我的',
          lanhufontColor0: 'rgba(106,122,135,1)'
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
