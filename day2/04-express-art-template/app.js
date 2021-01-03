//引入模块
const express = require("express")
const template = require("art-template")
const path = require("path")
const fs = require("fs")
//得到一个服务器的实例  http.creatServe()
const app = express();



app.engine('.html', require("express-art-template"));

app.set('views',path.join(__dirname , 'views'));
app.set('view engine', 'html');


const port = 1218;

app.get("/news",(req,res)=>{
    let newsTitle = 'xxx网站的最新新闻';
    const newsList = [
        {
            id: 1,
            title: '新闻一-----------',
            img: '',
        },
        {
            id: 2,
            title: '新闻二===========',
            img: '',
        },
        {
            id: 3,
            title: '新闻三三三三三三三三三三',
            img: '',
        },
    ]
    res.render('news', {newsTitle, newsList});
})
app.listen(port,(req,res)=>{
    console.log("服务器端口1218已开启")
})