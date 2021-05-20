/*
 * @Author: 唐云 
 * @Date: 2021-05-19 09:25:20 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 10:53:49
 发现音乐-热门推荐-title组件
 */
<template>
  <div class="rec-title sprite_02">
    <div class="title-left">
      <router-link :to="url" class="tit">{{ title }}</router-link>
      <div class="tab" v-if="title === '热门推荐'">
        <router-link class="tab-tit" to="#">华语</router-link>
        <span class="line">|</span>
        <router-link class="tab-tit" to="#">流行</router-link>
        <span class="line">|</span>
        <router-link class="tab-tit" to="#">摇滚</router-link>
        <span class="line">|</span>
        <router-link class="tab-tit" to="#">民谣</router-link>
        <span class="line">|</span>
        <router-link class="tab-tit" to="#">电子</router-link>
      </div>
    </div>
    <div class="more">
      <router-link class="more-tit" :to="url">更多</router-link>
      <i class="cor sprite_02">&nbsp;</i>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TRecommendTitle',
  props: {
    title: {
      type: String,
      default() {
        return '热门推荐'
      }
    },
    url: {
      type: String,
      default() {
        return ''
      }
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
