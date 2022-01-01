<template>
  <div id="page-search">
    <ZpForm class="ZpForm" v-bind="formConfig" v-model="formData">
      <!-- 头部插槽 -->
      <template #header>
        <h1>高级检索</h1>
      </template>
      <!-- 底部插槽 -->
      <template #footer>
        <div class="handle-btns">
          <el-button type="warning" @click="handleResetClick">
            <template #>
              <el-icon><refresh /></el-icon>
              <span>重置</span>
            </template>
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <template #>
              <el-icon><search /></el-icon>
              <span>搜索</span>
            </template>
          </el-button>
        </div>
      </template>
    </ZpForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import ZpForm from '@/Base-UI/form/index'

export default defineComponent({
  name: 'page-search',
  props: {
    formConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    /* 根据formConfig的field数据为formData动态绑定数据 */
    const formItems = props.formConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    let formData = ref(formOriginData)
    /* 重置表单事件 */
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    /* 搜索框事件 */
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  },
  components: {
    ZpForm
  }
})
</script>

<style scoped>
.ZpForm {
  padding-top: 22px;
}
.handle-btns {
  overflow: hidden;
  text-align: right;
  padding: 0px 50px 20px 0px;
}
</style>
