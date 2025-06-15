<template>
  <view class="page flex-col">
    <view class="block_4 flex-row">
      <view class="group_7 flex-col">
        <view class="list_2 flex-col">
          <view
            class="list-items_1 flex-col"
            v-for="(item, index) in loopData0"
            :key="index"
          >
            <view class="group_8 flex-row">
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
              <image
                class="label_1"
                referrerpolicy="no-referrer"
                :src="item.lanhuimage0"
              />
            </view>
            <view class="text-wrapper_10 flex-row justify-between">
              <text class="text_3" v-html="item.lanhutext2"></text>
              <text class="text_4" v-html="item.lanhutext3"></text>
            </view>
            <view class="text-wrapper_11 flex-row">
              <text class="text_5" v-html="item.lanhutext4"></text>
              <text class="text_6" v-html="item.lanhutext5"></text>
            </view>
            <view class="text-wrapper_12 flex-row">
              <text class="text_7" v-html="item.lanhutext6"></text>
              <text class="text_8" v-html="item.lanhutext7"></text>
            </view>
            <view class="text-wrapper_13 flex-row">
              <text class="text_9" v-html="item.lanhutext8"></text>
              <text class="text_10" v-html="item.lanhutext9"></text>
            </view>
            <view class="text-wrapper_14 flex-row">
              <text class="text_11" v-html="item.lanhutext10"></text>
              <text class="text_12" v-html="item.lanhutext11"></text>
            </view>
          </view>
        </view>
      </view>
      <view class="box_4 flex-col"></view>
    </view>
    <view class="box_5 flex-col">
      <view class="block_5 flex-row">
        <text class="text_24">9:41</text>
        <image
          class="label_14"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaichacaidan/SketchPnge35654d53ce717b3024a7db5c700a031a88f292713d7c15ccf9494a12a579b50.png"
        />
        <image
          class="label_15"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaichacaidan/SketchPng845d152ca0c7ccc10c1dfe753a2ddc0482626089b8b85e8fddb3a7ec218231f5.png"
        />
        <image
          class="label_16"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaichacaidan/SketchPng1948f52150dfb3c6de9594271ccdc88e06a20fb4de9956375ee74f76ef2ac84a.png"
        />
      </view>
      <view class="block_6 flex-row justify-between">
        <text class="text_14">筛查</text>
        <view class="image-wrapper_1 flex-row">
          <image
            class="image_1"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaichacaidan/aa9964c846f5400086598e71a7b08cf5_mergeImage.png"
          />
          <image
            class="label_5"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaichacaidan/e0080add898444dea69f39cf984ac932_mergeImage.png"
          />
          <image
            class="label_6"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaichacaidan/30dc9827e7a945d4986fc3f453877ca7_mergeImage.png"
          />
        </view>
      </view>
      <view class="group_3 flex-col">
        <view class="block_7 flex-row justify-between">
          <text class="text_15">状态：</text>
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
        <view class="block_8 flex-row justify-between">
          <text class="text_19">日期：</text>
          <view class="block_1 flex-row">
            <image
              class="label_7"
              referrerpolicy="no-referrer"
              src="/static/lanhu_shaichacaidan/SketchPng231758693d28ef77922caf99c99cfe826099090a7c6c61568bce5641a3ab4d61.png"
            />
            <text class="text_20">开始日期</text>
            <text class="text_21">至</text>
            <text class="text_22">结束日期</text>
          </view>
        </view>
      </view>
    </view>
    <view class="box_6 flex-col">
      <view class="block_2 flex-row justify-between">
        <text class="text_23">ID：1926940419391557634</text>
        <image
          class="label_8"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaichacaidan/SketchPng57b1c1409903d824829f24e427f8bbc0fdf1ef63b399153d98f34d7329b9624c.png"
        />
      </view>
      <view class="block_3 flex-col">
        <view class="image-text_6 flex-row justify-between">
          <image
            class="label_9"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaichacaidan/SketchPngd7269c6f5f47f0de90e8bda6088efdc1bdd28eb2a2f5eea89f116a2d04d5aa43.png"
          />
          <text class="text-group_1">修改</text>
        </view>
        <image
          class="image_2"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaichacaidan/SketchPng43d412b770d54c34e0f5da8a4faaf73abf3af52bc3376d1c1bec93d95279c504.png"
        />
        <view class="image-text_7 flex-row justify-between">
          <image
            class="label_10"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaichacaidan/SketchPng3175e1185e644d7f384f88d785a96b2210466af491e2d129df2e8e7a47ef55fe.png"
          />
          <text class="text-group_2">归档</text>
        </view>
        <image
          class="image_3"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaichacaidan/SketchPng43d412b770d54c34e0f5da8a4faaf73abf3af52bc3376d1c1bec93d95279c504.png"
        />
        <view class="image-text_8 flex-row justify-between">
          <image
            class="label_11"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaichacaidan/SketchPng44050cfdfc8dd88e499ca749fb3f9c092be36d737d37bdd07fde46b6a890cb26.png"
          />
          <text class="text-group_3">查看详情</text>
        </view>
        <image
          class="image_4"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaichacaidan/SketchPng43d412b770d54c34e0f5da8a4faaf73abf3af52bc3376d1c1bec93d95279c504.png"
        />
        <view class="image-text_9 flex-row justify-between">
          <image
            class="label_12"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaichacaidan/SketchPng0075f5257e7645b0cc17529a964e7c9bbb0dd40f13d854cd5fecfb6b07784c79.png"
          />
          <text class="text-group_4">导出筛查报告</text>
        </view>
        <image
          class="image_5"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaichacaidan/SketchPng43d412b770d54c34e0f5da8a4faaf73abf3af52bc3376d1c1bec93d95279c504.png"
        />
        <view class="image-text_10 flex-row justify-between">
          <image
            class="label_13"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shaichacaidan/SketchPng919fc62852927a984b3d40e75636008f3f825505a6e8d5d11d27a313ae22839b.png"
          />
          <text class="text-group_5">删除</text>
        </view>
        <image
          class="image_6"
          referrerpolicy="no-referrer"
          src="/static/lanhu_shaichacaidan/SketchPng43d412b770d54c34e0f5da8a4faaf73abf3af52bc3376d1c1bec93d95279c504.png"
        />
        <view class="group_6 flex-col"></view>
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
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
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
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
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
