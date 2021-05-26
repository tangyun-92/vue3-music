/*
 * @Author: 唐云 
 * @Date: 2021-05-19 15:08:24 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 14:09:20
 专辑封面组件
 */
<template>
  <div class="album-cover sprite_02" :style="{ width: size.width }">
    <div class="cover" :style="{ width: size.size, height: size.size }">
      <img :src="getSizeImage(data.picUrl, 150)" :alt="data.name" />
      <a
        href="#"
        class="mask sprite_cover"
        :style="{
          width: size.width,
          height: size.size,
          backgroundPosition: +'0' + size.bgp
        }"
      ></a>
      <span class="play sprite_icon" @click="playMusic"></span>
    </div>
    <p class="title text-nowrap">{{ data.name }}</p>
    <p class="name text-nowrap">{{ data.artist.name }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getSizeImage } from '@/utils/format-utils'
import { getAlbumDetail } from '@/api/discover/album'
import useAddPlayList from '@/hooks/useAddPlayList'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'TAlbumCover',
  props: {
    data: Object,
    size: {
      type: Object,
      defaut() {
        return {
          width: '118px',
          size: '100px',
          bgp: '-570px'
        }
      }
    }
  },
  setup(props) {
    const store = useStore()
    /**
     * 播放音乐
     */
    const playMusic = () => {
      getAlbumDetail(props.data.id).then((res) => {
        useAddPlayList({
          store,
          songs: res.songs
        })
      })
    }

    return {
      getSizeImage,
      playMusic
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
