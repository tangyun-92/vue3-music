/*
 * @Author: 唐云 
 * @Date: 2021-05-21 11:03:23 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-25 14:20:17
 音乐播放器
 */
<template>
  <div class="player sprite_playbar" ref="playerRef">
    <div class="content wrap-980">
      <div class="control">
        <button class="prev sprite_playbar" @click="changeMusic(-1)"></button>
        <button
          class="play sprite_playbar"
          @click="playMusic"
          :style="{ backgroundPosition: isPlayOrPause }"
        ></button>
        <button class="next sprite_playbar" @click="changeMusic(1)"></button>
      </div>
      <div class="play-info">
        <div class="image">
          <router-link to="/discover/player">
            <img :src="getSizeImage(picUrl, 34)" />
          </router-link>
        </div>
        <div class="info">
          <div class="song">
            <span class="song-name">{{ currentSong.name }}</span>
            <a href="/todo" class="singer-name">{{ singerName }}</a>
          </div>
          <div class="progress">
            <a-slider
              id="test"
              v-model:value="progress"
              @change="sliderChange"
              @after-change="sliderAfterChange"
            />
            <div class="time">
              <span class="now-time">{{
                formatDate(currentTime, 'mm:ss')
              }}</span>
              <span class="divider"></span>
              <span class="duration">
                {{ formatDate(duration, 'mm:ss') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="operator">
        <div class="left">
          <button class="sprite_playbar btn favor"></button>
          <button class="sprite_playbar btn share"></button>
        </div>
        <div class="right sprite_playbar">
          <button class="sprite_playbar btn volume"></button>
          <button
            class="sprite_playbar btn loop"
            @click="changeSequence"
            :style="{ backgroundPosition: sequenceIcon }"
          ></button>
          <button class="sprite_playbar btn playlist" @click="handlePlayList">
            {{ playList.length }}
          </button>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @timeupdate="timeUpdate"
      @ended="handleMusicEnded"
    ></audio>
    <play-list v-show="isPlayList" />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { formatDate, getPlaySong, getSizeImage } from '@/utils/format-utils'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import PlayList from './components/play-list'
import useChangeCurrentSong from '@/hooks/useChangeCurrentSong'
import useClickOutSide from '@/hooks/useClickOutSide'

export default defineComponent({
  name: 'Player',
  components: {
    PlayList
  },
  setup() {
    const store = useStore()
    const currentTime = ref(0) // 播放中的时间
    const progress = ref(0) // 实时进度条（播放中）
    const isChanging = ref(false) // 是否正在改变进度条
    const isPlaying = ref(false) // 播放状态
    const audioRef = ref()
    const playerRef = ref()
    const isPlayList = ref(false) // 是否显示播放列表

    // 播放列表
    const playList = computed(() => store.state.player.playList)
    // 歌词列表
    const lyricList = computed(() => store.state.player.lyricList)
    // 当前歌词的索引
    const currentLyricIndex = computed(() => store.state.player.currentLyricIndex)
    // 播放方式
    const sequence = computed(() => store.state.player.sequence)
    // 播放器选中的歌曲
    const currentSong = computed(() => store.state.player.currentSong)
    // 是否显示播放列表
    const isPlayListStore = computed({
      get: () => store.state.player.isPlayList,
      set: (val) => {
        isPlayList.value = val
      }
    })
    // 歌曲总时长
    const duration = computed(() => currentSong.value.dt || 0)
    // 歌手
    const singerName = computed(
      () => (currentSong.value.ar && currentSong.value.ar[0].name) || ''
    )
    // 歌曲图片
    const picUrl = computed(
      () => (currentSong.value.al && currentSong.value.al.picUrl) || ''
    )
    // 播放方式按钮
    const sequenceIcon = computed(() => {
      switch (sequence.value) {
        case 1:
          return '-66px -248px'
        case 2:
          return '-66px -344px'
        default:
          return '-3px -344px'
      }
    })
    // 播放与暂停按钮
    const isPlayOrPause = computed(() => {
      if (isPlaying.value) {
        return '0 -165px'
      } else {
        return '0 -204px'
      }
    })

    onMounted(() => {
      audioRef.value.src = getPlaySong(currentSong.value.id)
    })

    // 点击播放列表外，隐藏播放列表
    const isClickOutSide = useClickOutSide(playerRef)
    watch(isClickOutSide, () => {
      if (isPlayList.value && isClickOutSide.value) {
        isPlayList.value = false
        store.commit('player/SET_IS_PLAY_LIST', false)
      }
    })

    // 监听是否显示播放列表
    watch(isPlayListStore, (newVal) => {
      isPlayList.value = newVal
      store.commit('player/SET_IS_PLAY_LIST', newVal)
    })
    // 监听歌曲改变
    watch(currentSong, () => {
      audioRef.value.src = getPlaySong(currentSong.value.id)
      audioRef.value.play().then(() => {
        isPlaying.value = true
      })
    })

    /**
     * 播放音乐
     */
    const playMusic = () => {
      isPlaying.value ? audioRef.value.pause() : audioRef.value.play()
      isPlaying.value = !isPlaying.value
      if (isPlaying.value) {
        message.success('已开始播放')
      } else {
        message.warning('已停止播放')
      }
    }
    /**
     * 改变播放方式
     */
    const changeSequence = () => {
      let currentSequence = sequence.value + 1
      if (currentSequence > 2) {
        currentSequence = 0
      }
      store.commit('player/SET_SEQUENCE', currentSequence)
    }
    /**
     * 改变进度条时
     */
    const sliderChange = (val) => {
      progress.value = val
      const newCurrentTime = (val / 100.0) * duration.value
      currentTime.value = newCurrentTime
      isChanging.value = true
    }
    /**
     * 进度条改变后
     */
    const sliderAfterChange = (val) => {
      const newCurrentTime = ((val / 100) * duration.value) / 1000 // 进度条改变后的时间
      audioRef.value.currentTime = newCurrentTime
      currentTime.value = newCurrentTime * 1000
      isChanging.value = false
      if (!isPlaying.value) {
        // 播放歌曲
        playMusic()
      }
    }
    /**
     * 更新播放时间
     */
    const timeUpdate = (e) => {
      const newCurrentTime = e.target.currentTime
      // 乘以1000转为毫秒
      if (!isChanging.value) {
        currentTime.value = newCurrentTime * 1000
        progress.value = ((newCurrentTime * 1000) / duration.value) * 100
      }

      // 获取当前的歌词
      let i = 0
      for (; i < lyricList.value.length; i++) {
        let lyricItem = lyricList.value[i]
        if (newCurrentTime * 1000 < lyricItem.time) {
          break
        }
      }
      const finalIndex = i - 1
      if (finalIndex !== currentLyricIndex.value) {
        store.commit('player/SET_CURRENT_LYRIC_INDEX', finalIndex)
      }
    }
    /**
     * 歌曲播放完毕时
     */
    const handleMusicEnded = () => {
      if (sequence.value === 2) {
        // 单曲循环
        audioRef.value.currentTime = 0
        audioRef.value.play()
      } else {
        // 自动切歌
        useChangeCurrentSong(store, 1)
      }
    }
    /**
     * 切歌
     */
    const changeMusic = (tag) => {
      useChangeCurrentSong(store, tag)
    }
    /**
     * 改变播放列表显示/隐藏状态
     */
    const handlePlayList = () => {
      isPlayList.value = !isPlayListStore.value
      store.commit('player/SET_IS_PLAY_LIST', isPlayList.value)
    }

    return {
      isClickOutSide,
      playerRef,
      audioRef,
      formatDate,
      currentTime,
      isPlaying,
      playMusic,
      isPlayOrPause,
      changeSequence,
      sequenceIcon,
      progress,
      sliderChange,
      currentSong,
      singerName,
      getSizeImage,
      picUrl,
      duration,
      sliderAfterChange,
      timeUpdate,
      handleMusicEnded,
      changeMusic,
      isPlayList,
      handlePlayList,
      playList
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
