<script setup lang="ts">
import { listIcons } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import useGlobalInformation from '@/store/modules/globalInformation'

const { iconInformation } = useGlobalInformation()
const prefix = ref('')
const search_text = ref('')
const iconsList = ref([])
const iconPage = ref(1)
const iconPageSize = ref(100)
const loading = ref(false)
const icons = computed(() => iconsList.value.slice((iconPage.value - 1) * iconPageSize.value, iconPage.value * iconPageSize.value))
const showIcon = ref('')
const showIconDrawer = ref(false)
const { text, copy, copied, isSupported } = useClipboard({ source: showIcon })

function handleSearchIcons() {
  loading.value = true
  const filterArr = search_text.value.split(' ').filter(text => text !== '')
  const tempIconList = prefix.value === ''
    ? listIcons()
    : listIcons('', prefix.value)
  iconPage.value = 1
  iconsList.value = filterArr.length === 0
    ? tempIconList
    : tempIconList
      .filter((icon) => {
        for (const text of filterArr) {
          if (icon.search(text) !== -1) {
            return true
          }
        }
        return false
      })

  setTimeout(() => {
    loading.value = false
  }, 1000)
}
function handlePageSizeChange() {
  loading.value = true
  iconPage.value = 1
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
function handleCurrentPageChange(value: number) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
function handleSelectIcon(icon: string) {
  showIcon.value = icon
  showIconDrawer.value = true
}
function handleCopy() {
  if (isSupported) {
    copy(showIcon.value)
    if (copied.value) {
      ElMessage.success('copied.')
    }
  }
}
</script>

<template>
  <div id="search-icon">
    <page-header title="搜索图标">
      <template #content>
        搜索自己需要的图标(仅限 <span>iconify</span>)。
      </template>
    </page-header>
    <page-main>
      <el-input v-model="search_text" placeholder="输入需要的图标名称" clearable>
        <template #prepend>
          <el-select v-model="prefix" placeholder="选择集合" filterable clearable style="width: 150px;">
            <el-option v-for="item, index in iconInformation" :key="index" :label="item.name" :value="item.prefix" />
          </el-select>
        </template>
        <template #append>
          <el-button type="primary" @click="handleSearchIcons">
            搜索
          </el-button>
        </template>
      </el-input>
    </page-main>
    <page-main>
      <el-skeleton :loading="loading" :rows="5" animated>
        <div class="icon-list" flex="~ row gap-2 wrap">
          <el-tooltip
            v-for="icon, index in icons" :key="index"
            :content="icon"
            placement="top"
          >
            <svg-icon
              cursor-pointer class="icon-item"
              :class="{ selected: showIcon === icon }"
              :name="icon" size="2em" @click="handleSelectIcon(icon)"
            />
          </el-tooltip>
        </div>
        <el-pagination
          v-model:current-page="iconPage"
          v-model:page-size="iconPageSize"
          style="margin-top: 10px;"
          :page-sizes="[50, 100, 200, 400]"
          background hide-on-single-page
          layout="prev, pager, next, sizes, jumper, total"
          :total="iconsList.length"
          @current-change="handleCurrentPageChange"
          @size-change="handlePageSizeChange"
        />
      </el-skeleton>
    </page-main>
    <el-drawer
      v-model="showIconDrawer" :with-header="false" direction="btt" size="40%"
      :destroy-on-close="true" :show-close="true" :wrapper-closable="true"
    >
      <div class="icon-drawer-content">
        <svg-icon :name="showIcon" size="10em" />
      </div>
      <div text-2xl font-600>
        <span>{{ showIcon }}</span>
        <svg-icon class="copy" name="carbon:copy" @click="handleCopy" />
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss">
.icon-item {
  cursor: pointer;

  &.selected {
    color: var(--el-color-success);
  }

  &:hover {
    color: var(--el-color-primary);
  }
}

.copy {
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    font-size: 1.2em;
    color: var(--el-color-primary);
  }
}
</style>
