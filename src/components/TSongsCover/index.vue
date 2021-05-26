/*
 * @Author: 唐云 
 * @Date: 2021-05-19 09:50:42 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 11:18:50
 歌曲封面组件
 */
<template>
  <div class="songs-cover">
    <div class="cover">
      <img :src="getSizeImage(list.picUrl || list.coverImgUrl, 140)" />
      <a class="msk sprite_cover" :title="list.name" href=""></a>
      <div class="bottom sprite_cover">
        <div class="info">
          <span class="icon sprite_icon"></span>
          <span class="num">{{ getCount(list.playCount) }}</span>
        </div>
        <a class="play sprite_icon" @click="playMusic(list.id)"></a>
      </div>
    </div>
    <div class="des">
      <a calss="tit" href="">{{ list.name }}</a>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { getCount, getSizeImage } from '@/utils/format-utils'
import { useStore } from 'vuex'
import { getPlayListDetail } from '@/api/player'
import useAddPlayList from '@/hooks/useAddPlayList'

export default defineComponent({
  name: 'SongsCover',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const list = computed(() => props.data)

    const playMusic = (id) => {
      getPlayListDetail(id).then((res) => {
        const trackIds = res.playlist.trackIds
        useAddPlayList({
          store,
          songs: trackIds
        })
      })
    }

    return {
      list,
      getCount,
      getSizeImage,
      playMusic
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
