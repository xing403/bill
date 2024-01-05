<script setup lang="ts">
import { ElMessage } from 'element-plus'
import userApi from '@/api/modules/user'
import { formatGender, formatIdentity, formatTime, formatUserStatus, formatYesOrNo } from '@/utils/transition'
import { IDENTITY_ARR_DICT, IDENTITY_ARR_TAG_DICT } from '@/utils/dictionary'
import type { HTTPResponse } from '@/types/global'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const users = ref<User.IUserType[]>([])
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const editDialog = ref(false)
const editUser = ref<any>({})
const detailDialog = ref(false)
const detailUser = ref<any>({})
function handleFormatGender(row: any, column: any) {
  return formatGender(row[column.property])
}

function handleFormatTime(row: any, column: any) {
  return formatTime(row[column.property])
}

function handleFormatIdentity(row: any, column: any) {
  return formatIdentity(row[column.property])
}
function handleFormatYesOrNo(row: any, column: any) {
  return formatYesOrNo(row[column.property])
}
function formatStatus(row: any, column: any) {
  return formatUserStatus(row[column.property])
}
function hasPermission(auth_key: string) {
  return IDENTITY_ARR_DICT.indexOf(auth_key) < IDENTITY_ARR_DICT.indexOf(userStore.information?.auth ?? 'user')
}
function handleGetList() {
  userApi.getlistByUser({ page: page.value, pageSize: pageSize.value }).then((res: HTTPResponse.success<User.IUserState>) => {
    users.value = res.data.list
    total.value = res.data.total
  })
}
function handleDeleteUser(user: any) {
  userApi.deleteUser({ username: user.username }).then((res: any) => {
    ElMessage.success(res.message)
    handleGetList()
  })
}
function handleEditUser(user: any) {
  editDialog.value = true
  editUser.value = { ...user }
}
function handleDetailUser(user: any) {
  detailDialog.value = true
  detailUser.value = { ...user }
}
function handleAfterReloadList(val: boolean) {
  editDialog.value = false
  detailDialog.value = false
  if (val) {
    handleGetList()
  }
}
onMounted(() => {
  handleGetList()
})
</script>

<template>
  <div>
    <page-main>
      <el-table :data="users" border stripe style="width: 100%;">
        <el-table-column prop="username" label="用户名" width="180" align="center" />
        <el-table-column prop="email" label="邮箱" width="180" align="center" />
        <el-table-column prop="phone" label="手机号" width="180" align="center" />
        <el-table-column prop="gender" label="性别" width="180" :formatter="handleFormatGender" align="center" />

        <el-table-column prop="createTime" label="创建时间" width="180" :formatter="handleFormatTime" align="center" />
        <el-table-column prop="auth" label="账号身份" width="180" align="center">
          <template #default="{ row, column }">
            <el-tag
              :type="IDENTITY_ARR_TAG_DICT[IDENTITY_ARR_DICT.indexOf(row[column.property])]"
              v-text="handleFormatIdentity(row, column)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="账号状态" :formatter="handleFormatYesOrNo" align="center">
          <template #default="{ row, column }">
            <el-tag v-if="row[column.property] === 0" type="" size="small" v-text="formatStatus(row, column)" />
            <el-tag v-else type="danger" size="small" v-text="formatStatus(row, column)" />
          </template>
        </el-table-column>
        <el-table-column prop="isDelete" label="是否被删除" :formatter="handleFormatYesOrNo" align="center" />
        <el-table-column label="操作" align="center" width="240">
          <template #default="scope">
            <div v-if="hasPermission(scope.row.auth)">
              <el-popconfirm
                title="确定删除用户吗?" confirm-button-text="确定" cancel-button-text="再想想" icon="el-icon-info"
                icon-color="red" @confirm="handleDeleteUser(scope.row)"
              >
                <template #reference>
                  <el-button type="danger" size="small" v-text="'删除'" />
                </template>
              </el-popconfirm>
              <el-button type="warning" size="small" @click="handleEditUser(scope.row)" v-text="'编辑'" />
              <el-button type="info" size="small" @click="handleDetailUser(scope.row)" v-text="'详情'" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div flex="~ row justify-end items-center gap-1" p-5 empty-hidden>
        <el-pagination
          v-model:current-page="page" v-model:page-size="pageSize" hide-on-single-page
          :page-sizes="[10, 20, 50]" background layout="prev, pager, next, pager,total" :total="total"
          @size-change="handleGetList" @current-change="handleGetList"
        />
      </div>
    </page-main>

    <el-dialog v-model="editDialog" title="编辑用户" destroy-on-close>
      <user-component
        v-model:user="editUser" :disabled="false" @edit="handleAfterReloadList"
        @cancel="handleAfterReloadList"
      />
    </el-dialog>
    <el-dialog v-model="detailDialog" title="用户详情" destroy-on-close>
      <user-component v-model:user="detailUser" />
    </el-dialog>
  </div>
</template>
