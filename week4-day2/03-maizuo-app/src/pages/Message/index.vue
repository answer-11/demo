<template>
    <div>
        <div  v-html="Message">
          
        </div>
        
        <!-- <div class="message">
            <div class="header">
                <img src="https://static.maizuo.com/v5/upload/5100685994355867508ef520654bec7c.jpg" alt="">
            </div>
          
            <div>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/d3862d7d2eb7c9d7d7575997d1452403.jpg" alt="">
                </a>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/052e97a499d08c459c0c692dab9f1b34.jpg" alt="">
                </a>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/3429c8615deb7fa5cd1ba8d23ae1dcad.jpg" alt="">
                </a>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/35cd4906c7958c6f23ed20977b672b1d.jpg" alt="">
                </a>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/c8283d61d462e5a79d88f9b40d5e0fcd.jpg" alt="">
                </a>
                   <a href="">
                    <img src="https://static.maizuo.com/v5/upload/779d8a8bab4a1b08fdd8bd223da06338.jpg" alt="">
                </a>
              
            </div>
           
            <div>
              <br>
            </div>
         
            <div>
                 <a href="">
                    <img src="https://static.maizuo.com/v5/upload/005498a1ef975220bcaaab16a1eee0b2.jpg" alt="">
                </a>
            </div>
          
            <div>
               
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/e75e6c060d2c640089c7c8f097fd66b3.jpg" alt="">
                </a>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                </a>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/cbbe7f5d429ea445b4fabe77fe796da9.jpg" alt="">
                </a>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                </a>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/05f4a4b410aa5820d6aa4b72c6f6a665.jpg" alt="">
                </a>
                <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                
            </div>
            
            <div>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/f905d63135a05bfc1e89423158567f22.jpg" alt="">
                </a>
                <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                 <a href="">
                    <img src="https://static.maizuo.com/v5/upload/bd5f9a8d73506615f88efb0715b01f4d.jpg" alt="">
                </a>
                <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                 <a href="">
                    <img src="https://static.maizuo.com/v5/upload/9dc24be7292122222e7120d869160d7d.jpg" alt="">
                </a>
                <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                 <a href="">
                    <img src="https://static.maizuo.com/v5/upload/f372d7078df42b2ca77b62d8e084bd4f.jpg" alt="">
                </a>
                <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
            </div>
            
            <div>
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/090cfb933c60e735f083055f96c84c6c.jpg" alt="">
                </a>
                <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/378ed44bc3979934ff81f15f27a072b5.jpg" alt="">
                </a>
                <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/7c95d46ef34e1f30fc5c0516a259356f.jpg" alt="">
                </a>
                <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/00bf2f3cfc52f5fa8becb90489d4f0c4.jpg" alt="">
                </a>
                <img src="https://static.maizuo.com/v5/upload/828e7f0c36d2e95d9145b0b5abcef950.jpg" alt="">
                <a href="">
                    <img src="https://static.maizuo.com/v5/upload/56914532065560857315539d19789426.jpg" alt="">
                </a>
            </div>
          
            <div>
                 <a href="">
                    <img src="https://static.maizuo.com/v5/upload/4bc2d3d9a012d99e035db7fc4e75976f.jpg" alt="">
                </a>
            </div>
        </div> -->
    </div>
</template>
<script>
import {getMessage } from "../../api/message/message.js";
    export default {
        data(){
            return {
                Message:[]
            }
        },
        name:'index',
         created() {
    // this.moviesStatus = false;
    getMessage().then((response) => {
      console.log(response.data.data.data.content);
      this.Message = response.data.data.data.content;
    //   this.moviesStatus = true;
    });
  },
    }
</script>
<style lang="less" scoped>
    .message{
        width: 100%;
        div{
            widows: 100%;
            img{
                width: 100%;
            }
        }
    }
</style>
