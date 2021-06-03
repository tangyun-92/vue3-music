/*
 * @Author: 唐云
 * @Date: 2021-05-25 18:04:09
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-03 15:35:49
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

/**
 * 获取全部新碟列表
 * @param {*} limit
 * @param {*} offset
 * @param {*} area ALL:全部 ZH:华语 EA:欧美 KR:韩国 JP:日本
 * @returns
 */
export function getAlbumList(limit, offset, area) {
  return request({
    url: '/top/album',
    params: {
      limit,
      offset,
      area,
    },
  })
}
