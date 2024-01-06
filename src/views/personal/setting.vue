<route lang="yaml">
name: personalSetting
meta:
  title: 个人设置
  cache: personal-edit.password
    </route>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import userApi from '@/api/modules/user'
import { GENDERS_DICT } from '@/utils/dictionary'

defineOptions({
  name: 'PersonalSetting',
})

const router = useRouter()
const userStore = useUserStore()
const token = computed(() => userStore.token)
const actionURL = computed(() => import.meta.env.VITE_OPEN_PROXY === 'true' ? `/proxy${import.meta.env.VITE_APP_UPLOAD_IMAGE}` : import.meta.env.VITE_APP_UPLOAD_IMAGE)
const baseInfoFormRef = ref<FormInstance>()
const form = ref({ ...userStore.information })
const formRules = ref<FormRules>({
  phone: [
    { required: true, message: '请输入你的手机号', trigger: 'blur' },
    { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入你的邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
  ],
})

function handleSuccess(res: any) {
  if (res.data) {
    form.value.avatar = res.data.url
  }
  else {
    ElMessage.warning(res.error)
  }
}
function handleSaveBaseInformation() {
  baseInfoFormRef.value && baseInfoFormRef.value.validate((valid) => {
    if (valid) {
      userApi.uploadInformation(form.value).then((res: any) => {
        ElMessage.success(res.message)
        userStore.getPermissions()
      })
    }
  })
}

function editPassword() {
  router.push({
    name: 'personalEditPassword',
  })
}
</script>

<template>
  <div>
    <page-main>
      <el-tabs tab-position="left" style="height: 600px;">
        <el-tab-pane label="基本设置" class="basic">
          <h2>基本设置</h2>
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form ref="baseInfoFormRef" :model="form" :rules="formRules" label-width="120px" label-suffix=":">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" placeholder="请输入你的手机号" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="form.email" placeholder="请输入你的邮箱" />
                </el-form-item>
                <el-form-item label="性别" prop="email">
                  <el-select v-model="form.gender" placeholder="请选择你的性别">
                    <el-option v-for="item in GENDERS_DICT" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleSaveBaseInformation">
                    保存
                  </el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <image-upload
                v-model:url="form.avatar" :action="actionURL" name="image"
                :headers="{ Authorization: token }" no-tip class="headimg-upload" @on-success="handleSuccess"
              />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="安全设置" class="security">
          <h2>安全设置</h2>
          <div class="setting-list">
            <div class="item">
              <div class="content">
                <div class="title" v-text="'账户密码'" />
                <div class="desc" v-text="'当前密码强度：强'" />
              </div>
              <div class="action">
                <el-button type="primary" text @click="editPassword" v-text="'修改'" />
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </page-main>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs) {
  .el-tabs__header .el-tabs__nav {
    .el-tabs__active-bar {
      z-index: 0;
      width: 100%;
      background-color: var(--el-color-primary-light-9);
      border-right: 2px solid var(--el-color-primary);
      transition: transform 0.3s, background-color 0.3s, var(--el-transition-border);
    }

    .el-tabs__item {
      text-align: left;
      padding-right: 100px;
    }
  }

  .el-tab-pane {
    padding: 0 20px 0 30px;
  }
}

h2 {
  margin: 0;
  margin-bottom: 30px;
  font-weight: normal;
}

.basic {
  :deep(.headimg-upload) {
    text-align: center;

    .el-upload-dragger {
      border-radius: 50%;
    }
  }
}

.security {
  .setting-list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid var(--el-border-color-lighter);
      transition: var(--el-transition-border);

      .content {
        .title {
          margin-bottom: 5px;
          color: var(--el-text-color-primary);
          transition: var(--el-transition-color);
        }

        .desc {
          font-size: 14px;
          color: var(--el-text-color-secondary);
          transition: var(--el-transition-color);
        }
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
