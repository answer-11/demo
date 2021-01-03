/**
 * 封装一个ajax工具函数
 * @param type
 * @param url
 * @param data
 * @param callback
 */
function fetch(type, url, data, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open(type, url);

    xhr.onreadystatechange = function () {
        if( xhr.readyState === 4 && xhr.status === 200){

            var obj = JSON.parse( xhr.responseText );
            callback(obj);

        }
    }
    if(type === 'post'){
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    xhr.send( data );
    // post时候必须使用send传递，get请求，send写东邪不会错
}