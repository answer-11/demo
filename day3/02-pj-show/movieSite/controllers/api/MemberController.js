const md5 = require('md5');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const moment = require('moment');

mongoose.set('useFindAndModify', false)

const MemberModel = require('../../models/MemberModel');
const MovieModel = require('../../models/MovieModel');
const FavModel = require('../../models/FavModel');
const CommentModel = require('../../models/CommentModel');


const SiteConfig = require('../../config/site.js');


/**
 * 完成会员的注册功能
 * 1. 请求 post
 * 2. username
 * 3. password
 * 4. repassword
 * 5. markup
 * 6. avatar 缺省头像 default http://localhost:9090/images/default.jpg
 * 7. createAt 注册时间
 * @param req
 * @param res
 */


/**
 *
 * @api {post} /member/register 会员注册接口
 * @apiName  memberRegister
 * @apiGroup 会员管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的会员注册接口。
 *
 * @apiPermission admin
 *
 * @apiParam {string} username 用户名，必须
 * @apiParam {string} password 密码，必须
 * @apiParam {string} repassword 确认密码，必须
 * @apiParam {string} markup 个人简介，非必须
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {int} result.userInfo  记录总数
 * @apiSuccess (success-200) {Object[]} result.userInfo.avatar 头像
 * @apiSuccess (success-200) {Object[]} result.userInfo.username 名称
 * @apiSuccess (success-200) {Object[]} result.userInfo.markup 简介
 * @apiSuccess (success-200) {Object[]} result.userInfo._id 主键id
 * @apiSuccess (success-200) {Object[]} result.userInfo.token 登录标识
 *
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 成功注册
 * HTTP/1.1 200 OK

 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  这是用户名重复出现错误时返回结果示例
 {
    "error_code": 1,
    "msg": "failure",
    "reason": "验证不通过",
    "status": false,
    "error": "用户信息已存在！"
}
 */
async function register(req, res) {
    // 接受信息
    let {username, password, repassword, markup} = req.body; // 之前安装 body-parse

    if (!username || !password || (repassword != password)) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '用户信息不完整！'
        });
    }

    // 2. mongoose 可以进行自动验证 定义 MovieModel
    // 检验注册的用户是否在数据库存在，如果存在不可以注册，用户名要唯一
    let isExist = await MemberModel.find({username});

    if (isExist.length > 0) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '用户信息已存在！'
        });
    }

    var user = new MemberModel({
        username, password, markup
    });

    try {
        // 密码要加密处理
        user.password = md5(md5(password) + SiteConfig.MEMBER_TABLE_SALT);

        let userInfo = await user.save();
        // 后期在这里一般返回的登录的标识，前后分离项目标识使用的 token 机制
        // 1. 标识使用的 token 机制
        // 2. 密码不可以返回
        userInfo = JSON.parse(JSON.stringify(userInfo));
        delete userInfo.password;
        userInfo.token = 'token!';

        res.json({
            error_code: 0,
            msg: 'success',
            reason: '注册请求',
            status: true,
            result: {
                userInfo,
            }
        });


    } catch (e) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '注册失败',
            status: false,
            error: e
        });

    }


}

/**
 *
 * @api {post} /member/login 会员登录接口
 * @apiName  memberLogin
 * @apiGroup 会员管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的会员登录接口。
 *
 * @apiPermission admin
 *
 * @apiParam {string} username 用户名，必须
 * @apiParam {string} password 密码，必须
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {Object[]} result.token 登录标识
 *
 *
 * @apiSuccessExample {json} 成功登录-示例:
 * 成功注册
 * HTTP/1.1 200 OK

 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  这是用户名重复出现错误时返回结果示例
 {
    "error_code": 1,
    "msg": "failure",
    "reason": "验证不通过",
    "status": false,
    "error": "账户错误"
}
 *
 */
