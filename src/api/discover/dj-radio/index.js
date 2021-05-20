/*
 * @Author: 唐云 
 * @Date: 2021-05-20 17:21:44 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 17:22:25
 * 发现音乐-主播电台
 */
import request from '@/services/request'

/**
 * 获取热门主播列表
 * @param {*} limit 
 */
export function getHotAnchors(limit) {
  return request({
    url: '/dj/toplist/popular',
    params: {
      limit,
    },
  })
}