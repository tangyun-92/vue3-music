import { getRandomNumber } from '@/utils/math.utils'

/**
 * 切歌
 * @param {*} tag 0-顺序播放 1-随机播放 2-单曲循环
 */
function useChangeCurrentSong(store, tag) {
  const sequence = store.state.player.sequence
  const playList = store.state.player.playList
  let currentSongIndex = store.state.player.currentSongIndex
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
  store.commit('player/SET_CURRENT_SONG_INDEX', currentSongIndex)
  store.commit('player/SET_CURRENT_SONG', currentSong)
  // 获取歌词
  store.dispatch('player/getLyricAction', currentSong.id)
}

export default useChangeCurrentSong
