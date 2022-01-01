<template>
  <div id="nav-header">
    <span class="head-icon" @click="iconClick">
      <!-- 展开菜单图标切换 -->
      <Fold v-if="isIcon"></Fold>
      <Expand v-else></Expand>
    </span>
    <div class="content">
      <!-- 面包屑 -->
      <ZpBreadcrumb :breadcrumb="breadcrumb"></ZpBreadcrumb>
      <!-- 下拉菜单 -->
      <NavUserInfo></NavUserInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import NavUserInfo from './nav-userInfo.vue'
import ZpBreadcrumb, { IBreadcrumb } from '@/Base-UI/breadcrumb/index'
import { pathMapBreadcrumb } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/index'
export default defineComponent({
  emits: ['iconChange'],
  name: 'nav-header',
  setup(props, { emit }) {
    let isIcon = ref(false)
    const route = useRoute()
    const store = useStore()
    /* 点击发送给main.vue事件 */
    const iconClick = () => {
      isIcon.value = !isIcon.value
      emit('iconChange', isIcon.value)
    }
    const breadcrumb = computed(() => {
      /* 面包屑数据 */
      const userMenus = computed(() => store.state.login.userMenus)
      return pathMapBreadcrumb(userMenus.value, route.path)
    })
    return {
      isIcon,
      breadcrumb,
      iconClick
    }
  },
  components: {
    NavUserInfo,
    ZpBreadcrumb
  }
})
</script>

<style scoped>
#nav-header {
  width: 100%;
  display: flex;
  align-items: center;
}
.head-icon {
  width: 30px;
  height: 30px;
}
.head-icon > * {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.content {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}
</style>
