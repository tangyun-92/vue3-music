import { getSongDetail } from '@/api/player'

/**
 * 将歌曲添加到播放列表
 * @param {
 *  store：vuex中的store
 *  songs?: 歌曲列表
 *  ids?：歌曲id列表
 *  id?：歌曲id
 *  way?：add-添加到列表 addAndPlay-添加到列表并播放
 * }
 */
function useAddPlayList({ store, songs, ids, id, way = 'addAndPlay' }) {
  let playList = []
  let song = null
  let songIndex = 0
  if (songs) {
    store.commit('player/SET_PLAY_LIST', [])
    playList = store.state.player.playList
    songs.forEach((item, index) => {
      handleStoreData({
        store,
        song,
        index,
        id: item.id,
        way,
        playList,
        isPush: false,
      })
      /* getSongDetail(item.id).then((res) => {
        const songs = res.songs && res.songs[0]
        if (!songs) return
        playList.push(songs)
        store.commit('player/SET_PLAY_LIST', playList)
        if (way !== 'add') {
          // 默认播放第一首
          if (index === 0) {
            song = playList[songIndex]
            handleStoreData(store, song, songIndex)
          }
        }
      }) */
    })
  } else if (ids) {
    store.commit('player/SET_PLAY_LIST', [])
    playList = store.state.player.playList
    ids.forEach((item, index) => {
      handleStoreData({
        store,
        song,
        index,
        id: item.id,
        way,
        playList,
        isPush: false,
      })
      // getSongDetail(item.id).then((res) => {
      //   const songs = res.songs && res.songs[0]
      //   if (!songs) return
      //   playList.push(songs)
      //   store.commit('player/SET_PLAY_LIST', playList)
      //   if (way !== 'add') {
      //     // 默认播放第一首
      //     if (index === 0) {
      //       song = playList[songIndex]
      //       handleStoreData(store, song, songIndex)
      //     }
      //   }
      // })
    })
  } else {
    playList = store.state.player.playList
    songIndex = playList.findIndex((song) => song.id === id)
    // 判断是否找到歌曲
    if (songIndex !== -1) {
      // 找到
      song = playList[songIndex]
      store.commit('player/SET_CURRENT_SONG_INDEX', songIndex)
      // 更新正在播放的歌曲
      store.commit('player/SET_CURRENT_SONG', song)
      // 请求歌曲的歌词
      store.dispatch('player/getLyricAction', song.id)
      // handleStoreData(store, song, songIndex)
    } else {
      // 没找到，请求歌曲数据
      /* getSongDetail(id).then((res) => {
        song = res.songs && res.songs[0]
        if (!song) return
        // 将请求到的歌曲放入播放列表
        const newPlayList = [...playList]
        newPlayList.push(song)
        // 更新播放列表
        store.commit('player/SET_PLAY_LIST', newPlayList)
        if (way !== 'add') {
          handleStoreData(store, song, newPlayList.length - 1)
        }
      }) */
      handleStoreData({
        store,
        song,
        id,
        way,
        playList,
        isPush: true,
      })
    }
  }
}

/**
 * 改变store中存储的信息
 * @param {*} store
 * @param {*} song
 * @param {*} index
 */
function handleStoreData({ store, index, id, way, playList, isPush }) {
  getSongDetail(id).then((res) => {
    let songs = res.songs && res.songs[0]
    if (!songs) return
    let newPlayList = playList
    // song = res.songs && res.songs[0]
    // if (!song) return
    // 将请求到的歌曲放入播放列表
    if (isPush) {
      newPlayList = [...playList]
      newPlayList.push(songs)
    } else {
      newPlayList.push(songs)
    }
    // 更新播放列表
    store.commit('player/SET_PLAY_LIST', newPlayList)
    if (way !== 'add') {
      if (!isPush) {
        if (index === 0) {
          songs = newPlayList[0]
          store.commit('player/SET_CURRENT_SONG_INDEX', 0)
          // 更新正在播放的歌曲
          store.commit('player/SET_CURRENT_SONG', songs)
          // 请求歌曲的歌词
          store.dispatch('player/getLyricAction', songs.id)
        }
      } else {
        // 更新正在播放歌曲的索引
        store.commit('player/SET_CURRENT_SONG_INDEX', newPlayList.length - 1)
        // 更新正在播放的歌曲
        store.commit('player/SET_CURRENT_SONG', songs)
        // 请求歌曲的歌词
        store.dispatch('player/getLyricAction', songs.id)
      }
      // handleStoreData(store, song, newPlayList.length - 1)
    }
  })

  /* // 更新正在播放歌曲的索引
  store.commit('player/SET_CURRENT_SONG_INDEX', index)
  // 更新正在播放的歌曲
  store.commit('player/SET_CURRENT_SONG', song)
  // 请求歌曲的歌词
  store.dispatch('player/getLyricAction', song.id) */
}

export default useAddPlayList
