import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw = {
  path: '/bill',
  component: Layout,
  name: 'bill',
  meta: {
    title: '账单管理',
    icon: 'ep:box',
  },
  children: [{
    path: 'list',
    name: 'bill-list',
    component: () => import('@/views/bill/list.vue'),
    meta: {
      title: '账单列表',
      icon: 'ep:list',
    },
  }, {
    path: 'addition',
    name: 'bill-addition',
    component: () => import('@/views/bill/addition.vue'),
    meta: {
      title: '添加账单',
      icon: 'ep:plus',
    },
  }],
}

export default routes
