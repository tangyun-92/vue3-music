/*
 * @Author: 唐云 
 * @Date: 2021-05-18 16:41:19 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 10:56:14
 发现音乐-推荐
 */
<template>
  <div>
    <banner />
    <div class="wrap-980 content">
      <div class="wrap-left">
        <hot-recommend />
        <new-album />
        <top-list />
      </div>
      <div class="wrap-right"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Banner from './components/Banner'
import HotRecommend from './components/HotRecommend'
import NewAlbum from './components/NewAlbum'
import TopList from './components/TopList'

export default defineComponent({
  name: 'Recommend',
  components: { Banner, HotRecommend, NewAlbum, TopList }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
