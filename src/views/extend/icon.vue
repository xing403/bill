<script setup lang="ts">
import { listIcons } from '@iconify/vue'
import type { TabPaneName } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'
import useGlobalInformation from '@/store/modules/globalInformation'

const globalInformation = useGlobalInformation()
const iconInformationList = globalInformation.iconInformation
const iconPage = ref(1)
const iconPageSize = ref(60)
const iconsList = ref<string[]>([])
const icons = computed(() => iconsList.value.slice((iconPage.value - 1) * iconPageSize.value, iconPage.value * iconPageSize.value))
const showIcon = ref('')
const loading = ref(false)
const activeName = ref(iconInformationList[0].prefix ?? '')
const { text, copy, copied, isSupported } = useClipboard({ source: showIcon })
function activeChange(name: TabPaneName) {
  loading.value = true
  iconPage.value = 1
  setTimeout(() => {
    iconsList.value = listIcons('', name as string)
    showIcon.value = icons.value[0] ?? ''
    loading.value = false
  }, 1000)
}
function handleCurrentChange(value: number) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    showIcon.value = icons.value[0] ?? ''
  }, 1000)
}
function clickIcon(icon: string) {
  showIcon.value = icon
}
function copyIcon(event: MouseEvent, icon: string) {
  event.preventDefault()
  if (isSupported) {
    copy(icon)
    if (copied.value) {
      ElMessage.success('copied.')
    }
  }
}
activeChange(activeName.value)
</script>

<template>
  <div>
    <page-header title="Icon 图标扩展">
      <template #content>
        <span>增加 iconify 图标集合：</span>默认仅支持 <span>@iconify-json/ep</span>，现支持 <span>iconify</span> 全部图标集合
      </template>
    </page-header>
    <page-main>
      <el-tabs
        v-model="activeName" tab-position="left" type="border-card" style="height: 500px;"
        stretch
        @tab-change="activeChange"
      >
        <el-tab-pane
          v-for="{ info, prefix }, index in iconInformationList"
          :key="index" :name="prefix" :label="info.name"
        >
          <page-header :title="info.name">
            <template #content>
              <el-badge :value="iconsList.length" class="item" type="primary" :max="9999999">
                <el-button>
                  图标前缀 <span>{{ prefix }}</span>
                </el-button>
              </el-badge>
            </template>
          </page-header>
          <div v-loading="loading" class="icon-list">
            <div style="user-select: none;">
              <div class="icon-list-group">
                <div
                  v-for="(icon, index) in icons" :key="index" class="icon-item"
                  @click="clickIcon(icon)"
                  @contextmenu="copyIcon($event, icon)"
                >
                  <svg-icon :name="icon" size="2em" />
                </div>
              </div>
              <el-pagination
                v-model:current-page="iconPage"
                :page-size="iconPageSize"
                style="margin-top: 10px;"
                background
                layout="prev, pager, next, jumper"
                :total="iconsList.length"
                @current-change="handleCurrentChange"
              />
            </div>
            <div class="icon-show">
              <svg-icon :name="showIcon" size="15em" />
              <div style="margin-top: 5px;">
                {{ showIcon.split(`${prefix}:`)[1] }}
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </page-main>
  </div>
</template>

<style lang="scss">
.icon-list {
  display: flex;
  justify-content: left;
  align-items: center;

  .icon-list-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;

    .icon-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.5em;
      height: 2.5em;
      margin: 5px;
      cursor: pointer;

      &:hover {
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
      }
    }
  }

  .icon-show {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }
}
</style>
