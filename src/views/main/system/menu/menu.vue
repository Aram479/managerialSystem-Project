<template>
  <div class="menu">
    <PageContent
      ref="pageContentRef"
      :contentConfig="contentConfig"
      pageName="menu"
    ></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/compontents/page-content/index'
import { contentConfig } from './config/content.config'
export default defineComponent({
  setup() {
    return {
      contentConfig
    }
  },
  components: {
    PageContent
  }
})
</script>

<style scoped></style>
