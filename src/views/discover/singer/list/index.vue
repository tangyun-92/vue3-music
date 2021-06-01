<template>
  <div class="singer-content">
    <div class="content-title">{{ title }}</div>
    <ul class="content-nav" v-if="title !== '推荐歌手'">
      <li v-for="item in singerNav" :key="item.code">
        <a
          :class="{ active: currentInitialIndex === item.code }"
          @click="handleNav(item)"
          >{{ item.name }}</a
        >
      </li>
    </ul>
    <div class="content-list">
      <ul>
        <li v-for="item in singerList" :key="item.id">
          <div class="cover">
            <img :src="getSizeImage(item.img1v1Url || item.picUrl, 130)" />
            <a href="" class="mask sprite_cover"></a>
          </div>
          <div class="des">
            <a class="name">{{ item.name }}</a>
            <a class="icon sprite_icon2" v-if="item.accountId"></a>
          </div>
        </li>
      </ul>
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
import { singerTypeList, singerNav } from '@/common/local-data'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getSizeImage } from '@/utils/format-utils'

export default defineComponent({
  name: 'SingerList',
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const data = reactive({
      title: '', // title-name
      currentInitialIndex: route.params.initial || -1 // 选中的字母索引
    })

    // 路由参数-字母
    const initial = computed(() => route.params.initial)

    // 歌手列表
    const singerList = computed(() =>
      store.state.singer.singerList.slice(0, 10)
    )
    // title-name
    data.title = computed(() => {
      return singerTypeList
        .find((item) => route.params.area === item.id)
        .list.find((item) => route.params.type === item.type).name
    })

    onMounted(() => {
      // 获取推荐歌手列表
      store.dispatch('singer/getSingerTypeList', {
        type: '1'
      })
    })

    // 深度监听路由参数-字母索引的改变
    watch(
      initial,
      () => {
        data.currentInitialIndex = route.params.initial
        store.dispatch('singer/getSingerTypeList', {
          type: route.params.type,
          area: route.params.area,
          initial: route.params.initial
        })
      },
      {
        deep: true
      }
    )

    /**
     * 点击nav
     */
    const handleNav = (item) => {
      data.currentInitialIndex = item.code
      router.push(
        `/discover/singer/cate/${route.params.area}/${route.params.type}/${item.code}`
      )
    }

    return {
      ...toRefs(data),
      getSizeImage,
      singerNav,
      handleNav,
      singerList
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
