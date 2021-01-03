import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue' 

Vue.use(VueRouter)
// 定义路由映射表
const routes = [
  // 定义默认的首页展示的内容 
  // 方式一：直接定义路由规则
  {
    path: '/', 
    redirect:'/movies' //重定向
    // name: 'index',
    // component: () => import( '../pages/Movies/index.vue')
  },
  {
    path: '/', //代表访问网站首页的时候，出现那个组件
    name: 'index',
    component: () => import( '../pages/Movies/index.vue')
  },
  // 方式二：可以使用redicret方式
  // {
  //   path: '/', 
  //   redirect:'',  //redirect 重定向
  // },
  
  {
    path: '/movies',
    name: 'movies',
    // 路由懒加载的特性
    component: () => import( '../pages/Movies/index.vue')
  },
  {
    path: '/homes',
    name: 'homes',
    component: () => import( '../pages/Homes/index.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: () => import( '../pages/Message/index.vue')
  },
  {
    path: '/my',
    name: 'my',
    component: () => import( '../pages/My/index.vue')
  },
  {
    path: '*', //代表和上面的路径都不匹配
    name: 'notfound',
    component: () => import( '../pages/Notfound/index.vue')
  },
  {
    path: '/movies/detail/:id', //根据id跳转到每部电影的详情页
    name: 'detail',
    component: () => import( '../pages/Movies/detail.vue')
  },
  // {
  //   path: '/movies/detail/:id/ticket', //根据id跳转到每部电影的详情页
  //   name: 'ticket',
  //   component: () => import( '../pages/Movies/ticket.vue')
  // },
  {
    path: '/homes/detail', //根据id跳转到每部电影的详情页
    name: 'homesDetail',
    component: () => import( '../pages/Homes/homeDetail.vue')
  }
]

const router = new VueRouter({
  linkActiveClass:'tabs-active',
  routes
  
})

export default router
