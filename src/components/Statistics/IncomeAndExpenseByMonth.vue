<script setup lang="ts">
import { dayjs } from 'element-plus'
import * as echarts from 'echarts'
import { useElementSize, watchArray } from '@vueuse/core'
import billApi from '@/api/modules/bill'
import { formatMoney } from '@/utils/transition'

defineOptions({ name: 'IncomeAndExpenseByYear' })

const chartRef = shallowRef<HTMLElement>()
const chart = shallowRef<echarts.ECharts>()

const { width, height } = useElementSize(chartRef)

const incomeAndExpenseByMonth = ref([])
const dataTime = ref(dayjs().format('YYYY-MM'))
const shareData = ref('')
function handleGetIncomeAndExpenseByMonth() {
  if (dataTime.value === null) {
    return
  }
  billApi.incomeAndExpenseByMonth({ dataTime: dataTime.value }).then((res) => {
    incomeAndExpenseByMonth.value = res.data.map((item: any) => {
      item.income = Number(item.income).toFixed(2)
      item.expense = Number(item.expense).toFixed(2)
      return item
    })
    shareData.value = JSON.stringify({
      value: incomeAndExpenseByMonth.value,
      config: {
        col: [{
          label: '日期',
          prop: 'data_time',
        }, {
          label: '收入',
          prop: 'income',
        }, {
          label: '支出',
          prop: 'expense',
        }],
      },
    })
    drawChartByMonthDay()
  })
}

function drawChartByMonthDay() {
  const colors = ['#EE6666', '#91CC75', '#5470C6']
  chart.value && chart.value.setOption({
    title: { text: `${dataTime.value} 收入支出详情` },
    color: colors,

    grid: { top: '80px', left: '20px', right: '20px', bottom: '20px', containLabel: true },
    dataset: { source: incomeAndExpenseByMonth.value },
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['收入', '支出'], left: 'center', bottom: 0 },
    toolbox: { show: true, feature: { magicType: { show: true, type: ['line', 'bar'] } } },
    xAxis: { type: 'category', axisTick: { alignWithLabel: true }, source: 'data_time' },
    yAxis: [
      {
        type: 'value',
        name: '收入(元)',
        position: 'left',
        axisLabel: { formatter: (money: number) => formatMoney(money) },
        min: () => {
          const minValue = Math.min.apply(null, incomeAndExpenseByMonth.value.map((item: any) => item!.income ?? 0))
          return minValue - (minValue * 0.1)
        },
        max() {
          const maxValue = Math.max.apply(null, incomeAndExpenseByMonth.value.map((item: any) => item!.income ?? 0))
          return maxValue + (maxValue * 0.1)
        },
        axisLine: { show: true, lineStyle: { color: colors[0] } },
      },
      {
        type: 'value',
        name: '支出(元)',
        position: 'right',
        axisLabel: { formatter: (money: number) => formatMoney(money) },
        min: () => {
          const minValue = Math.min.apply(null, incomeAndExpenseByMonth.value.map((item: any) => item!.expense ?? 0))
          return minValue - (minValue * 0.1)
        },
        max: () => {
          const maxValue = Math.max.apply(null, incomeAndExpenseByMonth.value.map((item: any) => item!.expense ?? 0))
          return maxValue + (maxValue * 0.1)
        },
        axisLine: { show: true, lineStyle: { color: colors[1] } },
      },
    ],
    series: [
      { name: '收入', type: 'line', smooth: true, yAxisIndex: 0, encode: { x: 'data_time', y: 'income' } },
      { name: '支出', type: 'line', smooth: true, yAxisIndex: 1, encode: { x: 'data_time', y: 'expense' } },
    ],
  } as echarts.EChartsCoreOption)
}

onMounted(() => {
  nextTick(() => {
    chart.value = echarts.init(chartRef.value)
    handleGetIncomeAndExpenseByMonth()
  })
})

watchArray([width, height], () => {
  chart.value && chart.value.resize()
})
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="chart-header" flex="~ row justify-between items-center">
          <div class="chart-title" flex="~ row items-center">
            <div>{{ dataTime }} 收支情况</div>
            <share v-model:data="shareData" type="table" />
          </div>
          <div class="chart-option">
            <el-date-picker
              v-model="dataTime" type="month" value-format="YYYY-MM" :editable="false" placeholder="选择日期时间"
              @change="handleGetIncomeAndExpenseByMonth"
            />
          </div>
        </div>
      </template>
      <div ref="chartRef" h-450px />
    </el-card>
  </div>
</template>
