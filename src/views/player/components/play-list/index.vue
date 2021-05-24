/*
 * @Author: 唐云 
 * @Date: 2021-05-21 11:09:00 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-24 09:29:04
 播放列表组件
 */
<template>
  <div class="play-list">
    <div class="mask"></div>
    <div class="container">
      <list-header />
      <div class="content">
        <img src="" alt="">
        <list-song />
        <div class="line"></div>
        <list-lyric />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ListHeader from './list-header'
import ListSong from './song-list'
import ListLyric from './list-lyric'

export default defineComponent ({
  name: 'PlayList',
  components: {
    ListHeader,
    ListSong,
    ListLyric
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