async function login(req, res) {
    let {username, password} = req.body;

    if (!username || !password) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '用户信息不完整！'
        });
    }

    // 2. mongoose 可以进行自动验证 定义 MovieModel
    let userInfo = await MemberModel.find({username});

    if (userInfo.length <= 0) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '账户错误', // 学习阶段
        });
    }

    if (userInfo[0].password != md5(md5(password) + SiteConfig.MEMBER_TABLE_SALT)) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '密码错误！', // 学习阶段
        });
    }

    // 登录成功！
    userInfo = JSON.parse(JSON.stringify(userInfo[0]));
    delete userInfo.password;
    userInfo.avatar = SiteConfig.MEMBER_AVTAR_PREFIX + userInfo.avatar;

    const token = jwt.sign(userInfo, SiteConfig.MEMBER_TOKEN_SALT, {expiresIn: SiteConfig.TOKEN_EXPIRES});

    res.json({
        error_code: 0,
        msg: 'success',
        reason: '登录请求',
        status: true,
        result: {
            token,
            username: username,
            avatar: userInfo.avatar,
        }
    });

}

/**
 *
 * @api {post} /member/favAdd 收藏增加接口
 * @apiName  memberFavAdd
 * @apiGroup 会员管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的电影收藏接口。
 *
 * @apiPermission admin
 *
 * @apiParam {string} movieId 待收藏的电影主键id，必须
 * @apiParam {string} token 登录的令牌，必须
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {Object[]} result.movieInfo 收藏的电影信息
 *
 *
 * @apiSuccessExample {json} 收藏成功-示例:
 * 收藏成功
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "收藏成功",
    "status": true,
    "result": {
        "movieInfo": {
            "_id": "5deb724e8233d620c4c74c7b",
            "userId": "5deb641048984927b82c25f1",
            "movieId": "5de60a6469bef210e48c783c",
            "createdAt": "2019-12-07T09:35:10.896Z",
            "updatedAt": "2019-12-07T09:35:10.896Z",
            "__v": 0
        }
    }
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  收藏失败
 {
    "error_code": 1,
    "msg": "failure",
    "reason": "验证不通过",
    "status": false,
    "error": "收藏失败！JsonWebTokenError: invalid token"
}
 *
 */
async function favAdd(req, res) {
    let {movieId = '', token = ''} = req.body;
    // 实际token更多是在请求头里面传递
    // 1. 校验token是否合法

    try {
        const decoded = jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        const userId = decoded._id;
        //前提电影存在
        // 如果传递的不是合法的 ObjectId 类型，抛出异常
        const movieInfo = await MovieModel.findById(movieId);

        // 之前是否收藏过该电影
        let isExist = await FavModel.find({movieId, userId});
        if (isExist.length > 0) {
            // 之前收藏过
            res.json({
                error_code: 1,
                msg: 'failure',
                reason: '验证不通过',
                status: false,
                error: '收藏失败，之前已经收藏了该电影！',
            });
        }

        // 存在 入库 收藏表
        const movie = new FavModel({
            userId,
            movieId,
        })
        try {
            let movieInfo = await movie.save();
            res.json({
                error_code: 0,
                msg: 'success',
                reason: '收藏成功',
                status: true,
                result: {
                    movieInfo
                }
            });

        } catch (e) {
            res.json({
                error_code: 1,
                msg: 'failure',
                reason: '收藏失败',
                status: false,
                error: '收藏失败！' + e,
            });
        }

    } catch (e) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '收藏失败！' + e,
        });

    }
}


/**
 *
 * @api {post} /member/favRemove 收藏删除接口
 * @apiName  favRemove
 * @apiGroup 会员管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的用户收藏删除接口；
 *
 *
 * @apiParam {string} token 用户登录标识，必须
 * @apiParam {string} favId 收藏的主键id
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {int} result.favInfo  已删除的记录
 *
 * @apiSuccessExample {json} 成功-示例:
 * 删除成功
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "删除成功",
    "status": true,
    "result": {
        "favInfo": {
            "_id": "5deb709f504e841e381e9a1d",
            "userId": "5deb641048984927b82c25f1",
            "movieId": "5de5de286c597200d4803739",
            "createdAt": "2019-12-07T09:27:59.128Z",
            "updatedAt": "2019-12-07T09:27:59.128Z",
            "__v": 0
        }
    }
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  删除失败
 {
    "error_code": 1,
    "msg": "failure",
    "reason": "删除失败",
    "status": false,
    "error": "删除失败！CastError: Cast to ObjectId failed for value \"5deb709f504es841e381e9a1d\" at path \"_id\" for model \"FavModel\""
}
 */
