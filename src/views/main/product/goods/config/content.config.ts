//为table设置属性
const propList = [
  { prop: 'name', label: '商品名称', minWidth: '80' },
  { prop: 'oldPrice', label: '原价格', minWidth: '40', slotName: 'oldPrice' },
  { prop: 'newPrice', label: '现价格', minWidth: '40' },
  { prop: 'imgUrl', label: '商品图片', slotName: 'image', minWidth: '60' },
  { prop: 'status', label: '状态', slotName: 'status', minWidth: '40' },
  { prop: 'createAt', label: '创建时间', slotName: 'create', minWidth: '80' },
  { prop: 'updateAt', label: '更新时间', slotName: 'update', minWidth: '80' },
  { label: '操作', slotName: 'handle' }
]
//是否为table组件显示序号列
const showIndexColumn = true
//table是否显示单选框
const showSelectColumn = true
//table头部标题
const title = '商品列表'

export const contentConfig = {
  propList,
  showIndexColumn,
  showSelectColumn,
  title
}
