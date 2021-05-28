/*
 * @Author: 唐云
 * @Date: 2021-05-26 14:51:35
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 11:27:21
 * 热门电台
 */
import {
  getHotRadioRanks,
  getProgramRanks,
  getAllRadioClassify,
  getTypeRecommends,
} from '@/api/discover/dj-radio'

const getDefaultState = () => {
  return {
    hotRadioRanks: [], // 热门电台榜
    programRanks: [], // 节目排行榜
    allRadioClassify: [], // 所有分类
    typeRecommendStory: [], // 分类推荐-音乐故事
    typeRecommendSleeping: [], // 分类推荐-助眠解压
    typeRecommendTalking: [], // 分类推荐-谈天说地
    typeRecommendEmotional: [], // 分类推荐-情感调频
    typeRecommendCover: [], // 分类推荐-创作翻唱
    typeRecommendOther: [], // 分类推荐-其他
  }
}

const state = getDefaultState()

const mutations = {
  SET_HOT_RADIO_RANKS(state, data) {
    state.hotRadioRanks = data
  },
  SET_PROGRAM_RANKS(state, data) {
    state.programRanks = data
  },
  SET_ALL_RADIO_CLASSIFY(state, data) {
    state.allRadioClassify = data
  },
  SET_TYPE_RECOMMEND_STORY(state, data) {
    state.typeRecommendStory = data
  },
  SET_TYPE_RECOMMEND_SLEEPING(state, data) {
    state.typeRecommendSleeping = data
  },
  SET_TYPE_RECOMMEND_TALKING(state, data) {
    state.typeRecommendTalking = data
  },
  SET_TYPE_RECOMMEND_EMOTIONAL(state, data) {
    state.typeRecommendEmotional = data
  },
  SET_TYPE_RECOMMEND_COVER(state, data) {
    state.typeRecommendCover = data
  },
  SET_TYPE_RECOMMEND_OTHER(state, data) {
    state.typeRecommendOther = data
  },
}

const actions = {
  getTypeRecommends({ commit }, typeId) {
    getTypeRecommends(typeId).then((res) => {
      switch (typeId) {
        case 2:
          commit('SET_TYPE_RECOMMEND_STORY', res.djRadios)
          break
        case 6:
          commit('SET_TYPE_RECOMMEND_SLEEPING', res.djRadios)
          break
        case 5:
          commit('SET_TYPE_RECOMMEND_TALKING', res.djRadios)
          break
        case 3:
          commit('SET_TYPE_RECOMMEND_EMOTIONAL', res.djRadios)
          break
        case 2001:
          commit('SET_TYPE_RECOMMEND_COVER', res.djRadios)
          break
        case 11:
          commit('SET_TYPE_RECOMMEND_OTHER', res.djRadios)
          break
        default:
          break
      }
    })
  },
  /**
   * 所有分类
   */
  getAllRadioClassify({ commit }) {
    getAllRadioClassify().then((res) => {
      const array = res.categories
      array.push(
        { name: '常见问题', id: 777685787 },
        { name: '我要做主播', id: 898675765 }
      )
      commit('SET_ALL_RADIO_CLASSIFY', array)
    })
  },
  /**
   * 热门电台榜
   * @param {*} limit
   */
  getHotRadioRanks({ commit }, limit) {
    getHotRadioRanks(limit).then((res) => {
      commit('SET_HOT_RADIO_RANKS', res.toplist)
    })
  },
  /**
   * 节目排行榜
   * @param {*} limit
   */
  getProgramRanks({ commit }, limit) {
    getProgramRanks(limit).then((res) => {
      commit('SET_PROGRAM_RANKS', res.toplist)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
