/*
 * @Author: 唐云 
 * @Date: 2021-05-28 09:35:58 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 16:11:21
 主播电台
 */
<template>
  <div class="dj-radio wrap-980">
    <classify />
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Classify from './components/Classify'

export default defineComponent({
  name: 'DjRadio',
  components: {
    Classify
  }
})
</script>

<style lang='scss' scoped>
.dj-radio {
  padding: 40px;
  background-color: #fff;
  border: 1px solid #d3d3d3;
}
</style>
