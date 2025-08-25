<route lang="json5">
{
  style: {
    navigationBarTitleText: '文档详情',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju :title="folderName" headerClass="bg-[#ffffffff]">
    <view class="overflow-auto">
      <view class="bg-[#ffffffff] pl33rpx flex-col pb-30rpx mt10rpx">
        <file-list :isShowIcon="false" :file-list="fileList" @file-click="handleFileClick" />
      </view>
    </view>
  </buju>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import FileList from '@/pages/wendang/components/file-list.vue'
import buju from '@/components/buju/buju.vue'
import { getDocumentListAPI } from '@/service/foo'

const folderId = ref('0')
const folderName = ref('文档详情')
const fileList = ref([])

onLoad((options) => {
  if (options.id) {
    folderId.value = options.id
  }
  if (options.name) {
    folderName.value = options.name
  }
})

onMounted(() => {
  fetchDocumentList()
})

const fetchDocumentList = async () => {
  try {
    const res = await getDocumentListAPI({
      pageNum: 1,
      pageSize: 10,
      dirId: folderId.value,
    })
    if (res.code === 200) {
      fileList.value = res.rows.map((file) => ({
        id: file.id,
        icon: '/static/lanhu_wendang/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png', // Default icon
        name: file.fileName,
        date: '' + new Date().toLocaleString(), // Assuming current date/time for now
        selected: false,
      }))
    }
  } catch (error) {
    console.error('获取文档列表失败', error)
    uni.showToast({
      title: '获取文档列表失败',
      icon: 'error',
    })
  }
}

const handleFileClick = (file) => {
  // Logic for handling file click (e.g., download, preview)
  console.log('File clicked:', file.name)
}
</script>

<style lang="css" scoped>
@import '../../static/common/common.css';
</style>
