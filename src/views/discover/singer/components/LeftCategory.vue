/*
 * @Author: 唐云 
 * @Date: 2021-05-31 15:51:38 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-31 17:06:24
 歌手-左侧分类组件
 */
<template>
  <div class="left-wrap">
    <div class="item" v-for="area in list" :key="area.type">
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
const list = [
  {
    title: '推荐',
    id: '-1',
    list: [{ name: '推荐歌手', type: '1' }]
  },
  {
    title: '华语',
    id: '7',
    list: [
      { name: '华语男歌手', type: '1' },
      { name: '华语女歌手', type: '2' },
      { name: '华语组合/乐队', type: '3' }
    ]
  },
  {
    title: '欧美',
    id: '96',
    list: [
      { name: '欧美男歌手', type: '1' },
      { name: '欧美女歌手', type: '2' },
      { name: '欧美组合/乐队', type: '3' }
    ]
  },
  {
    title: '日本',
    id: '8',
    list: [
      { name: '日本男歌手', type: '1' },
      { name: '日本女歌手', type: '2' },
      { name: '日本组合/乐队', type: '3' }
    ]
  },
  {
    title: '韩国',
    id: '16',
    list: [
      { name: '韩国男歌手', type: '1' },
      { name: '韩国女歌手', type: '2' },
      { name: '韩国组合/乐队', type: '3' }
    ]
  },
  {
    title: '其他',
    id: '0',
    list: [
      { name: '其他男歌手', type: '1' },
      { name: '其他女歌手', type: '2' },
      { name: '其他组合/乐队', type: '3' }
    ]
  }
]

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
      router.push(`/discover/singer/cate/${area.id}/${item.type}`)
    }

    return {
      list,
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
