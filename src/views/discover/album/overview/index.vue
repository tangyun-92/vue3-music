/*
 * @Author: 唐云 
 * @Date: 2021-06-03 14:23:50 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-03 15:56:01
 新碟上架-总览
 */
<template>
  <div class="album-overview">
    <div class="overview-title">
      <div class="tit">全部新碟</div>
      <div class="tab">
        <router-link class="tab-tit" to="/discover/album/ALL">全部</router-link>
        <span class="line">|</span>
        <router-link class="tab-tit" to="/discover/album/ZH">华语</router-link>
        <span class="line">|</span>
        <router-link class="tab-tit" to="/discover/album/EA">欧美</router-link>
        <span class="line">|</span>
        <router-link class="tab-tit" to="/discover/album/KR">韩国</router-link>
        <span class="line">|</span>
        <router-link class="tab-tit" to="/discover/album/JP">日本</router-link>
      </div>
    </div>
    <div class="overview-content">
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
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch
} from 'vue'
import TAlbumCover from '@/components/TAlbumCover'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'AlbumOverview',
  components: {
    TAlbumCover
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const data = reactive({
      currentArea: 'ALL'
    })

    // 新碟列表
    const albumList = computed(() => store.state.album.albumList)
    const area = computed(() => route.params.area)

    onMounted(() => {
      store.dispatch('album/getAlbumList', {
        area: 'ALL'
      })
    })
    watch(area, (newVal) => {
      if (newVal) {
        data.currentArea = route.params.area
        store.dispatch('album/getAlbumList', {
          area: area.value
        })
      }
    })

    return {
      ...toRefs(data),
      albumList
    }
  }
})
</script>

<style lang='scss' scoped>
.album-overview {
  .overview-title {
    height: 33px;
    border-bottom: 2px solid #c10d0c;
    display: flex;
    align-items: baseline;

    .tit {
      display: block;
      font-size: 24px;
      line-height: 28px;
    }

    .tab {
      margin: 0 0 0 20px;

      .line {
        margin: 0 10px;
        color: #ccc;
      }
    }
  }

  .overview-content {
    .list {
      margin: 20px 0 37px;

      .list-item {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
