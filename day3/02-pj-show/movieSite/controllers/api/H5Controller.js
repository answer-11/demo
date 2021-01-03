const jwt = require('jsonwebtoken');
const moment = require('moment');
const randomstring = require("randomstring");
const md5 = require('md5');
const urlencode = require('urlencode');

const OrderModel = require('../../models/OrderModel');
const OrderItemModel = require('../../models/OrderItemModel');
const CartModel = require('../../models/CartModel');

const mongoose = require('mongoose');



const SiteConfig = require('../../config/site.js');
const H5PayConfig = require('../../config/h5.js');

const MovieModel = require('../../models/MovieModel');

/**
 * 下单
 * post + api/v1/h5/buy
 1. uid(登录) token
 2. movieId(后台查询)
 */

/**
 *
 * @api {post} /h5/buy 下单接口
 * @apiName  h5Buy
 * @apiGroup 电影下单接口
 *
 * @apiVersion 0.1.0
 * @apiDescription Xxx公司的电影下单接口。该接口为 H5 支付。
 *
 * @apiPermission admin
 *
 * @apiParam {array} movieId 待购买的电影主键id，必须
 * @apiParam {string} token 登录的令牌，必须
 * @apiParam {string} redirect_url 支付成功后的回跳url地址，需要在地址下，引导用户做查单操作 非必须
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
    "mweb_url": "https://wx.tenpay.com/cgi-bin/mmpayweb-bin/chexxmweb?prepay_id=wx1114384xx03a2d0bcesa481743000&package=3092903383&redirect_url=https%3A%2F%2Fh5.woaikaifa.com%2Fapi%2Fv1%2Fh5%2Fcheck%3FtradeNumber%3D64bc4263af2e5753176598bc6b5aacc0"
}
 *
 *  @apiError (failure-500) {String} code 响应状态码
 *  @apiError (failure-500) {String} msg 提示信息
 *
 *  @apiErrorExample {json} 失败-示例:
 *  失败
 {
    "error_code": 1,
    "msg": "failure",
    "reason": "验证不通过",
    "status": false,
    "error": "必须传递下单电影主键ID，下单失败！"
}
 *
 */
async function buy(api, req, res) {

    // 功能：完成订单入库
    // 0. 校验 token 必须登录之后才可以购买下单（才可以知道是谁下的单）
    // 1. 接收 movieId
    let {movieId = [], token = '', redirect_url = ''} = req.body;
    if (movieId.length <= 0) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '必须传递下单电影主键ID，下单失败！',
        });
    }
    // movieId = [movieId];


    // 校验购买的电影id是存在，且是需要付费
    for (let i = 0; i < movieId.length; i++) {

        // 2. 查询 movieId 是否存在
        const movieInfo = await MovieModel.findById(movieId[i]);
        // 还要判断这部电影是否是收费电影，以及收费的金额是多少

        if (movieInfo.length <= 0) {
            // 用户要买的电影资源不存在，前台随便构造不要，丢弃
            res.json({
                error_code: 1,
                msg: 'failure',
                reason: '验证不通过',
                status: false,
                error: '该电影不存在，下单失败！',
            });
        } else if (movieInfo.isVip != 1) {
            // 自己通过第三方的工具自己模拟下单
            res.json({
                error_code: 1,
                msg: 'failure',
                reason: '验证不通过',
                status: false,
                error: '免费电影不需要下单购买！',
            });
        }

    }

    try {
        const decoded = jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        const userId = decoded._id; // 等待用户id

        // 合法 存在 1. uid 2. 电影存在 生成订单，存储在商户自己的订单系统
        /**
         * 一般我们在做订单的时候，不会把所有的 购买信息加入到一张表：
         * 1. 订单表 1，保存订单的基本的信息，例如： 订单号，订单的总金额，订单日期，下单人，下单手机号码，收货地址
         * 2. 订单商品表 N，保存此次订单里面所有的商品信息，保存此次的订单交易号
         *
         * 有的时候下订单的时候，
         *  1. 不止只买一件商品
         *  2. 存储下单购买时候的价格（日后价格有可能变化，不能只存一个商品的id）
         *
         */
            // let totalPrice = movieInfo.price;
        let totalPrice = 1;
        let randStr = randomstring.generate();

        let tradeNumber = moment().format('YYYYMMDDHHmmss') + randStr;
        tradeNumber = md5(tradeNumber);
        // md5 32
        // 年月日时分秒_随机字符串
        let orderInfo = {
            userId,
            movieId,
            totalPrice,
            payStatus: false, // 代表还没支付
            tradeNumber,
        }

        // 生成订单基本信息
        let order = new OrderModel(orderInfo);
        order = await order.save();

        for (let i = 0; i < movieId.length; i++) {
            // 订单商品信息 对件商品
            let orderItemInfo = {
                tradeNumber,
                movieId: movieId[i],
                price: 1,
            }
            let itemInfo = new OrderItemModel(orderItemInfo);
            itemInfo = await itemInfo.save();
        }


        let response = await api.unifiedOrder({
            out_trade_no: tradeNumber,
            body: '此次是 h5支付的测试',
            total_fee: totalPrice,
            trade_type: 'MWEB', // H5支付模式
            product_id: md5(movieId.join(''))
        });
        let redirectUrl;
        if (!redirect_url) {
            // 未传递回调地址，则以自己的为准
            redirectUrl = 'https://h5.woaikaifa.com/api/v1/h5/check?tradeNumber=' + tradeNumber;
        } else {
            redirectUrl = redirect_url;
        }
        redirectUrl = urlencode(redirectUrl);
        // 需对redirect_url进行 urlencode 处理
        let mweb_url = response['mweb_url'] + '&redirect_url=' + redirectUrl;
        res.json({mweb_url});
        // 可以唤起微信支付的url地址

    } catch (e) {
        res.json({
            error_code: 1,
            msg: 'failure',
            reason: '验证不通过',
            status: false,
            error: '请登录后进行下单！' + e,
        });

    }


}

