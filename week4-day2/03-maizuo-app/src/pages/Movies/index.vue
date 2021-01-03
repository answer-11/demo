<template>
  <div>
    <!-- <h2>电影页面</h2> -->
    <!-- 实现轮播图的效果 -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide class="slide-item">
        <img src="/banner/banner.jpg" alt="" />
      </swiper-slide>
      <swiper-slide class="slide-item">
        <img src="/banner/banner1.jpg" alt="" />
      </swiper-slide>
      <swiper-slide class="slide-item">
        <img src="/banner/banner2.jpg" alt="" />
      </swiper-slide>
      <!-- <div class="swagination" slot="pagination"></div> -->
    </swiper>
    <ul class="tabs">
      <li
        class="item"
        :class="{ active: currentItem == 'hoting' }"
        @click="changeHander('hoting')"
      >
        正在热映
      </li>
      <li
        class="item"
        :class="{ active: currentItem == 'coming' }"
        @click="changeHander('coming')"
      >
        即将上映
      </li>
    </ul>
    <!-- 动态组件 -->
    <!-- <component is="Movies"></component> -->
    <!--列表组件 -->
    <!-- 列表组件和loading组件是互斥的 -->
    <ul class="list" v-if="moviesStatus">
      <li class="list-item" v-for="ele in Movies">
        <router-link :to="'/movies/detail/' + ele.filmId">
          <img :src="ele.poster" alt="" />
          <div class="content">
            <p class="textname">{{ ele.name }}</p>
            <p>观众评分{{ele.grade}}</p>
            <p>主演:{{ ele.actors | filterActors }}</p>
            <p>
              <span>{{ele.nation}}</span>
              <span> | {{ ele.runtime }}分钟</span>
            </p>
          </div>
        </router-link>
        <router-link :to="'/movies/detail/' + ele.filmId + '/ticket'">
          <div class="ticket">购票
            
          </div>
        </router-link>
      </li>
    </ul>
    <Loading v-else />
    <Nav />
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import Nav from "../../components/Nav/index.vue";
import "swiper/css/swiper.css";
import { getHotingMovie, getComingMovie } from "../../api/movie/movie.js";
// 优化：希望在加载电影的数据，数据还没有返回之前，页面出现一个loading的加载小动画。等信息加载回来后，然后隐藏该动画
import Loading from "../../components/Loading";
export default {
  data() {
    return {
      hotingMovies: [],
      comingMovies: [],
      moviesStatus: false, //代表当前的前言信息是否从服务器已经返回的状态
      Movies: [], //因为正在热映和即将上映使用的组件是同一个组件，只是数据源不一样，那么定义同一个模型变量
      // 在用户点击切换的时候，把不同的数据赋值给当前的movies
      currentItem: "hoting",
      filmId: [],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
        },
        // Some Swiper option/callback...
      },
    };
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  created() {
    this.moviesStatus = false;
    getHotingMovie().then((response) => {
      console.log(response.data.data);
      this.Movies = response.data.data.films;
      this.moviesStatus = true;
    });
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
  name: "index",
  components: {
    Nav,
    Swiper,
    SwiperSlide,
    Loading,
  },
  directives: {
    swiper: directive,
  },
  methods: {
    changeHander(value) {
      if (value == "hoting") {
        // 根据用户的点击操作，和后台进行接口的联调，获取对应的电影列表的信息
        this.currentItem = "hoting";
        this.moviesStatus = false;
        getHotingMovie().then((response) => {
          console.log(response.data.data);
          this.Movies = response.data.data.films;
          this.moviesStatus = true;
        }); // console.log(this.hotingMovies,response.films)
      } else if (value == "coming") {
        this.currentItem = "coming";
        this.moviesStatus = false;
        getComingMovie().then((response) => {
          console.log(response.data.data);
          this.Movies = response.data.data.films;
          this.moviesStatus = true;
        });
      }
    },
    // changeDetail(value) {
    //   getHotingMovie().then((response) => {
    //     //  this.$router.push({ path:'/movies/detail'  })
    //     console.log(response.data.data.films);
    //     this.filmId = response.data.data.films.filmId;
    //     console.log(this.filmId);
    //   });
    // },
  },
  filters: {
    filterActors: function (input) {
      //   let rs = '' //第一种方式
      let rs = []; //第二种
      input.forEach((item) => {
        // rs += '|' + item.name
        rs.push(item.name);
      });
      //    return rs
      return rs.join("|").substr(0, 5) + "...";
    },
  },
};
</script>
<style lang="less" scoped>
html,
body {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
}
.slide-item {
  img {
    width: 100%;
    height: 200px;
  }
}
.tabs {
  // position: fixed;
  // left: 0;
  // top: 200px;
  z-index: 999;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // background: #ccc;
  font-size: 16px;

  .item {
    padding-bottom: 8px;
  }
  .active {
    color: #ff5f16;
    border-bottom: 2px solid #ff5f16;
  }
}
.list {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 50px;
    .list-item {
    display: flex;
    justify-content: space-around;
    padding: 10px 10px 10px 0px;
    align-items: center;
   a{
    //  flex: block;
     display: flex;
      img {
        max-width: 66px;
        height: 93px;
      }
      .content{
        padding:0 10px;
        // .textname{
        //   font-size:16px
        // }
      }
   }
  
    .ticket {
      width: 46px;
      height: 22px;
      border: 1px solid #ffb232;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
