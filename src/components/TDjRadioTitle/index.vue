/*
 * @Author: 唐云 
 * @Date: 2021-05-28 09:45:48 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-28 15:50:42
 主播电台-title组件
 */
<template>
  <div class="dj-radio-title">
    <div class="title-left">{{ title }}</div>
    <a :href="url" class="title-right" v-if="url">更多 &gt;</a>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'TDjRadioTitle',
  props: {
    title: String,
    url: String
  }
})
</script>

<style lang='scss' scoped>
.dj-radio-title {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  height: 40px;
  border-bottom: 2px solid #c20c0c;
  margin: 36px 0 0 0;

  .title-left {
    font-size: 24px;
  }

  .title-right {
    color: #666;
  }
}
</style>
