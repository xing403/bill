<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import shareApi from '@/api/modules/share'

const props = defineProps<{
  data: string
  type: string
}>()
const qrcode = ref(false)
const share = ref()
const url = ref('bill share')
function handleSettingShare() {
  ElMessageBox.prompt('设置分享天数(0永久生效)', 'Tip', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputErrorMessage: '请输入0 ~ 30 之间的数字',
    inputType: 'number',
    inputValidator: (value: number) => value >= 0 && value <= 30,
    inputValue: 3,
  }).then(({ value }) => {
    shareApi.share({ v: props.data, valid: value, type: props.type }).then((res: any) => {
      ElMessage.success('分享成功')
      url.value = `${window.location.origin}/${window.location.hash}share/${res.data}`
      qrcode.value = true
    })
  }).catch(() => { })
}
</script>

<template>
  <span class="share">
    <svg-icon name="ep:share" @click="handleSettingShare" />
    <el-dialog v-model="qrcode" title="分享" width="30%" destroy-on-close>
      <QRCode v-model="url" download />
    </el-dialog>

  </span>
</template>

<style lang="scss" scoped>
.share {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
  color: var(--el-text-color-secondary);

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
