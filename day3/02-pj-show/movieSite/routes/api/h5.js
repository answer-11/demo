var express = require('express')
var router = express.Router()
const tenpay = require('tenpay');
const path = require('path');

const H5Controller = require('../../controllers/api/H5Controller');

/**
 * 1.下单接口
 * https://h5.woaikaifa.com/api/v1/h5/buy
 */
const SiteConfig = require('../../config/site.js');
const H5PayConfig = require('../../config/h5.js');


// 只是完成了自己商场里面的 订单生成
const config = {
    appid: H5PayConfig.appid, // 服务号 APPID
    mchid: H5PayConfig.mchid, // 商户 ID
    partnerKey: H5PayConfig.partnerKey, // 商户秘钥
    pfx: require('fs').readFileSync(path.join(__dirname, 'apiclient_cert.p12')),
    // 证书文件
    notify_url: SiteConfig.PAYMENT_NOTIFY_URL,
    // 在用户成功支付后，微信后台通知商户修改订单的操作
    spbill_create_ip: '120.24.68.240'
};
const api = new tenpay(config, true);

router.post('/h5/buy', H5Controller.buy.bind(null, api));

// 微信服务器的通知信息
router.post('/h5/notify', api.middlewareForExpress('pay'), H5Controller.notify.bind(null, api));

// 展示支付后的引导页面
router.get('/h5/check', H5Controller.check);

//查看接口引导用户检测支付状态的页面 需要传递查询的订单号
router.post('/h5/findOrder', H5Controller.findOrder.bind(null, api));

// 支付过程中，遇到了问题，去客户系统进行对接
router.get('/h5/chat', H5Controller.chat);

router.post('/h5/orders', H5Controller.orders);


module.exports = router
