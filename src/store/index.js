import { createStore } from 'vuex'
import player from './modules/player'
import topList from './modules/top-list'
import playList from './modules/play-list'
import djRadio from './modules/dj-radio'
import singer from './modules/singer'
import album from './modules/album'
// 持久化存储插件
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    player,
    topList,
    playList,
    djRadio,
    singer,
    album,
  },
  state: {},
  mutations: {},
  actions: {},
  plugins: [
    createPersistedState({
      key: 'VUE_MUSIC',
      reducer(state) {
        return {
          // 持久存储
          player: {
            playList: state.player.playList,
            sequence: state.player.sequence,
            currentSong: state.player.currentSong,
            currentSongIndex: state.player.currentSongIndex,
            lyricList: state.player.lyricList,
          },
          topList: {
            listId: state.topList.listId,
            listIndex: state.topList.listIndex,
          },
        }
      },
    }),
  ],
})
