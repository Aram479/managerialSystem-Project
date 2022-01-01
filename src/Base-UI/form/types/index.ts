/* 为高级检索表单设置类型 */

type IFormTyoe = 'input' | 'password' | 'select' | 'datepicker'
interface IFormItem {
  field: string //输入框绑定值
  type: IFormTyoe //设置表单组件类型
  label: string //表单label名
  rules?: any[] //校验规则
  placeholder?: any //输入框描述
  options?: any[] //设置el-select的el-options类型
  otherOptions?: any //设置其他类型作为组件属性
  isHidden?: boolean //某些输入框是否隐藏
}
interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
export { IFormItem, IForm }
