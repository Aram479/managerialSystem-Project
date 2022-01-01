<template>
  <div class="goods">
    <!-- 用户table -->
    <PageContent
      ref="pageContentRef"
      :contentConfig="contentConfig"
      pageName="goods"
    >
      <!-- 图片数据  -->
      <template #image="slot">
        <el-image
          :src="slot.row.imgUrl"
          :preview-src-list="[slot.row.imgUrl]"
          style="width: 80px; height: 80px"
        ></el-image>
      </template>
      <!-- 旧价格,拼接￥字符串 -->
      <template #oldPrice="slot">
        {{ '￥' + slot.row.oldPrice }}
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/compontents/page-content/index'
import { contentConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
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
