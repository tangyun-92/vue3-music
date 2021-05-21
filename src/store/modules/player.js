/*
 * @Author: 唐云
 * @Date: 2021-05-21 14:06:30
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-21 17:14:44
 * 播放器
 */

// import { getTopList } from '@/api/discover/recommend'

const getDefaultState = () => {
  return {
    playList: [], // 播放列表
    sequence: 0, // 播放方式 0-列表循环 1-随机 2-单曲循环
    currentSong: {
      name: '海阔天空',
      id: 1840192925,
      pst: 0,
      t: 0,
      ar: [
        {
          name: 'Beyond',
        },
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000004240302',
      fee: 1,
      v: 105,
      crbt: null,
      cf: '',
      al: {
        picUrl:
          'https://p1.music.126.net/8y8KJC1eCSO_vUKf2MyZwA==/109951165796899183.jpg',
      },
      dt: 256550,
      h: {},
      m: {},
      l: {},
      a: null,
      cd: '1',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 1,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      originSongSimpleData: null,
      resourceState: true,
      single: 0,
      noCopyrightRcmd: null,
      mv: 376199,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 7002,
      publishTime: 746812800000,
    }, // 当前播放的歌曲
    currentSongIndex: 0, // 当前播放歌曲的索引
    isPlayList: false, // 是否显示播放列表
    lyricList: [], // 歌词
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
  // getSurgeRanking({ commit }, id) {
  //   getTopList(id).then((res) => {
  //     commit('GET_SURGE_RANKING', res.playlist)
  //   })
  // },
  // 切歌
  changeCurrentSong({commit}, tag) {
    console.log(commit)
    console.log(tag)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
