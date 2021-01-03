/**
 * 检测用户登录的中间件
 */
function checkLogin(req, res, next){

    // 直接在session里面获取用户的登录标识
    if( req.session.isLogin != 1 ){
        res.redirect('/admin/login');
        // 登录页面需要登录后访问？ 有些页面不需要登录可以访问
    }else{
        // 代表已经登录
        next();
    }

}

module.exports = {
    checkLogin
}