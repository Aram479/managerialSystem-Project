import { ref } from 'vue'
import PageContent from '@/compontents/page-content/index'
export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  /* 重置表单事件 */
  const resetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }
  /* 搜索事件 */
  const queryBtnClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef, resetBtnClick, queryBtnClick]
}
