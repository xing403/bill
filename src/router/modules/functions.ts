import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/functions',
  component: Layout,
  redirect: '/functions/search-icon',
  name: 'functions',
  meta: {
    title: '扩展功能',
    icon: 'ri:function-fill',
  },
  children: [
    {
      path: 'search-icon',
      name: 'functionsSearchIcon',
      component: () => import('@/views/functions/searchIcon.vue'),
      meta: {
        title: '图标搜索',
      },
    },
  ],
}

export default routes
