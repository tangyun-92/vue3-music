import { getSongDetail } from '@/api/player'

/**
 * 将歌曲添加到播放列表并播放
 * @param {*} store vuex中store
 * @param {*} ids 歌曲id
 * @param {*} way add-添加到列表 addAndPlay-添加到列表并播放
 */
function useAddSongToPlayList(store, ids, way = 'addAndPlay') {
  const playList = store.state.player.playList
  const songIndex = playList.findIndex((song) => song.id === ids)

  // 判断是否找到歌曲
  let song = null
  if (songIndex !== -1) {
    // 找到
    store.commit('player/SET_CURRENT_SONG_INDEX', songIndex)
    song = playList[songIndex]
    store.commit('player/SET_CURRENT_SONG', song)
    // 请求歌曲的歌词
    store.dispatch('player/getLyricAction', song.id)
  } else {
    // 没找到，请求歌曲数据
    getSongDetail(ids).then((res) => {
      song = res.songs && res.songs[0]
      if (!song) return
      // 将请求到的歌曲放入播放列表
      const newPlayList = [...playList]
      newPlayList.push(song)
      // 更新播放列表
      store.commit('player/SET_PLAY_LIST', newPlayList)
      if (way !== 'add') {
        // 更新正在播放歌曲的索引
        store.commit('player/SET_CURRENT_SONG_INDEX', newPlayList.length - 1)
        // 更新正在播放的歌曲
        store.commit('player/SET_CURRENT_SONG', song)
        // 请求歌曲的歌词
        store.dispatch('player/getLyricAction', song.id)
      }
    })
  }
}

export default useAddSongToPlayList