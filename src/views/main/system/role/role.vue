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
      @editBtnClick="editBtnClick"
      @newBtnClick="newBtnClick"
    ></PageContent>
    <!-- 新建对话框 -->
    <PageModal
      ref="pageModalRef"
      pageName="role"
      :modalConfig="roleModalConfig"
      :otherInfo="otherInfo"
    >
      <template #>
        <div class="menu-tree">
          <el-tree
            ref="elTreeRef"
            :data="menus"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'name' }"
            @check="handleCheckChange"
          />
        </div>
      </template>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import PageSearch from '@/compontents/page-search/index'
import PageContent from '@/compontents/page-content/index'
import PageModal from '@/compontents/page-modal/index'
import { formConfig } from '@/views/main/system/role/config/search.config'
import { modalConfig } from './config/modal.config'
import { contentConfig } from './config/content.config'
import { usePageSearch } from '@/hooks/usePageSerach'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store/index'
import { getMenuLeafkeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
export default defineComponent({
  name: 'role',
  setup() {
    const store = useStore()
    //为el-tree组件绑定ref
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    //让modalConfig响应式
    const roleModalConfig = ref(modalConfig)
    //获取所有菜单数据
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    //存储选中的节点
    const handleCheckChange = (data1: any, data2: any) => {
      //选中的父节点id
      const checkedKeys = data2.checkedKeys
      //选中的子节点id
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    //获取返回的表单数据
    const editCallback = (type: string, item: any) => {
      if (type === 'edit') {
        const leftKeys = getMenuLeafkeys(item.menuList)
        //当页面渲染完成，调用此函数
        nextTick(() => {
          elTreeRef.value?.setCheckedKeys(leftKeys, false)
        })
      } else {
        //清空树数据
        elTreeRef.value?.setCheckedKeys([], false)
      }
    }
    const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch()
    const [pageModalRef, newBtnClick, editBtnClick] = usePageModal(editCallback)
    return {
      formConfig,
      contentConfig,
      roleModalConfig,
      pageContentRef,
      resetBtnClick,
      queryBtnClick,
      pageModalRef,
      newBtnClick,
      editBtnClick,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  },
  components: {
    PageSearch,
    PageContent,
    PageModal
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 30px;
}
</style>
