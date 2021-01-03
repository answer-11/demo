var express = require('express')
var router = express.Router()
const ArticleController = require('../controllers/ArticleController');

// 针对后台的电影分类的路由
router.get('/artice-list', ArticleController.List)
router.get('/artice-add', ArticleController.AddForm)
router.post('/artice-add', ArticleController.Add)

module.exports = router