async function favRemove(req, res) {
    let {favId = '', token = ''} = req.body;
    try {
        jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        // 检测待删除的收藏信息是否存在，如果不存在，则抛出异常
        let favInfo = await FavModel.findByIdAndDelete(favId);

        res.json({
            error_code: 0,
            msg: 'success',
            reason: '删除成功',
            status: true,
            result: {
                favInfo
            }
        });
    } catch (e) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '删除失败',
            status: false,
            error: '删除失败！' + e,
        });

    }
}

/**
 * 格式化收藏列表
 * @param favList
 * @param username
 * @param avatar
 * @return {*}
 */
function formatfavList(favList, username, avatar) {
    favList = JSON.parse(JSON.stringify(favList));

    return favList.map(item => {
        item.memberInfo = {
            username,
            avatar
        }
        item.createdAt = moment(item.createAt).format('YYYY-MM-DD HH:mm:ss');
        item.updatedAt = moment(item.updatedAt).format('YYYY-MM-DD HH:mm:ss');
        console.log(item.movieInfo);

        item.movieInfo = {
            movieName: item.movieInfo[0].movieName,
            movieImg: SiteConfig.MOIVE_IMG_PREFIX + item.movieInfo[0].movieImg
        };
        return item;
    })
}

/**
 *
 * @api {post} /member/favList 收藏列表接口
 * @apiName  favList
 * @apiGroup 会员管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的用户收藏列表接口，用于返回电影的列表信息，实现了分页，查询相关的功能。
 *
 * @apiPermission admin
 *
 * @apiParam {string} token 用户登录标识，必须
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
 * @apiSuccess (success-200) {Object[]} result.FavList 电影评论列表
 *
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 评论注册
 * HTTP/1.1 200 OK

 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  评论失败
 {
    "error_code": 1,
    "msg": "failure",
    "reason": "获取失败",
    "status": false,
    "error": "缺少 movieId ！"
}
 */
async function favList(req, res) {

    let {page = 1, size = 2, token = ''} = req.body;
    page = isNaN(page) ? 1 : parseInt(page);
    size = isNaN(size) ? 2 : parseInt(size);
    let offset = (page - 1) * size;


    try {
        const decoded = jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        const userId = decoded._id;
        const username = decoded.username;
        const avatar = decoded.avatar;

        // let favList = await FavModel.find({userId}).skip(offset).limit(size);
        let favList = await FavModel.aggregate([
            {
                $lookup: {
                    from: 'movies',
                    localField: 'movieId',
                    foreignField: '_id',
                    as: 'movieInfo',
                }
            },
            {
                $skip: offset
            },
            {
                $limit: size,
            }
        ]);

        let total = await FavModel.countDocuments();

        res.json({
            error_code: 0,
            msg: 'success',
            reason: '成功请求',
            status: true,
            result: {
                total,
                size,
                currentPage: page,
                totalPage: Math.ceil(total / size),
                favList: formatfavList(favList, username, avatar),
            }
        });
    } catch (e) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '获取失败！' + e,
        });

    }
}

/**
 * 什么人(token)于什么时间对什么电影(movieId)评论了什么内容(content)
 * @param req
 * @param res
 * @return {Promise<void>}
 */

