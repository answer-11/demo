//引入模块
const express = require("express")
const fs = require("fs")

const app = express()

const port = 1216


app.get("/regist",(req,res)=>{
  let readFile = "./regist.html"
  let content = fs.readFileSync(readFile,'utf-8')
 
    console.log(content)
     res.send(content)
})


app.post("/login",(req,res)=>{
    console.log(req.url)
    console.log(req.method)
    res.send("111")
})

app.listen(port,(req,res)=>{
    console.log("服务器已开启")
})