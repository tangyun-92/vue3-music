/*
 * @Author: 唐云 
 * @Date: 2021-05-19 13:39:08 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-27 14:28:58
 热门推荐
 */
<template>
  <div class="hot-recommend">
    <t-recommend-title :title="'热门推荐'" :url="'/discover/play-list'" />
    <div class="list">
      <t-songs-cover
        v-for="item in hotRecommendList"
        :key="item.id"
        :data="item"
        :size="{ right: '0px', bottom: '0px' }"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getHotRecommend } from '@/api/discover/recommend'
import TRecommendTitle from '@/components/TRecommendTitle'
import TSongsCover from '@/components/TSongsCover'

export default defineComponent({
  name: 'RecommendHotRecommend',
  components: { TRecommendTitle, TSongsCover },
  setup() {
    const hotRecommendList = ref()
    onMounted(() => {
      getHotRecommend(8).then((res) => {
        hotRecommendList.value = res.result
      })
    })

    return {
      hotRecommendList
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
