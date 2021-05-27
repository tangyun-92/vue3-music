/*
 * @Author: 唐云 
 * @Date: 2021-05-27 14:30:10 
 * @Last Modified by: 唐云
 * @Last Modified time: 2021-05-27 15:26:23
 分页组件
 */
<template>
  <div class="pagination">
    <a-pagination
      :current="data.currentPage"
      :pageSize="data.pageSize"
      :total="data.total"
      :showSizeChanger="false"
      :itemRender="itemRender"
      @change="onPageChange"
    ></a-pagination>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TPagination',
  props: {
    data: {
      type: Object,
      default() {
        return {
          currentPage: 1,
          pageSize: 35,
          total: 0
        }
      }
    }
  },
  emits: ['change-page'],
  setup(props, context) {
    /**
     * 切换分页
     */
    const onPageChange = (page, pageSize) => {
      context.emit('change-page', page, pageSize)
    }
    /**
     * 显示上一页与下一页
     */
    const itemRender = (current) => {
      if (current.type === 'prev') {
        return <span className="page-btn prev sprite_button2">上一页</span>
      }
      if (current.type === 'next') {
        return <span className="page-btn next sprite_button2">下一页</span>
      }
      return current.originalElement
    }

    return {
      itemRender,
      onPageChange
    }
  }
})
</script>

<style lang='scss'>
@import './index.scss';
</style>
