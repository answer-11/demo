const mongoose = require('../db/index.js');

// 1. 定义 Schema 定义表的字段
// 订单号，订单的总金额，订单日期，下单人，下单手机号码，收货地址
// 订单号：年月日时分秒_随机数
// 订单商品表 N，保存此次订单里面所有的商品信息，保存此次的订单交易号
const OrderItemSchema = mongoose.Schema({
    tradeNumber: {
        type: String, // 代表是字符串类型
        require: true, // 代表字段必须
        maxlength: [150, '长度不能超过150个字符'], //代表最大的长度
        minlength: [10, '长度不能小于10个字符'], // 最小的长度
    },
    // 此次订单的金额，单位为分
    movieId: {
        type:  mongoose.Types.ObjectId,
    },
    // 单价
    price: {
        type: Number,
    },
    // 购买数量

}, {timestamps: true});

const OrderItemModel = mongoose.model('OrderItemModel', OrderItemSchema, 'orderItems');

// 3. 导出模型
module.exports = OrderItemModel;