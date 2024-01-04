<route lang="yaml">
name: home
meta:
  title: 主页
</route>

<script setup lang="ts">
import billApi from '@/api/modules/bill'

const information = ref({
  billCount: 0,
  cBillCount: 0,
  cBillIncome: 0,
  cBillExpense: 0,
  cBillTotal: 0,
  lBillIncome: 0,
  lBillExpense: 0,
})

onMounted(() => {
  billApi.information().then((res: any) => {
    information.value = res.data
  })
})
</script>

<template>
  <div>
    <page-main>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="8">
          <colorful-card title="账单总数" icon="ep:list">
            <div text-1.5em>
              {{ information.billCount }}
            </div>
            <div flex="` row items-center" text-1em>
              <span>当前月 支出/收入</span>
              <span>{{ information.cBillCount }}</span>
            </div>
          </colorful-card>
        </el-col>
        <el-col :xs="24" :sm="8">
          <colorful-card title="收入总额" icon="mdi:checkbox-multiple-blank-circle-outline">
            <div text-1.5em>
              {{ information.cBillIncome }}
            </div>
            <div flex="` row items-center" text-1em>
              <span>与上月相比</span>
              <svg-icon v-if="information.cBillIncome - information.lBillIncome > 0" name="mdi:arrow-up-thick" />
              <svg-icon v-else-if="information.cBillIncome - information.lBillIncome < 0" name="mdi:arrow-down-thick" />
              <span>{{ Math.abs((information.cBillIncome - information.lBillIncome)).toFixed(2) }}</span>
            </div>
          </colorful-card>
        </el-col>
        <el-col :xs="24" :sm="8">
          <colorful-card title="支出总额" icon="mdi:checkbox-multiple-marked-outline">
            <div text-1.5em>
              {{ information.cBillExpense }}
            </div>
            <div flex="` row items-center" text-1em>
              <span>与上月相比</span>
              <svg-icon v-if="information.cBillExpense - information.lBillExpense > 0" name="mdi:arrow-up-thick" color="#F56C6C" />
              <svg-icon v-else-if="information.cBillExpense - information.lBillExpense < 0" name="mdi:arrow-down-thick" color="#67C23A" />
              <span>{{ Math.abs((information.cBillExpense - information.lBillExpense)).toFixed(2) }}</span>
            </div>
          </colorful-card>
        </el-col>
      </el-row>
    </page-main>
  </div>
</template>