/**
 *
 * @api {post} /member/commentAdd 评论添加接口
 * @apiName  memberCommentAdd
 * @apiGroup 会员管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的电影评论接口。
 *
 * @apiPermission admin
 *
 * @apiParam {string} movieId 待电影的主键id，必须
 * @apiParam {string} token 登录的令牌，必须
 * @apiParam {string} content 评论内容，必须
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {Object[]} result.commentInfo 评论信息
 *
 *
 * @apiSuccessExample {json} 评论成功-示例:
 * 评论成功
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "评论成功",
    "status": true,
    "result": {
        "commentInfo": {
            "_id": "5deb755b31632a19bcf4d55e",
            "userId": "5deb641048984927b82c25f1",
            "movieId": "5de60a6469bef210e48c783c",
            "content": "电影非常的不错电影非常的不错电影非常的不错电影非常的不错电影非常的不错，值得观看！",
            "createdAt": "2019-12-07T09:48:11.491Z",
            "updatedAt": "2019-12-07T09:48:11.491Z",
            "__v": 0
        }
    }
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  评论失败
 {
    "error_code": 1,
    "msg": "failure",
    "reason": "评论失败",
    "status": false,
    "error": "评论内容不能为空！"
}
 *
 */
async function commentAdd(req, res) {

    let {movieId = '', token = '', content = ''} = req.body;

    try {
        const decoded = jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        const userId = decoded._id;
        // xss 过滤
        if (!content.trim()) {
            res.json({
                error_code: 1,
                msg: 'failure',
                reason: '评论失败',
                status: false,
                error: '评论内容不能为空！',
            });
        }

        // 检测待评论的电影是否存在，如果不存在，则抛出异常
        await MovieModel.findById(movieId);

        // 存在 入库 评论表
        const comment = new CommentModel({
            userId,
            movieId,
            content
        });

        try {
            let commentInfo = await comment.save();
            res.json({
                error_code: 0,
                msg: 'success',
                reason: '评论成功',
                status: true,
                result: {
                    commentInfo
                }
            });

        } catch (e) {
            res.json({
                error_code: 1,
                msg: 'failure',
                reason: '评论失败',
                status: false,
                error: '评论失败！' + e,
            });
        }

    } catch (e) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '收藏失败！' + e,
        });

    }

}

/**
 * 格式化评论信息
 * @param commentList
 * @param username
 * @param avatar
 * @return {*}
 */
async function formatCommentList(commentList, username, avatar) {
    commentList = JSON.parse(JSON.stringify(commentList));

    for (let i = 0; i < commentList.length; i++) {
        let u = await MemberModel.findById(commentList[i].userId);
        commentList[i]['memberInfo'] ={
            username: u.username,
            avatar: SiteConfig.MEMBER_AVTAR_PREFIX + u.avatar,
        };
        commentList[i].createdAt = moment(commentList[i].createdAt).format('YYYY-MM-DD HH:mm:ss');
        delete commentList[i].updatedAt;

    }

    return commentList;


}

/**
 *
 * @api {get} /member/commentList 评论列表接口
 * @apiName  commentList
 * @apiGroup 会员管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的电影评论列表接口，用于返回电影的列表信息，实现了分页，查询相关的功能。
 *
 * @apiPermission admin
 *
 * @apiParam {string} token 用户登录标识，必须
 * @apiParam {int} page 页码，默认值为 1， 非必须
 * @apiParam {int} size 每页显示的数量，默认值为 2，非必须
 * @apiParam {string} movieId 电影的主键id
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
 * @apiSuccess (success-200) {Object[]} result.commentList 电影评论列表
 * @apiSuccess (success-200) {Object[]} result.commentList.content 评论内容
 * @apiSuccess (success-200) {Object[]} result.commentList.memberInfo 评论人信息
 *
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 评论注册
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "成功请求",
    "status": true,
    "result": {
        "total": 3,
        "size": 2,
        "currentPage": 1,
        "totalPage": 2,
        "commentList": [
            {
                "_id": "5deb753f31632a19bcf4d55d",
                "userId": "5deb641048984927b82c25f1",
                "movieId": "5de60a6469bef210e48c783c",
                "content": "电影非常的不错，值得观看！",
                "createdAt": "2019-12-07T09:47:43.069Z",
                "updatedAt": "2019-12-07T09:47:43.069Z",
                "__v": 0,
                "memberInfo": {
                    "username": "liyang",
                    "avatar": "http://localhost:9090/images/default.jpg"
                }
            },
            {
                "_id": "5deb755b31632a19bcf4d55e",
                "userId": "5deb641048984927b82c25f1",
                "movieId": "5de60a6469bef210e48c783c",
                "content": "电影非常的不错电影非常的不错电影非常的不错电影非常的不错电影非常的不错，值得观看！",
                "createdAt": "2019-12-07T09:48:11.491Z",
                "updatedAt": "2019-12-07T09:48:11.491Z",
                "__v": 0,
                "memberInfo": {
                    "username": "liyang",
                    "avatar": "http://localhost:9090/images/default.jpg"
                }
            }
        ]
    }
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  评论失败
 {
    "error_code": 1,
    "msg": "failure",
    "reason": "获取失败",
    "status": false,
    "error": "缺少 movieId ！"
}
 */
