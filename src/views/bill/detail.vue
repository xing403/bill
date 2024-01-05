<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { BILL_TYPE_DICT } from '@/utils/dictionary'

import billApi from '@/api/modules/bill'

const route = useRoute()
const router = useRouter()

const id = computed(() => Number.parseInt(route.params.id as string))

const formRef = ref<FormInstance>()
const bill = ref<Bill.IBillType>({
  title: '',
  type: 1,
  amount: 0,
  dataTime: '',
  tags: [],
  detail: '',

})

const rules = ref<FormRules>({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  type: [{ required: true, message: '请选择账单类型', trigger: 'blur' }],
  amount: [{
    required: true,
    validator: (rule: any, value: any, callback: any) => {
      if (Number.isNaN(Number(value))) {
        callback(new Error('请输入正确的金额'))
      }
      else { callback() }
    },
    trigger: 'blur',
  }],
  dataTime: [{ required: true, message: '请选择账单日期', trigger: 'blur' }],
})
onMounted(() => {
  if (Number.isNaN(id.value)) {
    ElMessage.warning('账单ID不正确')
    router.replace({ name: 'bill-list' })
  }
  else {
    billApi.getById({ id: id.value }).then((res) => {
      bill.value = res.data
      if (typeof bill.value.tags === 'string') {
        bill.value.tags = bill.value.tags.split(',').filter(tag => tag !== '')
      }
    })
  }
})
function handleEditBill() {
  router.push({ name: 'bill-edit', params: { id: id.value } })
}
function handleDeleteBill() {
  ElMessageBox.confirm('是否确定删除该条账单信息', '警告', {
    confirmButtonText: '确定',
    confirmButtonClass: 'el-button--danger',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    billApi.delete({ id: id.value }).then((res: any) => {
      ElMessage.success(res.message)
      router.replace({ name: 'bill-list' })
    })
  }).catch(() => { })
}
function handleGoBackRoute() {
  router.back()
}
</script>

<template>
  <div>
    <page-main>
      <el-form ref="formRef" :rules="rules" :model="bill" label-position="top" :inline="false">
        <el-form-item label="标题" prop="title">
          <el-input v-model="bill.title" clearable tabindex="1" disabled />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="bill.type" tabindex="2" disabled>
            <el-radio v-for="item in BILL_TYPE_DICT" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="金额" prop="amount">
          <el-input-number
            v-model="bill.amount" :min="0" :controls="false" clearable w-full :precision="2" tabindex="3"
            disabled
          />
        </el-form-item>
        <el-form-item label="日期" prop="dataTime">
          <el-date-picker
            v-model="bill.dataTime" disabled value-format="YYYY-MM-DD" type="date" w-full placeholder="选择日期"
            :editable="false" tabindex="4"
          />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-tag v-for="tag in bill.tags" :key="tag" class="mx-1" :disable-transitions="false" disabled>
            {{ tag }}
          </el-tag>
        </el-form-item>
        <el-form-item label="详细信息" prop="detail">
          <el-input
            v-model="bill.detail" type="textarea" placeholder="请输入备注信息" clearable w-full
            :autosize="{ minRows: 3, maxRows: 5 }" tabindex="6" disabled
          />
        </el-form-item>
      </el-form>
    </page-main>
    <fixed-action-bar>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button type="info" w-full @click="handleGoBackRoute" v-text="'返回列表'" />
        </el-col>
        <el-col :span="8">
          <el-button type="warning" w-full @click="handleEditBill" v-text="'编辑'" />
        </el-col>
        <el-col :span="8">
          <el-button type="danger" w-full @click="handleDeleteBill" v-text="'删除'" />
        </el-col>
      </el-row>
    </fixed-action-bar>
  </div>
</template>
