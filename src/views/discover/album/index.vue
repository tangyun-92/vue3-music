/*
 * @Author: 唐云 
 * @Date: 2021-05-28 09:35:58 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-03 14:45:58
 新碟上架
 */
<template>
  <div class="album-content wrap-980">
    <hot-album />
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import HotAlbum from './components/HotAlbum'

export default defineComponent ({
  name: 'Album',
  components: {
    HotAlbum
  }
})
</script>

<style lang='scss' scoped>
.album-content {
  padding: 0px 40px 40px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  min-height: 700px;
}
</style>
