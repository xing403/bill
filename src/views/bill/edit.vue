<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
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
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()

function handleClose(tag: string) {
  Array.isArray(bill.value.tags) && bill.value.tags.splice(bill.value.tags.indexOf(tag), 1)
}

function showInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

function handleInputConfirm() {
  if (inputValue.value) {
    Array.isArray(bill.value.tags) && bill.value.tags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

function handleUpdateBill() {
  formRef.value && formRef.value.validate((valid: any) => {
    if (valid) {
      const param = {
        ...bill.value,
        tags: Array.isArray(bill.value.tags) ? bill.value.tags.join(',') : bill.value.tags,
      }
      billApi.update(param).then((res: any) => {
        ElMessage.success(res.message)
        formRef.value && formRef.value.resetFields()
      })
    }
  })
}
onMounted(() => {
  if (Number.isNaN(id.value)) {
    ElMessage.warning('账单ID不正确')
    router.replace({ name: 'bill-list' })
  }
  else {
    billApi.getById({ id: id.value }).then((res) => {
      bill.value = res.data
    })
  }
})
</script>

<template>
  <div>
    <page-main>
      <el-form ref="formRef" :rules="rules" :model="bill" label-position="top" :inline="false">
        <el-form-item label="标题" prop="title">
          <el-input v-model="bill.title" clearable tabindex="1" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="bill.type" tabindex="2">
            <el-radio v-for="item in BILL_TYPE_DICT" :key="item.value" :label="item.value">
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="金额" prop="amount">
          <el-input-number
            v-model="bill.amount" :min="0" :controls="false" clearable w-full :precision="2"
            tabindex="3"
          />
        </el-form-item>
        <el-form-item label="日期" prop="dataTime">
          <el-date-picker
            v-model="bill.dataTime" value-format="YYYY-MM-DD" type="date" w-full placeholder="选择日期"
            :editable="false" tabindex="4"
          />
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-tag
            v-for="tag in bill.tags" :key="tag" class="mx-1" closable :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" tabindex="5"
            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag ml-1" @click="showInput" v-text="'新标签'" />
        </el-form-item>
        <el-form-item prop="detail">
          <el-input
            v-model="bill.detail" type="textarea" placeholder="请输入备注信息" clearable w-full
            :autosize="{ minRows: 3, maxRows: 5 }" tabindex="6"
          />
        </el-form-item>
      </el-form>
    </page-main>
    <fixed-action-bar>
      <el-button type="primary" w-xs tabindex="7" @click="handleUpdateBill" v-text="'保 存'" />
    </fixed-action-bar>
  </div>
</template>
