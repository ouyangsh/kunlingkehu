<route lang="json5">
{
  style: {
    navigationBarTitleText: '问题详情',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju :title="articleTitle" headerClass="beijingse">
    <div class="article-container">
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <text class="loading-text">加载中...</text>
      </view>

      <!-- 错误状态 -->
      <view v-else-if="error" class="error-container">
        <text class="error-text">{{ error }}</text>
      </view>

      <!-- 文章内容 -->
      <view v-else-if="articleData" class="content-wrapper">
        <view class="article-title">{{ articleData.title }}</view>
        <view class="article-content">
          <rich-text :nodes="articleData.content"></rich-text>
        </view>
      </view>
    </div>
  </buju>
</template>

<script setup lang="js">
import { http } from '@/utils/http'

// 文章数据
const articleData = ref(null)
const articleTitle = ref('问题详情')
const loading = ref(true)
const error = ref('')

// 获取文章详情
const fetchArticleDetail = async (id) => {
  loading.value = true
  error.value = ''
  
  try {
    const res = await http({
      url: '/tcss/common/article-detail',
      method: 'POST',
      data: {
        id: parseInt(id)
      }
    })
    
    if (res.code === 200 && res.data) {
      articleData.value = res.data
      articleTitle.value = res.data.title || '问题详情'
    } else {
      error.value = res.msg || '获取文章详情失败'
    }
  } catch (err) {
    console.error('获取文章详情失败:', err)
    error.value = '获取文章详情失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 页面加载时获取文章详情
onMounted(() => {
  // 获取URL参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const id = currentPage.$route?.query?.id || currentPage.options?.id || ''
  const title = currentPage.$route?.query?.title || currentPage.options?.title || ''
  
  // 如果有标题参数，先显示标题
  if (title) {
    articleTitle.value = decodeURIComponent(title)
  }
  
  // 获取文章详情
  if (id) {
    fetchArticleDetail(id)
  } else {
    error.value = '缺少文章ID参数'
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.article-container {
  min-height: 100vh;
  background-color: #fff;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 200rpx 0;
}

.loading-text {
  font-size: 28rpx;
  color: #999;
}

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 200rpx 40rpx;
}

.error-text {
  font-size: 28rpx;
  color: #ff4d4f;
  text-align: center;
}

.content-wrapper {
  padding: 40rpx 30rpx;
}

.article-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.5;
  margin-bottom: 30rpx;
}

.article-content {
  font-size: 28rpx;
  color: #666;
  line-height: 1.8;
  
  :deep(h1) {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin: 20rpx 0;
  }
  
  :deep(h2) {
    font-size: 30rpx;
    font-weight: 600;
    color: #333;
    margin: 18rpx 0;
  }
  
  :deep(h3) {
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
    margin: 16rpx 0;
  }
  
  :deep(p) {
    margin: 12rpx 0;
    line-height: 1.8;
  }
  
  :deep(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20rpx 0;
  }
  
  :deep(ul), :deep(ol) {
    padding-left: 40rpx;
    margin: 12rpx 0;
  }
  
  :deep(li) {
    margin: 8rpx 0;
  }
}
</style>

<style lang="scss">
.beijingse {
  background: linear-gradient(180deg, #d5e9fe 0%, #f2f5fa 100%);
}
</style>
