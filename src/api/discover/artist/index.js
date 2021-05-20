/*
 * @Author: 唐云 
 * @Date: 2021-05-20 16:28:33 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 16:29:37
 * 发现音乐-歌手
 */
import request from '@/services/request'

/**
 * 获取热门歌手列表
 * @param {*} limit 
 * @returns 
 */
export function getHotArtists(limit) {
  return request({
    url: '/top/artists',
    params: {
      limit
    }
  })
}