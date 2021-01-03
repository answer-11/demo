// cms = content mange system   网站的后台
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/gz2007cms",{ useNewUrlParser: true, useUnifiedTopology: true } );
//参数1 :首字母大写
const UserModel = mongoose.model('User',{username:String,password:String},'cms_menbers');


//实现mongo的增删改查
//增
const userInfo = new UserModel({username:'mimi',password:'admin'})
//kitty.save()实现真实的入库 发送给服务器端  返回值是Promise对象
//默认情况下是不会断开连接的

//promise then 第一个参数就是成功的回调 该回调函数第一个参数就是插入成功的记录
userInfo.save().then((data) =>{
    //操作成功 
    console.log('server ok')
    console.log(data)
    //实现断开连接
    mongoose.disconnect();
});