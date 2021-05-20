/*
 * @Author: 唐云 
 * @Date: 2021-05-20 09:16:00 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 14:48:08
 发现音乐-榜单组件
 */
<template>
  <div class="top-ranking">
    <div class="top">
      <div class="cover">
        <img :src="getSizeImage(list.coverImgUrl, 80)" :alt="list.name">
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
            <button class="btn sprite_02 play"></button>
            <button class="btn sprite_icon2 addto"></button>
            <button class="btn sprite_02 favor"></button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getTopList } from '@/api/discover/recommend'
import { getSizeImage } from '@/utils/format-utils'

export default defineComponent ({
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
    const list = ref([])
    onMounted(() => {
      getTopList(props.id).then(res => {
        list.value = res.playlist
        list.value.tracks = list.value.tracks.slice(0, 10)
      })
    })

    return {
      list,
      getSizeImage
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
