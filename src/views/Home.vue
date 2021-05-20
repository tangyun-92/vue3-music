<template>
  <div>
    <t-header></t-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import THeader from '@/components/THeader'

export default defineComponent({
  name: 'Home',
  components: {
    THeader
  }
})
</script>
