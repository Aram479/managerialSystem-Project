<template>
  <div class="user">
    <!-- 高级检索表单 -->
    <PageSearch
      :formConfig="formConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    ></PageSearch>
    <!-- 用户table -->
    <PageContent
      ref="pageContentRef"
      pageName="users"
      :contentConfig="contentConfig"
      @editBtnClick="editBtnClick"
      @newBtnClick="newBtnClick"
    ></PageContent>
    <!-- 新建对话框 -->
    <PageModal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="userModalConfig"
    ></PageModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import PageSearch from '@/compontents/page-search/index'
import PageContent from '@/compontents/page-content/index'
import PageModal from '@/compontents/page-modal/index'
import { formConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSerach'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'user',
  setup() {
    const store = useStore()
    const userModalConfigRef = ref(modalConfig)
    /* 让modalConfig可响应式 */
    const userModalConfig = computed(() => {
      /* 动态添加部门列表 */
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      /* 动态添加角色列表 */
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return userModalConfigRef.value
    })

    /* 编辑和新建分别隐藏和显示用户密码 */
    const callback = (type: string) => {
      const passwordItem = userModalConfigRef.value.formItems.find(
        (item) => item.field === 'password'
      )
      const isHidden = type === 'edit' ? true : false
      passwordItem!.isHidden = isHidden
    }
    /* 调用事件hooks */
    const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch()
    const [pageModalRef, newBtnClick, editBtnClick] = usePageModal(callback)

    return {
      formConfig,
      contentConfig,
      userModalConfig,
      pageContentRef,
      pageModalRef,
      resetBtnClick,
      queryBtnClick,
      newBtnClick,
      editBtnClick
    }
  },
  components: {
    PageSearch,
    PageContent,
    PageModal
  }
})
</script>

<style scoped></style>
