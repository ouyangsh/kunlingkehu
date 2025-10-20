import { ref } from 'vue'
import { getDirectoryListAPI } from '@/service/foo'
import { useDocumentStore } from '@/store'

// 文件夹列表
export const folderList = ref([])

// 文件列表
export const fileList = ref([])

// 获取数据
export const fetchData = async () => {
  try {
    console.log('zhuangtai.js - 开始获取数据...')
    const res = await getDirectoryListAPI()
    console.log('zhuangtai.js - API响应:', res)

    if (res.code === 200 && res.data) {
      const documentStore = useDocumentStore()
      
      // 处理文件夹数据
      if (res.data.dirs && Array.isArray(res.data.dirs)) {
        const processedFolders = res.data.dirs.map((dir) => ({
          id: dir.id,
          icon: '/static/used-images/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png', // 默认图标
          name: dir.dirName,
          date: '' + new Date().toLocaleString(), // 假设使用当前日期时间
          count: dir.fileCount,
          selected: false,
        }))
        
        // 同步选中状态
        folderList.value = documentStore.syncFolderListSelection(processedFolders)
        console.log('zhuangtai.js - 文件夹数据处理完成:', folderList.value.length, '个文件夹')
      } else {
        console.warn('zhuangtai.js - dirs数据格式异常:', res.data.dirs)
        folderList.value = []
      }

      // 处理文件数据
      if (res.data.files && Array.isArray(res.data.files)) {
        const processedFiles = res.data.files.map((file) => {
          return {
            id: file.id,
            icon: '/static/used-images/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png', // 默认图标
            name: file.fileName,
            date: '' + new Date().toLocaleString(), // 假设使用当前日期时间
            selected: false,
          }
        })
        
        // 同步选中状态
        fileList.value = documentStore.syncFileListSelection(processedFiles)
        console.log('zhuangtai.js - 文件数据处理完成:', fileList.value.length, '个文件')
        
        // 输出选中状态信息
        const selectedCount = fileList.value.filter(file => file.selected).length
        console.log('zhuangtai.js - 同步后选中的文件数量:', selectedCount)
      } else {
        console.warn('zhuangtai.js - files数据格式异常:', res.data.files)
        fileList.value = []
      }
    } else {
      console.error('zhuangtai.js - API返回数据格式异常:', res)
      uni.showToast({
        title: res.msg || '数据格式异常',
        icon: 'none',
      })
    }
  } catch (error) {
    console.error('zhuangtai.js - 获取数据失败', error)
    uni.showToast({
      title: '获取数据失败，请检查网络连接',
      icon: 'none',
    })
  }
}

// 移除自动调用，改为在需要时手动调用
// fetchData()

export const folder = ref({
  id: 1,
  icon: '/static/used-images/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png',
  name: '单据',
  date: '2025/05/21 12:36',
  count: 2,
  selected: false,
  fileList: [
    {
      id: 1,
      icon: '/static/used-images/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png',
      name: '贸易合规助手2025-05-21 10.46',
      date: '2025/05/21 12:36',
      selected: false,
    },
  ],
})
