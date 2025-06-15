<template>
  <view class="page flex-col">
    <image
      class="image_1"
      referrerpolicy="no-referrer"
      src="/static/lanhu_changjianwenti/SketchPng6bc32bc67f2a840b12e3a25d43d9c58ffb8983977a90bd05c0d5fbf5af7a8fd6.png"
    />
    <view class="box_1 flex-row">
      <view class="group_5 flex-col">
        <text class="text_6">9:41</text>
        <text class="text_2">常见问题</text>
        <text class="paragraph_1">
          你好！
          <br />
          有什么可能帮助您？
        </text>
        <text class="text_3">查询相关</text>
        <text class="paragraph_2">
          1.三只羊控股集团有限公司
          <br />
          2.浙江胖都业商业管理有限公司
          <br />
          3.百度
          <br />
          4.许昌胖东来商贸集团有限公司
          <br />
          5.华为技术有限公司
        </text>
        <text class="text_4">付费相关</text>
        <text class="paragraph_3">
          1.三只羊控股集团有限公司
          <br />
          2.浙江胖都业商业管理有限公司
          <br />
          3.百度
          <br />
          4.许昌胖东来商贸集团有限公司
          <br />
          5.华为技术有限公司
        </text>
        <image
          class="image_2"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng354c836ccee953c75abc86209eb4370bce7e06698a4a0e9eaec0525151577ccc.png"
        />
        <image
          class="image_3"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng354c836ccee953c75abc86209eb4370bce7e06698a4a0e9eaec0525151577ccc.png"
        />
        <image
          class="image_4"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng354c836ccee953c75abc86209eb4370bce7e06698a4a0e9eaec0525151577ccc.png"
        />
        <image
          class="image_5"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng354c836ccee953c75abc86209eb4370bce7e06698a4a0e9eaec0525151577ccc.png"
        />
        <image
          class="image_6"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng43d412b770d54c34e0f5da8a4faaf73abf3af52bc3376d1c1bec93d95279c504.png"
        />
        <image
          class="image_7"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng43d412b770d54c34e0f5da8a4faaf73abf3af52bc3376d1c1bec93d95279c504.png"
        />
        <image
          class="image_8"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng354c836ccee953c75abc86209eb4370bce7e06698a4a0e9eaec0525151577ccc.png"
        />
        <image
          class="label_10"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng1948f52150dfb3c6de9594271ccdc88e06a20fb4de9956375ee74f76ef2ac84a.png"
        />
        <image
          class="label_11"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng845d152ca0c7ccc10c1dfe753a2ddc0482626089b8b85e8fddb3a7ec218231f5.png"
        />
        <image
          class="label_12"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPnge35654d53ce717b3024a7db5c700a031a88f292713d7c15ccf9494a12a579b50.png"
        />
        <image
          class="image_9"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPnga3df6d12a02af02531d4fa929a9c755cf5a06cde45cdcdfb99fc16ced58ba948.png"
        />
        <image
          class="label_4"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng5e0f5da6d5d7fe42a3ec79921870ab846be8bae892ebd969d03888edd8e1038c.png"
        />
        <image
          class="image_10"
          referrerpolicy="no-referrer"
          src="/static/lanhu_changjianwenti/SketchPng354c836ccee953c75abc86209eb4370bce7e06698a4a0e9eaec0525151577ccc.png"
        />
        <view class="group_1 flex-row">
          <view class="image-text_5 flex-row justify-between">
            <image
              class="label_5"
              referrerpolicy="no-referrer"
              src="/static/lanhu_changjianwenti/SketchPngce289a9145bbf405108f9b189f6b482641b438ed56b4328fe7fc03e3cf76c317.png"
            />
            <text class="text-group_1">请输入想要搜索的问题</text>
          </view>
        </view>
        <view class="group_2 flex-col"></view>
      </view>
      <view class="box_3 flex-col">
        <view class="list_3 flex-row">
          <view
            class="image-text_6 flex-col"
            v-for="(item, index) in loopData0"
            :key="index"
          >
            <image
              class="label_6"
              referrerpolicy="no-referrer"
              :src="item.lanhuimage0"
            />
            <text class="text-group_2" v-html="item.lanhutext0"></text>
          </view>
        </view>
        <view class="group_3 flex-col"></view>
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
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngeefac5e16bb0a874ae1cfb2e22786260ea4dffd68343d6dafb483eb700a8cfbb',
          lanhutext0: '意见反馈'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngc9f4b69bc440599df298e52c98429b3469576e4d6b9730c8d57070112e389c90',
          lanhutext0: '联系客服'
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
