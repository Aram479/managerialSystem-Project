<template>
  <div id="page-modal">
    <el-dialog v-model="isDialog" title="新建用户" width="30%" center>
      <ZpForm v-bind="modalConfig" v-model="formData"></ZpForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isDialog = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store/index'
import ZpForm from '@/Base-UI/form/index'
import _ from 'lodash'
export default defineComponent({
  name: 'page-modal',
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    //提对话框显示和隐藏
    const isDialog = ref(false)
    const formData: any = ref({})

    /* 新建或编辑确定事件 */
    const handleConfirmClick = () => {
      isDialog.value = false
      if (!props.modalConfig.formItems[2].isHidden) {
        //新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value }
        })
      } else {
        //编辑
        //去除不必要的属性
        const editData = _.omit(formData.value, ['id', 'createAt', 'updateAt'])
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...editData },
          id: formData.value.id
        })
      }
    }
    return {
      isDialog,
      formData,
      handleConfirmClick
    }
  },
  components: {
    ZpForm
  }
})
</script>

<style scoped></style>
