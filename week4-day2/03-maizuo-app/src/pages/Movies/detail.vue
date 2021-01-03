<template>
  <div>
    <div :style="{'display':dPlay}" class="detail" v-if="Object.keys(details).length>0">
      <!-- <h2>详情页</h2> -->
      <!-- <div class="back">
          <img src="../../../public/images/detail.png" alt="">
      </div> -->

      <div class="header" :style="{'background-color':bgColor}" >
          <div @click="prev" class="left">
              <img src="../../../public/images/detail.png"  alt="" class="img">
          </div>
          <div class="middle-text" :style="{'opacity':textDisplay}">
              <span>{{details.name}}</span>
          </div>
          <div></div>
      </div>
      <div class="poster">
        <div class="poster-img">
            <img  :src="details.poster" alt="" />
        </div>
      </div>
      <div class="introduce">
          <div class="col">
              <div class="col-left">
                <span style="font-size:18px;margin: 0 6px 0 0">{{details.name}}</span>
                <span class="filmName">{{details.filmType.name}}</span>
              </div>
              <div class="col-right">
                <span style="font-size:18px">{{details.grade}}</span>
                <span>分</span>
              </div>
          </div>
          <p>{{details.category}}</p>
          <p>{{details.premiereAt * 1000 | premiereAtDate }}上映</p>
          <p>{{details.nation}}<span>|</span>{{details.runtime}}分钟</p>
          <p>{{details.synopsis}}</p>
          <div class="toggle" @click="unfoldHander(isOpen)">
              <img src="../../../public/home/select.png" alt="">
          </div>
      </div>
      <div class="actors">
          <div class="actorsman">演职人员</div>
          <div class="actors-img">
              <ul class="actors-list">
                <li v-for="ele in actors">
                  <img :src="ele.avatarAddress" alt="">
                  <span class="actorsname">{{ele.name}}</span>
                  <span class="actoresrole">{{ele.role}}</span>
                </li>
          </ul>
          </div>
      </div>
      <div class="photos">
          <div>
                <h2>剧照</h2>
                <span @click="allChange"  >
                全部(5)<i>></i>
                </span>
          </div>
          <ul class="photos-list">
              <li v-for="ele in photos">
                  <img :src="ele" alt="">
              </li>
          </ul>
      </div>
      <a href="">
          <div class="buy">选座购票</div>
      </a>
    </div>
   
    <div class="still">
        <div class="img"> 
            <img src="../../../public/images/detail.png"  alt="" >
        </div>
        <span>剧照 (5)</span>
    </div>
    <div :style="{'display':disPlay}" class="all" >
        <div v-for="ele in photos">
            <img :src="ele" alt="">
        </div>
    </div>
  </div>
  
