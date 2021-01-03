<template>
    <div>
        <div>
            <div class="header">    
        <p>
            <span>广州</span>
            <img src="../../../public/home/select.png" alt="">
        </p>
        <p>
           <p>影院</p> 
        </p>
        <p>
            <img src="../../../public/home/search.png" alt="">
        </p>
    </div>
    <div class="nav">
        <label for="">
            全城
             <img src="../../../public/home/select.png" alt="">
            <img src="../../../public/home/up.png" alt="">
        </label>
        <label for="">
            APP订票
             <img src="../../../public/home/select.png" alt="">
            <img src="../../../public/home/up.png" alt="">
        </label>
        <label for="">
            最近去过
            <img src="../../../public/home/select.png" alt="">
            <img src="../../../public/home/up.png" alt="">
        </label>
    </div>
    <div class="wrapper" ref="wrapper">
      <ul class="list">
        <li class="list-item" v-for="ele in ticketList">
          <a>
            <div class="left">
              <h3>{{ ele.name }}</h3>
              <p>{{ ele.address }}</p>
            </div>
            <div class="right">
              <p>{{ ele.lowPrice }}</p>
              <p>距离位置</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
        </div>
    </div>
</template>
<script>
import {getTicket} from '../../api/movie/ticket.js'
export default {
    data(){
        return{
            ticketList:[]
        }
    },
    // created(){
    //     getTicket(this.$router.history.current.params.id).then(response=>{
    //         console.log(response.data.data.film)
    //         this.ticketList = response.data.data.film;
    //     })
    // },
    // // methods:{
        //  getTicket:function(){
             
        //  }
    
    // }
}
</script>
<style lang="less" scoped>
    .header{
    display: flex;
    justify-content: space-evenly;
}
.nav{
    display: flex;
    justify-content: space-evenly;  
    // // align-items: ;
    position: fixed;
    height: 50px;
    width: 100%;
    top: 44px;
    right: 0;
    text-align: center;
    background-color: #fff;
    z-index: 2000;
    label{
        float: left;
        // width: 33.3%;
        line-height: 49px;
        font-size: 14px;
        color: #191a1b;
        // letter-spacing: -.2px;
    }
}
.list {
  .list-item {
    // height: 80px;
    // margin-bottom: 8px;
    // display: flex;
    // justify-content: space-around;
    // align-items: center;
    padding: 16px;
    // border: 2px solid red;
    a {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .left {
        text-align: left;
      }
      .right {
        text-align: right;
      }
    }
  }
}
</style>