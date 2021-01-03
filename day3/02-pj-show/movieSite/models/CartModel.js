const mongoose = require('../db/index.js');

// 1. 定义 Schema 定义表的字段
// 订单号，订单的总金额，订单日期，下单人，下单手机号码，收货地址
// 订单号：年月日时分秒_随机数
const CartSchema = mongoose.Schema({

    userId: {
        type: mongoose.Types.ObjectId,
    },

    cartInfos: {
        type: Array,
    },

}, {timestamps: true});

const CartModel = mongoose.model('CartModel', CartSchema, 'carts');

// 3. 导出模型
module.exports = CartModel;