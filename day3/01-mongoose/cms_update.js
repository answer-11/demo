const mongoose= require("mongoose")

mongoose.connect("mongodb://localhost/gz2007cms",{ useNewUrlParser: true, useUnifiedTopology: true } );

const UserModel = mongoose.model('User',{username:String,password:String},'cms_menbers');


UserModel.updateOne({"username":"mimi"},{
    "username":"qiqi"
}).then(data => {
    console.log(data)
    mongoose.disconnect()
})
.catch(error => {
    console.log(error)
})