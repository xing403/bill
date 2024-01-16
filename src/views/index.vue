<route lang="yaml">
name: home
meta:
  title: 主页
</route>

<template>
  <div>
    <page-main>
      <banner-statistics />
    </page-main>
    <page-main>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12">
          <income-and-expense-by-month />
        </el-col>
        <el-col :xs="24" :sm="12">
          <income-and-expense-by-year />
        </el-col>
      </el-row>
    </page-main>
    <page-main>
      <all-income-and-expense />
    </page-main>
  </div>
</template>
