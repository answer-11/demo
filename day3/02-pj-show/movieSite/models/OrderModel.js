const mongoose = require('../db/index.js');

// 1. 定义 Schema 定义表的字段
// 订单号，订单的总金额，订单日期，下单人，下单手机号码，收货地址
// 订单号：年月日时分秒_随机数
const OrderSchema = mongoose.Schema({
    tradeNumber: {
        type: String, // 代表是字符串类型
        require: true, // 代表字段必须
        maxlength: [150, '长度不能超过150个字符'], //代表最大的长度
        minlength: [10, '长度不能小于10个字符'], // 最小的长度
    },
    // 此次订单的金额，单位为分
    totalPrice: {
        type: Number,
    },
    // 代表此次的订单的支付的状态，默认为 false，代表没有支付，在用户成功支付后，微信服务器通过 notify_url 地址进行通知后，需要去更改订单的状态为 true
    payStatus: {
      type: Boolean,
      default: false
    },
    // 下单人
    userId: {
        type: mongoose.Types.ObjectId,
    },

}, {timestamps: true});

const OrderModel = mongoose.model('OrderModel', OrderSchema, 'orders');

// 3. 导出模型
module.exports = OrderModel;