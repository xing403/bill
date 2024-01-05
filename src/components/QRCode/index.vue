<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'

type DoneFn = (cancel?: boolean) => void
type handleBeforeFn = (done: DoneFn) => void

const props = withDefaults(defineProps<{
  modelValue: string
  download?: boolean

  downloadBefore?: handleBeforeFn

}>(), {
  download: false,
})
const emits = defineEmits([
  'downloaded',
])
const text = ref(props.modelValue)
const qrcode = useQRCode(text.value, {
  type: 'image/jpeg',
  margin: 4,
  scale: 4,
  width: 200,
})

function handleDownload() {
  if (typeof props.downloadBefore === 'function') {
    props.downloadBefore(downloadQRCode)
  }
  else {
    downloadQRCode()
  }
}
function downloadQRCode() {
  const a = document.createElement('a')
  a.download = `download-qrcode-${new Date().getTime()}.png`
  a.href = qrcode.value
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  emits('downloaded')
}
</script>

<template>
  <div class="qr-code" :class="{ 'can-show-option': download }">
    <div class="code">
      <img :src="qrcode" fit="fill" mb-2 rounded border alt="QR Code">
      <div v-if="download " class="qr-code-option">
        <div v-if="download" class="download">
          <el-button type="primary" @click="handleDownload" v-text="'下载'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.qr-code {
  display: inline-block;
  position: relative;

  & .code .qr-code-option {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    align-items: center;
    background: rgb(0 0 0 / 50%);
  }

  &.can-show-option:hover .code .qr-code-option {
    display: flex;
  }
}
</style>
