import { createStore } from 'vuex'
import player from './modules/player'
// 持久化存储插件
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    player,
  },
  state: {},
  mutations: {},
  actions: {},
  plugins: [createPersistedState({
    key: 'VUE_MUSIC',
    reducer(state) {
      return {
        // 持久存储
        player: state.player
      }
    }
  })]
})
