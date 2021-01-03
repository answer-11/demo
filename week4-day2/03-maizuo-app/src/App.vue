<template>
  <div id="app">
    <div id="nav">
     
    </div>
    <router-view/>
    <!-- 1.规范目录结构 -->
    <!-- 1.1 public里面的静态资源文件是不需要做编译处理 这个目录建议存放纯静态资源  -->
    <!-- 而不能放类似 less sass。 less sass文件存放在src/assets目录下 在该目录下预处理语言编写 -->
    <!-- less sass ts等文件都可以被项目脚手架进行编译生成纯静态资源文件 -->
    <!-- 2.样式的重置 -->
    <!-- 2.3 使用一些第三方现有的样式重置库 -->
    <!-- 国际标准 reset.css normalize.css -->
    <!-- 国内也有一些前端重置的标准 使用淘宝 新浪 -->
    <!-- 3.编写公共的样式文件 common.less less：变量$bassColor-->
    <!-- 3.1 根据页面的主题 定出页面的大体的字体 大小，样式-->
    <!-- 4.页面底部的导航栏 -->
    <!-- 4.1 多个页面都存在底部，则我们可以把底部提取出来复用 -->
    <!-- 4.2 定义底部的导航 -->
    <!-- 4.3 定义导航点击后显示的组件（四个组件，电影。。。）-->
    <!-- 4.4 定义路由映射表 -->
    <!-- 5.完成电影首页页面 -->
  </div>
</template>

<style lang="less">

// 导入外部的less文件 app主组件里面的style不要加上 scoped
@import url('./assets/less/common.less');



</style>
