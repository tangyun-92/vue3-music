/*
 * @Author: 唐云 
 * @Date: 2021-06-03 14:26:34 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-03 16:13:22
 新碟上架-热门新碟组件
 */
<template>
  <div class="hot-album">
    <t-dj-radio-title :title="'热门新碟'" />
    <div class="list">
      <div class="list-item">
        <t-album-cover
          v-for="item in albumList"
          :key="item.id"
          :data="item"
          :size="{ width: '153px', size: '130px', bgp: '-845px', mb: '28px' }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import TDjRadioTitle from '@/components/TDjRadioTitle'
import TAlbumCover from '@/components/TAlbumCover'
import { getNewAlbums } from '@/api/discover/recommend'

export default defineComponent({
  name: 'HotAlbum',
  components: {
    TDjRadioTitle,
    TAlbumCover
  },
  setup() {
    const data = reactive({
      albumList: [] // 热门新碟列表
    })

    onMounted(() => {
      getNewAlbums(10, 'new').then((res) => {
        data.albumList = res.weekData.slice(0, 10)
      })
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang='scss' scoped>
.hot-album {
  height: 480px;
  
  .list {
    margin: 20px 0 37px;

    .list-item {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 184px;
    }
  }
}
</style>
