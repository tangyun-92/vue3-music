/*
 * @Author: 唐云 
 * @Date: 2021-05-21 10:03:53 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-21 10:18:09
 底部组件
 */
<template>
  <div class="footer">
    <div class="content wrap-980">
      <div class="footer-left">
        <div class="footer-item">
          <div v-for="item in footerLinks" :key="item.title">
            <a :href="item.link" target="_blank">{{ item.title }}</a>
            <span>|</span>
          </div>
        </div>
        <ul>
          <li>
            网易公司版权所有©️1997-2021
            杭州乐读科技有限公司运营：浙网文[2018]3506-263号
          </li>
          <li>
            违法和不良信息举报电话：0571-89853516 举报邮箱：ncm5990@163.com
          </li>
          <li>
            粤B2-20090191-18 工业和信息化部备案管理系统网站 浙公安备
            2201902002564号
          </li>
        </ul>
      </div>
      <div class="footer-right">
        <ul>
          <li class="item" v-for="item in footerImages" :key="item.link">
            <a :href="item.link" class="link" target="_blank"></a>
            <span class="title">{{ item.title }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { footerLinks, footerImages } from '@/common/local-data'

export default defineComponent({
  name: 'Footer',
  setup() {
    return {
      footerLinks,
      footerImages
    }
  }
})
</script>

<style lang='scss' scoped>
@import './index.scss';
</style>
