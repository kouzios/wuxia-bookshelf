import Vue from 'vue'
import Router from 'vue-router'
import Bookshelf from '@/views/Bookshelf'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Bookshelf',
      component: Bookshelf
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
