/*
 * @Author: 唐云 
 * @Date: 2021-05-28 09:45:48 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 11:24:27
 主播电台-列表组件
 */
<template>
  <div class="radio-list">
    <t-dj-radio-title :title="title" :url="url" />
    <div class="list">
      <div class="item" v-for="item in data" :key="item.id">
        <div class="left">
          <img :src="getSizeImage(item.picUrl, 120)" alt="" />
        </div>
        <div class="right">
          <span class="name link text-nowrap">{{ item.name }}</span>
          <div class="dec text-nowrap">{{ item.rcmdtext }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue'
import TDjRadioTitle from '@/components/TDjRadioTitle'
import { getSizeImage } from '@/utils/format-utils'

export default defineComponent({
  name: 'TDjRadioList',
  props: {
    title: String,
    url: String,
    info: Array
  },
  components: {
    TDjRadioTitle
  },
  setup(props) {
    const data = computed(() => props.info.slice(0, 4))

    return {
      getSizeImage,
      data
    }
  }
})
</script>

<style lang='scss' scoped>
.radio-list {
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item {
      width: 435px;
      height: 160px;
      padding: 20px 0;
      display: flex;

      &:nth-child(1),
      &:nth-child(2) {
        border-bottom: 1px solid #e7e7e7;
      }

      .left {
        width: 120px;
        height: 120px;
        cursor: pointer;
      }

      .right {
        margin: 0 0 0 15px;

        .name {
          width: 280px;
          margin: 16px 0 20px;
          color: #333;
          font-size: 20px;
          display: block;
        }

        .dec {
          color: #999;
        }
      }
    }
  }
}
</style>
