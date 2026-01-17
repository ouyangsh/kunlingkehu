<template>
  <view class="smart-layout-container" :class="quanjucolor">
    <div :class="headerClass">
      <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
      <view class="header">
        <slot name="header">
          <view class="mx-[30rpx] flex justify-between w100vw">
            <uni-icons
              v-if="pageslength > 1"
              type="left"
              size="22"
              @click="navigateBack"
            ></uni-icons>
            <uni-icons v-else type="home" size="22" @click="navigateBack"></uni-icons>
            <text class="title">{{ title }}</text>
            <uni-icons class="opacity-0" type="left" size="22" @click="navigateBack"></uni-icons>
          </view>
        </slot>
      </view>
    </div>
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
  quanjucolor: {
    type: String,
    default: '',
  },
  headerClass: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '默认标题',
  },
})
// 计算属性
const pageslength = computed(() => getCurrentPages().length)

const statusBarHeight = ref(0)
const navigateBack = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack()
  } else {
    uni.reLaunch({
      url: '/pages/index/index',
    })
  }
}

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
  background-color: #ffffff;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 44px;

    .title {
      font-size: 38rpx;
      font-weight: bold;
    }
  }

  .content {
    flex: 1;
    overflow-y: auto;
  }

  .footer {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // height: 50px;
    /* #ifdef MP-WEIXIN */
    /* stylelint-disable-next-line declaration-property-value-no-unknown */
    // margin-bottom: constant(safe-area-inset-bottom);
    // margin-bottom: env(safe-area-inset-bottom);
    // background-color: #fff;
    /* #endif */
  }
}
</style>
