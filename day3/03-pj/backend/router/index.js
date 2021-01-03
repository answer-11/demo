const express = require("express")
const router = express.Router()

router.get("/index",function(req,res){
    // res.send("dashboard")
    res.render("index")
})

//由于后台的首页引入 welcome.htmlu页面
router.get('/welcome',function(req,res){
    res.render("welcome")
})
module.exports=router