<template>
  <div>
    <t-header></t-header>
    <router-view></router-view>
    <t-footer></t-footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import THeader from '@/components/THeader'
import TFooter from '@/components/TFooter'

export default defineComponent({
  name: 'Home',
  components: {
    THeader,
    TFooter
  }
})
</script>
