import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/test',
  component: Layout,
  redirect: '/test/code',
  name: 'test',
  meta: {
    title: '组件测试',
    icon: 'covid:virus-lab-research-test-tube',
  },
  children: [
    {
      path: 'code',
      name: 'testCode',
      component: () => import('@/views/demo/code.vue'),
      meta: {
        title: '二维码测试',
      },
    },
  ],
}

export default routes
