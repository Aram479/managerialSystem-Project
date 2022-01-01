//为table设置属性
const propList = [
  { prop: 'name', label: '用户名' },
  { prop: 'realname', label: '真实姓名' },
  { prop: 'cellphone', label: '手机号码' },
  { prop: 'enable', label: '状态', slotName: 'status' },
  { prop: 'createAt', label: '创建时间', slotName: 'create' },
  { prop: 'updateAt', label: '更新时间', slotName: 'update' },
  { label: '操作', minwidth: '120', slotName: 'handle' }
]
//是否为table组件显示序号列
const showIndexColumn = true
//table是否显示单选框
const showSelectColumn = true
//table头部标题
const title = '用户列表'

export const contentConfig = {
  propList,
  showIndexColumn,
  showSelectColumn,
  title
}
