import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 第三方组件的注册，注册后会在this实例对象上面增加一些方法或者属性
// 一般把这种行为称之为插件的注册 一般我们会把一些功能性的代码提取出来，形成一个一个的单独的功能文件 一般我们称之为插件文件

Vue.use(VueRouter) //  会添加一些方法 this.$router.push()  this.$route

const routes = [
  {
    path: '/',//url地址
    // 整个路由映射表里面name具有唯一性
    name: 'Home',//路由的名称 
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
// 什么是路由的懒加载
// spa的性能提升
// spa --->main.js --->App.js --->a.vue b.vue -->app.js -->index.html

// 如果不做任何优化处理 导致app.js过大 那么在部署后 用户的服务器获取资源的时候 加载的时间就很长 会导致页面留白 用户体验非常差 为了解决这种问题 就出现了路由懒加载的优化
const router = new VueRouter({
  routes
})

export default router
