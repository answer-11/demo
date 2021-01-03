const mongoose = require('../db/index.js');

// 1. 定义 Schema 定义表的字段
const CommentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        require: true,
    },
    movieId: {
        type: mongoose.Types.ObjectId,
        require: true,
    },
    content: {
        type: String,
    }
}, {
    timestamps: true,
    // 代表开启 mongoose的自动时间处理机制，自动在每条记录里面增加一个 createAt updateAt
});

const CommentModel = mongoose.model('CommentModel', CommentSchema, 'comments');

// 3. 导出模型
module.exports = CommentModel;