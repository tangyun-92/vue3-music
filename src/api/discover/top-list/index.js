/*
 * @Author: 唐云 
 * @Date: 2021-05-26 14:56:06 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 14:57:41
 * 发现音乐-排行榜
 */
import request from '@/services/request'

/**
 * 获取所有榜单
 * @returns
 */
export function getAllTopList() {
  return request({
    url: '/toplist'
  })
}

/**
 * 获取榜单详情
 * @param {*} id 
 * @returns 
 */
export function getTopListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}