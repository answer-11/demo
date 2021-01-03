<template>
  <div>
    <!-- <h2>我的页面</h2> -->
    
      <div class="my">
        <div class="header">
          <img src="../../../public/images/my.png" alt="" />
          <span>立即登录</span>
        </div>
        <ul class="list">
          <li class="item">
            <img src="../../../public/images/movie.png" alt="" />
            <span>电影订单</span>
          </li>
          <li class="item">
            <img src="../../../public/images/shopping.png" alt="" />
            <span>商品订单</span>
          </li>
        </ul>
      <div class="center">
            <div class="small">
          <img src="../../../public/images/coupon.png" alt="" />
          <span>卖座劵</span>
          <!-- <img src="../../../public/images/right.png" alt="" class="right"> -->
          <a>&gt;</a>
        </div>
        <div class="small">
          <img src="../../../public/images/packet.png" alt="" />
          <span>组合红包</span>
          <a>&gt;</a>
        </div>
        <div class="small common">
          <img src="../../../public/images/money.png" alt="" />
          <span class="walite">余额</span>
          <span class="value">￥0</span>
          <a>&gt;</a>
        </div>
        <div class="small">
          <img src="../../../public/images/set.png" alt="" />
          <span>设置</span>
          <a>&gt;</a>
        </div>
      </div>
      </div>

    <Nav />
  </div>
</template>
<script>
import Nav from "../../components/Nav/index.vue";
export default {
  name: "index",
  components: {
    Nav,
  },
};
</script>
<style lang="less" socped>

  .my {
    height: 610px;
    // position: relative;
    // top: 0;
    // left: 0;
    // right: 0;
    background: #f4f4f4;
    // margin-bottom: 59px;
    .header {
      padding-left: 22px;
      margin-top: -44px;
      padding-top: 64px;
      height: 136px;
      background-image: url("../../../public/images/my-big.png");
      background-size: cover;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      img {
        width: 63px;
        height: 63px;
        border-radius: 50%;
        margin-right: 20px;
      }
      span {
        font-size: 16px;
        color: white;
      }
    }
    .list {
      width: 100%;
      height: 79px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: white;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 26px;
          height: 26px;
        }
        span {
          color: #797d82;
          font-size: 14px;
        }
      }
    }
        .small {
      height: 49px;
      padding: 0 15px;
      display: flex;
      align-items: center;
      background: white;
      position: relative;
      img {
        width: 20px;
        height: 20px;
        margin-right: 16px;
      }
      span {
        flex: 1;
        font-size: 16px;
      }
      a {
        text-align: right;
        color: #ccc;
      }
    }
   }
    .common {
      .value {
        text-align: right;
        // color:darkred
        padding-right: 14px;
      }
    }
  

</style>
