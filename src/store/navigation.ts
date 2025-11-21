import { defineStore } from 'pinia'

export const useNavigationStore = defineStore(
  'navigation',
  () => {
    // 当前选中的索引值，对应不同的页面
    const suoyin = ref('index')

    // 页面映射关系
    const pageMap = {
      0: 'index', // 首页
      // 1: 'wendang', // 文档
      1: 'shaicha', // 筛查
      2: 'zixun', // 资讯
      3: 'userCenter', // 我的
    }

    // 设置当前页面索引
    const setSuoyin = (index: number) => {
      const page = pageMap[index as keyof typeof pageMap]
      if (page) {
        suoyin.value = page
      }
    }

    // 直接设置页面名称
    const setSuoyinByName = (pageName: string) => {
      suoyin.value = pageName
    }

    return {
      suoyin,
      setSuoyin,
      setSuoyinByName,
    }
  },
  {
    persist: true, // 开启数据持久化
  },
)
