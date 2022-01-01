/* 导航栏 */
<template>
  <div id="nav-menu">
    <!-- logo -->
    <div :class="!isAsideWidth ? 'logo' : 'img-center'">
      <img src="~@/assets/img/logo.svg" />
      <span class="title" v-show="!isAsideWidth">Vue3+Ts</span>
    </div>
    <!-- 导航菜单 -->
    <el-menu
      mode="vertical"
      :default-active="actNum"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#b7bdc3"
      @select="activeSelect"
      :collapse="isAsideWidth"
    >
      <!-- 母菜单 -->
      <el-sub-menu
        :index="root.id + ''"
        v-for="root in userMenus"
        :key="root.id"
      >
        <template #title>
          <!-- 图标 -->
          <el-icon v-if="getIcon(root.icon)"
            ><component :is="getIcon(root.icon)"></component
          ></el-icon>
          <!-- 母菜单名 -->
          <span>{{ root.name }}</span>
        </template>
        <!-- 子菜单 -->
        <el-menu-item
          :index="child.id + ''"
          v-for="child in root.children"
          :key="child.id"
          :class="actNum == child.id ? 'active-bgc' : ''"
          @click="menuItemClick(child)"
        >
          <template #title>
            <!-- 子图标 -->
            <el-icon v-if="getIcon(child.icon)"
              ><component :is="getIcon(child.icon)"></component
            ></el-icon>
            <!-- 子菜单名 -->
            <span>{{ child.name }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  name: 'nav-menu',
  props: {
    /* 获取main传入的展开布尔值 */
    isAsideWidth: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const router = useRouter()
    const userMenus = computed(() => store.state.login.userMenus)
    const activeSelect = (index: string) => {
      actNum.value = index
    }
    /* 取出标签组件名 */
    const getIcon = computed(() => {
      return function (icon: string) {
        if (icon) {
          //正则取出组件名
          icon = icon.replace(/el-icon-/, '')
          return icon
        }
      }
    })
    const menuItemClick = (item: any) => {
      router.push(item.url)
    }
    const defaultAct = pathMapToMenu(userMenus.value, route.path).id
    //默认激活菜单
    let actNum = ref(defaultAct + '')
    return {
      userMenus,
      getIcon,
      activeSelect,
      actNum,
      menuItemClick
    }
  },
  components: {}
})
</script>

<style scoped>
.logo {
  display: flex;
  height: 28px;
  padding: 10px 40px;
  justify-content: space-around;
  align-items: center;
}
.logo > img {
  height: 100%;
}
.logo > .title {
  font-size: 16px;
  font-weight: 700;
  color: white;
  line-height: 0px;
}
.el-menu {
  border-right: none;
}
.el-sub-menu {
  width: 100%;
}
.el-menu-item {
  width: 100%;
  background-color: #0c2135;
}
.el-menu-item:hover {
  color: white;
}
.active-bgc {
  background-color: #0a60bd;
  color: #fff;
}
.img-center {
  display: flex;
  width: 28px;
  height: 28px;
  margin: 10px auto;
}
</style>
