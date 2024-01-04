<script setup lang="ts">
import QrCode from 'qrcode'

type DoneFn = (cancel?: boolean) => void
type handleBeforeFn = (done: DoneFn) => void

const props = withDefaults(defineProps<{
  modelValue: string
  type?: 'image/png' | 'image/jpeg' | 'image/webp'
  quality?: number
  margin?: number
  scale?: number
  width?: number
  dark?: string
  light?: string
  level?: 'low' | 'medium' | 'quartile' | 'high' | 'L' | 'M' | 'Q' | 'H'
  download?: boolean
  refresh?: boolean

  downloadBefore?: handleBeforeFn
  refreshBefore?: handleBeforeFn

}>(), {
  type: 'image/jpeg',
  quality: 0.8,
  margin: 4,
  scale: 4,
  width: 200,
  dark: '#000000ff',
  light: '#ffffffff',
  level: 'low',
  download: false,
  refresh: false,
})
const emits = defineEmits([
  'downloaded',
  'refreshed',
])
const width = toRef(props, 'width')
const value = toRef(props, 'modelValue')
const code = ref<string>('')
const download = toRef(props, 'download')
function gernateQrCode() {
  return QrCode.toDataURL(value.value, {
    type: props.type ?? 'image/jpeg',
    margin: props.margin ?? 4,
    width: width.value,
    scale: props.scale ?? 4,
    rendererOpts: {
      quality: props.quality ?? 0.5,
    },
    color: {
      dark: props.dark ?? '#000000ff',
      light: props.light ?? '#ffffffff',
    },
    QRCodeErrorCorrectionLevel: props.level ?? 'L',
  }, (err: Error, url: string) => {
    if (err) {
      console.error(err)
      return
    }
    code.value = url
  })
}
function handleDownload() {
  if (typeof props.downloadBefore === 'function') {
    props.downloadBefore(downloadQRCode)
  }
  else {
    downloadQRCode()
  }
}
function downloadQRCode() {
  const url = code.value
  const a = document.createElement('a')
  a.download = `QR-Code-${new Date().getTime()}.png`
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  emits('downloaded')
}

function handleRefresh() {
  if (typeof props.refreshBefore === 'function') {
    props.refreshBefore(refreshQRCode)
  }
  else {
    refreshQRCode()
  }
}
function refreshQRCode() {
  gernateQrCode()
  emits('refreshed', code.value)
}
watch(width, () => {
  handleRefresh()
})
gernateQrCode()
</script>

<template>
  <div class="qr-code" :class="{ 'can-show-option': download || refresh }">
    <div class="code">
      <el-image :src="code" fit="fill" />
      <div v-if="download || refresh" class="qr-code-option">
        <div v-if="refresh" class="refresh">
          <el-button type="info" @click="handleRefresh" v-text="'刷新'" />
        </div>
        <div v-if="download" class="download">
          <el-button type="primary" @click="handleDownload" v-text="'下载'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
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
