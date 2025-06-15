<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <buju>
    <template #header>
      <dingbu></dingbu>
    </template>

    <template #main>
      <view class="main">
        <view class="main-header-right">
          <text>搜索</text>
        </view>
      </view>
    </template>
    <template #footer>
      <dibu></dibu>
    </template>
  </buju>
</template>

<script lang="js" setup>
import dibu from './dibu.vue'
</script>

<style></style>
