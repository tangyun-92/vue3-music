/*
 * @Author: 唐云 
 * @Date: 2021-05-26 14:15:14 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 17:07:06
 排行榜-歌曲列表组件
 */
<template>
  <div class="song-list">
    <div class="title">
      <div class="left">
        <div class="name">歌曲列表</div>
        <div class="num">{{ topListDetail.trackCount }}首歌</div>
      </div>
      <div class="right">
        播放：<span>{{ topListDetail.playCount }}</span>
      </div>
    </div>
    <t-song-list :list="topListDetail.tracks" />
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import TSongList from '@/components/TSongList'

export default defineComponent ({
  name: 'TopListSongList',
  components: {
    TSongList
  },
  setup() {
    const store = useStore()

    const topListDetail = computed(() => store.state.topList.topListDetail)

    return {
      topListDetail
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
