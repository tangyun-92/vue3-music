<template>
  <div>
    <t-header />
    <router-view></router-view>
    <t-footer />
    <t-player />
    <t-back-top />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import THeader from '@/components/THeader'
import TFooter from '@/components/TFooter'
import TPlayer from '@/views/player'
import TBackTop from '@/components/TBackTop'

export default defineComponent({
  name: 'Home',
  components: {
    THeader,
    TFooter,
    TPlayer,
    TBackTop
  }
})
</script>
