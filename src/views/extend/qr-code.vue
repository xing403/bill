<script setup lang="ts">
const text = ref('fantastic-modify')
const QR_width = ref(300)
const data = [{
  prop: 'text',
  name: '文本',
  type: 'string',
  required: 'true',
}, {
  prop: 'type',
  name: '图片类型',
  type: '"image/png" | "image/jpeg" | "image/webp"',
  required: 'false',
  default: 'image/jpeg',
}, {
  prop: 'quality',
  name: '质量(0 - 1)',
  type: 'number',
  required: 'false',
  default: '0.5',
}, {
  prop: 'margin',
  name: '外边距',
  type: 'number',
  required: 'false',
  default: '4',
}, {
  prop: 'width',
  name: '宽度',
  type: 'number',
  required: 'false',
  default: '200',
}, {
  prop: 'scale',
  name: '码元宽度 (设置width无效)',
  type: 'number',
  required: 'false',
  default: '4',
}, {
  prop: 'dark',
  name: '颜色',
  type: 'string',
  required: 'false',
  default: '#000000',
}, {
  prop: 'light',
  name: '底色',
  type: 'string',
  required: 'false',
  default: '#ffffffff',
}, {
  prop: 'level',
  name: '纠错级别',
  type: '"low" | "medium" | "quartile" | "high" | "L" | "M" | "Q" | "H"',
  required: 'false',
  default: 'low/L',
}, {
  prop: 'download',
  name: '下载',
  type: 'boolean',
  required: 'false',
  default: 'false',
}, {
  prop: 'refresh',
  name: '刷新',
  type: 'boolean',
  required: 'false',
  default: 'false',
}, {
  prop: 'download-before',
  name: '下载之前执行',
  type: 'Function',
  required: 'false',
  default: '-',
}, {
  prop: 'refresh-before',
  name: '刷新之前执行',
  type: 'Function',
  required: 'false',
  default: ' - ',
}]
const events = [{
  prop: 'downloaded',
  name: '下载',
  type: 'Function',
}, {
  prop: 'refreshed',
  name: '刷新',
  type: 'Function',
}]
</script>

<template>
  <div>
    <page-header title="QRCode 二维码 组件" />
    <page-main>
      <el-input v-model="text" />
      <QRCode v-model="text" />
    </page-main>
    <page-main title="不同颜色和背景">
      <el-row :gutter="20">
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" dark="#409eff" />
        </el-col>
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" dark="#FF0000" />
        </el-col>
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" dark="#222B45" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" light="#409eff" dark="#FFFFFF" />
        </el-col>
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" light="#FF0000" dark="#FFFFFF" />
        </el-col>
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" light="#222B45" dark="#FFFFFF" />
        </el-col>
      </el-row>
    </page-main>
    <page-main title="不同大小">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-slider v-model="QR_width" :min="100" :max="500" />
        </el-col>
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" :width="100" />
        </el-col>
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" :width="QR_width" />
        </el-col>
      </el-row>
    </page-main>
    <page-main title="二维码下载 & 刷新（鼠标悬浮在二维码上）">
      <el-row :gutter="20">
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" :width="200" download />
        </el-col>
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" :width="200" refresh />
        </el-col>
        <el-col :md="6" :lg="6" :xl="6">
          <QRCode v-model="text" :width="200" refresh download />
        </el-col>
      </el-row>
    </page-main>
    <page-main title="参数">
      <el-table :data="data">
        <el-table-column label="参数" prop="prop" width="150" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="类型" prop="type" />
        <el-table-column label="是否必填" prop="required" width="100" />
        <el-table-column label="默认值" prop="default" width="150" />
      </el-table>
    </page-main>
    <page-main title="事件">
      <el-table :data="events">
        <el-table-column label="事件名" prop="prop" width="150" />
        <el-table-column label="说明" prop="name" />
        <el-table-column label="类型" prop="type" />
      </el-table>
    </page-main>
  </div>
</template>
