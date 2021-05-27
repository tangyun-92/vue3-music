/*
 * @Author: 唐云 
 * @Date: 2021-05-27 10:21:00 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-27 10:25:45
 歌单
 */
<template>
  <div class="play-list wrap-980">
    <div class="content">
      <play-list-header />
      <play-list-content />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import PlayListHeader from './components/PlayListHeader'
import PlayListContent from './components/PlayListContent'

export default defineComponent({
  name: 'DiscoverPlayList',
  components: {
    PlayListHeader,
    PlayListContent
  }
})
</script>

<style lang='scss' scoped>
.play-list {
  background-color: #fff;
  border: 1px solid #d3d3d3;
  min-height: 700px;

  .content {
    padding: 40px;
  }
}
</style>
