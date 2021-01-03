import { stringify } from "qs";
import request from "./request";
const qs = require('qs')

export function userList(page=1,size=2,kw=''){
    let url = `users?pagenum=${page}&pagesize=${size}`;
    if(kw){
        // url地址query  query = andy
        url += '&query='+ kw
    }
    return request({
        url,
        method:'get',
        // 除了登录接口不需要做token的验证 其他都要token验证 那我们可以封装一个token 方便管理
        // headers:{'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MDgwMTgwMjksImV4cCI6MTYwODEwNDQyOX0.48Q6T0kPr9Uo1LvEOu_hr-OSTc2CypNmHhNIf3s0exg'}
    })
}

// 使用ts userInfo 格式是固定的 对于调用方来说 应该严格传递 username password email moblie
// 使用的ts约束userInfo 的类型
// 如何约束
// interface UserInfo{
//     username:sstringtringify;
//     password:string
//     email:string
//     mobile:string
// }
export function userAdd(userInfo){
    let url = `/users`;
    console.log(userInfo)
    // 返回一个promise对象
    return request({
        url,
        method:'post',//对于所有post请求 都要进行数据的编码和设置请求头
        data:userInfo,
    })
}
export function userDel(id){
    let url = `/users/${id}`;
    // 返回一个promise对象
    return request({
        url,
        method:'delete',
    })
}