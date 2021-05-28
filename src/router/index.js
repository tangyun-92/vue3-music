import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: 'discover',
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
        component: () => import('@/views/discover'),
        redirect: '/discover/recommend',
        meta: {
          title: '发现音乐',
        },
        children: [
          {
            path: 'recommend',
            name: 'Recommend',
            component: () => import('@/views/discover/recommend'),
            meta: {
              title: '推荐',
            },
          },
          {
            path: 'top-list',
            name: 'TopList',
            component: () => import('@/views/discover/top-list'),
            meta: {
              title: '排行榜',
            },
          },
          {
            path: 'play-list',
            name: 'PlayList',
            component: () => import('@/views/discover/play-list'),
            meta: {
              title: '歌单',
            },
          },
          {
            path: 'dj-radio',
            name: 'DjRadio',
            component: () => import('@/views/discover/dj-radio'),
            meta: {
              title: '歌单',
            },
          },
          {
            path: 'singer',
            name: 'Singer',
            component: () => import('@/views/discover/singer'),
            meta: {
              title: '歌单',
            },
          },
          {
            path: 'album',
            name: 'Album',
            component: () => import('@/views/discover/album'),
            meta: {
              title: '新碟上架',
            },
          },
        ],
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/my'),
        meta: {
          title: '我的音乐',
        },
      },
      {
        path: '/friend',
        name: 'Friend',
        component: () => import('@/views/friend'),
        meta: {
          title: '朋友',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
