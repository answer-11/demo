var express = require('express')
var router = express.Router()
const MovieModel = require('../models/MovieModel');
const AdminModel = require('../models/AdminModel');
const md5 = require('md5');
const SiteConfig = require('../config/site');


router.get('/index', function (req, res) {
    res.render('index', {title: '电影网站后台首页', username: req.session.username})

})


// admin/welcome 页面：后台的首页里面使用 iframe 加载了welcome.html页面

router.get('/welcome', function (req, res) {

    res.render('welcome', {title: '电影网站后台welcome首页'})
})

// 定制一个错误页面
router.get('/404', function (req, res) {
    res.render('error', {title: '电影网站错误页面'})
})

// 退出操作
router.get('/logout', function (req, res) {
    // 清除cookie即可
    // res.cookie('isLogin', null, {maxAge: 0});
    // res.cookie('username', null, {maxAge: 0});

    req.session.isLogin = null;
    req.session.username = null;

    res.redirect('/admin/login');

})



module.exports = router