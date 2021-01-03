import Vue from 'vue'
import App from './App.vue'
import router from './router'
// // 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 开启一下elementUI的国际化 现在配置一个 英文环境 
import locale from 'element-ui/lib/locale/lang/en'
// // 内部  vue.component('el-xxx',{xxxxx})
//单一职责原则
import store from './store'
// Vue.use(ElementUI)
// 第二个参数代表开启国际化(英文)
Vue.use(ElementUI, { locale })
// 底层就是ElementUI里面提供的各种组件注册成全局组件




// element底层的实现
// lang('pagination.tatol')===> 检测main.js里面的配置项
// function lang(key,fileName){
//   // return 
// }
// let total = ''
// if(total === 'zh-CN'){
//   total = lang('pagination.tatol','zh-CN.js')
// }else if(total === 'en'){
//   total = lang('pagination.tatol','en.js')
// }
// Vue.component('pagination',{
//   template:`
//     <div>
//       <ul>
//         <li>1</li>
//         <li>2</li> 
//         <li>3</li> 
//         <li>4</li>       
//       </ul>
//     </div>
//   `
// })



Vue.config.productionTip = false

new Vue({
  store,//把vue实例对象和我们的store产生关系 以后在vue组件里面 
  // 我们可以实例对象this.$store获取当前仓库
  router,
  render: h => h(App)
}).$mount('#app')
