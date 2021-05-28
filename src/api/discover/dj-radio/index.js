/*
 * @Author: 唐云
 * @Date: 2021-05-20 17:21:44
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 16:54:40
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

/**
 * 获取所有电台分类
 */
export function getAllRadioClassify() {
  return request({
    url: '/dj/catelist',
  })
}

/**
 * 获取热门电台榜
 */
export function getHotRadioRanks(limit) {
  return request({
    url: '/dj/toplist',
    params: {
      limit,
      type: 'hot',
    },
  })
}

/**
 * 获取节目排行榜
 */
export function getProgramRanks(limit) {
  return request({
    url: '/dj/program/toplist',
    params: {
      limit,
    },
  })
}

/**
 * 电台-分类推荐
 */
export function getTypeRecommends(type) {
  return request({
    url: '/dj/recommend/type',
    params: {
      type,
    },
  })
}

/**
 * 电台-类别热门电台
 */
export function getCategoryHotRadio(cateId, limit, offset) {
  return request({
    url: '/dj/radio/hot',
    params: {
      cateId,
      offset,
      limit,
    },
  })
}
