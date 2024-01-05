<script setup lang="ts">
import { dayjs } from 'element-plus'
import * as echarts from 'echarts'
import billApi from '@/api/modules/bill'

defineOptions({ name: 'IncomeAndExpenseByMonth' })

const chartRef = shallowRef<HTMLElement>()
const chart = shallowRef<echarts.ECharts>()

const incomeAndExpenseByMonth = ref([])
const dataTime = ref(dayjs().format('YYYY-MM'))
function handleGetIncomeAndExpenseByMonth() {
  billApi.incomeAndExpenseByMonth({ dataTime: dataTime.value }).then((res) => {
    incomeAndExpenseByMonth.value = res.data
    drawChartByMonthDay()
  })
}
function formatMoney(money: number) {
  if (money < 10000) {
    return money
  }
  else if (money < 1000000) {
    return `${money / 10000}万`
  }
  else {
    return `${money / 1000000}亿`
  }
}
function drawChartByMonthDay() {
  const colors = ['#EE6666', '#91CC75', '#5470C6']
  chart.value && chart.value.setOption({
    title: {
      text: `${dataTime.value} 收入支出详情`,
    },
    color: colors,
    dataset: { source: incomeAndExpenseByMonth.value },
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    legend: { data: ['收入', '支出'], left: 'center', bottom: 0, padding: 20 },
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
      },
    },
    xAxis: { type: 'category', axisTick: { alignWithLabel: true }, source: 'data_time' },
    yAxis: [
      { type: 'value', name: '收入(元)', position: 'left', alignTicks: true, axisLabel: { formatter: (money: number) => formatMoney(money) }, axisLine: { show: true, lineStyle: { color: colors[0] } } },
      { type: 'value', name: '支出(元)', position: 'right', alignTicks: true, axisLabel: { formatter: (money: number) => formatMoney(money) }, axisLine: { show: true, lineStyle: { color: colors[1] } } },
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
  }).then(() => {
    window.addEventListener('resize', () => {
      chart.value && chart.value.resize()
    })
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    chart.value && chart.value.resize()
  })
})
</script>

<template>
  <div>
    <page-main>
      <div ref="chartRef" h-450px />
    </page-main>
  </div>
</template>
