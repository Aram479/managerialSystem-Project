<template>
  <div id="nav-info">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        >
        </el-avatar>
        <span>{{ userName }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item class="user-logout">
            <template #>
              <el-icon class="el-icon--right">
                <switch-button />
              </el-icon>
              <span>退出登录</span>
            </template>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <template #>
              <el-icon class="el-icon--right">
                <user-filled />
              </el-icon>
              <span>用户信息</span>
            </template>
          </el-dropdown-item>
          <el-dropdown-item>
            <template #>
              <el-icon class="el-icon--right">
                <setting />
              </el-icon>
              <span>用户管理</span>
            </template>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  name: 'nav-info',
  setup() {
    const store = useStore()
    //获取用户名
    const userName = computed(() => store.state.login.userInfo.name)
    return {
      userName
    }
  },
  components: {}
})
</script>

<style scoped>
.el-dropdown {
  cursor: pointer;
}
.user-logout:hover {
  color: rgb(255, 117, 117);
  background-color: rgba(255, 0, 0, 0.1);
}
.el-avatar {
  margin: 0 5px;
  vertical-align: middle;
}
</style>
