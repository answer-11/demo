const moment = require('moment');
const mongoose = require('mongoose');

const MovieModel = require('../../models/MovieModel');
const CategoryModel = require('../../models/CategoryModel');


const SiteConfig = require('../../config/site.js');

/**
 * 格式化单条记录
 * @param Item Obejct
 */
function formatItem(item) {
    // 快速重新赋值一份完全相同，但是地址不同的对象
    var tmp = JSON.parse(JSON.stringify( item ));
    tmp.productionManager = tmp.bianju;

    // 如果是收费电影则不展示提取码
    if(tmp.isVip == 1){
        tmp.secret = '';

    }

    tmp.isCharge = tmp.isVip == 1 ? '收费': '不收费';
    tmp.isVip = tmp.isVip == 1 ? true: false;
    // console.log(tmp.createdAt);
    tmp.createdAt = moment( new Date( tmp.createdAt ).getTime() ).format('YYYY-MM-DD HH:mm:ss');
    tmp.movieImg = SiteConfig.MOIVE_IMG_PREFIX + item.movieImg;

    return tmp;

}

/**
 * 格式化电影数据
 * 1. 格式化要返回的字段是哪些?
 * 2. 额外处理数据
 * @param movieData
 * @return {*}
 */
function formatMovieData(movieData){
    return movieData.map(item => {
        return formatItem(item);
    });
}

/**
 *
 * @api {get} /movie/list 电影列表接口
 * @apiName  movieList
 * @apiGroup 电影管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的电影列表接口，用于返回电影的列表信息，实现了分页，查询相关的功能。
 *
 * @apiPermission admin
 *
 * @apiParam {int} page 页码，默认值为 1， 非必须
 * @apiParam {int} size 每页显示的数量，默认值为 2，非必须
 * @apiParam {string} kw 查询关键字，非必须
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {int} result.total  记录总数
 * @apiSuccess (success-200) {Object[]} result.size 每页数量
 * @apiSuccess (success-200) {Object[]} result.currentPage 当前页
 * @apiSuccess (success-200) {Object[]} result.totalPage 总页数
 * @apiSuccess (success-200) {Object[]} result.movieList 电影列表
 * @apiSuccess (success-200) {Object[]} result.movieList.movieName 电影名称
 * @apiSuccess (success-200) {Object[]} result.movieList.actors 演员
 * @apiSuccess (success-200) {Object[]} result.movieList.director 电影导演
 *
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 成功注册
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "成功请求",
    "status": true,
    "result": {
        "total": 11,
        "size": 2,
        "currentPage": 1,
        "totalPage": 6,
        "movieList": [
            {
                "_id": "5de5dc9b0303eb1a90be46e2",
                "movieName": "肖申克的救赎",
                "actors": " 蒂姆·罗宾斯 / 摩根·弗里曼 / 鲍勃·冈顿 / 威廉姆·赛德勒 / 克兰西·布朗",
                "director": " 弗兰克·德拉邦特",
                "movieImg": "http://localhost:9090/uploads/movieImg-1575357189862.jpg",
                "productionManager": "弗兰克·德拉邦特 / 斯蒂芬·金",
                "movieViewCount": 100
            },
            {
                "_id": "5de5dda26c597200d4803733",
                "movieName": "霸王别姬",
                "actors": "张国荣 / 张丰毅 / 巩俐 / 葛优 / 英达 ",
                "director": "陈凯歌",
                "movieImg": "http://localhost:9090/uploads/movieImg-1575357189862.jpg",
                "productionManager": "芦苇 / 李碧华",
                "movieViewCount": 100
            }
        ]
    }
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  这是出现错误时返回结果示例
 *  HTTP/1.1 404 Not Found
 *  {
 *   code:1,
 *   msg:'not found',
 *   }
 */
