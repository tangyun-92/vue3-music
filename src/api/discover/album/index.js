/*
 * @Author: 唐云 
 * @Date: 2021-05-25 18:04:09 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-25 18:05:23
 * 发现音乐-新碟上架
 */
import request from '@/services/request'

/**
 * 获取专辑内容
 * @param {*} limit
 * @returns
 */
export function getAlbumDetail(id) {
  return request({
    url: '/album',
    params: {
      id,
    },
  })
}
