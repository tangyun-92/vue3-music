/*
 * @Author: 唐云
 * @Date: 2021-05-26 14:51:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-03 15:28:46
 * 歌手
 */
import { getSingerTypeList } from '@/api/discover/singer'

const getDefaultState = () => {
  return {
    currentTitle: [], // 当前选中的title
    singerList: [], // 歌手列表
  }
}

const state = getDefaultState()

const mutations = {
  SET_CURRENT_TITLE(state, data) {
    state.currentTitle = data
  },
  SET_SINGER_LIST(state, data) {
    state.singerList = data
  },
}

const actions = {
  /**
   * 获取歌手分类列表
   * @param {*} type 类型
   * @param {*} area 地区
   * @param {*} initial 首字母索引
   */
  getSingerTypeList(
    { commit },
    { limit = 100, offset = 0, type, area, initial }
  ) {
    getSingerTypeList(limit, offset, type, area, initial).then((res) => {
      commit('SET_SINGER_LIST', res.artists)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
