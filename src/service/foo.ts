import { http, uniFileUpload } from '@/utils/http'
import type {
  IFooItem,
  IAddCategoryResult,
  IDirectoryItem,
  IGetDirectoryListResult,
  IUpdateCategoryRequest,
  IUpdateCategoryResult,
  IDeleteCategoryRequest,
  IDeleteCategoryResult,
  IDownloadAttachmentRequest,
  IGetDocumentListRequest,
  IDocumentItem,
  IGetDocumentListResult,
  IMoveDocumentRequest,
  IMoveDocumentResult,
  IDeleteDocumentRequest,
  IDeleteDocumentResult,
} from './foo.d'

export { IFooItem }

/** get 请求 */
export const getFooAPI = (name: string) => {
  return http<IFooItem>({
    url: `/foo`,
    method: 'GET',
    query: { name },
  })
}

/** get 请求 */
export const postFooAPI = (name: string) => {
  return http<IFooItem>({
    url: `/foo`,
    method: 'POST',
    query: { name }, // post 请求也支持 query
    data: { name },
  })
}

// 文件上传
export const fileUpload = (data: IUniUploadFileOptions) => {
  return uniFileUpload({
    url: `/tscc/document-attachment/upload`,
    method: 'POST',
    ...data,
  })
}

/** get 请求列表 */
export const getList = (page = 1, pageSize = 10) => {
  return http<any>({
    url: `/queryList`,
    method: 'GET',
    query: { page, pageSize },
  })
}

/** 新建分类 */
export const addCategoryAPI = (dirName: string) => {
  return http<IAddCategoryResult>({
    url: '/tscc/attachment-directory/add',
    method: 'POST',
    data: { dirName },
  })
}

/** 获取分类列表 */
export const getDirectoryListAPI = () => {
  return http<IGetDirectoryListResult>({
    url: '/tscc/attachment-directory/last',
    method: 'POST',
  })
}

/** 修改分类 */
export const updateCategoryAPI = (data: IUpdateCategoryRequest) => {
  return http<IUpdateCategoryResult>({
    url: '/tscc/attachment-directory/update',
    method: 'POST',
    data,
  })
}

/** 删除分类 */
export const deleteCategoryAPI = (data: IDeleteCategoryRequest) => {
  return http<IDeleteCategoryResult>({
    url: '/tscc/attachment-directory/delete',
    method: 'POST',
    data,
  })
}

/** 下载附件 */
export const downloadAttachmentAPI = (data: IDownloadAttachmentRequest) => {
  // const params = new URLSearchParams()
  // params.append('attachmentId', data.attachmentId)
  const formData = `attachmentId=${data.attachmentId}`

  return http<ArrayBuffer>({
    url: '/tscc/document-attachment/download',
    method: 'POST',
    data: formData,
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    responseType: 'arraybuffer',
  })
}

/** 获取文档列表 */
export const getDocumentListAPI = (data: IGetDocumentListRequest) => {
  return http<IGetDocumentListResult>({
    url: '/tscc/document-attachment/list',
    method: 'POST',
    data,
  })
}

/** 移动文档 */
export const moveDocumentAPI = (data: IMoveDocumentRequest) => {
  return http<IMoveDocumentResult>({
    url: '/tscc/document-attachment/move',
    method: 'POST',
    data,
  })
}

/** 删除文档 */
export const deleteDocumentAPI = (data: IDeleteDocumentRequest) => {
  return http<IDeleteDocumentResult>({
    url: '/tscc/document-attachment/delete',
    method: 'POST',
    data,
  })
}

/** 文档矫正 */
export const correctDocumentAPI = (id: string) => {
  return http<any>({
    url: '/tscc/document/v2-only-image-correct',
    method: 'POST',
    data: { id },
  })
}
