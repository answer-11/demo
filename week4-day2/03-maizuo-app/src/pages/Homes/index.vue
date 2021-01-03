<template>
  <div ref="rootContainer">
    <!-- <h2>影院页面</h2>  -->
    <!-- 由于影院的信息默认是一次性加载了229条，出现了滚动条，这个在pc浏览器是没有任何性能问题，但部分手机端效果不好，一般使用第三方的插件会做滚动的优化 或者做上拉或下拉加载 -->
    <!-- better scroll -->
    <!-- 1 外层要存在一个父容器 -->
    <!-- 1.1 父容器的高度是固定 手机端 碎屏化(不同的手机高度是不一样的) -->
    <!-- 1.2禁用浏览器自身的滚动条 -->
    <!-- 1.3 当前的父容器且仅有只有一个子元素 -->

    <!-- 1.vue里面有一个ref属性 当给dom元素设置ref属性 属性值用户自定义 -->
    <!-- 2.在vue的代码里面 可以通过this.$refs 获取到页面上所有的通过ref定义的dom对象-->
    <div class="header">
      <p class="left">
        <span>广州</span>
        <img src="../../../public/home/select.png" alt="" />
      </p>
      <p class="middle-text">
        <span>影院</span>
      </p>
      <p class="right">
        <img src="../../../public/home/search.png" alt="" />
      </p>
    </div>
    <div class="nav">
      <label for="">
        全城
        <img style="display: none" src="../../../public/home/up.png" alt="" />
        <img
          width="6px"
          height="3px"
          src="../../../public/home/select.png"
          alt=""
        />
      </label>
      <label for="">
        APP订票
        <img style="display: none" src="../../../public/home/up.png" alt="" />
        <img
          width="6px"
          height="3px"
          src="../../../public/home/select.png"
          alt=""
        />
      </label>
      <label for="">
        最近去过
        <img style="display: none" src="../../../public/home/up.png" alt="" />
        <img
          width="6px"
          height="3px"
          src="../../../public/home/select.png"
          alt=""
        />
      </label>
    </div>
    <div class="layer"></div>
    <div class="wrapper" ref="wrapper">
      <ul class="list">
        <li class="list-item" v-for="ele in homeList">
          <a>
            <div class="left">
              <h3>{{ ele.name }}</h3>
              <p style="color: #797d82; margin: 5px 0 0 0">{{ ele.address }}</p>
            </div>
            <div class="right">
              <p>
                <!-- <span>￥</span> -->
                <span style="font-size: 15px">￥{{
               ele.lowPrice /100}} 起
                </span>
                <!-- <span>起</span> -->
              </p>
              <p style="color: #797d82; margin: 5px 0 0 0">距离未知</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <!-- <div class="different">
      dadadadddadadadadadadad大家打架活动教案或的骄傲和大家
    </div> -->
    <!-- <hr /> -->
    <Nav />
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import Nav from "../../components/Nav/index.vue";
import { getHomes } from "../../api/home/homes";

export default {
  data() {
    return {
      homeList: [],
      scroll: null,
    };
  },
  name: "index",
  created() {
    this.getHomes();
  },
  // 可以确保页面的DOM结构已经形成
  mounted() {
    // dom设置元素的高度 根据视窗高度来决定
    this.$refs.wrapper.style.height =
      document.documentElement.clientHeight - 40 + "px"; //滚动窗口的高度
  },
  methods: {
    getHomes() {
      getHomes().then((response) => {
        this.homeList = response.data.data.cinemas;
        console.log(this.homeList);
        this.$nextTick(() => {
          this.scroll = new Bscroll(this.$refs.wrapper, {});
        });
      });
    },
  },
  components: {
    Nav,
  },
};
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 3000;
  background-color: #fff;
  display: flex;
  .left {
    min-width: 15%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 16px;
    span {
      display: inline-block;
      font-size: 13px;
      max-width: 58px;
      height: 16px;
      line-height: 16px;
      overflow: hidden;
      padding-right: 5px;
      color: #191a1b;
    }
    img {
      width: 6px;
      height: 3px;
    }
  }
  .middle-text {
    text-align: center;
    font-size: 17px;
    color: #191a1b;
    flex: 1;
    overflow: hidden;
    span {
      text-align: center;
      font-size: 18px;
    }
  }
  .right {
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    text-align: right;
    img {
      text-align: right;
      width: 18px;
      height: 18px;
    }
  }
}
.nav {
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  height: 50px;
  width: 100%;
  top: 44px;
  right: 0;
  text-align: center;
  background-color: #fff;
  z-index: 2000;
  label {
    float: left;
    width: 33.3%;
    line-height: 49px;
    font-size: 14px;
    color: #191a1b;
    img {
      vertical-align: middle;
      padding-left: 2px;
    }
  }
}
.layer {
  padding-top: 94px;
}
.wrapper {
  z-index: 100;
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: block;
      padding-bottom: 40px;
    .list-item {
      padding: 16px;
      position: relative;
      background-color: #fff;
      a {
        width: 100%;
        display: flex;
        align-items: center;
        .left {
          width: calc(100% - 85px);
          text-align: left;
          padding-right: 15px;
          float: left;
          h3 {
            font-size: 16px;
            max-width: 80%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          p {
            display: block;
            max-width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
          }
        }
        .right {
          width: 70px;
          text-align: center;
          float: right;
          margin-right: -5px;
          P {
            span {
              color: #ff5f16;
            }
          }
        }
      }
    }
  }
}
// .different{
//   // height: 46px;
//   // width: 100%;
//   margin-bottom: 60px;
// }
</style>
