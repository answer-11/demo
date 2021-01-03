const mongoose = require('../db/index.js');

// 1. 定义 Schema 定义表的字段
const MemberSchema = mongoose.Schema({
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
        default: 'default.jpg', // 设置默认值 默认是卡通的占位符 icon
    },
    markup: {
        type: String,
        default: '', // 设置默认值
        maxlength: [300, '长度不能超过300个字符'], //代表最大的长度
    }


}, {
    timestamps: true,
    // 代表开启 mongoose的自动时间处理机制，自动在每条记录里面增加一个 createAt updateAt
});

const MemberModel = mongoose.model('MemberModel', MemberSchema, 'members');

// 3. 导出模型
module.exports = MemberModel;