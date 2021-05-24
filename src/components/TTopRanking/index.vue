/*
 * @Author: 唐云 
 * @Date: 2021-05-20 09:16:00 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-24 15:34:36
 发现音乐-榜单组件
 */
<template>
  <div class="top-ranking">
    <div class="top">
      <div class="cover">
        <img :src="getSizeImage(list.coverImgUrl, 80)" :alt="list.name" />
        <a href="#" class="mask sprite_cover"></a>
      </div>
      <div class="tit">
        <a href="" class="name">{{ list.name }}</a>
        <div class="btn">
          <div class="play sprite_02"></div>
          <div class="col sprite_02"></div>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="(item, index) in list.tracks" :key="item.id" class="list-item">
        <div class="rank">{{ index + 1 }}</div>
        <div class="song">
          <div class="name text-nowrap">{{ item.name }}</div>
          <div class="operate">
            <button
              class="btn sprite_02 play"
              @click="playMusic(item)"
            ></button>
            <button
              class="btn sprite_icon2 addto"
              @click="addToPlayList(item)"
            ></button>
            <button class="btn sprite_02 favor"></button>
          </div>
        </div>
      </li>
    </ul>
    <div class="more">
      <a href="#">查看全部></a>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getTopList } from '@/api/discover/recommend'
import { getSizeImage } from '@/utils/format-utils'
import { useStore } from 'vuex'
import useAddSongToPlayList from '@/hooks/useAddSongToPlayList'

export default defineComponent({
  name: 'TTopRanking',
  props: {
    id: {
      type: Number,
      default() {
        return 19723756
      }
    }
  },
  setup(props) {
    const store = useStore()
    const list = ref([])

    onMounted(() => {
      getTopList(props.id).then((res) => {
        list.value = res.playlist
        list.value.tracks = list.value.tracks.slice(0, 10)
      })
    })

    /**
     * 播放音乐
     */
    const playMusic = (item) => {
      useAddSongToPlayList(store, item.id)
    }
    /**
     * 添加到播放列表
     */
    const addToPlayList = (item) => {
      useAddSongToPlayList(store, item.id, 'add')
    }

    return {
      list,
      getSizeImage,
      playMusic,
      addToPlayList
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
