/*
 * @Author: 唐云
 * @Date: 2021-02-28 22:43:31
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-01 16:01:55
 * 发现-歌手
 */
import request from '@/services/request'

/**
 * 获取歌手分类列表
 */
export function getSingerTypeList(limit, offset, type, area, initial) {
  return request({
    url: '/artist/list',
    params: {
      limit,
      offset,
      type,
      area,
      initial
    }
  })
}
