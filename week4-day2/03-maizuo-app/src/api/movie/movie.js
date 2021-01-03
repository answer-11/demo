import request from '../request.js' 
// import axios from '../../node_modules/axios/dist/axios'
// 完成对电影相关的接口的编写
//1. 正在热映的接口
// axios
// 接口地址都是有一个固定的接口地址
export function getHotingMovie(){
    let url = '/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=448767'
    return request.get(url);//返回的是一个promisr对象
}
export function getComingMovie(){
    let url = '/gateway?cityId=440100&pageNum=1&pageSize=10&type=2&k=4081671'
    return request.get(url);
}