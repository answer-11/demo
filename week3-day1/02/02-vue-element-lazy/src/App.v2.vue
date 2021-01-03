<template>
  <div>
    <h2>按需导入</h2>
    <h3>哪里需要element组件，哪里就按需导入</h3>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <hr />
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000"
    >
    </el-pagination>
    <button @click="asyncAdd">异步操作+</button>
        <p>{{ $store.state.count }}</p>
    <button @click="asyncReduce">异步操作-</button>
    <hr>
    <button @click="add">+</button>
    <p>{{ $store.state.count }}</p>
    <button @click="reduce">-</button>
  </div>
</template>

<style lang="stylus"></style>
<script>
// mapState是仓库里面的数据映射到当前对象的计算属性身上
import {mapState} from 'vuex'

// 全局组件引入
// import Vue from 'vue';
// import App from './App.vue';
// Vue.component(Button.name, Button);
//
// import { Button, Select } from 'element-ui';
export default {
  created() {
    console.log(this.$store);
  },
  data: function () {
    return {
      currentPage: 2,
    };
  },
  methods: {
    add() {
      // commit 参数一  这个标识符(用户自定义)名称就是mutations下面的一个方法
         // 参数二：代表提交给管理员的数据，一般把这个数据叫做payload 载荷
      this.$store.commit("add",{number:2});
      // this.$store.state.count++  仓库不通过提交commit给管理员 而是直接修改仓库数据state
   
    },
    reduce() {
      this.$store.commit("reduce",{number:3});
      // this.$store.state.count--
    },
    asyncAdd(){
      // 完成异步的增加  用定时器模仿异步操作 
      // dispatch 代表派发一个异步请求
      this.$store.dispatch("asyncAdd");
    },
    asyncReduce(){
      this.$store.dispatch('asyncReduce')
    },
    handleSizeChange() {},
    handleCurrentChange() {},
  },
  //   components:{
  //     // 当前的引入的组件注册为局部组件
  //     'el-button':Button,
  //     [Button.name]:Button  //ES6写法 拿变量
  //     // Vue.component(Select.name, Select)
  //   }
};
</script>