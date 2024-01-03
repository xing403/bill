<script setup lang="ts">
const props = defineProps<{
  icon?: string
}>()
</script>

<template>
  <el-tag flex="~ row gap-1 items-center">
    <svg-icon v-if="props.icon" :name="props.icon" />
    <slot />
  </el-tag>
</template>
