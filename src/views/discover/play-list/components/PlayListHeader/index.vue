/*
 * @Author: 唐云 
 * @Date: 2021-05-27 10:22:59 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-27 14:57:01
 歌单头部
 */
<template>
  <div class="list-header">
    <div class="wrap">
      <div class="left">
        <span class="text">{{ currentClassify }}</span>
        <button class="check sprite_button" @click="setShowClassify">
          <i class="check-btn sprite_button">
            选择分类<em class="icon sprite_icon2"></em>
          </i>
        </button>
      </div>
      <span class="right-btn sprite_button2" @click="changeOrder(order)">
        {{ order === 'new' ? '最新' : '热门' }}
      </span>
    </div>
    <div class="list-dialog" v-if="showClassify">
      <div class="hd">
        <i class="hd-icon sprite_icon"></i>
      </div>
      <div class="bd">
        <div class="all">
          <span
            class="all-btn sprite_button2 link"
            @click="checkClassify('全部')"
            >全部风格</span
          >
        </div>
        <dl class="item">
          <div
            class="item-con"
            v-for="(item, index) in playListClassify"
            :key="item.name"
          >
            <dt :class="'dt' + { index }">
              <i class="item-icon sprite_icon2"></i>
              {{ item.name }}
            </dt>
            <dd>
              <span v-for="itemX in item.subs" :key="itemX.name">
                <span
                  class="item-text link"
                  @click="checkClassify(itemX.name)"
                  >{{ itemX.name }}</span
                >
                <span class="line">|</span>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PlayListHeader',
  setup() {
    const store = useStore()
    // 显示/隐藏分类列表
    const showClassify = ref(false)
    // 最新/最热
    const order = ref('hot')

    // 歌单分类列表
    const playListClassify = computed(
      () => store.state.playList.playListClassify
    )
    // 当前选中的分类
    const currentClassify = computed(() => store.state.playList.currentClassify)

    onMounted(() => {
      store.dispatch('playList/getPlayListClassify')
    })

    /**
     * 选择分类
     */
    const checkClassify = (name) => {
      store.commit('playList/SET_CURRENT_PAGE', 1)
      store.commit('playList/SET_CURRENT_CLASSIFY', name)
      store.dispatch('playList/getClassifySongs', {
        cat: name,
        order: 'hot'
      })
      showClassify.value = false
    }
    /**
     * 显示/隐藏分类列表
     */
    const setShowClassify = () => {
      showClassify.value = !showClassify.value
    }
    /**
     * 热门/最新
     */
    const changeOrder = (flag) => {
      store.commit('playList/SET_CURRENT_PAGE', 1)
      if (flag === 'new') {
        order.value = 'hot'
      } else {
        order.value = 'new'
      }
      store.dispatch('playList/getClassifySongs', {
        cat: currentClassify.value,
        order: order.value
      })
    }

    return {
      playListClassify,
      currentClassify,
      showClassify,
      order,
      checkClassify,
      setShowClassify,
      changeOrder
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
