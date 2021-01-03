const mongoose = require('../db/index.js');

// 1. 定义 Schema 定义表的字段
const MovieSchema = mongoose.Schema({
    movieName: {
        type: String, // 代表是字符串类型
        require: true, // 代表字段必须
        // 还可以定义其他的验证规则
        maxlength: [50, '长度不能超过50个字符'], //代表最大的长度
        minlength: [2, '长度不能小于2个字符'], // 最小的长度
    },
    // 阅读量
    pv: {
      type: Number,
      default: 100,
    },
    // 是否收费
    isVip: {
        type: Number,
        default: 0,
    },
    // 网盘url地址
    loadUrl: {
        type: String,
        require: true,
        maxlength: [200, '长度不能超过200个字符'], //代表最大的长度
        minlength: [2, '长度不能小于2个字符'], // 最小的长度
    },
    // 电影单价
    price: {
        type: Number,
        default: 0,
    },

    // 网盘提取码
    secret: {
        type: String,
        require: true,
        maxlength: [8, '长度不能超过8个字符'], //代表最大的长度
        minlength: [2, '长度不能小于2个字符'], // 最小的长度
    },

    movieImg: String, // 电影的图片信息

    bianju: {
        type: String, // 代表是字符串类型
        require: true, // 代表字段必须
        // 还可以定义其他的验证规则
        maxlength: [50, '长度不能超过50个字符'], //代表最大的长度
        minlength:  [2, '长度不能小于2个字符'], // 最小的长度
    },
    actors: {
        type: String, // 代表是字符串类型
        require: true, // 代表字段必须
        // 还可以定义其他的验证规则
        maxlength:  [350, '长度不能超过350个字符'], //代表最大的长度
        minlength:  [2, '长度不能小于2个字符'], // 最小的长度
    },
    director: {
        type: String, // 代表是字符串类型
        require: true, // 代表字段必须
        // 还可以定义其他的验证规则
        maxlength: [50, '长度不能超过50个字符'], //代表最大的长度
        minlength: [2, '长度不能小于2个字符'], // 最小的长度
    },
    cateId: {
        type: mongoose.Types.ObjectId, // 这个是 category表里面的主键id
    },
    descp: {
        type: String, // 代表是字符串类型
        require: true, // 代表字段必须
        // 还可以定义其他的验证规则
        maxlength: [1000, '长度不能超过1000个字符'], //代表最大的长度
        minlength: [2, '长度不能小于2个字符'], // 最小的长度
    },
}, {timestamps: true});

const MovieModel = mongoose.model('MovieModel', MovieSchema, 'movies');

// 3. 导出模型
module.exports = MovieModel;