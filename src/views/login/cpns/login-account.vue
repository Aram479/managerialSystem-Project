<template>
  <div id="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
export default defineComponent({
  name: 'login-account',
  setup() {
    /* 定义属性 */
    const store = useStore()
    const account = reactive({
      //如果localStorage有值则使用值否则为空字符
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    //校验规则
    const rules = {
      //用户名
      name: [
        { required: true, message: '请填写用户名', trigger: 'blur' },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5-10个字母或数字',
          trigger: 'blur'
        }
      ],
      /* 密码 */
      password: [
        { required: true, message: '请填写密码', trigger: 'blur' },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '用户名必须是3位以上的字母或数字',
          trigger: 'blur'
        }
      ]
    }
    /* 登录验证 */
    const loginAction = (isKeepPsd: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPsd) {
            //将用户名和密码保存到localStorage中
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.delCache('password')
          }
        }
      })
      //调用login子模块的action方法，传入account值
      store.dispatch('login/actLoginAction', { ...account })
    }
    return {
      account,
      rules,
      formRef,
      loginAction
    }
  },
  components: {}
})
</script>

<style scoped></style>
