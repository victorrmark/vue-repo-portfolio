import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        title: 'Repo Portfolio'
      }
    },
    {
      path: '/repos/:id',
      name: 'Details',
      component: () => import('../components/RepoDetail.vue'),
      props: true,
      meta: {
        title: 'Repo Details'
      }
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../components/ErrorPage.vue'),
      meta: {
        title: '404'
      }
    }
  ]
})

router.beforeEach((to, from, next) =>{
  document.title = `${to.meta.title}`;
  next()
})

export default router
