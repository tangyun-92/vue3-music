import { getSongDetail } from '@/api/player'
import useAddSongToPlayList from '@/hooks/useAddSongToPlayList'

/**
 * 将榜单歌曲添加到播放列表并播放
 * @param {*} store
 * @param {*} songs 歌曲列表
 */
function useAddPlayListByRanking(store, songs) {
  store.commit('player/SET_PLAY_LIST', [])
  const playList = store.state.player.playList

  songs.forEach((item, index) => {
    getSongDetail(item.id).then((res) => {
      const song = res.songs && res.songs[0]
      if (!song) return
      playList.push(song)
      store.commit('player/SET_PLAY_LIST', playList)
      // 默认播放第一首
      if (index === 0) {
        useAddSongToPlayList(store, playList[0].id, 'addAndPlay')
      }
    })
  })
}

export default useAddPlayListByRanking
