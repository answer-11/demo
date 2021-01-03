const express =  require("express")
const path = require("path")
const bodyParser = require("body-parser")

const movieRouter = require("./router/movie.js")
const backRouter = require("./router/back.js")
const indexRouter = require("./router/index.js")
const app = express()
const port = 3666;
//配置post请求处理
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
//配置静态文件
app.use(express.static("public"))
//配置模板引擎
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');



//参数1：路由前缀
//参数2：外置路由对象
app.use("/admin",movieRouter)
app.use("/admin",backRouter)
app.use("/admin",indexRouter)



//监听端口
app.listen(port,()=>{
    console.log(`服务器已开启${port}`)
})