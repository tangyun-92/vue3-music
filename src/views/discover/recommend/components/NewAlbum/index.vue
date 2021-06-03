/*
 * @Author: 唐云 
 * @Date: 2021-05-19 13:35:14 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-03 16:08:43
 新碟上架
 */
<template>
  <div class="new-album">
    <t-recommend-title :title="'新碟上架'" :url="'/discover/album'" />
    <div class="list">
      <div class="list-item">
        <t-album-cover
          v-for="item in albumList"
          :key="item.id"
          :data="item"
          :size="{ width: '118px', size: '100px', bgp: '-570px' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import TRecommendTitle from '@/components/TRecommendTitle'
import TAlbumCover from '@/components/TAlbumCover'
import { getNewAlbums } from '@/api/discover/recommend'

export default defineComponent({
  name: 'RecommendNewAlbum',
  components: { TRecommendTitle, TAlbumCover },
  setup() {
    const albumRef = ref()
    const albumList = ref() // 新专辑列表
    onMounted(() => {
      getNewAlbums(5).then((res) => {
        albumList.value = res.weekData.slice(0, 5)
      })
    })

    return {
      albumRef,
      albumList
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
