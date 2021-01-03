const mongoose = require('../db/index.js');

// 1. 定义 Schema 定义表的字段
const CategorySchema = mongoose.Schema({
   cateName: {
       type: String, // 代表是字符串类型
       require: true, // 代表字段必须
   }
});

// 2. 定义模型 注意：model 存在三个参数，如果写了第三个参数，则就以这个作为实际的表名；如果不写，则以第一个参数的复数形式作为表名
const CategoryModel = mongoose.model('CategoryModel', CategorySchema, 'category');

// 3. 导出模型
module.exports = CategoryModel;