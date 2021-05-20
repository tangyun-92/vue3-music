/*
 * @Author: 唐云 
 * @Date: 2021-05-18 16:41:19 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 17:16:21
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
      <div class="wrap-right">
        <div class="user-login sprite_02">
          <p class="note">
            登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
          </p>
          <a class="btn sprite_02" href="#">用户登录</a>
        </div>
        <enter-singer />
        <hot-anchor />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Banner from './components/Banner'
import HotRecommend from './components/HotRecommend'
import NewAlbum from './components/NewAlbum'
import TopList from './components/TopList'
import EnterSinger from './components/EnterSinger'
import HotAnchor from './components/HotAnchor'

export default defineComponent({
  name: 'Recommend',
  components: {
    Banner,
    HotRecommend,
    NewAlbum,
    TopList,
    EnterSinger,
    HotAnchor
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
