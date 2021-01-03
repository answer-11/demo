
const express = require("express")
const fs = require("fs")
const template = require("art-template")

const app = express()
const port = 1217


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

];

app.get("/", (req, res) => {
    //基本数据替换
    //     let file = "./index.html"
    //    let result =  fs.readFileSync(file,"utf8")
    //    console.log(typeof result)
    //    let html = result.replace('{{title}}',newsTitle)
    //   res.send(html)
    //复合数据替换   第三方模板引擎 art-template
    let data = template(__dirname + '/index.html', { newsList, newsTitle })
    res.send(data)
})

app.listen(port, (req, res) => {
    console.log("服务器端口1217已开启")
})