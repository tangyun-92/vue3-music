/*
 * @Author: 唐云 
 * @Date: 2021-05-28 09:35:58 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 11:29:18
 主播电台
 */
<template>
  <div class="dj-radio wrap-980">
    <classify />
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
      :url="'/discover/dj-radio'"
      :info="typeRecommendStory"
    />
    <t-dj-radio-list
      :title="'助眠解压·电台'"
      :url="'/discover/dj-radio'"
      :info="typeRecommendSleeping"
    />
    <t-dj-radio-list
      :title="'谈天说地·电台'"
      :url="'/discover/dj-radio'"
      :info="typeRecommendTalking"
    />
    <t-dj-radio-list
      :title="'情感调频·电台'"
      :url="'/discover/dj-radio'"
      :info="typeRecommendEmotional"
    />
    <t-dj-radio-list
      :title="'创作翻唱·电台'"
      :url="'/discover/dj-radio'"
      :info="typeRecommendCover"
    />
    <t-dj-radio-list
      :title="'其他·电台'"
      :url="'/discover/dj-radio'"
      :info="typeRecommendOther"
    />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue'
import DjRadioShow from './components/DjRadioShow'
import TDjRadioList from '@/components/TDjRadioList'
import Classify from './components/Classify'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'DjRadio',
  components: {
    DjRadioShow,
    Classify,
    TDjRadioList
  },
  setup() {
    const store = useStore()

    // 热门电台榜
    const hotRadioRanks = computed(() => store.state.djRadio.hotRadioRanks)
    const programRanks = computed(() => store.state.djRadio.programRanks)
    const typeRecommendStory = computed(() => store.state.djRadio.typeRecommendStory)
    const typeRecommendSleeping = computed(() => store.state.djRadio.typeRecommendSleeping)
    const typeRecommendTalking = computed(() => store.state.djRadio.typeRecommendTalking)
    const typeRecommendEmotional = computed(() => store.state.djRadio.typeRecommendEmotional)
    const typeRecommendCover = computed(() => store.state.djRadio.typeRecommendCover)
    const typeRecommendOther = computed(() => store.state.djRadio.typeRecommendOther)

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
.dj-radio {
  padding: 40px;
  background-color: #fff;
  border: 1px solid #d3d3d3;

  .show-list {
    display: flex;
    justify-content: space-between;
  }
}
</style>
