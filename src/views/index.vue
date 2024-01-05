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
      <el-row :gutter="10">
        <el-col :xs="24" :sm="8">
          <colorful-card title="账单总数" icon="ep:list" gradient-start="#ce9ffc" gradient-end="#96f2ff">
            <div text-1.5em v-text="information.billCount" />
            <template #footer>
              <div flex="~ row items-center" text-1em>
                <span>当前月 支出/收入</span>
                <span>{{ information.cBillCount }}</span>
              </div>
            </template>
          </colorful-card>
        </el-col>
        <el-col :xs="24" :sm="8">
          <colorful-card title="收入总额" icon="mdi:checkbox-multiple-blank-circle-outline" gradient-start="#96f2ff" gradient-end="#ce9ffc">
            <div text-1.5em v-text="information.cBillIncome" />
            <template #footer>
              <div flex="~ row items-center gap-1" text-1em>
                <span>与上月相比</span>
                <trend
                  :value="Math.abs((information.cBillIncome - information.lBillIncome)).toFixed(2)"
                  :type="information.cBillIncome - information.lBillIncome >= 0 ? 'up' : 'down'"
                />
              </div>
            </template>
          </colorful-card>
        </el-col>
        <el-col :xs="24" :sm="8">
          <colorful-card title="支出总额" icon="mdi:checkbox-multiple-marked-outline" gradient-start="#96f2ff" gradient-end="#ce9ffc">
            <div text-1.5em>
              {{ information.cBillExpense }}
            </div>
            <template #footer>
              <div flex="~ row items-center gap-1" text-1em>
                <span>与上月相比</span>
                <trend
                  :value="Math.abs((information.cBillExpense - information.lBillExpense)).toFixed(2)"
                  :type="information.cBillExpense - information.lBillExpense >= 0 ? 'up' : 'down'"
                />
              </div>
            </template>
          </colorful-card>
        </el-col>
      </el-row>
    </page-main>
  </div>
</template>
