import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/Login').default
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: require('@/components/Home').default
    },
    {
      path: '/password',
      name: 'newPass',
      component: require('@/components/Password').default
    },
    {
      path: '/register',
      name: 'register',
      component: require('@/components/Register').default
    }
  ]
})
