<template>
  <div id="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="num">
        <el-input v-model="phone.num"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="code-btn">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
export default defineComponent({
  name: 'login-phone',
  setup() {
    /* 定义属性 */
    const store = useStore()
    const phone = reactive({
      num: localCache.getCache('phone') ?? '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    //校验规则
    const rules = {
      num: [
        { required: true, message: '请填写手机号码', trigger: 'blur' },
        {
          pattern:
            /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/,
          message: '请输入正确的手机号码',
          trigger: 'change'
        }
      ],
      code: [{ required: true, message: '请填写验证码', trigger: 'blur' }]
    }
    /* 登录验证 */
    const loginAction = (isKeepPsd: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPsd) {
            //将用户名和密码保存到localStorage中
            localCache.setCache('phone', phone.num)
          } else {
            localCache.delCache('phone')
          }
        }
      })
      //调用login子模块的action方法，传入account值
      store.dispatch('login/phoneLoginAction', { ...phone })
    }
    return {
      phone,
      rules,
      formRef,
      loginAction
    }
  },
  components: {}
})
</script>

<style scoped>
.code {
  display: flex;
}
.code-btn {
  margin-left: 8px;
}
</style>
