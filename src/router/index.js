import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/views/Homepage'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})
