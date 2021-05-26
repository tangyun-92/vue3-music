import { getSongDetail } from '@/api/player'

/**
 * 将歌曲添加到播放列表
 * @param {
 *  store：store
 *  songs?: 歌曲列表
 *  id?：歌曲id
 *  way?：add-添加到列表 addAndPlay-添加到列表并播放
 * }
 */
function useAddPlayList({ store, songs, id, way = 'addAndPlay' }) {
  let playList = []
  let song = null
  let songIndex = 0
  if (songs) {
    store.commit('player/SET_PLAY_LIST', [])
    playList = store.state.player.playList
    songs.forEach((item, index) => {
      handleSongDetail({
        store,
        index,
        id: item.id,
        way
      })
    })
  } else {
    playList = store.state.player.playList
    songIndex = playList.findIndex((song) => song.id === id)
    // 判断是否找到歌曲
    if (songIndex !== -1) {
      // 找到
      song = playList[songIndex]
      handleStoreData(store, song, songIndex)
    } else {
      handleSongDetail({
        store,
        song,
        id,
        way
      })
    }
  }
}

/**
 * 请求歌曲详情
 * @param {
 *   store: store
 *   index: 循环的索引
 *   id: 歌曲id
 *   way: add-添加到列表 addAndPlay-添加到列表并播放
 * }
 */
function handleSongDetail({ store, index, id, way }) {
  getSongDetail(id).then((res) => {
    let songs = res.songs && res.songs[0]
    if (!songs) return
    let newPlayList = store.state.player.playList
    // 将请求到的歌曲放入播放列表
    newPlayList.push(songs)
    // 更新播放列表
    store.commit('player/SET_PLAY_LIST', newPlayList)
    if (way !== 'add') {
      if (index) {
        if (index === 0) {
          songs = newPlayList[0]
          handleStoreData(store, songs, 0)
        }
      } else {
        handleStoreData(store, songs, newPlayList.length - 1)
      }
    }
  })
}

/**
 * 操作store中的数据
 * @param {*} store store
 * @param {*} songs 歌曲信息
 * @param {*} index 歌曲索引
 */
function handleStoreData(store, songs, index) {
  // 更新正在播放歌曲的索引
  store.commit('player/SET_CURRENT_SONG_INDEX', index)
  // 更新正在播放的歌曲
  store.commit('player/SET_CURRENT_SONG', songs)
  // 请求歌曲的歌词
  store.dispatch('player/getLyricAction', songs.id)
}

export default useAddPlayList
