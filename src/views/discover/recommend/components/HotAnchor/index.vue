/*
 * @Author: 唐云 
 * @Date: 2021-05-20 17:14:48 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 17:29:42
 热门主播
 */
<template>
  <div class="hot-anchor">
    <div class="top">热门主播</div>
    <div class="content">
      <div class="list-item">
        <div class="item" v-for="item in anchorList" :key="item.id">
          <a href="#">
            <img :src="getSizeImage(item.avatarUrl, 40)">
          </a>
          <div class="info">
            <div class="name text-nowrap">{{ item.nickName }}</div>
            <div class="des text-nowrap">主播简介</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { getHotAnchors } from '@/api/discover/dj-radio'
import { getSizeImage } from '@/utils/format-utils'

export default defineComponent ({
  name: 'RecommendHotAnchor',
  setup() {
    const anchorList = ref()
    onMounted(() => {
      getHotAnchors(5).then(res => {
        anchorList.value = res.data.list
      })
    })

    return {
      anchorList,
       getSizeImage
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
