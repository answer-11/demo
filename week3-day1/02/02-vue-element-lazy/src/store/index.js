
// 实现单一职责原则
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  strict:true,//开启严格模式  只能按照同步、异步的思想来完成操作
  // 仓库的数据
  state: {
    count: 0,
    goodList: [
      {
        id: 1,
        name: 'username'
      },
      {
        id: 2,
        name: 'dengziqi'
      }
    ]
  },
  // 同步管理员  修改仓库的数据
  mutations: {
    add(state,payload) {
      console.log("add",state,payload)
      // state.count++ 
    state.count = state.count + payload.number // 数字加2
    },
    reduce(state,payload){
      console.log("reduce",state,payload)
      // state.count--
      state.count = state.count - payload.number// 数字减3
     
    }
  }, 
  // 异步管理 修改仓库的数据  方式一
//   actions:{
//     asyncAdd(store,payload){ 
//         setTimeout(()=>{
//           store.commit('add',payload)
//         },1000)
//     },
//     asyncReduce(store,payload,){
//       setTimeout(()=>{
//         store.commit('reduce',payload)
//       },1000)
//   }
// },
// 方式二
actions:{
  asyncAdd(store){ 
      setTimeout(()=>{ 
        store.commit('add',{number:5})
      },1000)
  },
  asyncReduce(store){
    setTimeout(()=>{
      store.commit('reduce',{number:3})
    },1000)
}
},
// 完成仓库的数据的筛选操作 过滤处理  类似于vue里面的计算属性
getters:{
  dbCount:function(state){
    console.log('dbcount',state)
    return state.count * 2
  }
}
// actions: {
//   asyncAdd (context) {
//     context.commit('asyncAdd')
//   }
// }
})
