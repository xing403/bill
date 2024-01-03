<script setup lang="ts">
defineOptions({
  name: 'ColorfulCard',
})
const props = withDefaults(defineProps<{
  icon?: string
  title?: string
  gradientStart?: string
  gradientEnd?: string
  gradientAngle?: number | string
}>(), {
  gradientStart: '#736efe',
  gradientEnd: '#5efce8',
  gradientAngle: 135,
})
const background = ref()
background.value = `linear-gradient(${props.gradientAngle}deg, ${props.gradientStart}, ${props.gradientEnd})`
</script>

<template>
  <el-card :style="{ background }" class="card">
    <template #header>
      <template v-if="props.title">
        {{ title }}
      </template>
      <slot v-else name="title" />
    </template>
    <slot name="default" />
    <svg-icon v-if="props.icon" class="icon" color="#FFF" :rotate="20" :name="props.icon" />
  </el-card>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.card:hover .icon {
  right: 0;
  top: 0;
}

::v-deep .el-card__header {
  color: #fff;
  border-bottom: 0;
}

::v-deep .el-card__body {
  color: #fff;
}

.icon {
  position: absolute;
  transition: 0.3s;
  font-size: 120px;
  right: -30px;
  top: -10px;
}
</style>
