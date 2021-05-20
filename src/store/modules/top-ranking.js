// import { getTopList } from '@/api/discover/recommend'

const getDefaultState = () => {
  return {
    // surgeRanking: [], // 飙升榜
  }
}

const state = getDefaultState()

const mutations = {
  // GET_SURGE_RANKING(state, data) {
  //   state.surgeRanking = data
  // },
}

const actions = {
  // getSurgeRanking({ commit }, id) {
  //   getTopList(id).then((res) => {
  //     commit('GET_SURGE_RANKING', res.playlist)
  //   })
  // },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