async function getMovieList(req, res) {
    // 2. 查询数据库（Model），获取电影的列表
    try {
        let {page = 1, size = 2, kw = ''} = req.query;
        page = isNaN(page) ? 1 : parseInt( page );
        size = isNaN(size) ? 2 : parseInt( size );
        let offset = (page - 1) * size;
        let query = {};
        // 只可以根据电影名称查询。需要：1. 名称 2. 导演 3. 演员查询 4. 电影的内容
        if( kw ){
            // query.movieName = new RegExp(kw, 'i');
            // 了解 或查询，满足其中任何一个都可以
            query['$or'] = [
                {
                    movieName: new RegExp(kw, 'i'),
                },
                {
                    bianju: new RegExp(kw, 'i'),
                },
                {
                    actors: new RegExp(kw, 'i'),
                },
                {
                    director: new RegExp(kw, 'i'),
                },
                {
                    descp: new RegExp(kw, 'i'),
                },
            ]
        }

        let movieData = await MovieModel.find(query, {movieName: 1, bianju:1, actors: 1, director: 1,movieImg: 1, isVip:1, pv: 1, loadUrl: 1, secret: 1, createdAt: 1}).skip(offset).limit(size);

        let total = await MovieModel.find(query).countDocuments();
        // 查询满足条件的总记录

        res.json( {
                error_code: 0,
                msg: 'success',
                reason: '成功请求',
                status: true,
                result: {
                    total,
                    size,
                    currentPage:page,
                    totalPage: Math.ceil( total / size ),
                    movieList: formatMovieData(movieData),
                }});

        // 传统的操作在这里完成 服务器端渲染
        // res.render('list', {movieData})

    }catch (e) {
        res.json( {
                error_code: 1,
                msg: 'failure',
                reason: '请求失败',
                status: false,
                error: e
        });
    }

}

/**
 *
 * @api {get} /movie/detail 电影详情接口
 * @apiName  movieDetail
 * @apiGroup 电影管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的电影详情接口，用于返回电影的详细信息。
 *
 * @apiPermission admin
 *
 * @apiParam {string} movieId 电影主键ID，必传
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {Object} result.movieInfo 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {Object[]} result.movieInfo.movieName 电影名称
 * @apiSuccess (success-200) {Object[]} result.movieInfo.actors 演员
 * @apiSuccess (success-200) {Object[]} result.movieInfo.director 电影导演
 *
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 成功注册
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "成功请求",
    "status": true,
    "result": {
        "movieInfo": {
            "_id": "5de5dc9b0303eb1a90be46e2",
            "movieName": "肖申克的救赎",
            "actors": " 蒂姆·罗宾斯 / 摩根·弗里曼 / 鲍勃·冈顿 / 威廉姆·赛德勒 / 克兰西·布朗",
            "director": " 弗兰克·德拉邦特",
            "cateId": "5de5ca4b09d84e1da0f474cb",
            "movieImg": "http://localhost:9090/uploads/movieImg-1575357189862.jpg",
            "descp": "20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。在……",
            "__v": 0,
            "productionManager": "弗兰克·德拉邦特 / 斯蒂芬·金",
            "movieViewCount": 100
        }
    }
}
 *
 *  @apiError (failure-400) {String} error_code 响应状态码
 *  @apiError (failure-400) {String} msg 提示英文信息
 *  @apiError (failure-400) {String} reason 提示中文信息
 *
 *  @apiErrorExample {json} 失败1-示例:
 *  这是缺少 movieId 时候出现错误时返回结果示例
 {
    "error_code": 1,
    "msg": "cant found movieId",
    "reason": "缺少电影主键id",
    "status": false
 }
 *
 * *
 *  @apiError (failure-500) {String} error_code 响应状态码
 *  @apiError (failure-500) {String} msg 提示英文信息
 *  @apiError (failure-500) {String} reason 提示中文信息
 *
 *  @apiErrorExample {json} 失败2-示例:
 *  这是 内部查询错误 结果示例
     {
        "error_code": 1,
        "msg": "failure",
        "reason": "获取详情失败",
        "status": false,
        "error": {
            "message": "Cast to ObjectId failed for value \"sdfds\" at path \"_id\" for model \"MovieModel\"",
            "name": "CastError",
            "stringValue": "\"sdfds\"",
            "kind": "ObjectId",
            "value": "sdfds",
            "path": "_id"
        }
    }
 */
