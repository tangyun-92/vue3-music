<template>
  <div>
    <t-header></t-header>
    <router-view></router-view>
    <t-footer></t-footer>
    <t-player></t-player>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import THeader from '@/components/THeader'
import TFooter from '@/components/TFooter'
import TPlayer from '@/views/player'

export default defineComponent({
  name: 'Home',
  components: {
    THeader,
    TFooter,
    TPlayer
  }
})
</script>
