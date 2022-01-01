<template>
  <div id="main">
    <el-container class="main-content">
      <!-- 导航菜单 -->
      <el-aside :width="asideWidth"
        ><NavMenu :isAsideWidth="isAsideWidth"></NavMenu
      ></el-aside>
      <el-container>
        <el-header class="page-header"
          ><NavHeader @iconChange="handleIconChange"></NavHeader
        ></el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import NavMenu from '@/compontents/nav-menu/index'
import NavHeader from '@/compontents/nav-header/index'
export default defineComponent({
  setup() {
    //定义菜单展开宽度
    const asideWidth = ref('200px')
    const isAsideWidth = ref(false)
    /* 获取NavHeader参数，设置菜单宽度大小*/
    const handleIconChange = (isIcon: boolean) => {
      isAsideWidth.value = isIcon
      asideWidth.value = isIcon ? '60px' : '200px'
    }

    return {
      asideWidth,
      isAsideWidth,
      handleIconChange
    }
  },
  components: {
    NavMenu,
    NavHeader
  }
})
</script>

<style scoped>
#main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
/* 隐藏竖向滚动条 */
::-webkit-scrollbar {
  display: none;
}
.page-info {
  background: white;
  border-radius: 5px;
}
</style>
