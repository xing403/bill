<script setup lang="ts">
import { useSlots } from 'vue'

defineOptions({
  name: 'ColorfulCard',
})
const props = withDefaults(defineProps<{
  icon?: string
  title?: string
  footer?: string
  gradientStart?: string
  gradientEnd?: string
  gradientColors?: string[]
  gradientAngle?: number | string
  disableColor?: boolean
}>(), {
  gradientStart: '#736efe',
  gradientEnd: '#5efce8',
  gradientColors: () => [],
  gradientAngle: 135,
  disableColor: false,
})

const slots = useSlots()

const background = computed(() => {
  if (props.disableColor) {
    return 'none'
  }
  else if (props.gradientColors.length > 0) {
    return `linear-gradient(${props.gradientAngle}deg, ${props.gradientColors.join(',')})`
  }
  else {
    return `linear-gradient(${props.gradientAngle}deg, ${props.gradientStart}, ${props.gradientEnd})`
  }
})
</script>

<template>
  <el-card :style="{ background }" class="card">
    <template #header>
      <slot v-if="slots.title" />
      <div v-else class="card-title" v-text="props.title" />
    </template>

    <slot />

    <template v-if="props.footer || slots.footer" #footer>
      <slot name="footer">
        <div class="card-footer">
          <component :is="props.footer" v-if="props.footer" />
        </div>
      </slot>
    </template>

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

:deep(.el-card__header),
:deep(.el-card__footer) {
  color: #fff;
  border-bottom: 0;
  border-top: 0;
}

:deep(.el-card__body) {
  color: #fff;
  padding-top: 5px;
}

:deep(.el-card__footer) {
  padding-top: 0;
}

.icon {
  position: absolute;
  transition: 0.3s;
  font-size: 120px;
  right: -30px;
  top: -10px;
}
</style>
