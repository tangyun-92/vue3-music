/*
 * @Author: 唐云 
 * @Date: 2021-05-26 14:15:14 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 16:20:56
 排行榜-列表详情组件
 */
<template>
  <div class="list-detail">
    <div class="detail-left">
      <img :src="getSizeImage(topListDetail.coverImgUrl, 150)">
      <div class="mask sprite_cover"></div>
    </div>
    <div class="detail-right">
      <div class="name">{{ topListDetail.name }}</div>
      <div class="time">
        <i class="icon sprite_icon2"></i>
        最近更新：{{ formatDate(topListDetail.updateTime, 'MM月dd日') }}
      </div>
      <div class="opera">
        <div class="btn play sprite_button" @click="playMusic">
          <div class="btn play-btn sprite_button">
            <i class="play-icon sprite_button"></i>
            播放
          </div>
        </div>
        <div class="btn add sprite_button" @click="addMusic"></div>
        <div class="btn collect sprite_button">
          <i class="collect-icon sprite_button">
            ({{ topListDetail.subscribedCount }})
          </i>
        </div>
        <div class="btn share sprite_button">
          <i class="share-icon sprite_button">
            ({{ topListDetail.shareCount }})
          </i>
        </div>
        <div class="btn download sprite_button">
          <i class="download-icon sprite_button">下载</i>
        </div>
        <div class="btn comment sprite_button">
          <i class="comment-icon sprite_button">
            ({{ topListDetail.commentCount }})
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { getSizeImage, formatDate } from '@/utils/format-utils'
import { useStore } from 'vuex'
import useAddPlayList from '@/hooks/useAddPlayList'

export default defineComponent ({
  name: 'TopListListDetail',
  setup() {
    const store = useStore()

    // 榜单详情
    const topListDetail = computed(() => store.state.topList.topListDetail)

    /**
     * 播放音乐
     */
    const playMusic = () => {
      useAddPlayList({
        store,
        songs: topListDetail.value.tracks
      })
    }
    /**
     * 将音乐添加到播放列表
     */
    const addMusic = () => {
      useAddPlayList({
        store,
        songs: topListDetail.value.tracks,
        way: 'add'
      })
    }

    return {
      getSizeImage,
      formatDate,
      topListDetail,
      playMusic,
      addMusic
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
