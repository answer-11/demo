function getMovieData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.onreadystatechange = function () {
        if( xhr.readyState === 4 && xhr.status === 200 ){
            let result = JSON.parse( xhr.responseText );
            // console.log(result);
            callback(result);

        }
    }
    xhr.send();
}