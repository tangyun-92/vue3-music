/*
 * @Author: 唐云 
 * @Date: 2021-05-20 09:09:56 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 13:47:08
 榜单
 */
<template>
  <div class="top-list">
    <t-recommend-title :title="'榜单'" :url="'/discover/top-list'" />
    <div class="content">
      <t-top-ranking :id="3" />
      <t-top-ranking :id="0" />
      <t-top-ranking :id="2" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TRecommendTitle from '@/components/TRecommendTitle'
import TTopRanking from '@/components/TTopRanking'

export default defineComponent({
  name: 'RecommendTopList',
  components: { TRecommendTitle, TTopRanking },
  setup() {}
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
