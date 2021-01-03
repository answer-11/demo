var express = require('express')
var router = express.Router()
const md5 = require('md5');
const SiteConfig = require('../config/site');
// 引入控制器文件 Controller 控制器，这个文件里面专门写业务逻辑
const BackController = require('../controllers/BackController');

// 负责路由处理
router.get('/login', BackController.showLoginForm);
// 处理登录请求
router.post('/login', BackController.checkLogin)

module.exports = router;