async function getMovieDetail(req, res){
    // http://localhost:9090/api/v1/movie/detail?id=5de5dc9b0303eb1a90be46e2
    let {movieId = ''}  = req.query;
    if(!movieId){
        res.json( {
            error_code: 1,
            msg: 'cant found movieId',
            reason: '缺少电影主键id',
            status: false,
        });
    }
    // 根据 movieId 查询电影详情
    try {
        let movieInfo = await MovieModel.findById(movieId);

        res.json( {
            error_code: 0,
            msg: 'success',
            reason: '成功请求',
            status: true,
            result: {
                movieInfo: formatItem(movieInfo),
            }});
    }catch (e) {
        res.json( {
            error_code: 1,
            msg: 'failure',
            reason: '获取详情失败',
            status: false,
            error: e
        });
    }

}

/**
 *
 * @api {get} /movie/category 电影分类接口
 * @apiName  movieCategory
 * @apiGroup 电影管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的电影分类接口，用于返回电影的分类信息;
 *
 * @apiPermission admin
 *
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {int} result.categoryData  记录信息
 * @apiSuccess (success-200) {int} result.categoryData._id  主键id
 * @apiSuccess (success-200) {int} result.categoryData.cateName  分类名称
 *
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 成功注册
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "成功请求",
    "status": true,
    "result": {
        "categoryData": [
            {
                "_id": "5de5ca2609d84e1da0f474ca",
                "cateName": "科幻",
                "__v": 0
            },
            {
                "_id": "5de5ca4b09d84e1da0f474cb",
                "cateName": "动作",
                "__v": 0
            },
            {
                "_id": "5de5ca9709d84e1da0f474cc",
                "cateName": "娱乐",
                "__v": 0
            },
            {
                "_id": "5de5dde06c597200d4803735",
                "cateName": "恐怖",
                "__v": 0
            },
            {
                "_id": "5de704f97134a8144ca0681f",
                "cateName": "悬疑",
                "__v": 0
            },
            {
                "_id": "5de77e0bdf78792348489cea",
                "cateName": "悬疑社",
                "__v": 0
            }
        ]
    }
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  这是出现错误时返回结果示例
 *  HTTP/1.1 404 Not Found
 *  {
 *   code:1,
 *   msg:'not found',
 *   }
 */
async function getMovieCategoryList(req, res){
    try {
        const categoryData = await CategoryModel.find({});//由于分类的数据少，不做分页
        res.json( {
            error_code: 0,
            msg: 'success',
            reason: '成功请求',
            status: true,
            result: {
                categoryData: categoryData,
            }});
    }catch (e) {
        res.json( {
            error_code: 1,
            msg: 'cant found',
            reason: '暂无相关的电影分类信息',
            status: false,
        });
    }

}


/**
 *
 * @api {get} /movie/category/list 分类列表接口
 * @apiName  movieCategoryList
 * @apiGroup 电影管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription 根据分类的id，查询该分类下的电影的列表
 *
 * @apiPermission admin
 *
 * @apiParam {string} cateId 电影分类的主键id
 * @apiParam {int} page 页码，默认值为 1， 非必须
 * @apiParam {int} size 每页显示的数量，默认值为 2，非必须
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {int} result.total  记录总数
 * @apiSuccess (success-200) {Object[]} result.size 每页数量
 * @apiSuccess (success-200) {Object[]} result.currentPage 当前页
 * @apiSuccess (success-200) {Object[]} result.totalPage 总页数
 * @apiSuccess (success-200) {Object[]} result.movieList 电影列表
 * @apiSuccess (success-200) {Object[]} result.movieList.movieName 电影名称
 * @apiSuccess (success-200) {Object[]} result.movieList.actors 演员
 * @apiSuccess (success-200) {Object[]} result.movieList.director 电影导演
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 成功注册

 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  这是出现错误时返回结果示例
 {
    "error_code": 1,
    "msg": "cant found cateId",
    "reason": "缺少电影分类cateId",
    "status": false
}
 */
