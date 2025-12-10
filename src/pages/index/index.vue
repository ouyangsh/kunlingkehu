<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <buju title="首页" headerClass="index-header-bg">
    <template #header>
      <view class="custom-header-wrapper">
        <!-- Custom Navigation Bar -->
        <view class="nav-bar">
          <text class="nav-title">首页</text>
          <view class="nav-icons">
            <!-- <view class="icon-circle">...</view>
            <view class="icon-circle">-</view>
            <view class="icon-circle">O</view> -->
          </view>
        </view>

        <!-- Search Bar -->
        <view class="search-container">
          <view class="search-box">
            <view class="search-icon">🔍</view>
            <input class="search-input" type="text" placeholder="商品" />
            <view class="search-btn">搜索</view>
          </view>
        </view>

        <!-- Store Info -->
        <view class="store-info">
          <view class="store-left">
            <image class="store-logo" src="/static/logo.png" mode="aspectFill"></image>
            <view class="store-details">
              <text class="store-name">汇优城恒科店</text>
              <text class="store-sub">自提/配送点 ></text>
            </view>
          </view>
          <view class="store-actions">
            <view class="action-btn">📄 订单</view>
            <view class="action-btn">🔗 分享</view>
          </view>
        </view>
      </view>
    </template>

    <view class="main-content">
      <!-- Banner -->
      <view class="banner-container">
        <view class="banner-placeholder">
          <text class="banner-text">云值守 · 无人零售店</text>
          <text class="banner-sub">行业唯一的SaaS平台服务商</text>
        </view>
      </view>

      <!-- Category Grid -->
      <view class="category-grid">
        <view class="category-item" v-for="(item, index) in categories" :key="index">
          <view class="category-icon-wrapper">
            <image class="category-icon" :src="item.icon" mode="aspectFit"></image>
          </view>
          <text class="category-name">{{ item.name }}</text>
        </view>
      </view>

      <!-- Promotional Section -->
      <view class="promo-section">
        <view class="promo-card big-promo">
          <text class="promo-title">24H无人智能店</text>
          <text class="promo-desc">新零售 NEW</text>
          <text class="promo-sub">智能购物新体验</text>
        </view>
        <view class="promo-card small-promo">
          <text class="promo-title">台湾风味</text>
          <text class="promo-desc">米饼</text>
        </view>
      </view>
    </view>

    <template #footer>
      <TabBar />
    </template>
  </buju>
</template>

<script setup lang="ts">
import TabBar from '@/components/TabBar/TabBar.vue'
import { ref } from 'vue'

const categories = ref([
  { name: '美食', icon: '/static/logo.png' }, // Placeholder icons
  { name: '酒水', icon: '/static/logo.png' },
  { name: '食品', icon: '/static/logo.png' },
  { name: '百货', icon: '/static/logo.png' },
  { name: '粮油', icon: '/static/logo.png' },
])
</script>

<style lang="scss">
/* Global style for the header class passed to buju */
.index-header-bg {
  background: linear-gradient(to bottom, #e0eafc, #ffffff);
  border-bottom-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
  padding-bottom: 20rpx;
}
</style>

<style lang="scss" scoped>
.custom-header-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 30rpx;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx; /* Standard nav bar height */
}

.nav-title {
  font-size: 36rpx;
  font-weight: bold;
}

.nav-icons {
  display: flex;
  gap: 10rpx;
}

.icon-circle {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
}

.search-container {
  margin-top: 10rpx;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 40rpx;
  padding: 10rpx 20rpx;
  height: 70rpx;
  border: 1px solid #eee;
}

.search-icon {
  margin-right: 10rpx;
}

.search-input {
  flex: 1;
  font-size: 28rpx;
}

.search-btn {
  color: #ff9900;
  font-weight: bold;
  padding-left: 20rpx;
  border-left: 1px solid #eee;
}

.store-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30rpx;
}

.store-left {
  display: flex;
  align-items: center;
}

.store-logo {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 15rpx;
}

.store-details {
  display: flex;
  flex-direction: column;
}

.store-name {
  font-size: 32rpx;
  font-weight: bold;
}

.store-sub {
  font-size: 24rpx;
  color: #666;
}

.store-actions {
  display: flex;
  gap: 15rpx;
}

.action-btn {
  background-color: rgba(255, 255, 255, 0.6);
  padding: 10rpx 20rpx;
  border-radius: 30rpx;
  font-size: 24rpx;
}

.main-content {
  padding: 20rpx 30rpx;
}

.banner-container {
  margin-top: 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
}

.banner-placeholder {
  height: 300rpx;
  background: linear-gradient(135deg, #1c92d2, #f2fcfe);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.banner-text {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.banner-sub {
  font-size: 24rpx;
  opacity: 0.9;
}

.category-grid {
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-icon-wrapper {
  width: 100rpx;
  height: 100rpx;
  background-color: #fff;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rpx;
  box-shadow: 0 2rpx 5rpx rgba(0,0,0,0.05);
}

.category-icon {
  width: 60rpx;
  height: 60rpx;
}

.category-name {
  font-size: 26rpx;
  color: #333;
}

.promo-section {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
}

.promo-card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2rpx 5rpx rgba(0,0,0,0.05);
}

.big-promo {
  flex: 1.5;
  background: linear-gradient(to right bottom, #fff5f5, #fff);
}

.small-promo {
  flex: 1;
  background: linear-gradient(to right bottom, #f5fff5, #fff);
}

.promo-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #ff3333;
  margin-bottom: 10rpx;
}

.promo-desc {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
}

.promo-sub {
  font-size: 24rpx;
  color: #999;
  margin-top: 5rpx;
}
</style>
