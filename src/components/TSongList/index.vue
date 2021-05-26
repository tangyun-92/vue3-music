/*
 * @Author: 唐云 
 * @Date: 2021-05-26 16:54:46 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 17:21:43
 歌曲组件列表
 */
<template>
  <div class="t-song-list">
    <table>
      <thead>
        <tr class="header">
          <th class="ranking"></th>
          <th class="title">标题</th>
          <th class="duration">时长</th>
          <th class="singer">歌手</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in list" :key="item.id">
          <td>
            <div class="rank-num">
              <span class="num">{{ index + 1 }}</span>
              <span class="new sprite_icon2"></span>
            </div>
          </td>
          <td>
            <div class="song-name">
              <img v-if="index < 3" :src="getSizeImage(item.al.picUrl, 50)" alt="">
              <span class="play sprite_table" @click="playMusic(item.id)"></span>
              <span class="name">{{ item.name }}</span>
            </div>
          </td>
          <td>{{ formatMinuteSecond(item.dt) }}</td>
          <td>{{ item.ar[0].name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getSizeImage, formatMinuteSecond } from '@/utils/format-utils'
import useAddPlayList from '@/hooks/useAddPlayList'
import { useStore } from 'vuex'

export default defineComponent ({
  name: 'TSongList',
  props: {
    list: Array
  },
  setup() {
    const store = useStore()

    /**
     * 播放音乐
     */
    const playMusic = (id) => {
      useAddPlayList({
        store,
        id
      })
    }

    return {
      getSizeImage,
      formatMinuteSecond,
      playMusic
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
