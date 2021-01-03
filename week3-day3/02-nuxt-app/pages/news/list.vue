<template>
  <div>
      <h2>新闻列表list</h2>
      <ul> 
          <!-- 1.需要将a链接换成buxt-link组件 -->
          <!-- 2.当前目录下的_id相当于配置的路由参数 自动匹配 -->
         <li v-for="ele in result">
             <!-- <a href="/news/1">新闻一</a> -->
             <nuxt-link :to="'/news/'+ele.id">{{ele.title}}</nuxt-link>
        </li>  
      </ul>
  </div>
</template>
<!-- 发送网络请求新闻列表信息 -->
<!--nuxt 开发出来的项目，称之为 同构 前端也可以执行 后端也可以执行-->
  
<script>
import axios from "axios"
export default {
    data(){
        return{
            title:"hi answer"
        }
    },
    //声明周期函数
    // 1.客户端执行 2.服务器端执行
    // asyncData是nuxtjs提供的一个特殊的生命周期函数 里面的this、不能访问 组件一加载自动执行
    async asyncData({ req, res }) {
    // 请检查您是否在服务器端
    // 使用 req（请求头信息） 和 res（响应头信息）
    console.log(process.server)
    let url =  " http://localhost:3004/title"
        try{
            let response = await axios.get(url)
            console.log(response.data)
              // 这里返回的数据可以被映射到data模型里面去
            return {
                result:response.data,
                status:true,
                reson:"成功获取",
                error_code:0
            }
        }catch(e){
           return{
               result:null,
               status:false,
               error_code:100,
               reson:e.getMessage,
           }
        }
    },


    // data(){
    //   return{
          
    //   }   
    // },
    // created () {
      
    //    
    // }
}

</script>
<style scoped>
</style>