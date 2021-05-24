/*
 * @Author: 唐云
 * @Date: 2021-05-21 14:06:30
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-24 16:08:52
 * 播放器
 */
import { parseLyric } from '@/utils/parse-lyric'
import { getLyric } from '@/api/player'

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
  /**
   * 切歌
   * @param {*} tag 0-顺序播放 1-随机播放 2-单曲循环
   */
  /* changeCurrentSong({ commit }, tag) {
    const sequence = state.sequence
    const playList = state.playList
    let currentSongIndex = state.currentSongIndex
    let randomIndex = getRandomNumber(playList.length)

    switch (sequence) {
      case 1: // 随机播放
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(playList.length)
        }
        currentSongIndex = randomIndex
        break
      default:
        // 顺序播放
        currentSongIndex += tag
        if (currentSongIndex >= playList.length) {
          currentSongIndex = 0
        }
        if (currentSongIndex < 0) {
          currentSongIndex = playList.length - 1
        }
        break
    }

    const currentSong = playList[currentSongIndex]
    commit('SET_CURRENT_SONG_INDEX', currentSongIndex)
    commit('SET_CURRENT_SONG', currentSong)
    // 获取歌词
    commit('SET_LYRIC_LIST', currentSong.id)
  }, */
  /**
   * 将歌曲添加到播放列表并播放
   * @param {*} ids 歌曲id
   * @param {*} way add-添加到列表 addAndPlay-添加到列表并播放
   */
  /* getSongToPlayList({ commit, dispatch }, ids, way = 'addAndPlay') {
    const playList = state.playList
    const songIndex = playList.findIndex((song) => song.id === ids)

    // 判断是否找到歌曲
    let song = null
    if (songIndex !== -1) {
      // 找到
      commit('SET_CURRENT_SONG_INDEX', songIndex)
      song = playList[songIndex]
      commit('SET_CURRENT_SONG', song)
      // 请求歌曲的歌词
      dispatch('getLyricAction', song.id)
    } else {
      // 没找到，请求歌曲数据
      getSongDetail(ids).then((res) => {
        song = res.songs && res.songs[0]
        if (!song) return
        // 将请求到的歌曲放入播放列表
        const newPlayList = [...playList]
        newPlayList.push(song)
        console.log(newPlayList)
        // 更新播放列表
        commit('SET_PLAY_LIST', newPlayList)
        if (way !== 'add') {
          // 更新正在播放歌曲的索引
          commit('SET_CURRENT_SONG_INDEX', newPlayList.length - 1)
          // 更新正在播放的歌曲
          commit('SET_CURRENT_SONG', song)
          // 请求歌曲的歌词
          dispatch('getLyricAction', song.id)
        }
      })
    }
  }, */
  /**
   * 根据歌单id获取歌单详情-放入列表并播放
   * @param {*} id 歌单id
   * @param {*} way add-添加到列表 addAndPlay-添加到列表并播放
   */
  /* getPlayListDetailToPlayList({ commit, dispatch }, id, way = 'addAndPlay') {
    const playList = state.playList

    getPlayListDetail(id).then((response) => {
      const trackIds = response.playlist.trackIds
      trackIds.forEach((item, index) => {
        getSongDetail(item.id).then((res) => {
          const song = res.songs && res.songs[0]
          if (!song) return
          playList.push(song)
          commit('SET_PLAY_LIST', playList)
          if (way !== 'add') {
            // 默认播放第一首
            if (index === 0) {
              dispatch('getSongToPlayList', playList[0].id, 'addAndPlay')
            }
          }
        })
      })
    })
  }, */
  /**
   * 获取歌词并解析
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
