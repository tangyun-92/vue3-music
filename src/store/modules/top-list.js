/*
* @Author: 唐云
* @Date: 2021-05-26 14:51:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-27 11:27:37
* 排行榜
*/
import { getAllTopList, getTopListDetail } from '@/api/discover/top-list'

const getDefaultState = () => {
  return {
    cloudMusicTopList: [], // 云音乐榜单列表
    topListDetail: [], // 榜单详情
    listIndex: 0, // 当前选中榜单的索引
    listId: 19723756, // 当前选中榜单的id，默认选中飙升榜
  }
}

const state = getDefaultState()

const mutations = {
  SET_CLOUD_MUSIC_TOP_LIST(state, data) {
    state.cloudMusicTopList = data
  },
  SET_TOP_LIST_DETAIL(state, data) {
    state.topListDetail = data
  },
  SET_LIST_INDEX(state, index) {
    state.listIndex = index
  },
  SET_LIST_ID(state, id) {
    state.listId = id
  }
}

const actions = {
  /**
   * 获取云音乐榜单列表
   */
  getCloudMusicTopList({ commit }) {
    getAllTopList().then((res) => {
      commit('SET_CLOUD_MUSIC_TOP_LIST', res.list)
    })
  },
  /**
   * 获取榜单详情
   * @param {*} id
   */
  getTopListDetail({ commit }, id) {
    getTopListDetail(id).then((res) => {
      commit('SET_TOP_LIST_DETAIL', res.playlist)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
