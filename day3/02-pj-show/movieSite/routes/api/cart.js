var express = require('express')
var router = express.Router()
const CartController = require('../../controllers/api/CartController');


router.post('/cart/add',CartController.add);

router.post('/cart/list',CartController.list);

module.exports = router