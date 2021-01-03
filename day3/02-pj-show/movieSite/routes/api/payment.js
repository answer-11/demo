var express = require('express');
var router = express.Router();

var fs = require('fs');
var randomstring = require("randomstring");
var urlencode = require('urlencode');
var path = require('path')

const tenpay = require('tenpay');

// 账号相关信息
const h5Config = require('../../config/h5.js');

const config = {
    appid: h5Config.appid,
    mchid: h5Config.mchid,
    partnerKey: h5Config.partnerKey,

    pfx: require('fs').readFileSync(path.join(__dirname, 'apiclient_cert.p12')),
    notify_url: 'https://h5.woaikaifa.com/api/v1/notify',
    spbill_create_ip: '120.24.68.240'

};
const api = new tenpay(config, true);

/**
 * 1. 商品购买页面
 */
router.get('/buy', async function (req, response) {

    response.send('buy page!');


})

/**
 * 2. 商品订单页面
 */
router.get('/pay/:movieId', async function (req, response) {

    var orderId = randomstring.generate(8);
    let rs = await api.unifiedOrder({
        out_trade_no: orderId,
        body: '商品-' + req.params.movieId,
        total_fee: 1, // 1 分钱
        trade_type: 'MWEB',
        product_id: 100000,
    });

    // 订单检查回调页面
    var checkUrl = urlencode( 'https://h5.woaikaifa.com/api/v1/check?orderId=' + orderId );
    response.json({payUrl: rs['mweb_url'] + '&redirect_url='+ checkUrl, orderId } );

})

/**
 * 3. 中间件・微信消息通知
 * 当用户支付成功后，微信会向当前的url发起一个 post 请求，商户需要在该请求里面完成相关操作 例如：订单状态的修改
 *
 */
router.post('/notify', api.middlewareForExpress('pay'), (req, res) => {
    let info = req.weixin;

    fs.writeFileSync('./success.txt', JSON.stringify( info ));

    res.reply('');
});


/**
 * 4. 支付后，用户自定义的回调页面
 * 1.需对redirect_url进行urlencode处理
 * 2.由于设置redirect_url后,回跳指定页面的操作可能发生在：1,微信支付中间页调起微信收银台后超过5秒 2,用户点击“取消支付“或支付完成后点“完成”按钮。因此无法保证页面回跳时，支付流程已结束，所以商户设置的redirect_url地址不能自动执行查单操作，应让用户去点击按钮触发查单操作。
 */
router.get('/check', async function(req, res, next) {
    var orderId = req.query.orderId;

    try {
        let result = await api.orderQuery({
            // transaction_id, out_trade_no 二选一
            // transaction_id: '微信的订单号',
            // 错误订单
            // out_trade_no: 'fGE4vBYudShM9DisopBrgpQ5jGC3abEo'
            // out_trade_no: 'eGE4vBYudShM9DisopBrgpQ5jGC3abEo'
            // 正常订单
            out_trade_no: orderId

        });
        console.log(result);
        if( result['return_code'] === 'SUCCESS' && result['trade_state'] === 'SUCCESS'){
            res.render('check', {...result, status: true, 'msg': '支付成功'});

        }else{
            throw new Error(result['trade_state_desc']);
        }


    }catch (e) {
        res.json( {status: false, msg: e.message});
    }


});

module.exports = router;
