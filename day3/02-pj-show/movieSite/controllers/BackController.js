/*
业务文件的命名：
1. 业务名首字母大写+Controller + .js
// 后台业务
BackController.js

// 2. 电影资源
MovieController.js

// 3. 分类
CategoryController.js

*/

const AdminModel = require('../models/AdminModel');
const md5 = require('md5');
const SiteConfig = require('../config/site');

/**
 * 展示登录表单
 */
function showLoginForm(req, res) {
    res.render('login', {title: 'xxx电影网站'})
}

/**
 * 登录检测
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function checkLogin(req, res) {

    let { username, password } = req.body;

    let adminInfo = await AdminModel.find({username});

    if( adminInfo.length == 0 ){
        res.redirect('back');
    }else{

        if( adminInfo[0].password === md5( md5( password ) + SiteConfig.ADMIN_TABLE_SALT ) ){
            // 记录用户标识，使用的 cookie 技术完成。 第三方的cookie-parse 包完成。
            // set-cookie 响应头指令
            // http://www.expressjs.com.cn/en/resources/middleware/cookie-session.html
            /*
            res.cookie('isLogin', 1, {path: '/', maxAge: 3600* 1000, httpOnly: true, signed: true});
            res.cookie('username', username, {path: '/', maxAge: 3600* 1000, httpOnly: true, signed: true});*/

            req.session.isLogin = 1; // 信息是存储在服务器端； 代表设置session存储
            req.session.username = username; // 信息是存储在服务器端； 代表设置session存储

            res.redirect('/admin/index');
        }else{
            res.redirect('back');
        }
    }
}

module.exports = {
    showLoginForm,
    checkLogin
}