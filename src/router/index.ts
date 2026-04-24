import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: () => import('@/pages/Home.vue') },
  { path: '/play', name: 'Play', component: () => import('@/pages/Play.vue') },
  { path: '/settings', name: 'Settings', component: () => import('@/pages/Settings.vue') },
  { path: '/leaderboard', name: 'Leaderboard', component: () => import('@/pages/Leaderboard.vue') },
  { path: '/rules', name: 'Rules', component: () => import('@/pages/Rules.vue') },
  { path: '/game', name: 'Game', component: () => import('@/pages/Game.vue') },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }), // SEO optimization
})