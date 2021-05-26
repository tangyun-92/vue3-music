/*
 * @Author: 唐云 
 * @Date: 2021-05-17 15:34:30 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 15:22:31
 头部组件
 */
<template>
  <div class="t-header">
    <div class="wrap-1100 header-box">
      <div class="logo sprite_01"></div>
      <div class="nav">
        <ul>
          <li
            v-for="(item, index) in headerLinks"
            :key="item.title"
          >
            <a :href="item.link" v-if="index > 2" target="_blank">
              {{ item.title }}
            </a>
            <router-link
              :to="item.link"
              :class="{ active: isActive === item.link }"
              @click="handleClickNav(item.link)"
              v-else
            >
              {{ item.title }}
              <i class="sprite_01 icon" v-if="index < 3"></i>
            </router-link>
            <span class="hot sprite_01" v-if="index === 5"></span>
          </li>
        </ul>
      </div>
      <div class="search">
        <div class="search-bg sprite_01">
          <input type="text" placeholder="音乐/视频/电台/用户" />
        </div>
      </div>
      <div class="framer-center">创作者中心</div>
      <div class="login">登录</div>
    </div>
    <div class="bottom-line"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import { headerLinks } from '@/common/local-data'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'THeader',
  setup() {
    const route = useRoute() // 路由
    const store = useStore()
    const isActive = ref(route.path) // 选中状态
    
    onMounted(() => {
      if (route.path.indexOf('discover') !== -1) {
        return isActive.value = '/discover/recommend'
      }
    })
    
    /**
     * nav导航点击事件
     */
    const handleClickNav = (link) => {
      isActive.value = link
      store.commit('topList/SET_LIST_INDEX', 0)
      store.commit('topList/SET_LIST_ID', 19723756)
    }

    return {
      headerLinks,
      isActive,
      handleClickNav
      
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
