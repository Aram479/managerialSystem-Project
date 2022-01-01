<template>
  <div id="login">
    <LoginPanel></LoginPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import LoginPanel from './cpns/login-panel.vue'
export default defineComponent({
  name: 'login',
  setup() {
    return {}
  },
  components: {
    LoginPanel
  }
})
</script>

<style scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
