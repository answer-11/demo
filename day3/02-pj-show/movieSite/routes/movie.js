var express = require('express')
var router = express.Router()
var url = require('url')
var CategoryModel = require('../models/CategoryModel')
var MovieModel = require('../models/MovieModel')
var pagination = require('pagination');

var multer = require('multer')
var path = require('path');
var uplaodPath = path.join(__dirname, '../public', 'uploads/');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uplaodPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({storage: storage})

// 针对后台的电影分类的路由 分页
// /admin/movie-list?page=1&size=10
router.get('/movie-list', async function (req, res) {

    var requestQuery = url.parse(req.url, true);

    let {page = 1, size = 2} = requestQuery.query;
    page = parseInt(page)
    size = parseInt(size)
    let offset = (page - 1) * size;
    // 获取总记录
    let count = await MovieModel.countDocuments();
    let totalPage = Math.ceil(count / size);

    // 生成分页字符串

    // 可以实现分页
    const movieInfos = await MovieModel.aggregate([
        {
            // 学习 mysql 关系型数据库 nosql 不擅长做关系操作。mongoose提供了
            $lookup: {
                // 1. 需要关联的表
                from: 'category',
                // 2. 关联的本文档的字段
                localField: 'cateId',
                // 3. 关联的外部表的字段
                foreignField: '_id',
                // 4. 获取回来后数据信息的别名
                as: 'cateInfos',

            }

        },
        {
            $skip: offset,
        },
        {
            $limit: size,
        }

    ]);


    res.render('movie-list', {totalPage, size, page, movieData: movieInfos, title: '电影网站后台电影资源列表'})

})

/**
 * 使用第三方的包完成分页功能
 */
router.get('/movie-npm-list', async function (req, res) {

    var requestQuery = url.parse(req.url, true);

    let {page = 1, size = 2, kw = ''} = requestQuery.query;
    page = parseInt(page)
    size = parseInt(size)
    let offset = (page - 1) * size;
    // 获取总记录
    let count = await MovieModel.countDocuments();
    let totalPage = Math.ceil(count / size);
    // 生成分页字符串

    // 可以实现分页
    const movieInfos = await MovieModel.aggregate([
       /* {
            $match: {movieName: /kw/}

        },*/
        {

            // 学习 mysql 关系型数据库 nosql 不擅长做关系操作。mongoose提供了
            $lookup: {
                // 1. 需要关联的表
                from: 'category',
                // 2. 关联的本文档的字段
                localField: 'cateId',
                // 3. 关联的外部表的字段
                foreignField: '_id',
                // 4. 获取回来后数据信息的别名
                as: 'cateInfos',

            }

        },
        {
            $skip: offset,
        },
        {
            $limit: size,
        }

    ]);

    var translations = {
        'PREVIOUS': '上一页',
        'NEXT': '下一页',
        'FIRST': '第一页',
        'LAST': '最后一页',
    };


    var paginator = pagination.create('search',
        {
            prelink: '/admin/movie-npm-list',
            current: page,
            rowsPerPage: size,
            totalResult: count,
            translator: function (str) {
                return translations[str];
            }
        });
    var pageHtml = paginator.render();

    res.render('movie-npm-list', {pageHtml, movieData: movieInfos, title: '电影网站后台电影资源列表'})

})

router.get('/movie-add', async function (req, res) {
    try {
        // 展示之前，先动态获取电影的分类信息
        const cateData = await CategoryModel.find({});
        res.render('movie-add', {cateData: cateData, title: '电影网站后台电影资源添加'})

    } catch (e) {
        res.redirect('/admin/404');
    }

})

router.post('/movie-add', upload.single('movieImg'), async function (req, res) {
    let {movieName, bianju, actors, director, cateId, descp, loadUrl = '', secret = '', pv = 100, isVip = 0} = req.body;
    var movie1 = new MovieModel({
        movieName, bianju, actors, director, cateId, descp, loadUrl, secret, pv, isVip
    }); // 这一步的时候没有入库 ；save才会入库

    let error = movie1.validateSync();
    // 同步验证。获取错误信息 没有错误 undefined; 存在错误是一个对象

    if (error) {
        let rs = [];
        for (var attr in error.errors) {
            rs.push(attr + ':' + error.errors[attr].message);
        }
        if (rs.length > 0) {
            res.render('message', {message: rs, url: '/admin/movie-add', time: 3}); // time 单位是 秒数
            return;
        }
    }

    if (req.file) {
        movie1.movieImg = req.file.filename; // 修改 MovieModel，增加一个 movieImg 字段
    }

    try {
        await movie1.save();
        res.redirect('/admin/movie-list');
    } catch (e) {
        res.redirect('back');
    }

})

module.exports = router