<template>
  <view class="page flex-col">
    <view class="group_1 flex-col">
      <view class="block_7 flex-row">
        <text class="text_24">9:41</text>
        <image
          class="label_28"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wendang/SketchPngfa3e9c17559b05304a7055007fe69446ab72b55218ea989668008946555da0b9.png"
        />
        <image
          class="label_29"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wendang/SketchPng1f3f33d99e0f4fd84628fabef7d3909e20dffc161c0e4067f6ba2e8e0eb422c8.png"
        />
        <image
          class="label_30"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wendang/SketchPnge2c47cc8cb6c8c02a92be914c360f50a86c5c36ab6e6383b2fe346e933f88550.png"
        />
      </view>
      <view class="block_8 flex-row justify-between">
        <text class="text_2">文档</text>
        <image
          class="image_1"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wendang/SketchPngcaf8364700cbc749e328f9311a74ceff1258de5c12926aff01419af9b1b49474.png"
        />
      </view>
    </view>
    <view class="box_12 flex-col">
      <view class="list_13 flex-row">
        <view
          class="image-text_1 flex-col"
          v-for="(item, index) in loopData0"
          :key="index"
        >
          <image
            class="image_2"
            referrerpolicy="no-referrer"
            :src="item.lanhuimage0"
          />
          <text class="text-group_1" v-html="item.lanhutext0"></text>
        </view>
      </view>
    </view>
    <view class="group_3 flex-col">
      <view class="block_9 flex-row">
        <view class="text-wrapper_1">
          <text class="text_3">所有文档</text>
          <text class="text_4"></text>
          <text class="text_5">(6)</text>
        </view>
        <image
          class="label_4"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wendang/SketchPng010d95ac2a9e84192e9b3a69673847ba55fc67e70b4dc42b120e9c24d2b053c5.png"
        />
        <image
          class="label_5"
          referrerpolicy="no-referrer"
          src="/static/lanhu_wendang/SketchPng890113b4a2f35b211f7f22a50480e91a53ea2213e1b7abde9f3837164f1098c5.png"
        />
      </view>
      <view class="block_10 flex-col">
        <view class="section_3 flex-row">
          <image
            class="image_3"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png"
          />
          <view class="text-group_33 flex-col">
            <text class="text_6">单据</text>
            <text class="text_7">2025/05/21&nbsp;12:36</text>
          </view>
          <image
            class="label_6"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wendang/SketchPng02436086c2092674a945161418af30e40396dd2e3262527fbdd0f29f81760ea6.png"
          />
          <text class="text_8">2</text>
          <image
            class="label_7"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wendang/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
          />
        </view>
        <view class="section_4 flex-row">
          <view class="image-text_32 flex-row justify-between">
            <image
              class="image_4"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png"
            />
            <view class="text-group_34 flex-col">
              <text class="text_9">分类2</text>
              <text class="text_10">2025/05/21&nbsp;12:36</text>
            </view>
          </view>
          <image
            class="label_8"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wendang/SketchPng02436086c2092674a945161418af30e40396dd2e3262527fbdd0f29f81760ea6.png"
          />
          <text class="text_11">2</text>
          <image
            class="label_9"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wendang/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
          />
        </view>
        <view class="section_5 flex-row">
          <view class="image-text_33 flex-row justify-between">
            <image
              class="image_5"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wendang/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png"
            />
            <view class="text-group_35 flex-col">
              <text class="text_12">分类3</text>
              <text class="text_13">2025/05/21&nbsp;12:36</text>
            </view>
          </view>
          <image
            class="label_10"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wendang/SketchPng02436086c2092674a945161418af30e40396dd2e3262527fbdd0f29f81760ea6.png"
          />
          <text class="text_14">0</text>
          <image
            class="label_11"
            referrerpolicy="no-referrer"
            src="/static/lanhu_wendang/SketchPng3c89c19677a99f77e8d2e9946e3cc8420325a7c60f4b2a85bba82cdd845ad68c.png"
          />
        </view>
      </view>
      <view class="block_11 flex-row justify-between">
        <view class="image-text_34 flex-row justify-between">
          <view class="image-wrapper_1 flex-col">
            <image
              class="image_6"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png"
            />
          </view>
          <view class="text-group_36 flex-col">
            <text class="text_15">贸易合规助手2025-05-21&nbsp;10.46</text>
            <text class="text_16">2025/05/21&nbsp;12:36</text>
          </view>
        </view>
        <view class="section_6 flex-col"></view>
      </view>
      <view class="block_12 flex-row justify-between">
        <view class="image-text_35 flex-row justify-between">
          <view class="image-wrapper_2 flex-col">
            <image
              class="image_7"
              referrerpolicy="no-referrer"
              src="/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png"
            />
          </view>
          <view class="text-group_37 flex-col">
            <text class="text_17">贸易合规助手2025-05-21&nbsp;10.46</text>
            <text class="text_18">2025/05/21&nbsp;12:36</text>
          </view>
        </view>
        <view class="box_1 flex-col"></view>
      </view>
    </view>
    <view class="group_8 flex-col">
      <view class="list_14 flex-row">
        <view
          class="image-text_36 flex-col"
          v-for="(item, index) in loopData1"
          :key="index"
        >
          <image
            class="label_12"
            referrerpolicy="no-referrer"
            :src="item.lanhuimage0"
          />
          <text
            class="text-group_7"
            :style="{ color: item.lanhufontColor0 }"
            v-html="item.lanhutext0"
          ></text>
        </view>
      </view>
      <view class="block_1 flex-col"></view>
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
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng81f1dc5b07271a7cad32f05456c834c83b265f48fd2bc8666a3502349eebf1db',
          lanhutext0: '相册导入'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPnga2e6be1c4ec73bdd8a8329cd8d9d6eaac4ed9ba6663def86855ed56f6ece782e',
          lanhutext0: '拍照'
        },
        {
          lanhuimage0:
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng31062070658851b96176240fa91fe7a120c5acbc010b9198550665935e26745c',
          lanhutext0: '新建文件夹'
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
            'https://lanhu-oss-2537-2.lanhuapp.com/SketchPng8977bd4edae411b5a3ee52aecb312cd5051d1fd9278cdba8fc107fe3730690cd',
          lanhutext0: '文档',
          lanhufontColor0: 'rgba(37,99,235,1)'
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
