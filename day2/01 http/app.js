const http = require("http");

const server = http.createServer(function(request,response){
    console.log(request.url)
    console.log(request.method)

    if(request.url == "/about"){
        response.write(request.url + "listlsi")
    }else{
        response.write("404 notfound")
    }


    //关闭连接
    response.end()
})
const port = 8080;
server.listen(port,function(){
    console.log("端口8080服务器已开启")
})
