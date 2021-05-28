/*
 * @Author: 唐云 
 * @Date: 2021-05-28 13:48:17 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 17:42:38
 主播电台-分类
 */
<template>
  <div class="radio-category">
    <t-dj-radio-title :title="'优秀新电台'" />
    <div class="new-list">
      <div class="item" v-for="item in newRadioList" :key="item.id">
        <a href="#"><img :src="getSizeImage(item.picUrl, 150)" alt="" /></a>
        <a href="#"
          ><div class="name text-nowrap link">{{ item.name }}</div></a
        >
        <span class="dec text-noerap">{{ item.rcmdtext }}</span>
      </div>
    </div>
    <t-dj-radio-list :info="hotRadioList" :title="'电台排行榜'" />
    <div class="pagination">
      <t-pagination
        :data="{ currentPage, pageSize, total }"
        @change-page="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  watch
} from 'vue'
import { getSizeImage } from '@/utils/format-utils'
import TDjRadioTitle from '@/components/TDjRadioTitle'
import TDjRadioList from '@/components/TDjRadioList'
import TPagination from '@/components/TPagination'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DjRadioCategory',
  components: { TDjRadioTitle, TDjRadioList, TPagination },
  setup() {
    const route = useRoute()
    const store = useStore()
    const data = reactive({
      currentPage: 1,
      pageSize: 30
    })

    // 优秀新电台列表
    const newRadioList = computed(() => store.state.djRadio.newRadioList)
    // 电台排行榜列表
    const hotRadioList = computed(
      () => store.state.djRadio.hotRadioList.djRadios
    )
    const total = computed(() => store.state.djRadio.hotRadioList.count)
    const id = computed(() => route.params.id)

    onMounted(() => {
      // 根据分类id获取优秀电台列表
      store.dispatch('djRadio/getTypeRecommendsById', id.value)
      // 根据分类id获取排行榜列表、
      store.dispatch('djRadio/getCategoryHotRadio', {
        cateId: id.value
      })
    })

    watch(id, (newVal) => {
      if (newVal) {
        // 根据分类id获取优秀电台列表
        store.dispatch('djRadio/getTypeRecommendsById', id.value)
        // 根据分类id获取排行榜列表、
        store.dispatch('djRadio/getCategoryHotRadio', {
          cateId: id.value
        })
      }
    })

    /**
     * 切换分页
     */
    const onPageChange = (page, pageSize) => {
      store.dispatch('djRadio/getCategoryHotRadio', {
        cateId: id.value,
        limit: pageSize,
        offset: (page - 1) * 30
      })
      data.currentPage = page
    }

    return {
      getSizeImage,
      ...toRefs(data),
      onPageChange,
      newRadioList,
      hotRadioList,
      total
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
