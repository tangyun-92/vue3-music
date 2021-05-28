/*
 * @Author: 唐云 
 * @Date: 2021-05-28 09:45:48 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 10:43:06
 主播电台-推荐节目
 */
<template>
  <div class="show-wrap">
    <t-dj-radio-title :title="title" :url="url" />
    <div class="list">
      <div class="item" v-for="item in info" :key="item.rank">
        <div class="left">
          <i class="sprite_icon"></i>
          <img :src="getSizeImage(item.picUrl || item.program.coverUrl, 40)" />
        </div>
        <div class="con">
          <span class="name text-nowrap link">
            {{ item.name || item.program.name }}
          </span>
          <span class="dec text-nowrap link">
            {{ item.rcmdtext || item.program.radio.name }}
          </span>
        </div>
        <div class="right">
          <a-progress
            v-if="!item.name"
            :percent="(item.score / info[0].score) * 100"
            :showInfo="false"
            status="normal"
            strokeColor="#bcbcbc"
          />
          <button class="btn" v-else>{{ item.category }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TDjRadioTitle from '@/components/TDjRadioTitle'
import { getSizeImage } from '@/utils/format-utils'

export default defineComponent({
  name: 'DjRadioShow',
  components: {
    TDjRadioTitle
  },
  props: {
    title: String,
    url: String,
    info: Array
  },
  setup() {
    return {
      getSizeImage
    }
  }
})
</script>

<style lang='scss' scoped>
.show-wrap {
  width: 426px;

  .list {
    height: 602px;
    border: 1px solid #e2e2e2;
    border-top: none;

    .item {
      width: 424px;
      height: 60px;
      padding: 10px 0;
      display: flex;
      align-items: center;

      &:nth-of-type(even) {
        background-color: #f7f7f7;
      }

      &:hover {
        background-color: #eee;

        .left i {
          display: inline-block;
          position: absolute;
          width: 22px;
          height: 22px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-position: 0 -85px;
        }
      }

      .left {
        width: 40px;
        height: 40px;
        margin: 0 0 0 20px;
        position: relative;
        cursor: pointer;
      }

      .con {
        width: 254px;
        margin: 1px 0 0 10px;
        line-height: 20px;

        .name {
          display: block;

          &:hover {
            color: #000;
          }
        }

        .dec {
          display: block;
          color: #999;
        }
      }

      .right {
        width: 100px;
        margin-right: 10px;

        .btn {
          margin: 1px 0 0 10px;
          color: #999;
          border: 1px solid #999;
          padding: 0 6px;
          height: 18px;
          line-height: 18px;
          cursor: pointer;

          &:hover {
            border: 1px solid #666;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
