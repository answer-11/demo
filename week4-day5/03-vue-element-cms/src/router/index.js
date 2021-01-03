import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/Home.vue'
import Login from '../views/Login/index.vue'
import Home from '../views/Home/index.vue'
import User from '../views/User/index.vue'
import UserAdd from '../views/UserAdd/index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 后台除了Home页面 其他都是home子页面 出现了嵌套路由,所有子页面都是在home/index.vue 里router-view里面展示 
    children:[
      {
        path: '/users',
        name: 'Users',
        component: User
      },
      {
        path: '/useradd',
        name: 'Useradd',
        component: UserAdd
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
