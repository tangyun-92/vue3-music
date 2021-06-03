/*
 * @Author: 唐云 
 * @Date: 2021-05-19 10:43:01 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-03 16:05:27
 * 发现音乐-热门推荐
 */

import request from '@/services/request'

/**
 * 获取banner列表
 */
export function getTopBanners() {
  return request({
    url: '/banner',
    method: 'post'
  })
}

/**
 * 获取热门推荐列表
 * @param limit 分页
 */
export function getHotRecommend(limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

/**
 * 获取新碟上架列表
 * @param limit 分页
 */
export function getNewAlbums(limit, type) {
  return request({
    url: '/top/album',
    params: {
      limit,
      type
    }
  })
}

/**
 * 获取榜单列表
 * @param idx 榜单id
 */
export function getTopList(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
    },
  })
}
