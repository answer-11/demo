//删除  
//引入mongoose
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/gz2007cms",{ useNewUrlParser: true, useUnifiedTopology: true } );

const UserModel = mongoose.model('User',{username:String,password:String},'cms_menbers');

//删除单条数据
// UserModel.deleteOne({"username":"huahua"}).then(data => {
//     console.log(data)
//     mongoose.disconnect()
// })
// .catch(error => {
//     console.log(error)
// })

//删除多条
UserModel.deleteMany({username: {$in:['huahua','mimi'] }}).then(data=>{
    console.log(data)
    mongoose.disconnect()
}).catch(error=>{
    console.log(error)
})
//remove已被弃用 现在大部分都使用deleteOne deleteMany
// UserModel.remove({ username: { $in: ['huahua', 'mimi'] }}) .then(data=> {
//     console.log(data)
//     mongoose.disconnect()  
// })

// .catch(error=>{
//     console.log(error)
// })

