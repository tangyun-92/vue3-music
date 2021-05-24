/*
 * @Author: 唐云 
 * @Date: 2021-05-24 16:16:43 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-24 17:42:34
 播放列表组件-歌词
 */
<template>
  <div class="list-lyric" ref="lyricRef">
    <div
      class="lyric-content"
      :style="{
        transform: lyricStyle.transform,
        transition: lyricStyle.transition
      }"
    >
      <div
        v-for="(item, index) in lyricList"
        :key="item.time"
        class="lrc-item"
        :class="{ active: index === currentLyricIndex }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'PlayListLyric',
  setup() {
    const store = useStore()
    const lyricStyle = ref('')
    const lyricRef = ref()

    // 歌词列表
    const lyricList = computed(() => store.state.player.lyricList)
    // 当前播放歌词的索引
    const currentLyricIndex = computed(
      () => store.state.player.currentLyricIndex
    )

    // 监听当前播放歌词的索引
    watch(currentLyricIndex, () => {
      if (currentLyricIndex.value > 0 && currentLyricIndex.value < 3) return

      function scrollTo(element, to, duration) {
        if (duration <= 0) return
        let difference = to - element.scrollTop
        let perTick = (difference / duration) * 10
        let flag = element.scrollTop + perTick
        lyricStyle.value = {
          transform: `translateY(-${flag}px)`,
          transition: 'all 0.6s linear'
        }
        if (flag === to) return
        scrollTo(element, to, duration - 10)
      }
      scrollTo(lyricRef.value, (currentLyricIndex.value - 3) * 32, 300)
    })

    return {
      lyricStyle,
      lyricRef,
      lyricList,
      currentLyricIndex
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>