/**
 * https://h5.woaikaifa.com/api/v1/h5/notify
 * @param req
 * @param res
 */
async function notify(api, req, res) {
    let info = req.weixin;

    if (info.result_code === 'SUCCESS' && info.return_code === 'SUCCESS') {
        // 手工查看一下单号是否成
        let {out_trade_no} = info;

        // 调用微信的查单的接口获取信息
        let orderResult = await api.orderQuery({
            out_trade_no
        });
        if (orderResult.return_code === 'SUCCESS' && orderResult.trade_state === 'SUCCESS' && orderResult.result_code === 'SUCCESS') {
            // 用户支付成功，修改订单的状态为 true
            try {
                let orderInfo = await OrderModel.updateOne({tradeNumber: out_trade_no}, {$set: {payStatus: true}});

                // 把当前用户购物车里面的所有的商品清空
                await CartModel.remove({userId});


                res.reply('');
                // 没有错误回复微信服务器 回复为，不然微信服务器周期性的请求我们的通知接口 1s 5s 10s 15s
            } catch (e) {
                // 日志记录
                // throw e;
                res.reply('查询失败'); // 微信支付官方需要

            }

        }


    } else {
        res.reply('查询失败'); // 微信支付官方需要
    }
}

/**
 *  get https://h5.woaikaifa.com/api/v1/h5/check
 * @param req
 * @param res
 */
async function check(req, res) {
    let {tradeNumber = ''} = req.query;

    // 返回一个引导页面，提示用户 1 支付成功，点击可以当前支付状态 2. 支付失败，遇到问题，练习客服
    res.render('orderCheck', {tradeNumber});
}

/**
 * 真正的查单接口
 * @param api
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function findOrder(api, req, res) {
    // 引导用户做订单支付状态查询。
    let {tradeNumber = '', token = ''} = req.body;

    if (!tradeNumber) {
        res.json({
            error_code: 1,
            msg: 'not found tradeNumber',
            reason: '验证不通过',
            status: false,
            error: '请传递查询订单号！',
        });
    }
    // 判断是否登录
    try {
        const decoded = jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        const userId = decoded._id;
        // 数据库校验一下订单号是否和当前用户的匹配 研究订单生成规律
        let orderInfo = await OrderModel.find({tradeNumber, userId});
        if (orderInfo.length <= 0) {
            // 肯定搞破坏
            res.json({
                error_code: 1,
                msg: 'not found tradeNumber',
                reason: '验证不通过',
                status: false,
                error: '不要捣乱！',
            });

        }

        // 调用微信的查单的接口获取信息
        let orderResult = await api.orderQuery({
            out_trade_no: tradeNumber
        });
        console.log('orderResult', orderResult);
        res.json({
            error_code: 0,
            msg: 'find success',
            reason: '查询成功',
            status: true,
            result: {
                orderResult
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

/**
 * 客服系统
 * @param req
 * @param res
 */
function chat(req, res) {

    res.render('chat');
}


async function orders(req, res) {
    // 引导用户做订单支付状态查询。
    let {tradeNumber = '', token = ''} = req.body;

    if (!tradeNumber) {
        res.json({
            error_code: 1,
            msg: 'not found tradeNumber',
            reason: '验证不通过',
            status: false,
            error: '请传递查询订单号！',
        });
    }
    // 判断是否登录
    try {
        const decoded = jwt.verify(token, SiteConfig.MEMBER_TOKEN_SALT);
        const userId = decoded._id;
        // 数据库校验一下订单号是否和当前用户的匹配 研究订单生成规律
        let orderInfo = await OrderModel.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId),
                    tradeNumber,
                }
            },

            {
                $lookup: {
                    from: "orderItems",
                    localField: "tradeNumber",
                    foreignField: "tradeNumber",
                    as: "itemInfos"
                }
            },

        ])

        if (orderInfo.length <= 0) {
            res.json({
                error_code: 1,
                msg: 'not found tradeNumber',
                reason: '验证不通过',
                status: false,
                error: '不要捣乱！',
            });
            return;

        }

        res.json({
            error_code: 0,
            msg: 'find success',
            reason: '查询成功',
            status: true,
            result: {
                orderInfo
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

module.exports = {
    buy,
    notify,
    check,
    findOrder,
    chat,
    orders

}