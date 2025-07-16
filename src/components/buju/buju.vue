<template>
  <view class="smart-layout-container">
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    <view class="header">
      <slot name="header">
        <view class="default-header-content">
          <text class="title">{{ title }}</text>
        </view>
      </slot>
    </view>
    <view class="content">
      <slot></slot>
    </view>
    <view class="footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

defineProps({
  title: {
    type: String,
    default: '默认标题',
  },
})

const statusBarHeight = ref(0)

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
})
</script>

<style lang="scss" scoped>
.smart-layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f4f4;

  .status-bar {
    background-color: #fff;
  }

  .header {
    background-color: #fff;

    .default-header-content {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;

      .title {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
  }

  .footer {
    //display: flex;
    //align-items: center;
    //justify-content: center;
    //height: 50px;
    /* #ifdef MP-WEIXIN */
    /* stylelint-disable-next-line declaration-property-value-no-unknown */
    //margin-bottom: constant(safe-area-inset-bottom);
    //margin-bottom: env(safe-area-inset-bottom);
    //background-color: #fff;
    /* #endif */
  }
}
</style>
