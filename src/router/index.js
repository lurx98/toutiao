import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由映射数组
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/layout/home')
      },
      {
        path: 'qa',
        component: () => import('@/views/layout/qa')
      },
      {
        path: 'my',
        component: () => import('@/views/layout/my')
      }, {
        path: 'video',
        component: () => import('@/views/layout/video')
      }
    ]

  },
  {
    path: '/login',
    component: () => import('@/views/login')
  }
]
// 实例化路由对象
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/layout/home')
        },
        {
          path: 'qa',
          component: () => import('@/views/layout/qa')
        },
        {
          path: 'my',
          component: () => import('@/views/layout/my')
        }, {
          path: 'video',
          component: () => import('@/views/layout/video')
        }
      ]

    },
    {
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})

export default router
