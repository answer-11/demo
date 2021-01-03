import request from '../request.js' 
 
export function getMessage(){
    let url = '/gateway?actId=ElzMZU125260'
    return request({
        url,
        methods:'get',
        headers:{
            'X-Client-Info': '',
            'X-Host': 'mall.act.static-page.info',  
            }
        
    });//返回的是一个promisr对象
}