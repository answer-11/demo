const HtmlWebpackPlugin = require ('html-webpack-plugin')
const path = require("path")
//webpack.config.js 文件就是webpack的默认的配置文件
// 定义相关的参数
// 只能使用commonjs 规范webpack 依赖 nodejs环境
module.exports = {
    // 1.运行模式 对于不同运行模式 在使用的时候 加载的一些插件或loaders有可能是不一样的
    mode:"development", //development production
    devServer:{
      port:9000,//修改webpack-dav-serve 的端口
      open:true,//编译完成后自动打开浏览器
    },
    // 2.项目的入口 entry可以写成对象 也可以写成字符串
    entry: {
        filename:'./src/index.js'
    },
    // 3.项目的出口 规定 必须使用绝对路径
    output: {
      path:path.join(__dirname,'dist'),
      filename: 'bundle.js',
      //一般我们开发习惯吧打包后的文件叫做bundle.js bundle:一簇 打包在一起
    },
    // 4.module代表现在要位webpack配置Loader处理那些新特性的语法 less sass
    module: {
      rules: [
        // 一个对象代表对一类文件的处理
        // css-Loader 功能：可以把css代码转换成js 里面的模块化代码 可以使用js语境下包含css代码
        // 并没有把css代码插入到html里面 借助一些其他工具 webpack-dev-server style-loader
        // webpack-dev-server 可以在本地起一个web服务器
        // html-webpack-plugin 可以把我们本地静态HTML模板文件作为项目的首页文件 把打包后的js css文件插入到index.html
        // style-loader可以把处理好的css模块化插入到index.html页面
         {
          test: /\.css$/,
          // Loader 使用的顺序是从右到左
          // css-loader 是吧css文件模块化 使得js文件里面可以直接引入css不报错
          // style-loader 把我们模块化的css代码插入到style标签内
          // 为了防止css文件里面引入less文件 如果引入 则先交给less-loader处理
          use: ['style-loader','css-loader',"less-loader"]
          },
          {
            test: /\.less$/,
              use: [{
                  loader: "style-loader" // creates style nodes from JS strings
              }, {
                  loader: "css-loader" // translates CSS into CommonJS
              }, {
                  loader: "less-loader" // compiles Less to CSS
              }] 
          },
          // 引入图标库处理器
          // 解析字体 file-loader可以让css引入字体库文件
          {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: "file-loader", // url-loader 也可以用来解析字体
          },
          // file-loader 处理图片
          // 由于我们现在使用的是webpack-dev-serve 这个工具做的调试 注意:使用这个工具的时候 不会将这些
          // 文件打包到dist目录下 而是将打包的文件放置到内存之中进行处理的 每一次的完整打包都是要进行
          // 磁盘读写 俗称IO操作 一般IO操作非常耗时 所以web-de-serve 对其进行优化 将打包的信息放入内存中
          // 减少打包的时间 现在我们要做额外的调试 我们把图片 1.改名称 2.放置到指定目录下 3.对小图片进行优化操作
          // 小图片常见优化base64编码
          // 需要给file-loader配置
          {
            test: /\.(jpg|jpeg|png|gif|bmp)$/,
            use: "file-loader", 
          },
          {
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // 将 JS 字符串生成为 style 节点
            }, {
                loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
            }, {
                loader: "sass-loader" // 将 Sass 编译成 CSS
            }]
          }
      ]
    },
    // 5.插件的使用
    plugins: [
      new HtmlWebpackPlugin(
        {
          filename: 'index.html',
          template: 'src/templates/index.html'
        }
      )
    ],
  };