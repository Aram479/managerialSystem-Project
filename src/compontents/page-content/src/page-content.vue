<template>
  <div id="page-content">
    <ZpTable
      :listData="pageList"
      :listCount="dataCount"
      v-bind="contentConfig"
      v-model:page="pageInfo"
    >
      <!-- 头部插槽中的btn插槽 -->
      <template #handlerBtn>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick"
          >新建角色</el-button
        >
      </template>
      <!-- 状态按钮 -->
      <template #status="slot">
        <el-button size="mini" :type="slot.row.enable ? 'success' : 'danger'">
          {{ slot.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <!-- 创建和更新时间 -->
      <template #create="slot">
        {{ $filters.formatTime(slot.row.createAt) }}
      </template>
      <template #update="slot">
        {{ $filters.formatTime(slot.row.updateAt) }}
      </template>
      <!-- 操作数据 -->
      <template #handle="slot">
        <div class="handle-btn">
          <el-button
            v-if="isUpdate"
            size="small"
            type="text"
            @click="handleEditClick(slot.row)"
          >
            <template #>
              <el-icon><edit></edit></el-icon>
              <span>编辑</span>
            </template>
          </el-button>

          <el-popconfirm
            title="确定要删除吗?"
            @confirm="handleDeleteClick(slot.row)"
          >
            <template #reference>
              <el-button v-if="isDelete" size="small" type="text">
                <template #>
                  <el-icon><delete></delete></el-icon>
                  <span>删除</span>
                </template>
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
      <!-- 动态插槽数据，用于连接使用该组件和Zptable的插槽数据 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="slot"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="slot.row"></slot>
        </template>
      </template>
    </ZpTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref } from 'vue'
import ZpTable from '@/Base-UI/table/index'
import { useStore } from '@/store/index'
import { userPermission } from '@/hooks/use-permission'
export default defineComponent({
  name: 'page-content',
  props: {
    contentConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    //存储上一个请求数据
    let lastQueryData = ref()
    /* 获取操作权限 */
    //创建权限
    const isCreate = userPermission(props.pageName, 'create')
    //编辑权限
    const isUpdate = userPermission(props.pageName, 'update')
    //删除权限
    const isDelete = userPermission(props.pageName, 'delete')
    //请求权限
    const isQuery = userPermission(props.pageName, 'query')

    /* 分页数据 */
    const pageInfo = ref({ currentPage: 1, size: 10 })
    watch(pageInfo, () => getPageData(lastQueryData))

    //发送请求
    const getPageData = (queryData: any = {}) => {
      //如果没有请求权限，则不会请求数据
      if (!isQuery) return
      lastQueryData = queryData
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.size * (pageInfo.value.currentPage - 1),
          size: pageInfo.value.size,
          ...lastQueryData //输入框数据
        }
      })
    }
    getPageData()
    //根据pageName调用getters
    const pageList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    //根据pageName调用getters
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )
    /*获取其他动态插槽*/
    const otherPropSlots = props.contentConfig?.propList.filter((item: any) => {
      //除了状态,创建时间，更新时间，操作外，都是动态的插槽
      if (item.slotName === 'status') return false
      if (item.slotName === 'create') return false
      if (item.slotName === 'update') return false
      if (item.slotName === 'handle') return false
      return true
    })
    /* 新建事件 */
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    /* 编辑事件 */
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    /* 删除事件 */
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    return {
      pageList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  },
  components: {
    ZpTable
  }
})
</script>

<style scoped>
.handle-btn .el-button {
  text-decoration: underline;
}
.handle-btn .el-button:nth-child(1):hover {
  color: blue;
}
.handle-btn .el-button:nth-child(2):hover {
  color: red;
}
</style>
