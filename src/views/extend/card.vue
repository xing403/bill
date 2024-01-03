<script setup lang="ts">
const data = ref([{
  prop: 'icon',
  name: '图标',
  type: 'string',
  required: 'false',
  default: ' - ',
}, {
  prop: 'title',
  name: '卡片头',
  type: 'string',
  required: 'false',
  default: ' - ',
}, {
  prop: 'gradient-start',
  name: '渐变开始颜色',
  type: 'string',
  required: 'false',
  default: '#736efe',
}, {
  prop: 'gradient-end',
  name: '渐变结束颜色',
  type: 'string',
  required: 'false',
  default: '#5efce8',
}, {
  prop: 'gradient-angle',
  name: '渐变旋转角度',
  type: 'number | string',
  required: 'false',
  default: '135',
}])
const slots = ref([{
  prop: 'title',
  name: '标题',
  tips: '当设置 title参数时无效',
}, {
  prop: 'default',
  name: '内容',
  tips: '',
},
])
</script>

<template>
  <div>
    <page-header title="卡片扩展" />
    <page-main>
      <el-row :gutter="20">
        <el-col :lg="6">
          <colorful-card>
            <template #title>
              hello
            </template>
            world
          </colorful-card>
        </el-col>
        <el-col :lg="6">
          <colorful-card icon="akar-icons:bank" gradient-start="#7117ea" gradient-end="#ea6060">
            <template #title>
              hello
            </template>
            world
          </colorful-card>
        </el-col>
        <el-col :lg="6">
          <colorful-card icon="gis:earth-australia" gradient-start="#622774" gradient-end="#c53364">
            <template #title>
              Font-GIS
            </template>
            earth-australia
          </colorful-card>
        </el-col>
        <el-col :lg="6">
          <colorful-card title="brandico" icon="brandico:github">
            github
          </colorful-card>
        </el-col>
      </el-row>
    </page-main>
    <page-main title="参数">
      <el-table :data="data">
        <el-table-column label="参数" prop="prop" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="类型" prop="type" />
        <el-table-column label="是否必填" prop="required" />
        <el-table-column label="默认值" prop="default" />
      </el-table>
    </page-main>
    <page-main title="插槽">
      <el-table :data="slots">
        <el-table-column label="参数" prop="prop" />
        <el-table-column label="名称" prop="name" />
        <el-table-column label="类型" prop="tips" />
      </el-table>
    </page-main>
  </div>
</template>
