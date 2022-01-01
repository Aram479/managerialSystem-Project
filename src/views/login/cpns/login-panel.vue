<template>
  <div id="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><UserFilled /></el-icon>
            账号登录
          </span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><Iphone /></el-icon>
            手机登录
          </span>
        </template>
        <LoginPhone ref="phoneRef"></LoginPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPsd" label="记住密码"></el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <div>
      <el-button class="account-btn" type="primary" @click="loginClick"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  name: 'login-panel',
  setup() {
    /* 定义属性 */
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    //绑定 记住密码 值
    const isKeepPsd = ref(false)
    const currentTab = ref('account')
    //登录按钮
    const loginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPsd.value)
      } else {
        phoneRef.value?.loginAction(isKeepPsd.value)
      }
    }
    return {
      isKeepPsd,
      loginClick,
      accountRef,
      phoneRef,
      currentTab
    }
  },
  components: {
    LoginAccount,
    LoginPhone
  }
})
</script>

<style scoped>
#login-panel {
  width: 320px;
}
.title {
  text-align: center;
}
.account-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.account-btn {
  width: 100%;
}
</style>
