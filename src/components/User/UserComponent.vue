<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { GENDER_DICT, IDENTITY_ARR_DICT, IDENTITY_DICT } from '@/utils/dictionary'
import useUserStore from '@/store/modules/user'
import userApi from '@/api/modules/user'

const props = withDefaults(defineProps<{
  user: User.IUserType
  disabled?: boolean
}>(), {
  disabled: true,
})

const emits = defineEmits(['edit', 'detail', 'delete', 'cancel'])

const user = ref<User.IUserType>(props.user)
const userStore = useUserStore()

const userFormRef = ref<FormInstance>()

const rules = ref<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
})
function hasPermission(auth_key: string) {
  return IDENTITY_ARR_DICT.indexOf(auth_key) < IDENTITY_ARR_DICT.indexOf(userStore.information?.auth ?? 'user')
}

function handleSubmit() {
  userApi.uploadInformation(user.value).then((res: any) => {
    ElMessage.success(res.message)
    emits('edit', true)
  })
}
function handleCancel() {
  emits('edit', false)
}
</script>

<template>
  <el-form ref="userFormRef" :model="user" :rules="rules" label-width="80px" :inline="false">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" placeholder="请输入用户名" disabled style="width: 260px;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="性别" prop="gender">
          <el-select v-model="user.gender" placeholder="请选择性别" :disabled="disabled">
            <el-option v-for="(value, key) in GENDER_DICT" :key="key" :label="value" :value="key" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="user.phone" placeholder="请输入手机号" disabled style="width: 260px;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" placeholder="请输入邮箱" disabled style="width: 260px;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="分配权限" prop="auth">
          <el-select v-model="user.auth" placeholder="权限" :disabled="disabled">
            <template v-for="(label, key) in IDENTITY_DICT">
              <el-option v-if="hasPermission(key as string)" :key="key" :label="label" :value="key" />
            </template>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="状态" prop="status">
          <el-switch v-model="user.status" :active-value="0" :inactive-value="1" :disabled="disabled" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item v-if="!disabled">
      <el-button type="primary" @click="handleSubmit" v-text="'保存'" />
      <el-button @click="handleCancel" v-text="'取消'" />
    </el-form-item>
  </el-form>
</template>
