/*
 * @Author: 唐云 
 * @Date: 2021-05-21 11:03:23 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-21 17:12:22
 音乐播放器
 */
<template>
  <div class="player sprite_playbar">
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
          <button
            class="sprite_playbar btn playlist"
            @click="handlePlayList"
          ></button>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @timeupdate="timeUpdate"
      @ended="handleMusicEnded"
    ></audio>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { formatDate, getPlaySong, getSizeImage } from '@/utils/format-utils'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'Player',
  setup() {
    const store = useStore()
    const currentTime = ref(0) // 播放中的时间
    const progress = ref(0) // 实时进度条（播放中）
    const isChanging = ref(false) // 是否正在改变进度条
    const isPlaying = ref(false) // 播放状态
    const audioRef = ref()

    // 播放方式
    const sequence = computed(() => store.state.player.sequence)
    // 播放器选中的歌曲
    const currentSong = computed(() => store.state.player.currentSong)
    // 是否显示播放列表
    const isPlayList = computed(() => store.state.player.isPlayList)
    // 监听播放方式按钮
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
    // 监听播放与暂停按钮
    const isPlayOrPause = computed(() => {
      if (isPlaying.value) {
        return '0 -165px'
      } else {
        return '0 -204px'
      }
    })

    const duration = currentSong.value.dt || 0 // 歌曲总时长
    const singerName =
      (currentSong.value.ar && currentSong.value.ar[0].name) || '' // 歌手
    const picUrl = (currentSong.value.al && currentSong.value.al.picUrl) || '' // 歌曲图片

    onMounted(() => {
      audioRef.value.src = getPlaySong(currentSong.value.id)
      // audioRef.value.play()
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
      console.log(val)
      progress.value = val
      const newCurrentTime = (val / 100.0) * duration
      currentTime.value = newCurrentTime
      isChanging.value = true
    }
    /**
     * 进度条改变后
     */
    const sliderAfterChange = (val) => {
      const newCurrentTime = ((val / 100) * duration) / 1000 // 进度条改变后的时间
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
        progress.value = ((newCurrentTime * 1000) / duration) * 100
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
        store.dispatch('player/changeCurrentSong', 1)
      }
    }
    /**
     * 切歌
     */
    const changeMusic = (tag) => {
      store.dispatch('player/changeCurrentSong', tag)
    }
    /**
     * 改变播放列表显示/隐藏状态
     */
    const handlePlayList = () => {
      isPlayList.value = !isPlayList.value
      store.commit('player/SET_IS_PLAY_LIST', isPlayList.value)
    }

    return {
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
      handlePlayList
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
