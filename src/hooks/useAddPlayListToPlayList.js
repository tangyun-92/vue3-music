import { getPlayListDetail, getSongDetail } from '@/api/player'
import useAddSongToPlayList from '@/hooks/useAddSongToPlayList'

/**
 * 根据歌单id获取歌单详情-放入列表并播放
 * @param {*} id 歌单id
 * @param {*} way add-添加到列表 addAndPlay-添加到列表并播放
 */
function useAddPlayListToPlayList(store, id, way = 'addAndPlay') {
  store.commit('player/SET_PLAY_LIST', [])
  const playList = store.state.player.playList

  getPlayListDetail(id).then((response) => {
    const trackIds = response.playlist.trackIds
    trackIds.forEach((item, index) => {
      getSongDetail(item.id).then((res) => {
        const song = res.songs && res.songs[0]
        if (!song) return
        playList.push(song)
        store.commit('player/SET_PLAY_LIST', playList)
        if (way !== 'add') {
          // 默认播放第一首
          if (index === 0) {
            useAddSongToPlayList(store, playList[0].id, 'addAndPlay')
          }
        }
      })
    })
  })
}

export default useAddPlayListToPlayList
