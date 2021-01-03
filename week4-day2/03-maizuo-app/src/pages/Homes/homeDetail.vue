<template>
  <div>
      <!-- <div class="header">
        <div>
            <img src="../../../public/images/detail.png" alt="" />
        </div>
        <div>
            <span>{{ HomeDetail.name }}</span>
        </div>
      </div> -->
      <div class="content">
        <div class="middle-text">{{ HomeDetail.name }}</div>
        <div class="service">
          <span class="span" v-for="ele in service">{{ ele.name }}</span>
          <i>></i>
        </div>
        <div class="address">
           <img src="" alt="">
           <div>{{ HomeDetail.address }}</div>
           <img src="" alt="">
        </div>
      </div> 
      <div class="photo"  >
          <div class="photo-warpper" v-for="ele in HomePhoto">
            <div class="img">
              <img :src=ele.poster alt="">
            </div>
            <div class="img-name">
                <span>{{ele.name}}</span>
                <span>{{ele.grade}}</span>
            </div>
            <div class="intro">
                <span>{{ele.category}}</span>
                <span>{{ele.director}}</span>
            </div>
            <div>
              <div v-for="aaa in ele.showDate">{{aaa}}</div>
            </div>
          </div>
      </div>
      <div class="bottom">
          <div></div>
      </div>  
  </div>
</template>
<script>
import { getHomeDetail, getHomePhoto } from "../../api/home/homeDetail";
export default {
  data() {
    return {
      HomeDetail:{},
      service: [],
      HomePhoto:[],
      ShowDate:[]
    };
  },
  created() {
    //     console.log(this.$router)
    getHomeDetail().then((response) => {
      //   console.log(response.data.data);
      this.HomeDetail = response.data.data.cinema;
      this.service = response.data.data.cinema.services;
      // //   this.moviesStatus = true;
      console.log(this.HomeDetail);
      console.log(this.service);
    });
    getHomePhoto().then((response) => {
      console.log(response.data.data.films);
      this.HomePhoto = response.data.data.films
      // this.ShowDate = response.data.data.films.showDate
      // console.log(this.ShowDate)
    });
  },
};
</script>
<style lang="less" socped>
// .header {
// }
  .content{
    .middle-text{
      text-align: center;
      font-size: 18px;
      height: 44px;
      line-height: 44px;
    }
    .service{
      display: flex;
      justify-content: center;
      padding: 5px 0 15px;
      align-items: center;
      .span{
        border: 1px solid #ccc;
        color:#ffb232;
        padding: 0 6px;
        margin: 0 2.5px;
        // font-size: 10px;
        // background-color: orangered;
      }
    };
    .address{
      display: flex;
      justify-content: space-evenly;
      height: 50px;
      align-items: center;
      div{
        font-size:14px ;
      }
    }
  };
  .photo{
    // width: 100%;
    margin: 0 auto;
   
    display: flex;
    overflow: auto;
        //   transition-duration: 0ms;
        // transform: translate3d(42px, 0px, 0px);
    .photo-warpper{
      //  width: 100%; 
     height: 160px;
        transition-duration: 0ms;
        transform: translate3d(42px, 0px, 0px);
        overflow: auto;
        // overflow: hidden;
        .img{
          width: 90px;
          // width: 100%;
             height: 120px;
          overflow: auto;
          img{
            width: 100%;
            height: 100%;
          }
        }
    }
  }

</style>