<script setup lang="ts">
import { ElMessage, dayjs } from 'element-plus'
import billApi from '@/api/modules/bill'

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const list = ref<Bill.IBillType[]>([])
const time = ref(dayjs().format('YYYY-MM'))
const loadingFirst = ref(true)
const isNoMore = computed(() => (page.value !== 1 && !loadingFirst.value) && list.value.length === total.value)

function getList(refresh: boolean = false) {
  if (isNoMore.value && !refresh) {
    return
  }

  if (refresh) {
    list.value.length = 0
    page.value = 1
    loadingFirst.value = true
  }
  else {
    page.value += 1
  }
  billApi.listByUserIdAndDataTime({ dataTime: time.value, page: page.value, pageSize: pageSize.value }).then((res) => {
    const data_list = res.data.list.map((bill: Bill.IBillType) => {
      bill.createTime = dayjs(bill.createTime).format('YYYY-MM-DD HH:mm:ss')
      bill.updateTime = dayjs(bill.updateTime).format('YYYY-MM-DD HH:mm:ss')
      bill.dataTime = dayjs(bill.dataTime).format('YYYY-MM-DD')
      if (typeof bill.tags === 'string') {
        bill.tags = bill.tags.split(',').filter((tag: string) => tag !== '')
      }
      return bill
    })
    list.value.push(...data_list)
    total.value = res.data.total
    loadingFirst.value = false
  })
}

onMounted(() => {
  getList(true)
})

watch(isNoMore, (value) => {
  if (value) {
    ElMessage.info('没有更多了')
  }
})
</script>

<template>
  <div>
    <page-header title="账单列表" :content="`查看 ${time} 的收支情况`">
      <el-date-picker
        v-model="time" :editable="false" style="width: 150px;" type="month" value-format="YYYY-MM"
        @change="getList(true)"
      />
    </page-header>
    <page-main v-infinite-scroll="getList">
      <TransitionGroup v-if="list.length > 0" name="fade" tag="div">
        <el-card v-for="item in list" :key="item.id" class="bill-item" shadow="never">
          <template #header>
            <div class="card-header" flex="~ row gap-1 items-center justify-between">
              <div flex="~ col gap-1 items-center" text-left>
                <el-link :href="`#/bill/edit/${item.id}`" class="bill-title" :underline="false" v-text="item.title" />
                <span class="text-secondary" text-xs v-text="item.dataTime" />
              </div>
              <span text-2xl v-text="`${item.type === 2 ? '-' : '+'}${item.amount}`" />
            </div>
          </template>
          <div v-if="item.detail === '' || item.detail === null" class="bill-detail text-secondary">
            暂无描述内容
          </div>
          <div v-else class="bill-detail text-secondary" v-text="item.detail" />

          <template v-if="Array.isArray(item.tags) && item?.tags.length > 0" #footer>
            <div class="bill-tags" flex="~ row gap-1 items-center wrap">
              <el-tag v-for="tag, index in item.tags" :key="index" v-text="tag" />
            </div>
          </template>
        </el-card>
      </TransitionGroup>
      <el-empty v-else class="list-empty" description="当前暂无数据" />
    </page-main>
  </div>
</template>

<style lang="scss" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.bill-item {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;

  .text-secondary {
    color: var(--el-text-color-secondary);
  }
}

::v-deep .bill-title.el-link {
  font-size: 1.5em;
  font-weight: 600;
}

.page-main {
  padding: 0.5rem;
}
</style>
