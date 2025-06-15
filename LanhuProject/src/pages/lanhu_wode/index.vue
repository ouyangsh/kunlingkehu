<template>
  <view class="page flex-col">
    <view class="box_10 flex-col">
      <view class="block_1 flex-row">
        <text class="text_10">9:41</text>
        <image
          class="label_24"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wode/SketchPnge35654d53ce717b3024a7db5c700a031a88f292713d7c15ccf9494a12a579b50.png"
        />
        <image
          class="label_25"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wode/SketchPng845d152ca0c7ccc10c1dfe753a2ddc0482626089b8b85e8fddb3a7ec218231f5.png"
        />
        <image
          class="label_26"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wode/SketchPng1948f52150dfb3c6de9594271ccdc88e06a20fb4de9956375ee74f76ef2ac84a.png"
        />
      </view>
      <view class="block_2 flex-row">
        <view class="image-wrapper_1 flex-row">
          <image
            class="image_1"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wode/c56d025e9d25425e8b5ed84b90f36f34_mergeImage.png"
          />
          <image
            class="label_4"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wode/7ae80035feac4e4992d1c23d9a3d1bf5_mergeImage.png"
          />
          <image
            class="label_5"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wode/7883d52fc8af4fd8aec2ce8213a3cd1b_mergeImage.png"
          />
        </view>
      </view>
      <view class="block_3 flex-row">
        <view class="image-text_11 flex-row justify-between">
          <image
            class="image_2"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wode/SketchPngfde4284d568e44a972b0160ed9be8fefa4f8b294bde0935ea2a2be933ae318d5.png"
          />
          <view class="text-group_10 flex-col">
            <text class="text_2">136****9779</text>
            <text class="text_3">普通会员</text>
          </view>
        </view>
      </view>
      <view class="box_5 flex-col">
        <view class="group_4 flex-row justify-between">
          <view class="box_11 flex-row">
            <view class="image-text_12 flex-row justify-between">
              <image
                class="label_8"
                referrerpolicy="no-referrer"
                src="/static/lanhu_wode/SketchPng26b40f33bc4771d8d4a5081d992b803a3923f83e83283648b862fff2a0aee02c.png"
              />
              <view class="text-group_11 flex-col">
                <text class="text_4">扫一扫</text>
                <text class="text_5">服务协议</text>
                <text class="text_6">常见问题</text>
              </view>
            </view>
            <view class="image-text_13 flex-row justify-between">
              <image
                class="label_6"
                referrerpolicy="no-referrer"
                src="/static/lanhu_wode/SketchPng8248b85684fe580ac0eac3ede66f0ae312e4e02089ea96c162ddafe412f640bf.png"
              />
              <view class="text-group_12 flex-col">
                <text class="text_4">扫一扫</text>
                <text class="text_5">服务协议</text>
                <text class="text_6">常见问题</text>
              </view>
            </view>
            <view class="image-text_14 flex-row justify-between">
              <image
                class="label_7"
                referrerpolicy="no-referrer"
                src="/static/lanhu_wode/SketchPngd92f5e866e52ed3de012b7ed60ca4282f381d5a62fe8f923784e883aacc640ad.png"
              />
              <view class="text-group_13 flex-col">
                <text class="text_4">扫一扫</text>
                <text class="text_5">服务协议</text>
                <text class="text_6">常见问题</text>
              </view>
            </view>
          </view>
          <view class="image-wrapper_9 flex-col">
            <image
              class="label_9"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wode/SketchPng3998ebbef18f0be42bb9b7d70b2f7b0071b2980f2fc7b04107f140b44affd657.png"
            />
            <image
              class="label_21"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wode/SketchPng3998ebbef18f0be42bb9b7d70b2f7b0071b2980f2fc7b04107f140b44affd657.png"
            />
            <image
              class="label_22"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wode/SketchPng3998ebbef18f0be42bb9b7d70b2f7b0071b2980f2fc7b04107f140b44affd657.png"
            />
          </view>
        </view>
        <view class="group_5 flex-row justify-between">
          <view class="image-text_15 flex-row justify-between">
            <image
              class="label_12"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wode/SketchPngc9f4b69bc440599df298e52c98429b3469576e4d6b9730c8d57070112e389c90.png"
            />
            <text class="text_7">联系客服</text>
          </view>
          <image
            class="label_23"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wode/SketchPng3998ebbef18f0be42bb9b7d70b2f7b0071b2980f2fc7b04107f140b44affd657.png"
          />
        </view>
      </view>
    </view>
    <view class="box_6 flex-col">
      <view class="list_4 flex-row">
        <view
          class="image-text_16 flex-col"
          v-for="(item, index) in loopData0"
          :key="index"
        >
          <image
            class="label_14"
            referrerpolicy="no-referrer"
            :src="item.lanhuimage0"
          />
          <text
            class="text-group_3"
            :style="{ color: item.lanhufontColor0 }"
            v-html="item.lanhutext0"
          ></text>
        </view>
      </view>
      <view class="group_3 flex-col"></view>
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
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng412f475b515a7a9ba8e295b5c55651d99ec4e5956b62f387b2f38124aa799626',
          lanhutext0: '筛查',
          lanhufontColor0: 'rgba(106,122,135,1)'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngd5e8738ed23c29644589a9a5847ef4ec203cb7664625350e3199a7206235a3bc',
          lanhutext0: '资讯',
          lanhufontColor0: 'rgba(106,122,135,1)'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPngc9fe531d1bba4062a6b2a5cbbebbe59082c801873c184c9149af32f3fb8cae19',
          lanhutext0: '我的',
          lanhufontColor0: 'rgba(37,99,235,1)'
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
