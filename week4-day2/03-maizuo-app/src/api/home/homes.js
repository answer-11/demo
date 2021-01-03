import request from '../request.js' 
 
export function getHomes(){
    let url = '/gateway?cityId=440100&ticketFlag=1&k=3172294'
    return request({
        url,
        methods:'get',
        headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"160622238224378234372097"}',
            'X-Host': 'mall.film-ticket.cinema.list',  
            }
        
    });//返回的是一个promisr对象
}
