import { IForm } from '@/Base-UI/form'
/* 封装并定义ZpForm中form组件属性 */
export const formConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'datetimerange'
      }
    }
  ]
  /* labelWidth: '120px', */
  /* itemStyle: {
    padding: '10px 40px'
  }, */
  /*  calLayout: {
    span: 8
  } */
}
