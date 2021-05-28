/*
 * @Author: 唐云
 * @Date: 2021-05-27 10:42:08
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 17:43:42
 * 歌单
 */
import { getPlayListClassify, getClassifySongs } from '@/api/discover/play-list'

const getDefaultState = () => {
  return {
    playListClassify: [], // 歌单分类列表
    currentClassify: '全部', // 选中的分类
    classifySongs: {}, // 分类下的歌单列表
    currentPage: 1, // 当前选中的分页
    pageSize: 35, // 每页显示条数
  }
}

const state = getDefaultState()

const mutations = {
  SET_PLAY_CLASSIFY(state, data) {
    state.playListClassify = data
  },
  SET_CURRENT_CLASSIFY(state, data) {
    state.currentClassify = data
  },
  SET_CLASSIFY_SONGS(state, data) {
    state.classifySongs = data
  },
  SET_CURRENT_PAGE(state, data) {
    state.currentPage = data
  },
  SET_PAGE_SIZE(state, data) {
    state.pageSize = data
  },
}

const actions = {
  /**
   * 获取歌单分类
   */
  getPlayListClassify({ commit }) {
    getPlayListClassify().then((res) => {
      const category = res.categories
      // 创建类别数据结构
      const categoryData = Object.entries(category).map(([, value]) => {
        return {
          name: value,
          subs: [],
        }
      })
      // 将类别数据添加到数组对应的对象中
      for (let item of res.sub) {
        categoryData[item.category].subs.push(item)
      }
      commit('SET_PLAY_CLASSIFY', categoryData)
    })
  },
  /**
   * 获取分类下的歌单列表
   * @param {*} cat 分类
   * @param {*} page 每页显示条数
   * @param {*} offset 当前第几页
   * @param {*} order 最新/最热
   */
  getClassifySongs({ commit }, { cat, page = 35, offset = 0, order }) {
    getClassifySongs(cat, page, offset, order).then((res) => {
      commit('SET_CLASSIFY_SONGS', res)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
