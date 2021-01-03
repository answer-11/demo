<template>
  <div>
      <h1>新闻组件xxx_ID:{{$route.params.id}}</h1>
      <p>希望在详情页可以获取到路由参数 :id</p>
      <p>{{result.id}}</p>
      <p>{{result.title}}</p>
      <p>{{result.content}}</p>
      <nuxt-link to="/news/list">回到新闻列表页</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            title:"detail nuxt"
        }
    },
    async asyncData({ req, res }) {
    console.log(process.server)
    // 如果这段代码是在服务端执行 则可以获取到req 然后通过req获取url地址然后在获取id
    // 但是这段代码在客户端窒执行 则没有req了 如何获取id？
    let newId = process.server? req.url.substr(6) : '?';

    let id = req.url.substr(6)
    console.log(req.url.substr(6))
    let url =  " http://localhost:3004/title/?id=" +id;
        try{
            let response = await axios.get(url)
            console.log(response.data)
            // 这里返回的数据可以被映射到data模型里面去
            return {
                result:response.data.length > 0 ? response.data[0] : [],
                status:true,
                reson:"成功获取",
                error_code:0
            }
        }catch(e){
           return{
               result:null,
               status:false,
               error_code:100,
               reson:e.message,
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