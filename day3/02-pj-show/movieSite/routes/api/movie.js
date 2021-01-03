var express = require('express')
var router = express.Router()
const MovieController = require('../../controllers/api/MovieController');

// 针对后台的电影分类的路由
// 路由：功能模块/操作
router.get('/movie/list', MovieController.getMovieList);
router.get('/movie/detail', MovieController.getMovieDetail);
router.get('/movie/category', MovieController.getMovieCategoryList);
router.get('/movie/category/list', MovieController.getMoviesByCategoryId);

// 电影最新，电影最热

router.get('/movie/hot', MovieController.hot);
router.get('/movie/top', MovieController.top);


module.exports = router