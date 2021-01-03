const mongoose = require('../db/index.js');

// 1. 定义 Schema 定义表的字段
const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        maxlength: [10, '长度不能超过10个字符'], //代表最大的长度
        minlength: [2, '长度不能小于2个字符'], // 最小的长度
    },
    password: {
        type: String,
        require: true,
        maxlength: [300, '长度不能超过300个字符'], //代表最大的长度
        minlength: [4, '长度不能小于4个字符'], // 最小的长度
    },
    avatar: {
        type: String,
        default: '', // 设置默认值 默认是卡通的占位符 icon
        maxlength: [100, '长度不能超过100个字符'], //代表最大的长度
    },
    markup: {
        type: String,
        default: '', // 设置默认值
        maxlength: [300, '长度不能超过300个字符'], //代表最大的长度
    },


});

const AdminModel = mongoose.model('AdminModel', AdminSchema, 'admins');

// 3. 导出模型
module.exports = AdminModel;