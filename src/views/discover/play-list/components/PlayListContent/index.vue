/*
 * @Author: 唐云 
 * @Date: 2021-05-27 10:22:59 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-27 15:22:20
 歌单内容
 */
<template>
  <div class="list-content">
    <div class="list">
      <div v-for="item in classifySongs" :key="item.id">
        <t-songs-cover :data="item" :size="{ right: '10px', bottom: '4px' }" />
      </div>
    </div>
    <div class="pagination">
      <t-pagination
        :data="{ currentPage, pageSize, total }"
        @change-page="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue'
import TSongsCover from '@/components/TSongsCover'
import TPagination from '@/components/TPagination'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PlayListContent',
  components: {
    TSongsCover,
    TPagination
  },
  setup() {
    const store = useStore()

    // 歌单列表
    const classifySongs = computed(
      () => store.state.playList.classifySongs.playlists
    )
    const currentClassify = computed(() => store.state.playList.currentClassify)
    const currentPage = computed(() => store.state.playList.currentPage)
    const pageSize = computed(() => store.state.playList.pageSize)
    const total = computed(() => store.state.playList.classifySongs.total)

    onMounted(() => {
      store.dispatch('playList/getClassifySongs', {
        cat: '全部',
        order: 'hot'
      })
    })

    /**
     * 切换分页
     */
    const onPageChange = (page, pageSize) => {
      store.dispatch('playList/getClassifySongs', {
        cat: currentClassify.value,
        order: 'hot',
        page: pageSize,
        offset: page * 35
      })
      store.commit('playList/SET_CURRENT_PAGE', page)
    }

    return {
      classifySongs,
      currentPage,
      pageSize,
      total,
      onPageChange
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
