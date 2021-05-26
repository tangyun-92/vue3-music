/*
 * @Author: 唐云
 * @Date: 2021-05-21 14:06:30
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 15:28:41
 * 播放器
 */
import { parseLyric } from '@/utils/parse-lyric'
import { getLyric } from '@/api/player'

// import { getTopList } from '@/api/discover/recommend'

const getDefaultState = () => {
  return {
    playList: [], // 播放列表
    sequence: 0, // 播放方式 0-列表循环 1-随机 2-单曲循环
    currentSong: {}, // 当前播放的歌曲
    currentSongIndex: 0, // 当前播放歌曲的索引
    isPlayList: false, // 是否显示播放列表
    lyricList: [], // 歌词列表
    currentLyricIndex: 0, // 当前播放歌词的索引
  }
}

const state = getDefaultState()

const mutations = {
  SET_PLAY_LIST(state, list) {
    state.playList = list
  },
  SET_SEQUENCE(state, val) {
    state.sequence = val
  },
  SET_CURRENT_SONG(state, data) {
    state.currentSong = data
  },
  SET_CURRENT_SONG_INDEX(state, val) {
    state.currentSongIndex = val
  },
  SET_IS_PLAY_LIST(state, val) {
    state.isPlayList = val
  },
  SET_LYRIC_LIST(state, list) {
    state.lyricList = list
  },
  SET_CURRENT_LYRIC_INDEX(state, val) {
    state.currentLyricIndex = val
  },
}

const actions = {
  /**
   * 获取歌词并解析成数组
   * @param {*} id 歌曲id
   */
  getLyricAction({ commit }, id) {
    getLyric(id).then((res) => {
      const lyric = res.lrc.lyric
      const lyricList = parseLyric(lyric)
      commit('SET_LYRIC_LIST', lyricList)
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
