/*
 * @Author: 唐云 
 * @Date: 2021-05-26 13:43:36 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-26 13:50:04
 回到顶部组件
 */
<template>
  <div id="components-back-top-demo-custom">
    <a-back-top>
      <div class="ant-back-top-inner sprite_03"></div>
    </a-back-top>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TBackTop'
})
</script>

<style lang='scss' scoped>
#components-back-top-demo-custom .ant-back-top {
  bottom: 160px;
}
#components-back-top-demo-custom .ant-back-top-inner {
  height: 49px;
  width: 49px;
  line-height: 40px;
  border-radius: 4px;
  background-position: -265px -47px;

  &:hover {
    background-position: -325px -47px;
  }
}
</style>
