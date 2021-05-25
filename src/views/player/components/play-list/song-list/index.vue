/*
 * @Author: 唐云 
 * @Date: 2021-05-24 10:55:19 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-25 16:46:47
 播放列表-歌曲列表组件
 */
<template>
  <div class="song-list">
    <div class="have-song"  v-if="playList.length > 0">
      <div
        class="song-list"
        :class="{ active: currentSongIndex === index }"
        v-for="(item, index) in playList"
        :key="item.id"
        @click="playMusic(item)"
      >
        <span class="song-play"></span>
        <span class="song-name text-nowrap">{{ item.name }}</span>
        <span class="song-opera">
          <div class="opera">
            <button class="btn collect sprite_playlist"></button>
            <button class="btn share sprite_playlist"></button>
            <button class="btn download sprite_playlist"></button>
            <button
              class="btn del sprite_playlist"
              @click="delSong(item.id, $event)"
            ></button>
          </div>
        </span>
        <span class="singer text-nowarp">{{ item.ar[0].name }}</span>
        <span class="song-tiem">{{ formatMinuteSecond(item.dt) }}</span>
        <span class="song-from">
          <i class="from-icon sprite_playlist"></i>
        </span>
      </div>
    </div>
    <div class="no-song" v-else>
      <i class="icon sprite_playlist"></i>
      你还没有添加任何歌曲
      <br />
      去首页
      <router-link to="/discover" class="link" @click="hidePlayList()"
        >发现音乐</router-link
      >
      ，或在
      <router-link to="/my" class="link" @click="hidePlayList()"
        >我的音乐</router-link
      >
      收听自己收藏的歌单。
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import { formatMinuteSecond } from '@/utils/format-utils'
import useAddSongToPlayList from '@/hooks/useAddSongToPlayList'

export default defineComponent({
  name: 'PlayListSongList',
  setup() {
    const store = useStore()

    const playList = computed(() => store.state.player.playList)
    const currentSongIndex = computed(() => store.state.player.currentSongIndex)
    const currentSong = computed(() => store.state.player.currentSong)

    /**
     * 隐藏播放列表
     */
    const hidePlayList = () => {
      store.commit('player/SET_IS_PLAY_LIST', false)
    }
    /**
     * 播放列表中的音乐
     */
    const playMusic = (item) => {
      useAddSongToPlayList(store, item.id, 'addAndPlay')
    }
    /**
     * 删除列表中的歌曲
     */
    const delSong = (id, e) => {
      e.stopPropagation()
      let newPlayList = [...playList.value]
      const playingId = currentSong.value.id

      newPlayList.forEach((item, index) => {
        if (item.id === id) {
          if (item.id !== playingId) {
            newPlayList.splice(index, 1)
            store.commit('player/SET_PLAY_LIST', newPlayList)
            useAddSongToPlayList(store, playingId, 'add')
          } else {
            // 如果删除正在播放的歌曲
            newPlayList.splice(index, 1)
            store.commit('player/SET_PLAY_LIST', newPlayList)
            if (newPlayList.length !== 0) {
              if (newPlayList.length === index) {
                // 如果是列表的最后一首自动播放上一首
                playMusic(newPlayList[index - 1])
              } else {
                // 播放下一首
                playMusic(newPlayList[index])
              }
            } else {
              // 如果是最后一首，清空播放中的歌曲
              store.commit('player/SET_CURRENT_SONG', {})
            }
          }
        }
      })
    }

    return {
      playList,
      currentSongIndex,
      currentSong,
      formatMinuteSecond,
      hidePlayList,
      playMusic,
      delSong
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
