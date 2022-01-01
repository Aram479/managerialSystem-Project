<template>
  <div id="table">
    <div class="header">
      <slot name="header">
        <h2 class="title">{{ title }}</h2>
        <div class="handler">
          <slot name="handlerBtn">按钮位置</slot>
        </div>
      </slot>
    </div>
    <div class="content">
      <el-table
        :data="listData"
        border
        style="width: 100%"
        @selection-change="selectionChange"
        v-bind="childrenProps"
      >
        <!-- 单选框 -->
        <el-table-column
          v-if="showSelectColumn"
          type="selection"
          width="60"
          align="center"
        />
        <!-- 序号 -->
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          width="80"
          align="center"
        />
        <!-- 数据 -->
        <el-table-column
          v-for="item in propList"
          :key="item.prop"
          v-bind="item"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.size"
          :page-sizes="[1, 5, 10]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'tables',
  props: {
    //table数据
    listData: {
      type: Array,
      requird: true
    },
    //table属性
    propList: {
      type: Array,
      requird: true
    },
    //是否显示index列
    showIndexColumn: {
      type: Boolean,
      default: () => false
    },
    //是否显示单选框列
    showSelectColumn: {
      type: Boolean,
      default: () => false
    },
    //标题名
    title: {
      type: String,
      default: () => ''
    },
    /* 分页数据 */
    //条数
    listCount: {
      type: Number,
      default: () => 0
    },
    //默认当前页1,,条数10条
    page: {
      type: Object,
      default: () => ({ currentPage: 1, size: 10 })
    },
    /* 树形表格属性 */
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    /* 是否显示分页功能 */
    showFooter: {
      type: Boolean,
      default: () => true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    /* 单选框选中行数据 */
    const selectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    /* 当前页改变事件 */
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }
    /* 选择展示条数事件 */
    const handleSizeChange = (size: number) => {
      emit('update:page', { ...props.page, size })
    }
    return {
      selectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  },
  components: {}
})
</script>

<style scoped>
#table {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer {
  text-align: right;
  margin-top: 10px;
}
</style>
