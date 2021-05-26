/*
 * @Author: 唐云 
 * @Date: 2021-05-26 14:15:14 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 15:19:32
 排行榜-左侧组件
 */
<template>
  <div class="left-list">
    <div class="list">
      <div class="title">云音乐特色榜</div>
      <div class="title title-media">全球媒体榜</div>
      <div
        v-for="(item, index) in cloudMusicTopList"
        :key="item.id"
        class="item"
        :class="{ active: listIndex === index }"
        @click="handleListIndex(item, index)"
      >
        <img :src="getSizeImage(item.coverImgUrl, 40)" />
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="time">{{ item.updateFrequency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { getSizeImage } from '@/utils/format-utils'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'TopListLeftList',
  setup() {
    const store = useStore()
    const listIndex = ref(0) // 当前选中榜单的索引

    // 榜单列表
    const cloudMusicTopList = computed(() => store.state.topList.cloudMusicTopList)

    onMounted(() => {
      // 获取云音乐榜单列表
      store.dispatch('topList/getCloudMusicTopList')
      // 获取榜单详情
      store.dispatch('topList/getTopListDetail', store.state.topList.listId)
      listIndex.value = store.state.topList.listIndex
    })

    const handleListIndex = (item, index) => {
      listIndex.value = index
      store.commit('topList/SET_LIST_INDEX', index)
      store.commit('topList/SET_LIST_ID', item.id)
      store.dispatch('topList/getTopListDetail', item.id)
    }

    return {
      getSizeImage,
      cloudMusicTopList,
      listIndex,
      handleListIndex
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
