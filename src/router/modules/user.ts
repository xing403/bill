import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw = {
  path: '/user',
  component: Layout,
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'ep:user',
    auth: ['admin', 'root'],
  },
  children: [{
    path: 'list',
    name: 'user-list',
    component: () => import('@/views/user/list.vue'),
    meta: {
      title: '用户列表',
      icon: 'ep:list',
    },
  }],
}

export default routes
