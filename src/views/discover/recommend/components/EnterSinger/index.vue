/*
 * @Author: 唐云 
 * @Date: 2021-05-20 16:19:51 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 16:56:41
 入驻歌手
 */
<template>
  <div class="enter-singer">
    <div class="top">
      <div class="tit">入驻歌手</div>
      <a class="more">查看全部 ></a>
    </div>
    <div class="content">
      <div class="list-item" v-for="item in artistList" :key="item.id">
        <a class="item" href="#">
          <div class="head">
            <img :src="getSizeImage(item.picUrl, 62)">
          </div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="des text-nowrap">{{ item.alias ? item.alias[0] : '' }}</div>
          </div>
        </a>
      </div>
    </div>
    <a class="btn">申请成为网易音乐人</a>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getHotArtists } from '@/api/discover/artist'
import { getSizeImage } from '@/utils/format-utils'

export default defineComponent({
  name: 'RecommendEnterSinger',
  setup() {
    const artistList = ref([])
    onMounted(() => {
      getHotArtists(5).then((res) => {
        artistList.value = res.artists
      })
    })

    return {
      artistList,
      getSizeImage
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
