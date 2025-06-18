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
            @click="tiaozhuan"
            :key="index"
          >
            <image
              class="image_2"
              referrerpolicy="no-referrer"
              src="/static/lanhu_fenleishezhi/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png"
            />
            <text class="text_3">单据</text>

            <image
              class="label_4"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wendang/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
            />
          </view>
        </view>
      </view>
      <div class="fixed bottom-60rpx w-full flex justify-center">
        <view class="text-wrapper_1 flex-col box-border">
          <text class="text_4">新建分类</text>
        </view>
      </div>
    </template>
  </buju>
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
          slot1: 1,
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
          specialSlot3: {
            lanhuimage0:
              '/static/lanhu_fenleishezhi/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
            lanhutext0: '分类2',
          },
          slot3: 3,
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c',
          specialSlot3: {
            lanhuimage0:
              '/static/lanhu_fenleishezhi/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
            lanhutext0: '分类3',
          },
          slot3: 3,
        },
      ],
      constants: {},
    }
  },
  methods: {
    tiaozhuan() {
      uni.navigateTo({
        url: '/pages/demo/index',
      })
    },
  },
}
</script>
<style lang="css" scoped>
@import '../../static/common/common.css';
@import './assets/style/index.rpx.css';
</style>
