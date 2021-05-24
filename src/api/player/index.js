/*
 * @Author: 唐云 
 * @Date: 2021-05-21 14:08:51 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-24 11:25:37
 * 播放器
 */
import request from '@/services/request'

/**
 * 获取某首歌曲详情
 * @param {*} ids 歌曲id
 */
export function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids,
    },
  })
}

/**
 * 获取指定歌曲的歌词
 * @param {*} id 歌曲id
 */
export function getLyric(id) {
  return request({
    url: '/lyric',
    params: {
      id,
    },
  })
}

/**
 * 获取歌单详情
 * @param {*} id 歌单id
 */
export function getPlayListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
    },
  })
}