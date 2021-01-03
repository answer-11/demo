var express = require("express")
var router = express.Router()
const mongoose = require("mongoose")

 // mongoose入库
 mongoose.connect("mongodb://localhost/h5MovieCms",{ useNewUrlParser: true, useUnifiedTopology: true } );
 const MovieModel = mongoose.model('Movie',{moviename:String,director:String,actors:String},'cms_movie');

 
//定义路由信息
//实现前后端分离
router.get("/movie/add",function(req,res){
    res.render("movie/add")
})

router.post("/movie/add",function(req,res){
    //搜集数据 然后使用mongoose 操作mongodb存储到数据库
    //在express如何收集数据
    console.log(req.body)
    //解构语法 一一对应
    let {moviename ,director,actors} = req.body && req.body;
    console.log(moviename ,director,actors)


    if(!moviename || !director || !actors){
        //不合法 跳转到添加页面
        res.redirect("/admin/movie/add")
        return;
    }
    const movieInfo = new MovieModel({moviename,director,actors})
    movieInfo.save().then((data) =>{
        //操作成功 
        console.log('insert ok')
        console.log(data)
        //实现断开连接
        mongoose.disconnect();
        //不合法 跳转到列表页面
        res.redirect("/admin/movie/list")
    });
    // res.send("movie post ok")
})
router.get("/movie/list",function(req,res){
    //连接数据库获取电影信息
    MovieModel.find().exec((error,data)=>{
        console.log(error,data);
        if(error){
            console.log(error)
            return
        }else{
            res.render("movie/list")
        }
        // mongoose.disconnect()
    })
    
    
})


module.exports = router