/*
 * @Author: 唐云 
 * @Date: 2021-05-18 16:41:34 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-20 10:55:35
 banner组件
 */
<template>
  <div :style="{ background: 'url(' + bgImage + ') center center/6000px' }">
    <div class="wrap-banner">
      <div class="banner">
        <a-carousel :after-change="onChange" ref="bannerRef" autoplay>
          <div v-for="item in bannerList" :key="item.imageUrl">
            <img :src="item.imageUrl" />
          </div>
        </a-carousel>
        <a class="btn btn-prev sprite_banner" @click="bannerRef.prev()"></a>
        <a class="btn btn-next sprite_banner" @click="bannerRef.next()"></a>
      </div>
      <div class="download">
        <a href="#" class="btn"></a>
        <p>PC 安卓 IPhone WP IPad Mac 六大客户端</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { getTopBanners } from '@/api/discover/recommend'

export default defineComponent({
  name: 'DiscoverBanner',
  setup() {
    const bannerRef = ref() // 轮播ref
    const bannerList = ref() // banner列表
    const currentIndex = ref(0) // 当前选中index
    /**
     * 轮播切换
     */
    const onChange = (current) => {
      currentIndex.value = current
    }
    // 监听banner中index的改变，同时改变背景图
    const bgImage = computed(
      () =>
        bannerList.value &&
        bannerList.value[currentIndex.value].imageUrl + '?imageView&blur=40x20'
    )
    onMounted(() => {
      /**
       * 获取banner列表数据
       */
      getTopBanners().then((res) => {
        bannerList.value = res.banners
      })
    })

    return {
      bannerRef,
      bannerList,
      onChange,
      bgImage
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss'
</style>
