import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw = {
  path: '/user',
  component: Layout,
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'ep:user',
  },
  children: [{
    path: 'list',
    name: 'user-list',
    component: () => import('@/views/user/list.vue'),
    meta: {
      title: '用户列表',
      icon: 'ep:list',
    },
  }, {
    path: 'edit/:id',
    name: 'user-edit',
    component: () => import('@/views/bill/edit.vue'),
    props: true,
    meta: {
      title: '修改用户',
      icon: 'ep:edit',
      sidebar: false,
    },
  }, {
    path: 'detail/:id',
    name: 'user-detail',
    component: () => import('@/views/bill/detail.vue'),
    props: true,
    meta: {
      title: '用户详情',
      icon: 'ep:list',
      sidebar: false,
    },
  }],
}

export default routes
