<template>
  <view class="page flex-col">
    <view class="group_1 flex-col">
      <view class="box_1 flex-col">
        <view class="box_2 flex-row">
          <image
            class="label_1"
            referrerpolicy="no-referrer"
            src="/static/lanhu_shougongshaichadaorudanjubendishangchuan/SketchPng1f62af037f31a2fd65936282e2342faed1a63c1f52e4c79dcbe8d95386369511.png"
          />
          <text class="text_1">导入单据</text>
          <view class="text-wrapper_1 flex-col">
            <text class="text_2">确定</text>
          </view>
        </view>
        <view class="box_3 flex-col">
          <text class="text_3">选择模版</text>
          <view class="group_5 flex-row justify-between">
            <view class="text-wrapper_2 flex-col">
              <text class="text_4">出口报关单</text>
            </view>
            <view class="text-wrapper_3 flex-col">
              <text class="text_5">进口报关单</text>
            </view>
            <view class="text-wrapper_4 flex-col">
              <text class="text_6">提货单</text>
            </view>
            <view class="text-wrapper_5 flex-col">
              <text class="text_7">其它单据</text>
            </view>
          </view>
          <text class="text_8">单据上传</text>
          <view class="text-wrapper_7 flex-row justify-between">
            <text class="text_9">线上文件</text>
            <text class="text_10">本地上传</text>
          </view>
          <view class="group_3 flex-col"></view>
          <view class="group_4 flex-row justify-between">
            <view class="box_4 flex-row">
              <view class="image-text_3 flex-col">
                <image
                  class="image_1"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_shougongshaichadaorudanjubendishangchuan/SketchPng81f1dc5b07271a7cad32f05456c834c83b265f48fd2bc8666a3502349eebf1db.png"
                />
                <text class="text-group_1">相册导入</text>
              </view>
            </view>
            <view class="box_5 flex-row">
              <view class="image-text_4 flex-col">
                <image
                  class="image_2"
                  referrerpolicy="no-referrer"
                  src="/static/lanhu_shougongshaichadaorudanjubendishangchuan/SketchPnga2e6be1c4ec73bdd8a8329cd8d9d6eaac4ed9ba6663def86855ed56f6ece782e.png"
                />
                <text class="text-group_2">拍照</text>
              </view>
            </view>
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
