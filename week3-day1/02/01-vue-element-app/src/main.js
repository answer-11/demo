import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 内部  vue.component('el-xxx',{xxxxx})
Vue.use(ElementUI)
// 底层就是ElementUI里面提供的各种组件注册成全局组件
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
