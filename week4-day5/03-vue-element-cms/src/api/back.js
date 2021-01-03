import axios from 'axios';
const qs = require('qs');
export function Login(userInfo){
    let userInfoString = qs.stringify(userInfo) //如何将对象转为key=value键值对 ---> qs(npm包)
    console.log(userInfoString)
    let url = 'http://localhost:8888/api/private/v1/login';
   return axios.post(url,userInfoString,{
    //  post提交常见的编码方式存在三种：
    // 1.application/x-www-form-urlencoded 底层是以key=value&key1=value1
    // 2.application/json 底层是以'{"username":"admin","password":"123456"}'
    // 3.application/from-data 底层以二进制方式传递 一般用于文件上传的时候需要使用这种编码
    // 使用那种编码 取决于后端程序员
    // 我们登录接口使用 application/x-www-form-urlencoded 传输数据时 要用key=value的方式进行传递
    headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        }
    })
}