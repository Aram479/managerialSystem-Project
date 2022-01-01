<template>
  <div id="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="item in breadcrumb"
        :key="item.name"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType } from 'vue'
import { IBreadcrumb } from '../types/index'
export default defineComponent({
  name: 'breadcrumb',
  props: {
    breadcrumb: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    const data = reactive({})
    return {}
  },
  components: {}
})
</script>

<style scoped></style>
