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

export interface IUpdateCategoryRequest {
  id: string
  dirName: string
}

export interface IUpdateCategoryResult {
  code: number
  msg: string
  data: null
}

export interface IDeleteCategoryRequest {
  id: string
}

export interface IDeleteCategoryResult {
  code: number
  msg: string
  data: null
}

export interface IDownloadAttachmentRequest {
  attachmentId: string
}

export interface IGetDocumentListRequest {
  pageNum: number
  pageSize: number
  dirId?: string
}

export interface IDocumentItem {
  id: string
  fileSize: number
  fileName: string
  fileType: string
  source: string | null
  directoryId: number
}

export interface IGetDocumentListResult {
  total: number
  rows: IDocumentItem[]
  code: number
  msg: string
}
