import { ref } from 'vue'
import { getDirectoryListAPI } from '@/service/foo'

// 文件夹列表
export const folderList = ref([])

// 文件列表
export const fileList = ref([])

// 获取数据
export const fetchData = async () => {
  try {
    const res = await getDirectoryListAPI()
    console.log(res)

    if (res.code === 200) {
      folderList.value = res.data.dirs.map((dir) => ({
        id: dir.id,
        icon: '/static/used-images/SketchPngf47a31a7c4f8701358171bb7437c221841b8c58567cfc6d961b01e284b21a525.png', // 默认图标
        name: dir.dirName,
        date: '' + new Date().toLocaleString(), // 假设使用当前日期时间
        count: dir.fileCount,
        selected: false,
      }))

      fileList.value = res.data.files.map((file) => {
        return {
          id: file.id,
          icon: '/static/used-images/SketchPng86bdc456c81a400fda1c141024ffaa241ae1bf437e2a3e7d0634a75a36e38e86.png', // 默认图标
          name: file.fileName,
          date: '' + new Date().toLocaleString(), // 假设使用当前日期时间
          selected: false,
        }
      })
    }
  } catch (error) {
    console.error('获取数据失败', error)
    uni.showToast({
      title: '获取数据失败',
      icon: 'error',
    })
  }
}

fetchData()

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
