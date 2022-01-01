//table头部标题
const title = '菜单列表'
//为table设置属性
const propList = [
  { prop: 'name', label: '菜单名称' },
  { prop: 'type', label: '类型' },
  { prop: 'url', label: '类型url' },
  { prop: 'icon', label: '菜单icon' },
  { prop: 'permission', label: '按钮权限' },
  { prop: 'createAt', label: '创建时间', slotName: 'create' },
  { prop: 'updateAt', label: '更新时间', slotName: 'update' },
  { label: '操作', minwidth: '120', slotName: 'handle' }
]
//是否为table组件显示序号列
const showIndexColumn = false
//table是否显示单选框
const showSelectColumn = false
//使用树形列表
const childrenProps = {
  rowKey: 'id',
  treeProp: {
    children: 'children'
  }
}
//是否显示分页功能
const showFooter = false
export const contentConfig = {
  propList,
  showIndexColumn,
  showSelectColumn,
  title,
  childrenProps,
  showFooter
}
