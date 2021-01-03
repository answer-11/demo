var express = require('express')
var router = express.Router()
const CategoryController = require('../controllers/CategoryController');

// 针对后台的电影分类的路由
router.get('/category-list', CategoryController.showCategoryList)
router.get('/category-add', CategoryController.showCategoryForm)
router.post('/category-add', CategoryController.collectCategoryForm)

module.exports = router