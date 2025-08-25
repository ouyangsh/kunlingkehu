import { http, uniFileUpload } from '@/utils/http'
import type { IFooItem, IAddCategoryResult, IDirectoryItem, IGetDirectoryListResult } from './foo.d'

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
    url: `/foo/upload`,
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