async function getMoviesByCategoryId(req, res){
    let {cateId = ''}  = req.query;


    if(!cateId){
        res.json( {
            error_code: 1,
            msg: 'cant found cateId',
            reason: '缺少电影分类cateId',
            status: false,
        });
    }
    /*分页公式*/
    let {page = 1, size = 2 } = req.query;
    page = isNaN(page) ? 1 : parseInt( page );
    size = isNaN(size) ? 2 : parseInt( size );
    let offset = (page - 1) * size;

    // 根据 cateId 查询电影列表
    try {
        // let moviesInfo = await MovieModel.find({ cateId });
        // 查询条件：
        let moviesInfo = await MovieModel.aggregate([
            {
                $lookup: {
                    from: 'category',
                    localField: 'cateId',
                    foreignField: '_id',
                    as: 'cateInfo',
                }
            },
            {
                $match: {
                    /*现在传递过来的 cateId 是字符串类型，但是 mongoose 需要的是ObjectId 类型*/
                    /* 做 match 匹配，需要把 cateId 转换为 ObjectId */
                    cateId: mongoose.Types.ObjectId(cateId),
                }
            },
            {
                $skip: offset
            },
            {
                $limit: size,
            }

        ]);
        // 聚合查询，联表查询
        res.json( {
            error_code: 0,
            msg: 'success',
            reason: '成功请求',
            status: true,
            result: {
                moviesInfo: formatMovieData(moviesInfo),
            }});
    }catch (e) {
        res.json( {
            error_code: 1,
            msg: 'failure',
            reason: '获取详情失败',
            status: false,
            error: e
        });
    }

}

/**
 *
 * @api {get} /movie/hot 热门电影接口
 * @apiName  movieHot
 * @apiGroup 电影管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的热门电影接口。
 *
 * @apiPermission admin
 *
 * @apiParam {int} page 页码，默认值为 1， 非必须
 * @apiParam {int} size 每页显示的数量，默认值为 2，非必须
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {int} result.total  记录总数
 * @apiSuccess (success-200) {Object[]} result.size 每页数量
 * @apiSuccess (success-200) {Object[]} result.currentPage 当前页
 * @apiSuccess (success-200) {Object[]} result.totalPage 总页数
 * @apiSuccess (success-200) {Object[]} result.movieList 电影列表
 * @apiSuccess (success-200) {Object[]} result.movieList.movieName 电影名称
 * @apiSuccess (success-200) {Object[]} result.movieList.actors 演员
 * @apiSuccess (success-200) {Object[]} result.movieList.director 电影导演
 *
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 成功
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "成功请求",
    "status": true,
    "result": {
        "total": 2,
        "size": 10,
        "currentPage": 1,
        "totalPage": 1,
        "movieList": [
            {
                "pv": 1231,
                "isVip": false,
                "_id": "5dec7171ecba3421207b1809",
                "movieName": "手动阀",
                "bianju": "手动阀",
                "actors": "第三方",
                "director": "水电费3",
                "loadUrl": "http://localhost:9090/admin/index",
                "secret": "21234",
                "movieImg": "http://localhost:9090/uploads/movieImg-1575776625395.jpg",
                "productionManager": "手动阀",
                "isCharge": "不收费",
                "createdAt": "2019-12-08 12:00:02"
            },
            {
                "pv": 1223,
                "isVip": true,
                "_id": "5dec7149ecba3421207b1808",
                "movieName": "最热电影",
                "bianju": "最热电影",
                "actors": "最热电影",
                "director": "最热电影",
                "loadUrl": "http://localhost:9090/admin/index",
                "secret": "",
                "movieImg": "http://localhost:9090/uploads/movieImg-1575776585548.jpg",
                "productionManager": "最热电影",
                "isCharge": "收费",
                "createdAt": "2019-12-08 12:00:02"
            }
        ]
    }
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  失败
 *  HTTP/1.1 404 Not Found
 *  {
 *   code:1,
 *   msg:'not found',
 *   }
 */
