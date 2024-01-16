<script setup lang="ts">
import shareApi from '@/api/modules/share'

const route = useRoute()
const key = computed(() => route.params.key as string)
const maxHeight = ref(window.innerHeight)
const data = ref<any>({
  type: '',
})
const col = ref<any[]>([])
shareApi.get({ key: key.value }).then((res: any) => {
  if (res.data.type === 'table') {
    res.data.v = JSON.parse(res.data.v)
    col.value = res.data.v.config.col
  }
  data.value = res.data
})
onMounted(() => {

})
</script>

<template>
  <div class="share">
    <el-table v-if="data.type === 'table'" :data="data.v.value" :max-height="maxHeight">
      <el-table-column v-for="item in col" :key="item.prop" :prop="item.prop" :label="item.label" align="center" />
    </el-table>
    <div v-else>
      暂不支持的数据分享格式
    </div>
  </div>
</template>
