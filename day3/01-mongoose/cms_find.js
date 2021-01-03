//查

// cms = content mange system   网站的后台
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/gz2007cms",{ useNewUrlParser: true, useUnifiedTopology: true } );

// 参数1：首字母大写。mongoose.model返回值一般我们是 参数1+Model
const UserModel = mongoose.model('User',{username:String,password:String},'cms_menbers');



UserModel.find().exec((error,data)=>{
    console.log(error,data);
    mongoose.disconnect()
})
