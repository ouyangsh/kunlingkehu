export interface IFooItem {
  id: string
  name: string
}

export interface IAddCategoryResult {
  code: number
  msg: string
  data: number
}

export interface IDirectoryItem {
  createTime: string
  dirName: string
  fileCount: number
  id: number
  parentId: number
  updateTime: string
  userId: number
}

export interface IGetDirectoryListResult {
  code: number
  msg: string
  data: {
    dirs: IDirectoryItem[]
    files: any[] // Assuming files can be of any type for now, adjust if needed
  }
}
