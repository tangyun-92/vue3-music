/*
 * @Author: 唐云 
 * @Date: 2021-05-24 09:24:44 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-24 16:19:16
 播放列表头部组件
 */
<template>
  <div class="list-header">
    <div class="left">
      <span class="play-list">播放列表({{ playList.length }})</span>
      <span class="left-opera">
        <span class="opera link">
          <i class="icon icon-collect sprite_playlist"></i>
          收藏全部
        </span>
        <span class="line"></span>
        <a-popconfirm
          title="确定清除播放列表？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirm"
        >
          <span class="opera link">
            <i class="icon icon-clear sprite_playlist"></i>清除
          </span>
        </a-popconfirm>
      </span>
    </div>
    <div class="right">
      <span class="song-name">{{ currentSong.name }}</span>
      <span class="close sprite_playlist" @click="closeList"></span>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, defineComponent } from 'vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'PlayListHeader',
  setup() {
    const store = useStore()

    const playList = computed(() => store.state.player.playList)
    const currentSong = computed(() => store.state.player.currentSong)

    /**
     * 关闭播放列表
     */
    const closeList = () => {
      store.commit('player/SET_IS_PLAY_LIST', false)
    }
    /**
     * 清空播放列表
     */
    const confirm = () => {
      message.success('清空成功！')
      store.commit('player/SET_PLAY_LIST', [])
    }

    return {
      playList,
      currentSong,
      closeList,
      confirm
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
