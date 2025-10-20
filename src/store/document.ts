import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocumentStore = defineStore('document', () => {
  // 选中的文件列表
  const selectedFiles = ref(new Map())
  
  // 选中的文件夹列表
  const selectedFolders = ref(new Map())

  // 设置文件选中状态
  const setFileSelected = (fileId, selected, fileInfo = null) => {
    if (selected && fileInfo) {
      selectedFiles.value.set(fileId, {
        ...fileInfo,
        selected: true
      })
    } else {
      selectedFiles.value.delete(fileId)
    }
    console.log('文档store - 设置文件选中状态:', fileId, selected)
    console.log('文档store - 当前选中文件数量:', selectedFiles.value.size)
  }

  // 设置文件夹选中状态
  const setFolderSelected = (folderId, selected, folderInfo = null) => {
    if (selected && folderInfo) {
      selectedFolders.value.set(folderId, {
        ...folderInfo,
        selected: true
      })
    } else {
      selectedFolders.value.delete(folderId)
    }
    console.log('文档store - 设置文件夹选中状态:', folderId, selected)
    console.log('文档store - 当前选中文件夹数量:', selectedFolders.value.size)
  }

  // 获取文件选中状态
  const isFileSelected = (fileId) => {
    return selectedFiles.value.has(fileId)
  }

  // 获取文件夹选中状态
  const isFolderSelected = (folderId) => {
    return selectedFolders.value.has(folderId)
  }

  // 获取所有选中的文件
  const getSelectedFiles = () => {
    return Array.from(selectedFiles.value.values())
  }

  // 获取所有选中的文件夹
  const getSelectedFolders = () => {
    return Array.from(selectedFolders.value.values())
  }

  // 清空所有选中状态
  const clearAllSelected = () => {
    selectedFiles.value.clear()
    selectedFolders.value.clear()
    console.log('文档store - 清空所有选中状态')
  }

  // 同步文件列表的选中状态
  const syncFileListSelection = (fileList) => {
    return fileList.map(file => ({
      ...file,
      selected: isFileSelected(file.id)
    }))
  }

  // 同步文件夹列表的选中状态
  const syncFolderListSelection = (folderList) => {
    return folderList.map(folder => ({
      ...folder,
      selected: isFolderSelected(folder.id)
    }))
  }

  return {
    selectedFiles,
    selectedFolders,
    setFileSelected,
    setFolderSelected,
    isFileSelected,
    isFolderSelected,
    getSelectedFiles,
    getSelectedFolders,
    clearAllSelected,
    syncFileListSelection,
    syncFolderListSelection
  }
})
