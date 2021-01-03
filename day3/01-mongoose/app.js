//引入mongoose
const mongoose = require("mongoose")
// mongod://协议
// b/s http https 协议
// localhost：2017 是存在一个端口号的，但是由于是问27017 可以不写
//test ：数据库的名称  自己定义
// mongodb://localhost:27017/test,
mongoose.connect("mongodb://localhost/test",{ useNewUrlParser: true, useUnifiedTopology: true } );
//定义表的结构和名称 mongodb是以json格式组织数据 一般我们称之为文档
//一条记录是一个json格式的数据 是一个文档 json格式里面的字段用户自定义

//1.数据库（表的集合）
// 参数1：可以认为是表 mongoose这个库会把第一个参数的复数形式作为实际的表名（转换成小写）
//参数2： 对象 定义字段的属性
//参数3： 可选参数  如果用户不希望mongoose同伙参数1默认生成表名 则可以使用第三个参数来自定义
// mongoose.model 返回值是一个构造函数 一般我们称之为模型model 
const Cat = mongoose.model('Cat',{name:String});

//使用的模型进行数据库真实的操作 实例化的时候需要传递一个对象作为参数 对象代表入库的数据 
// 对象的属性必须和定义模型的时候的字段一致（name和上面的那个name字段必须一致）
const kitty = new Cat({name:'mimi'})
//kitty.save()实现真实的入库 发送给服务器端  返回值是Promise对象
//默认情况下是不会断开连接的
kitty.save().then(() =>{
    //操作成功 
    console.log('server ok')
    //实现断开连接
    mongoose.disconnect();
});