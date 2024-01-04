<route lang="yaml">
name: personalEditPassword
meta:
  title: 修改密码
</route>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

defineOptions({
  name: 'PersonalEditPassword',
})

const userStore = useUserStore()

const formRef = ref<FormInstance>()
const form = ref({
  password: '',
  newPassword: '',
  checkPassword: '',
})

const rules = ref<FormRules>({
  password: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== form.value.newPassword) {
          callback(new Error('请确认新密码'))
        }
        else {
          callback()
        }
      },
    },
  ],
})

function onSubmit() {
  formRef.value && formRef.value.validate((valid) => {
    if (valid) {
      userStore.editPassword(form.value).then((res: any) => {
        ElMessage.success(res.message)
        userStore.logout()
      })
    }
  })
}
</script>

<template>
  <div>
    <page-header title="修改密码" content="定期修改密码可以提高帐号安全性噢~" />
    <page-main>
      <el-row>
        <el-col :md="24" :lg="12">
          <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="原密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入原密码" show-password />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="form.newPassword" type="password" placeholder="请输入原密码" show-password />
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPassword">
              <el-input v-model="form.checkPassword" type="password" placeholder="请输入原密码" show-password />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </page-main>
    <fixed-action-bar>
      <el-button type="primary" size="large" @click="onSubmit">
        提交
      </el-button>
    </fixed-action-bar>
  </div>
</template>
