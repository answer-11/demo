const MovieModel = require('../../models/MovieModel');
const CartModel = require('../../models/CartModel');
const SiteConfig = require('../../config/site.js')

const jwt = require('jsonwebtoken');

/**
 * 先做登录购物车；需要的参数列表
 * 只支持一个一个的存储，不支持匹配的购物车的添加
 * 1. 商品id movieId
 * 2. token
 */
async function add(req, res) {
    let {movieId = '', token = ''} = req.body;
    if (!movieId) {
        res.json({
            error_code: 1,
            msg: 'not found movieId',
            reason: '验证不通过',
            status: false,
            error: '请传递电影的主键id！',
        });

    }

    // 检测登录
    try {
        const decoded = jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        const userId = decoded._id;

        // 查看电影是否存在
        // let movieInfo = await MovieModel.find({_id: movieId}, {movieName: 1, price: 1});
        let movieInfo = await MovieModel.findById(movieId, {movieName: 1, price: 1});

        // 查找到就是一个对象，找不到 null
        if (!movieInfo) {
            res.json({
                error_code: 1,
                msg: 'not found movie',
                reason: '验证不通过',
                status: false,
                error: '该电影不存在！',
            });
        }


        // 存储在购物车里面 购物车模型
        /**
         * {
                "error_code": 0,
                "msg": "add cart success",
                "reason": "加入购物车成功",
                "status": true,
                "result": {
                    "cartInfo": {
                        "_id": "5df0a70e5c083d6e22ae0e82",
                        "movieId": "5deca15d55a2f01c30adf1fa",
                        "userId": "5decb253e587a11b8c5fa04c",
                        "createdAt": "2019-12-11T08:21:34.646Z",
                        "updatedAt": "2019-12-11T08:21:34.646Z",
                        "__v": 0
                    }
                }
            }
         * @type {{movieId: string, userId: *}}
         *
         * 这里的写法是传统的关系型数据库的写法。
         *
         * 其实在 MongoDB非关系型数据库里面一般更多的是冗余写法。
         * 把所有的信息全部存储起来。而不是进行多表关联查询操作。
         */

            // 之前是否购物车里面是否有数据
        let cartData = await CartModel.find({userId});
        let cartInfo;
        let temp;
        if (cartData.length > 0) {
            // 1 之前已经有则追加到购物车里面
            await CartModel.update({userId}, {$push: {cartInfos: movieInfo}}); // $push 代表追加
            // 返回结果为 操作后的状态，不是数据

        } else {
            // 2 创建购物车
            temp = {
                userId,
                cartInfos: [movieInfo],
            }
            cartInfo = new CartModel(temp);
            cartInfo = await cartInfo.save();
        }
        cartInfo = await CartModel.find({userId}); // 返回最新的购物车里面的数据
        res.json({
            error_code: 0,
            msg: 'add cart success',
            reason: '加入购物车成功',
            status: true,
            result: {
                carts: cartInfo[0]
            }
        });
    } catch (e) {
        res.json({
            error_code: 1,
            msg: 'login failure',
            reason: '验证不通过',
            status: false,
            error: '请登录后在操作！',
        });
    }

}

// 购物车列表
async function list(req, res){
    let { token = '' } = req.body;

    try {
        const decoded = jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        const userId = decoded._id;
        // 获取当前用户购物车里面的所有的商品信息
        cartsData = await CartModel.find({userId});

        res.json({
            error_code: 0,
            msg: 'get cart lists success',
            reason: '成功获取购物车列表',
            status: true,
            result: {
                cartsData
            }
        });

    }catch (e) {
        res.json({
            error_code: 1,
            msg: 'login failure',
            reason: '验证不通过',
            status: false,
            error: '请登录后在操作！',
        });
    }



}

module.exports = {
    add,
    list,

}