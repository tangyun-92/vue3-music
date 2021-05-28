/*
 * @Author: 唐云 
 * @Date: 2021-05-28 14:42:12 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 18:05:56
 主播电台-主页列表
 */
<template>
  <div>
    <div class="show-list">
      <dj-radio-show
        :title="'热门电台'"
        :url="'/discover/dj-radio/hot-radio'"
        :info="hotRadioRanks"
      />
      <dj-radio-show
        :title="'节目排行榜'"
        :url="'/discover/dj-radio/rank'"
        :info="programRanks"
      />
    </div>
    <t-dj-radio-list
      :title="'音乐故事·电台'"
      :url="'/discover/dj-radio/category/2'"
      :info="typeRecommendStory"
    />
    <t-dj-radio-list
      :title="'助眠解压·电台'"
      :url="'/discover/dj-radio/category/6'"
      :info="typeRecommendSleeping"
    />
    <t-dj-radio-list
      :title="'谈天说地·电台'"
      :url="'/discover/dj-radio/category/5'"
      :info="typeRecommendTalking"
    />
    <t-dj-radio-list
      :title="'情感调频·电台'"
      :url="'/discover/dj-radio/category/3'"
      :info="typeRecommendEmotional"
    />
    <t-dj-radio-list
      :title="'创作翻唱·电台'"
      :url="'/discover/dj-radio/category/2001'"
      :info="typeRecommendCover"
    />
    <t-dj-radio-list
      :title="'其他·电台'"
      :url="'/discover/dj-radio/category/11'"
      :info="typeRecommendOther"
    />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import DjRadioShow from './../components/DjRadioShow'
import TDjRadioList from '@/components/TDjRadioList'

export default defineComponent({
  name: 'DjRadioList',
  components: {
    DjRadioShow,
    TDjRadioList
  },
  setup() {
    const store = useStore()

    // 热门电台榜
    const hotRadioRanks = computed(() => store.state.djRadio.hotRadioRanks)
    const programRanks = computed(() => store.state.djRadio.programRanks)
    const typeRecommendStory = computed(() =>
      store.state.djRadio.typeRecommendStory.slice(0, 4)
    )
    const typeRecommendSleeping = computed(() =>
      store.state.djRadio.typeRecommendSleeping.slice(0, 4)
    )
    const typeRecommendTalking = computed(() =>
      store.state.djRadio.typeRecommendTalking.slice(0, 4)
    )
    const typeRecommendEmotional = computed(() =>
      store.state.djRadio.typeRecommendEmotional.slice(0, 4)
    )
    const typeRecommendCover = computed(() =>
      store.state.djRadio.typeRecommendCover.slice(0, 4)
    )
    const typeRecommendOther = computed(() =>
      store.state.djRadio.typeRecommendOther.slice(0, 4)
    )

    onMounted(() => {
      store.dispatch('djRadio/getHotRadioRanks', 10)
      store.dispatch('djRadio/getProgramRanks', 10)
      store.dispatch('djRadio/getTypeRecommends', 2)
      store.dispatch('djRadio/getTypeRecommends', 6)
      store.dispatch('djRadio/getTypeRecommends', 5)
      store.dispatch('djRadio/getTypeRecommends', 3)
      store.dispatch('djRadio/getTypeRecommends', 2001)
      store.dispatch('djRadio/getTypeRecommends', 11)
    })

    return {
      hotRadioRanks,
      programRanks,
      typeRecommendStory,
      typeRecommendSleeping,
      typeRecommendTalking,
      typeRecommendEmotional,
      typeRecommendCover,
      typeRecommendOther
    }
  }
})
</script>

<style lang='scss' scoped>
.show-list {
  display: flex;
  justify-content: space-between;
}
</style>
