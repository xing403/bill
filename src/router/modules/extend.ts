import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/extend',
  component: Layout,
  redirect: '/extend/icon',
  name: 'extend',
  meta: {
    title: '扩展内容',
    icon: 'ep:box',
  },
  children: [
    {
      path: 'icon',
      name: 'extendIcon',
      component: () => import('@/views/extend/icon.vue'),
      meta: {
        title: 'Icon扩展',
      },
    },
    {
      path: 'card',
      name: 'extendCard',
      component: () => import('@/views/extend/card.vue'),
      meta: {
        title: 'Card扩展',
      },
    },
    {
      path: 'tag',
      name: 'extendTag',
      component: () => import('@/views/extend/tag.vue'),
      meta: {
        title: 'Tag扩展',
      },
    },
    {
      path: 'qr-code',
      name: 'extendQRCode',
      component: () => import('@/views/extend/qr-code.vue'),
      meta: {
        title: 'QRCode二维码',
      },
    },
  ],
}

export default routes
