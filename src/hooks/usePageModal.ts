import { ref } from 'vue'
import PageModal from '@/compontents/page-modal/index'

export function usePageModal(callback?: any) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  /* 新建事件 */
  const newBtnClick = () => {
    callback && callback('new')
    if (pageModalRef.value) {
      pageModalRef.value.formData = {}
      pageModalRef.value.newOredit = 'new'
      pageModalRef.value.isDialog = true
    }
  }
  /* 编辑事件 */
  const editBtnClick = (data: any) => {
    if (pageModalRef.value) {
      pageModalRef.value.formData = data
      pageModalRef.value.newOredit = 'edit'
      pageModalRef.value.isDialog = true
    }
    callback && callback('edit', data)
  }
  return [pageModalRef, newBtnClick, editBtnClick]
}