async function hot(req, res){
    try {
        let {page = 1, size = 2, kw = ''} = req.query;
        page = isNaN(page) ? 1 : parseInt( page );
        size = isNaN(size) ? 2 : parseInt( size );
        let offset = (page - 1) * size;

        let query = {};

        let movieData = await MovieModel.find(query, {movieName: 1, bianju:1, actors: 1, director: 1,movieImg: 1, isVip:1, pv: 1, loadUrl: 1, secret: 1, createdAt: 1}).sort({pv: -1}).skip(offset).limit(size);

        let total = await MovieModel.find(query).countDocuments();

        res.json( {
            error_code: 0,
            msg: 'success',
            reason: '成功请求',
            status: true,
            result: {
                total,
                size,
                currentPage:page,
                totalPage: Math.ceil( total / size ),
                movieList: formatMovieData(movieData),
            }});

    }catch (e) {
        res.json( {
            error_code: 1,
            msg: 'failure',
            reason: '请求失败',
            status: false,
            error: e
        });
    }

}

/**
 *
 * @api {get} /movie/top 最新电影接口
 * @apiName  movieTop
 * @apiGroup 电影管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的最新电影接口。
 *
 * @apiPermission admin
 *
 * @apiParam {int} page 页码，默认值为 1， 非必须
 * @apiParam {int} size 每页显示的数量，默认值为 2，非必须
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {int} result.total  记录总数
 * @apiSuccess (success-200) {Object[]} result.size 每页数量
 * @apiSuccess (success-200) {Object[]} result.currentPage 当前页
 * @apiSuccess (success-200) {Object[]} result.totalPage 总页数
 * @apiSuccess (success-200) {Object[]} result.movieList 电影列表
 * @apiSuccess (success-200) {Object[]} result.movieList.movieName 电影名称
 * @apiSuccess (success-200) {Object[]} result.movieList.actors 演员
 * @apiSuccess (success-200) {Object[]} result.movieList.director 电影导演
 *
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 成功
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "成功请求",
    "status": true,
    "result": {
        "total": 2,
        "size": 10,
        "currentPage": 1,
        "totalPage": 1,
        "movieList": [
            {
                "pv": 1231,
                "isVip": false,
                "_id": "5dec7171ecba3421207b1809",
                "movieName": "手动阀",
                "bianju": "手动阀",
                "actors": "第三方",
                "director": "水电费3",
                "loadUrl": "http://localhost:9090/admin/index",
                "secret": "21234",
                "movieImg": "http://localhost:9090/uploads/movieImg-1575776625395.jpg",
                "productionManager": "手动阀",
                "isCharge": "不收费",
                "createdAt": "2019-12-08 11:59:51"
            },
            {
                "pv": 1223,
                "isVip": true,
                "_id": "5dec7149ecba3421207b1808",
                "movieName": "最热电影",
                "bianju": "最热电影",
                "actors": "最热电影",
                "director": "最热电影",
                "loadUrl": "http://localhost:9090/admin/index",
                "secret": "",
                "movieImg": "http://localhost:9090/uploads/movieImg-1575776585548.jpg",
                "productionManager": "最热电影",
                "isCharge": "收费",
                "createdAt": "2019-12-08 11:59:51"
            }
        ]
    }
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  失败
 *  HTTP/1.1 404 Not Found
 *  {
 *   code:1,
 *   msg:'not found',
 *   }
 */
async function top(req, res){

    try {
        let {page = 1, size = 2, kw = ''} = req.query;
        page = isNaN(page) ? 1 : parseInt( page );
        size = isNaN(size) ? 2 : parseInt( size );
        let offset = (page - 1) * size;

        let query = {};

        let movieData = await MovieModel.find(query, {movieName: 1, bianju:1, actors: 1, director: 1,movieImg: 1, isVip:1, pv: 1, loadUrl: 1, secret: 1, createdAt: 1}).sort({createdAt: -1}).skip(offset).limit(size);

        let total = await MovieModel.find(query).countDocuments();

        res.json( {
            error_code: 0,
            msg: 'success',
            reason: '成功请求',
            status: true,
            result: {
                total,
                size,
                currentPage:page,
                totalPage: Math.ceil( total / size ),
                movieList: formatMovieData(movieData),
            }});

    }catch (e) {
        res.json( {
            error_code: 1,
            msg: 'failure',
            reason: '请求失败',
            status: false,
            error: e
        });
    }

}


module.exports = {
    getMovieList,
    getMovieDetail,
    getMovieCategoryList,
    getMoviesByCategoryId,
    hot,
    top,

}