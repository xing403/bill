<script setup lang="ts">
import { ref } from 'vue'

const text = ref('hello world')
const width = ref(200)
function handleDownload(done) {
  done()
}
function handleRefreshBefore(done) {
  text.value = `${new Date().getTime()}`
  done()
}
</script>

<template>
  <div>
    <page-header title="二维码组件测试" />
    <page-main>
      <QRCode
        v-model="text" :width="width" download refresh :refresh-before="handleRefreshBefore"
        :download-before="handleDownload"
      />
      <el-slider v-model="width" :min="100" :max="500" />
    </page-main>
  </div>
</template>