async function commentList(req, res) {

    let {page = 1, size = 2, movieId = ''} = req.query;
    page = isNaN(page) ? 1 : parseInt(page);
    size = isNaN(size) ? 2 : parseInt(size);
    let offset = (page - 1) * size;

    if (!movieId.trim()) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '获取失败',
            status: false,
            error: '缺少 movieId ！',
        });
    }


    try {

        let commentList = await CommentModel.find({movieId}).sort({createdAt: -1}).skip(offset).limit(size);

        let total = await CommentModel.countDocuments();

        res.json({
            error_code: 0,
            msg: 'success',
            reason: '成功请求',
            status: true,
            result: {
                total,
                size,
                currentPage: page,
                totalPage: Math.ceil(total / size),
                commentList: await formatCommentList(commentList),
            }
        });
    } catch (e) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '获取失败！' + e,
        });

    }
}



/**
 *
 * @api {post} /member/pvAdd pv增加接口
 * @apiName  pvAdd
 * @apiGroup 会员管理接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的增加电影阅读量的接口！
 *
 * @apiPermission admin
 *
 * @apiParam {string} token 用户登录标识，必须
 * @apiParam {string} movieId 电影ID，必须
 *
 * @apiSuccess (success-200) {String} error_code 响应状态码
 * @apiSuccess (success-200) {String} msg 响应英文描述
 * @apiSuccess (success-200) {String} reason 响应中文描述
 * @apiSuccess (success-200) {Boolean} status 响应结果状态
 * @apiSuccess (success-200) {Object} result 返回数据，成功的时候才存在
 * @apiSuccess (success-200) {int} result.movieInfo  记录总数
 * @apiSuccess (success-200) {Object[]} result.movieInfo.pv 最新pv值
 * @apiSuccess (success-200) {Object[]} result.movieInfo.movieId 电影id
 *
 *
 * @apiSuccessExample {json} 成功注册-示例:
 * 评论注册
 * HTTP/1.1 200 OK
 {
    "error_code": 0,
    "msg": "success",
    "reason": "处理成功",
    "status": true,
    "result": {
        "movieInfo": {
            "pv": 1235,
            "movieId": "5dec7149ecba3421207b1808"
        }
    }
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  评论失败
 {
    "error_code": 1,
    "msg": "failure",
    "reason": "获取失败",
    "status": false,
    "error": "缺少 movieId ！"
}
 */
async function pvAdd(req, res) {

    let {movieId = '', token = '' } = req.body;

    try {
        const decoded = jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        const userId = decoded._id;

        let movieInfo = await MovieModel.findByIdAndUpdate({_id: movieId}, {$inc: {"pv": 1}});

        res.json({
            error_code: 0,
            msg: 'success',
            reason: '处理成功',
            status: true,
            result: {
                movieInfo: {
                    pv: movieInfo.pv + 1,
                    movieId
                },
            }
        });


    } catch (e) {
    res.json({
        error_code: 1,
        msg: 'failure',
        reason: 'pv add 失败',
        status: false,
        error: 'pv add 失败！' + e,
    });

    }

}

module.exports = {
    register,
    login,
    favAdd,
    favRemove,
    favList,
    commentAdd,
    commentList,
    pvAdd,

}