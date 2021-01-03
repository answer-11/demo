import request from '../request.js';
export function
 getHomeDetail(){
    let url = '/gateway/?cinemaId=4592&k=7996769'
    return request({
        url,
        methods:'get',
        headers:{
            'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.0.4","e":"160622238224378234372097","bc":"440100"}',
            'X-Host':'mall.film-ticket.cinema.info',  
            }
        
    });//返回的是一个promisr对象
}
export function
 getHomePhoto(){
    let url = '/gateway/?cinemaId=4592&k=9197009'
    return request({
        url,
        methods:'get',
        headers:{
            'X-Client-Info':'{"a":"3000","ch":"1002","v":"5.0.4","e":"160622238224378234372097","bc":"440100"}',
            'X-Host':'mall.film-ticket.film.cinema-show-film',  
            }
        
    });//返回的是一个promisr对象
}