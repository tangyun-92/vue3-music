<template>
  <div>
    <div class="top-list wrap-980">
      <div class="list-left">
        <left-list />
      </div>
      <div class="list-right">
        <list-detail />
        <song-list />
        <comment-list />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LeftList from './components/LeftList'
import ListDetail from './components/ListDetail'
import SongList from './components/SongList'
import CommentList from './components/CommentList'

export default defineComponent({
  name: 'TopList',
  components: {
    LeftList,
    ListDetail,
    SongList,
    CommentList
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
