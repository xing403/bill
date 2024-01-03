<script setup lang="ts">

</script>

<template>
  <div>
    <page-header title="Icon Tag">
      <template #content>
        除了图标，标签还可以设置不同的类型等参数，参考
        <el-link href="https://element-plus.gitee.io/zh-CN/component/tag.html">
          ELement-Plus:Tag
        </el-link> 。
      </template>
    </page-header>
    <page-main>
      <div flex="~ row gap-1">
        <icon-tag v-for="item, index in ['success', 'info', 'danger', 'warning']" :key="index" icon="carbon:home" :type="item">
          tag
        </icon-tag>
      </div>
    </page-main>
  </div>
</template>
