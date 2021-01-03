<template>
  <div>
 
    <hr>
      <button @click="asyncAdd">异步操作+</button>
        <p>{{storeCount }}</p>
    <button @click="asyncReduce">异步操作-</button>
    <hr>
    <button @click="add({number:3})">+</button>
    <p>{{storeCount }}</p>
    <p>双倍数据:{{dbCount}}</p>
    <button @click="reduce({number:5})">-</button>
  </div>
</template>

<style lang="stylus"></style> 
<script>
// mapState是仓库里面的数据映射到当前对象的计算属性身上
// mapMutations代表把仓库里面同步的方法映射到对象的methods上面
// maoActions代表把仓库里面异步的方法映射到methods上面
import {mapMutations, mapState, mapActions, mapGetters} from 'vuex'
 
export default {
  data(){
    return{
      number:1
    }
  },
  created() {
    console.log(this.$store);
  },
  computed:{
    dbNumber:function(){
      return this.number * 2;
    },
    // 简化形式
    // mapState 含义是把仓库里面的数据映射到 计算属性 参数可以是一个数组[] 把仓库里面需要返回的state的key值写在数组里面即可
    // 或者是一个对象{ key(为当前的key取的别名 alias) value(仓库里面的key值)：}
    // mapState 函数的返回值是一个对象 对象格式为{count：function(){return store.state.count}}
    //goodList :function(){return store.goodList}}
    // ...mapState(['count']) //... es6引入的展开运算符
     ...mapState({'storeCount':'count'}),
     ...mapGetters(["dbCount"])
  },
  methods: {
    
    // add() {
    //   // commit 参数一  这个标识符(用户自定义)名称就是mutations下面的一个方法
    //      // 参数二：代表提交给管理员的数据，一般把这个数据叫做payload 载荷
    //   this.$store.commit("add",{number:2});
    //   // this.$store.state.count++  仓库不通过提交commit给管理员 而是直接修改仓库数据state
   
    // },
    // reduce() {
    //   this.$store.commit("reduce",{number:3});
    //   // this.$store.state.count--
    // },
    ...mapMutations(['add','reduce']),  //...es6扩展运算符 简化上面的形式
    // asyncAdd(){
    //   // 完成异步的增加  用定时器模仿异步操作 
    //   // dispatch 代表派发一个异步请求
    //   this.$store.dispatch("asyncAdd");
    // },
    // asyncReduce(){
    //   this.$store.dispatch('asyncReduce')
    // },
    ...mapActions(['asyncAdd','asyncReduce']), 
  },
  
};
</script>