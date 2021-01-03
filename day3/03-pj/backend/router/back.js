var express = require("express")
var router = express.Router()
//定义路由信息
//实现前后端分离
router.get("/login",function(req,res){
    // res.send('login')
    res.render("login")
})
module.exports = router