<route lang="json5">
{
  style: {
    navigationBarTitleText: '分类',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="分类">
    <view class="page-container">
      <!-- Top Section: Categories & Filter -->
      <view class="top-section">
        <!-- Horizontal Top Categories -->
        <scroll-view scroll-x class="top-categories" :show-scrollbar="false">
          <view class="categories-wrapper">
            <view
              v-for="(item, index) in topCategories"
              :key="index"
              class="category-item"
              @click="activeTopCategory = index"
            >
              <view
                class="icon-wrapper"
                :class="activeTopCategory === index ? 'active-border' : ''"
              >
                <view v-if="!item.icon" class="emoji-icon">🍽️</view>
                <image v-else :src="item.icon" class="icon-image" mode="aspectFill" />
              </view>
              <text class="category-text" :class="activeTopCategory === index ? 'active-text' : ''">
                {{ item.name }}
              </text>
            </view>
          </view>
        </scroll-view>

        <!-- Filter & Search Bar -->
        <view class="filter-bar">
          <view class="sort-options">
            <view class="sort-item bold">
              默认
              <uni-icons type="arrowdown" size="12" />
            </view>
            <view class="sort-item">
              价格
              <uni-icons type="arrowdown" size="12" />
            </view>
            <view class="sort-item">
              列数
              <uni-icons type="grid" size="14" />
            </view>
          </view>
          <view class="search-box">
            <uni-icons type="search" size="18" color="#999" />
            <input
              type="text"
              placeholder="条码/名称/拼音码"
              class="search-input"
              placeholder-class="placeholder-text"
            />
          </view>
          <view class="search-btn">搜索</view>
        </view>
      </view>

      <!-- Main Content: Split View -->
      <view class="split-view">
        <!-- Left Sidebar -->
        <scroll-view scroll-y class="sidebar">
          <view
            v-for="(item, index) in sideCategories"
            :key="index"
            class="sidebar-item"
            :class="activeSideCategory === index ? 'sidebar-active' : ''"
            @click="activeSideCategory = index"
          >
            <view v-if="activeSideCategory === index" class="active-indicator"></view>
            {{ item.name }}
          </view>
        </scroll-view>

        <!-- Right Product Grid -->
        <scroll-view scroll-y class="product-content">
          <view class="product-grid">
            <view v-for="(product, index) in products" :key="index" class="product-card">
              <view class="product-image-placeholder">
                <uni-icons type="image" size="30" color="#ccc" />
              </view>
              <view class="product-info">
                <view>
                  <view class="product-name">{{ product.name }}</view>
                  <view class="product-weight">{{ product.weight }}</view>
                </view>
                <view class="product-bottom">
                  <text class="product-price">¥ {{ product.price }}</text>
                  <view class="cart-btn">
                    <uni-icons type="cart" size="14" color="#fff" />
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
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

// Mock Data
const activeTopCategory = ref(0)
const topCategories = ref([
  { name: '美食', icon: '' },
  { name: '酒水', icon: '' },
  { name: '食品', icon: '' },
  { name: '百货', icon: '' },
  { name: '粮油', icon: '' },
  { name: '文体', icon: '' },
])

const activeSideCategory = ref(0)
const sideCategories = ref([
  { name: '饮品' },
  { name: '食物' },
  { name: '特产' },
  { name: '生鲜' },
  { name: '日用' },
  { name: '家电' },
])

const products = ref([
  {
    name: '辣就抓虾',
    weight: '103g',
    price: '4.50',
    image: '',
  },
  {
    name: '亿函盐焗味鸭腿 (盐焗味)',
    weight: '110g',
    price: '6.00',
    image: '',
  },
  {
    name: '亿函鸭翅根盐焗风味',
    weight: '85g',
    price: '4.50',
    image: '',
  },
  {
    name: '常记好点干脆面 (孜然烧烤味)',
    weight: '56g',
    price: '1.00',
    image: '',
  },
  {
    name: '辣就抓虾',
    weight: '103g',
    price: '4.50',
    image: '',
  },
  {
    name: '亿函盐焗味鸭腿 (盐焗味)',
    weight: '110g',
    price: '6.00',
    image: '',
  },
])
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
  overflow: hidden;
}

.top-section {
  background-color: #ffffff;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.top-categories {
  width: 100%;
  white-space: nowrap;
  padding: 20rpx 0;
}

.categories-wrapper {
  display: flex;
  padding: 0 20rpx;
  align-items: flex-start;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 40rpx;
  min-width: 120rpx;
}

.icon-wrapper {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10rpx;
  overflow: hidden;
  border: 4rpx solid transparent;
  background-color: #f5f5f5;
}

.active-border {
  border-color: #facc15; /* Yellow-400 */
}

.emoji-icon {
  font-size: 40rpx;
}

.icon-image {
  width: 100%;
  height: 100%;
}

.category-text {
  font-size: 24rpx;
  color: #666;
  padding: 4rpx 16rpx;
  border-radius: 20rpx;
}

.active-text {
  background-color: #facc15;
  color: white;
}

.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 24rpx;
  border-top: 1rpx solid #f0f0f0;
  height: 100rpx;
  box-sizing: border-box;
}

.sort-options {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #666;
  gap: 30rpx;
  flex-shrink: 0;
}

.sort-item {
  display: flex;
  align-items: center;
}

.bold {
  font-weight: bold;
  color: #000;
}

.search-box {
  flex: 1;
  margin-left: 30rpx;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 30rpx;
  padding: 10rpx 20rpx;
  height: 64rpx;
}

.search-input {
  flex: 1;
  margin-left: 10rpx;
  font-size: 26rpx;
  background-color: transparent;
  height: 100%;
}

.placeholder-text {
  color: #999;
}

.search-btn {
  margin-left: 20rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  flex-shrink: 0;
}

.split-view {
  flex: 1;
  display: flex;
  overflow: hidden;
  margin-top: 16rpx;
  position: relative;
}

.sidebar {
  flex: 0 1 auto;
  width: 180rpx;
  background-color: #ffffff;
  height: 100%;
  flex-shrink: 0;
}

.sidebar-item {
  padding: 30rpx 0;
  text-align: center;
  font-size: 26rpx;
  color: #666;
  background-color: #f5f5f5;
  position: relative;
}

.sidebar-active {
  background-color: #ffffff;
  font-weight: bold;
  color: #000;
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8rpx;
  height: 30rpx;
  background-color: #facc15;
}

.product-content {
  flex: 1;
  height: 100%;
  background-color: #f5f5f5;
  padding: 0 16rpx;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
  padding-bottom: 100rpx; /* Space for TabBar */
  padding-top: 16rpx;
}

.product-card {
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.02);
}

.product-image-placeholder {
  width: 100%;
  height: 200rpx;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-info {
  padding: 16rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.product-name {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.product-weight {
  font-size: 22rpx;
  color: #999;
  margin-top: 8rpx;
}

.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16rpx;
}

.product-price {
  font-size: 28rpx;
  font-weight: bold;
  color: #ef4444; /* Red-500 */
}

.cart-btn {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  background-color: #facc15;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style>
/* Custom Scrollbar Hiding if needed */
::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}
</style>
