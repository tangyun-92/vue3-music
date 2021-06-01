/*
 * @Author: 唐云 
 * @Date: 2021-05-28 09:35:58 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-01 15:14:00
 歌手
 */
<template>
  <div class="singer wrap-980">
    <div class="left-category">
      <left-category />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import LeftCategory from './components/LeftCategory'

export default defineComponent({
  name: 'Singer',
  components: {
    LeftCategory
  }
})
</script>

<style lang='scss' scoped>
.singer {
  display: flex;
  border: 1px solid #d3d3d3;
  min-height: 700px;
  border-bottom: none;
  border-top: none;
  background-color: #fff;

  .left-category {
    width: 180px;
    border-right: 1px solid #d3d3d3;
    background-color: #f9f9f9;
  }

  .content {
    width: 797px;
  }
}
</style>