</template>
<script>
import { getDetails } from "../../api/movie/detail.js";
import moment from 'moment'
// let newId = this.$router.query.filmId; 
// console.log(newId)
// this.$axios.get('https://m.maizuo.com/gateway?filmId=5223&k=9076295',{
//         params:{
//             id:newId
//         }
//     })
export default {
  data() {
    return {
        details: {},
        actors:[],
        photos:[],
        bgColor:'transparent',
        textDisplay:'0',
        HeadImg:'./public/images/detail.png',
        isOpen:false,
        // isDisplay:false
        disPlay:'none',
        dPlay:'block'
    };
  },
  created() {
      console.log(this.$router.history)
    getDetails(this.$router.history.current.params.id).then((response) => {
      console.log(response.data.data);
      this.details = response.data.data.film;
      this.actors = response.data.data.film.actors
      this.photos = response.data.data.film.photos
    //   console.log(this.details);
    //    console.log(this.actors);
    //     console.log(this.photos);
    });
    window.addEventListener("scroll",()=>{
         var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
         if(scrollTop>=110){
             this.bgColor = 'white';
             this.textDisplay = Math.max(scrollTop/110,0);
         }else{
             this.bgColor = 'transparent';
            this.textDisplay = Math.min(scrollTop/110,1);
         }
         console.log("----",scrollTop)
    })
  },
  filters:{
      'premiereAtDate':function(value){
          return moment(value).format('YYYY-MM-DD')
      }
  },
  methods: {
    add() {
      getDetails().then((response) => {
        console.log(response);
      });
    },
    // unfoldHander(){

    // },
    allChange(){
        this.disPlay = 'inline'
        this.dPlay = 'none'
    },
    prev(){
        this.$router.back()
    }
  },
};
</script>
<style lang="less" scoped>
    .detail{
        width: 100%;
        // display: none;
        .header{
            position: fixed;
            height: 44px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            z-index: 1;
            .left{
                width: 30px;
                height: 30px;
                // z-index: 100;
                margin-left: 5px;
                .img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
                
            }
            .middle-text{
                font-size: 17px;
            }
        }
        .poster{
            position: relative;
            width: 100%;
            height: 179px;  
            overflow-y: hidden;
           .poster-img{
               position: absolute;
               height: 179px;
               opacity: 1;
               display: block;
               width: 100%;
                img{
                position: absolute;
               top:50%;
                left:0px;
                width: 100%;
                -webkit-transform: translateY(-50%);
            }
           }
        };
        .introduce{
            padding: 15px;
            background: #fff;
            z-index:999;
            .col{
                display: flex;
                display: -webkit-box;
                display: -ms-flexbox;
                // display: flex;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: flex-start;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                .col-left{
                    width: 256px;
                    .filmName{
                        font-size: 9px;
                        color: #fff;
                        background-color: #d2d6dc;
                        height: 14px;
                        line-height: 14px;
                        padding: 0 2px;
                        border-radius: 2px;
                        display: inline-block;
                    }
                }
                .col-right{
                    width: calc(100% - 250px);
                    text-align: right;
                    color: #ffb232
                }
            }
            p{
                padding-top: 2px;
                font-size: 14px;
                color:#797d82;
                span{
                    margin:  0 3px;
                }
            }
            .toggle{
                text-align: center;
                display: block;
                height: auto;
                width: 20px;
                margin: auto;
                line-height: normal;
                img{
                    width: 8px;
                    margin: auto;
                }
            }
        };
        .actors{
            margin-top: 10px;
            .actorsman{
                font-size: 18px;
                padding: 15px;
            }
            .actors-img{
                height: 146px;
                background: rgb(255, 255, 255);
                overflow-x:auto;
                overflow-y: hidden;
                 .actors-list{
                    height: 140px;
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    position: relative;
                    width: 100%;
                    margin: 0;
                    padding-left: 15px;
                    list-style: none;
                    li{
                        margin-right: 10px;
                        width: 85px;
                        min-width: 85px;
                        position: relative;
                        img{
                            width: 100%;
                            display: block;
                            height: 100%;
                        }
                        .actorsname{
                            text-align: center;
                            padding-top: 6px;
                            font-size: 12px;
                            color: #191a1b;
                            width: 85px;
                            height: 18px;
                            display: block;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        .actoresrole{
                            display: block;
                            text-align: center;
                            font-size: 10px;
                            color: #797d82;
                        }
                    }
               
                }
            }
            .actors-img::-webkit-scrollbar {
                    display: none;
                }
        };
        .photos{
            width: 100%;
            margin-bottom: 20px;
            margin-top: 10px;
            div{
                padding: 15px;
                font-size: 18px;
                display: flex;
                justify-content: space-between;
            }
            .photos-list{
                height: 115px;
                display: flex;
                align-items: center;
                overflow-x: auto;
                li{
                    min-width: 150px;
                    height: 100px;
                    img{
                        width: 100%;
                        height: 100%
                    }
                }
            };
            .photos-list::-webkit-scrollbar {
                    display: none;
                }
        };
        a{
            .buy{
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 50px;
                background: #ff5f16;
                text-align: center;
                line-height: 50px;
                font-size: 16px;
                color: white;
            }
        }

    }
    .still{
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        .img{
            width: 30px;
            height: 30px;
            margin-left: 5px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        span{
            font-size: 17px;
            line-height: 44px;
            width: 100vw;
            text-align: center;
        }
    }
    .all{
        position: absolute;
        top: 44px;
        left: 0;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        
        // z-index: 999;
        // display: none;
        div{
            width: 124px;
            height: 124px;
            float: left;
            margin-right: 1px;
            margin-bottom: 2px;
            img{
                width: 100%;
                height: 100%;
            }
        }
      
        // display: none;
    }
</style>