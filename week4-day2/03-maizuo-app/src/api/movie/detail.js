import request from '../request.js' 
 
export function getDetails(page){
    let url = '/gateway?filmId='+ page + '&k=9076295';
    return request({
        url,
        methods:'get',
        headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160622238224378234372097","bc":"440100"}',
            'X-Host': 'mall.film-ticket.film.info',  
            },
        
        
    });//返回的是一个promisr对象
}