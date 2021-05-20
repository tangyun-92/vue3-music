/*
 * @Author: 唐云 
 * @Date: 2021-05-20 09:09:56 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 10:55:58
 榜单
 */
<template>
  <div class="top-list">
    <t-recommend-title :title="'榜单'" :url="'/discover/top-list'" />
    <div class="content"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import TRecommendTitle from '@/components/TRecommendTitle'
import { getTopList } from '@/api/discover/recommend'

export default defineComponent({
  name: 'RecommendTopList',
  components: { TRecommendTitle },
  setup() {
    onMounted(() => {
      getTopList(19723756).then((res) => {
        console.log(res)
      })
    })
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
