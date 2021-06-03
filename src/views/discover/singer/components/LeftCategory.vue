/*
 * @Author: 唐云 
 * @Date: 2021-05-31 15:51:38 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-06-03 14:37:43
 歌手-左侧分类组件
 */
<template>
  <div class="left-wrap">
    <div class="item" v-for="area in singerTypeList" :key="area.type">
      <div class="tit">{{ area.title }}</div>
      <ul class="nav">
        <li v-for="item in area.list" :key="item.name">
          <a
            class="singer_sprite"
            :class="{
              active:
                currentAreaIndex === area.id && currentTypeIndex === item.type
            }"
            @click="handleNav(area, item)"
            >{{ item.name }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, reactive, toRefs } from 'vue'
import { singerTypeList } from '@/common/local-data'

export default defineComponent({
  name: 'SingerLeftCategory',
  setup() {
    const route = useRoute()
    const router = useRouter()

    const data = reactive({
      currentAreaIndex: route.params.area || -1,
      currentTypeIndex: route.params.type || 1
    })

    const handleNav = (area, item) => {
      data.currentAreaIndex = area.id
      data.currentTypeIndex = item.type
      router.push(`/discover/singer/${area.id}/${item.type}/-1`)
    }

    return {
      singerTypeList,
      ...toRefs(data),
      handleNav
    }
  }
})
</script>

<style lang='scss' scoped>
.left-wrap {
  padding: 0 10px 40px;
  margin: 50px 0 0 0;

  .item:nth-child(n + 2) {
    margin: 5px 0 0;
    padding-top: 16px;
    border-top: 1px solid #d3d3d3;
  }

  .tit {
    font-size: 16px;
    height: 25px;
    padding-left: 14px;
    font-weight: bold;
  }

  li {
    margin: 0 0 2px 0;
    width: 160px;
    height: 29px;
    line-height: 29px;

    a {
      width: 160px;
      height: 29px;
      line-height: 29px;
      padding: 0 0 0 27px;
      display: inline-block;
      color: #333;
      background-position: 0 -30px;

      &.active {
        color: #c20c0c;
        background-position: 0 0;
        text-decoration: none;
      }
    }
  }
}
</style>
