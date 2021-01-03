const path = require("path")
//webpack.config.js 文件就是webpack的默认的配置文件
// 定义相关的参数
// 只能使用commonjs 规范webpack 依赖 nodejs环境
module.exports = {
    // 1.运行模式 对于不同运行模式 在使用的时候 加载的一些插件或loaders有可能是不一样的
    mode:"development", //development production
    // 2.项目的入口 entry可以写成对象 也可以写成字符串
    entry: {
        filename:'./src/index.js'
    },
    // 3.项目的出口 规定 必须使用绝对路径
    output: {
      path:path.join(__dirname,'dist'),
      filename: 'bundle.js',
      //一般我们开发习惯吧打包后的文件叫做bundle.js bundle:一簇 打包在一起
    }
  };