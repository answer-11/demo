var express = require('express')
var router = express.Router()

// 针对后台的管理员的路由，现在路由分单文件管理
router.get('/admin-list', function (req, res) {
    res.render('admin-list', {title: '电影网站后台管理员列表'})
})

module.exports = router