<template>
     <ul class="tabs">
        <li class="item"> 
          <router-link to="/movies">
            <i class="fa fa-film "></i>
          电影</router-link> 
        </li>
        <li class="item">
          <router-link to="/homes">
            <i class="fa fa-home"></i>
            影院
          </router-link>
        </li>
        <li class="item">
          <router-link to="/message">
            <i class="fa fa-newspaper-o"></i>
          咨询</router-link>
        </li>
        <li class="item">
          <router-link to="/my">
            <i class="fa fa-user-circle-o"></i>
          我的</router-link>
        </li>
      </ul>
</template>
<script>
    export default {
    
    }
</script>
<style lang="less" scoped>
    .tabs-active{
  color: #ff5f16;
}
.tabs{
  padding: 0;
  position: fixed;
  bottom: 0;
  left:0;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  align-items: center;
  background: #f4f4f4;
  .item{
    i{
      padding-bottom:2px;
    }
    a{
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
    }
  } 
}
</style>