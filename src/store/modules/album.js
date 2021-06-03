/*
 * @Author: 唐云
 * @Date: 2021-05-26 14:51:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-03 16:19:15
 * 歌手
 */
import { getAlbumList } from '@/api/discover/album'

const getDefaultState = () => {
  return {
    albumList: [], // 新碟列表
  }
}

const state = getDefaultState()

const mutations = {
  SET_ALBUM_LIST(state, data) {
    state.albumList = data
  },
}

const actions = {
  /**
   * 获取全部新碟列表
   * @param {*} area 地区
   */
  getAlbumList({ commit }, { limit = 35, offset = 0, area }) {
    getAlbumList(limit, offset, area).then((res) => {
      commit('SET_ALBUM_LIST', res.weekData || res.monthData)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
