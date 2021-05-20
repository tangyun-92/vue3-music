import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: 'discover'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/discover/recommend',
    children: [
      {
        path: '/discover',
        name: 'Discover',
        component: () => import('@/views/discover/index.vue'),
        redirect: '/discover/recommend',
        meta: {
          title: '发现音乐'
        },
        children: [
          {
            path: 'recommend',
            name: 'Recommend',
            component: () => import('@/views/discover/recommend/index.vue'),
            meta: {
              title: '推荐'
            }
          },
          {
            path: 'top-list',
            name: 'TopList',
            component: () => import('@/views/discover/top-list/index.vue'),
            meta: {
              title: '排行榜'
            }
          },
          {
            path: 'play-list',
            name: 'PlayList',
            component: () => import('@/views/discover/play-list/index.vue'),
            meta: {
              title: '歌单'
            }
          }
        ]
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/my/index.vue'),
        meta: {
          title: '我的音乐'
        }
      },
      {
        path: '/friend',
        name: 'Friend',
        component: () => import('@/views/friend/index.vue'),
        meta: {
          title: '朋友'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
