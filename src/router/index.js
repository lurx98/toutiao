import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location, onResolve, onReject) {

  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)

  return originalPush.call(this, location).catch(err => err)

}

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
  },
  {
    path: '/user/collect',
    component: () => import('@/views/user/Collect'),
    meta: {
      needLogin: true
    }
  },
  {
    path: '/user/history',
    component: () => import('@/views/user/History'),
    meta: {
      needLogin: true
    }

  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: "/article/:id",
    component: () => import('@/views/article')
  }
]
// 实例化路由对象
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (store.getters.token) {
      next()
    } else {
      next('/login?url=' + to.path)
    }

  } else {
    next()
  }
})

export default router
