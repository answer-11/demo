var express = require('express');
var Mock = require('mockjs')
var Random = Mock.Random;
var router = express.Router();

const rs = [];

for (let i = 0; i < 10; i++) {
    var tmp = Mock.mock({
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id': i + 1,
        'goodsName': Random.word(3, 5),
        'goodsImage': Random.image('100x100', '#ffcc33', '#FFF', 'png', 'goods'),
        'descption': Random.word(10, 15),
        'goodsNumber': parseInt(Math.random() * 100),
        'goodsPrice': +(Math.random() * 100).toFixed(2),
        'isSelected': Math.random() > 0.5 ? true : false,
        'username': Random.cname(),
        'address': Random.county(true),
        'email': Random.email('163.com'),
        'zip': Random.zip(),
    })
    rs.push(tmp);

}



/* GET users listing. */
router.get('/list', function(req, res, next) {
  // res.send('cart list')
  res.send(JSON.stringify({
    error_code:0,
    reason:'成功返回',
    result:{
      data:rs
    }
  }))
});

module.exports = router;
