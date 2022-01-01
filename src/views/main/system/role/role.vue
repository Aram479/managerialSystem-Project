<template>
  <div class="role">
    <!-- 高级检索表单 -->
    <PageSearch
      :formConfig="formConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    ></PageSearch>
    <!-- 用户table -->
    <PageContent
      ref="pageContentRef"
      :contentConfig="contentConfig"
      pageName="role"
    ></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/compontents/page-search/index'
import PageContent from '@/compontents/page-content/index'
import { formConfig } from '@/views/main/system/role/config/search.config'
import { contentConfig } from './config/content.config'
import { usePageSearch } from '@/hooks/usePageSerach'
export default defineComponent({
  name: 'role',
  setup() {
    const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch()
    return {
      formConfig,
      contentConfig,
      pageContentRef,
      resetBtnClick,
      queryBtnClick
    }
  },
  components: {
    PageSearch,
    PageContent
  }
})
</script>

<style scoped></style>
