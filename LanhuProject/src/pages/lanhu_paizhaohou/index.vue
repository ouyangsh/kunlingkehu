<template>
  <view class="page flex-col">
    <view class="block_1 flex-col">
      <view class="section_7 flex-row">
        <text class="text_10">9:41</text>
        <image
          class="label_22"
          referrerpolicy="no-referrer"
          src="/static/lanhu_paizhaohou/SketchPnge35654d53ce717b3024a7db5c700a031a88f292713d7c15ccf9494a12a579b50.png"
        />
        <image
          class="label_23"
          referrerpolicy="no-referrer"
          src="/static/lanhu_paizhaohou/SketchPng845d152ca0c7ccc10c1dfe753a2ddc0482626089b8b85e8fddb3a7ec218231f5.png"
        />
        <image
          class="label_24"
          referrerpolicy="no-referrer"
          src="/static/lanhu_paizhaohou/SketchPng1948f52150dfb3c6de9594271ccdc88e06a20fb4de9956375ee74f76ef2ac84a.png"
        />
      </view>
      <view class="section_8 flex-row">
        <image
          class="image_1"
          referrerpolicy="no-referrer"
          src="/static/lanhu_paizhaohou/SketchPng3b373190f1890f4d912b39947f3e7ada97da2e2e8dbb26a89ad57a844b2d1b16.png"
        />
        <view class="box_10 flex-col">
          <text class="text_2">贸易合规助手2025-05-23&nbsp;14.25</text>
          <image
            class="image_2"
            referrerpolicy="no-referrer"
            src="/static/lanhu_paizhaohou/SketchPng79b4c02fe26f81b12c7b1a44cfaa00e6cfd9e89041946db08f66f24af9b3c312.png"
          />
        </view>
        <image
          class="label_4"
          referrerpolicy="no-referrer"
          src="/static/lanhu_paizhaohou/SketchPng607625a9daae4a0e79bd998ea6ff1baac54e22670070d2bfa086083b714572df.png"
        />
        <image
          class="image_3"
          referrerpolicy="no-referrer"
          src="/static/lanhu_paizhaohou/SketchPnga3df6d12a02af02531d4fa929a9c755cf5a06cde45cdcdfb99fc16ced58ba948.png"
        />
      </view>
    </view>
    <image
      class="image_4"
      referrerpolicy="no-referrer"
      src="/static/lanhu_paizhaohou/SketchPng3343865425b9f27cffe03bf6be987e370805c8f4e8d381497959cb3ea7a2528d.png"
    />
    <view class="block_2 flex-col">
      <view class="section_9 flex-row justify-between">
        <view class="list_7 flex-row">
          <view
            class="image-text_7 flex-col"
            v-for="(item, index) in loopData0"
            :key="index"
          >
            <image
              class="label_5"
              referrerpolicy="no-referrer"
              :src="item.lanhuimage0"
            />
            <text class="text-group_1" v-html="item.lanhutext0"></text>
          </view>
        </view>
        <view class="image-wrapper_1 flex-col">
          <image
            class="label_6"
            referrerpolicy="no-referrer"
            src="/static/lanhu_paizhaohou/SketchPng77be813cb45daec83f40eb573cedf18220d81e02e6069f08a0520c6c7f01ff84.png"
          />
        </view>
      </view>
      <view class="section_10 flex-row">
        <view class="section_3 flex-col"></view>
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
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngc1ed8dc8875ba8f952f89cf49aa3338da5bcd20413f58f85cfb7d901f532e090',
          lanhutext0: '重拍这张'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngda1df310ddd65922ccb8397571700183d23f38f94262f0256ac2faae8e74fa3a',
          lanhutext0: '左转'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng60624b168896c50c6508eda747ee9dceaf0109356ff04bb413ad19252d883375',
          lanhutext0: '裁剪'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng310fd590aa5e62db45ddafab1e546390e8c0601e8200ec9778adfb38dc9e0e8c',
          lanhutext0: '矫正'
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
