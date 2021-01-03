;(() => {
    var categoryUrl = `/api/v1/movie/category`;
    fetch('get', categoryUrl, null, response => {
        if(response.error_code === 0){
            let html = ``;
            response.result.categoryData.forEach(item => {
                html += `	<li>
								<a href="./list.html?cateId=${item._id}">${item.cateName}</a>
							</li>`
            })
            $("#categoryContent").html(html);
        }
    })

    $("#searchBtn").click(function () {
        let kw = $("#kw").val().trim();
        if(!kw){
            alert('请输入查询关键字');
            return;
        }
        location.href = '/search.html?kw=' + kw;
    })

    
    // 页面加载的时候，判断sessionStorage里面是否存在登录标识
    let username = sessionStorage.getItem('username');
    let avatar = sessionStorage.getItem('avatar');
    let token = sessionStorage.getItem('token');
    if(username){
        // vuejs 生命周期函数
        $("#showAvatar").attr('src', avatar);
        $("#username").text(username);

        let html = `<li>
						<a href="/profile.html" target="_blank">${username}</a>
					</li>

					<li>
						<a href="javascript:;"  id="logout">退出</a>
					</li>`;
        $("#showUser").html( html );

        $("#logout").click(function () {
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('avatar')
            sessionStorage.removeItem('token');
            location.href = '/login.html';

        })

    }else{

        if(typeof iSIndex != 'undefined'){

            return;

        }
        // 有些页面不需要登录就可以查看的
        let commonUrl = ['index.html', 'list.html', 'detail.html', 'search.html', 'login.html', 'register.html', 'cart.html'];
        let flag = false;
        for (let i = 0, length = commonUrl.length; i < length; i++) {
            if( location.href.indexOf(commonUrl[i]) > -1 ){
                flag = true;
            }
        }
        if(!flag){
            location.href = '/login.html';
        }
    }




})();