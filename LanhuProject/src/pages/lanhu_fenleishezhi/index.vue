<template>
  <view class="page flex-col">
    <view class="box_1 flex-col">
      <view class="box_6 flex-row">
        <text class="text_10">9:41</text>
        <image
          class="label_21"
          referrerpolicy="no-referrer"
          src="/static/lanhu_fenleishezhi/SketchPnge35654d53ce717b3024a7db5c700a031a88f292713d7c15ccf9494a12a579b50.png"
        />
        <image
          class="label_22"
          referrerpolicy="no-referrer"
          src="/static/lanhu_fenleishezhi/SketchPng845d152ca0c7ccc10c1dfe753a2ddc0482626089b8b85e8fddb3a7ec218231f5.png"
        />
        <image
          class="label_23"
          referrerpolicy="no-referrer"
          src="/static/lanhu_fenleishezhi/SketchPng1948f52150dfb3c6de9594271ccdc88e06a20fb4de9956375ee74f76ef2ac84a.png"
        />
      </view>
      <view class="box_7 flex-row">
        <image
          class="label_17"
          referrerpolicy="no-referrer"
          src="/static/lanhu_fenleishezhi/SketchPng5e0f5da6d5d7fe42a3ec79921870ab846be8bae892ebd969d03888edd8e1038c.png"
        />
        <text class="text_2">分类设置</text>
        <image
          class="image_1"
          referrerpolicy="no-referrer"
          src="/static/lanhu_fenleishezhi/SketchPnga3df6d12a02af02531d4fa929a9c755cf5a06cde45cdcdfb99fc16ced58ba948.png"
        />
      </view>
    </view>
    <view class="box_2 flex-col">
      <view class="list_7 flex-col">
        <view
          class="list-items_1 flex-row"
          v-for="(item, index) in loopData0"
          :key="index"
        >
          <image
            v-if="item.slot2 === 2"
            class="image_2"
            referrerpolicy="no-referrer"
            src="/static/lanhu_fenleishezhi/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png"
          />
          <text v-if="item.slot1 === 1" class="text_3">单据</text>
          <view
            v-if="item.slot3 === 3"
            class="image-text_7 flex-row justify-between"
          >
            <image
              class="image_3"
              referrerpolicy="no-referrer"
              :src="item.specialSlot3.lanhuimage0"
            />
            <text
              class="text-group_1"
              v-html="item.specialSlot3.lanhutext0"
            ></text>
          </view>
          <image
            class="label_4"
            referrerpolicy="no-referrer"
            :src="item.lanhuimage0"
          />
        </view>
      </view>
    </view>
    <view class="box_8 flex-col">
      <view class="text-wrapper_1 flex-col">
        <text class="text_4">新建分类</text>
      </view>
      <view class="section_1 flex-col"></view>
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
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
          slot2: 2,
          slot1: 1
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
          specialSlot3: {
            lanhuimage0:
              '/static/lanhu_fenleishezhi/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
            lanhutext0: '分类2'
          },
          slot3: 3
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
          specialSlot3: {
            lanhuimage0:
              '/static/lanhu_fenleishezhi/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
            lanhutext0: '分类3'
          },
          slot3: 3
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
