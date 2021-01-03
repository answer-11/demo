// 使用 Mock
var Mock = require('mockjs')
var Random = Mock.Random
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'cartList|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))


// cartList: [
//     {
//         id: 1,
//         goodsName: 'xxx衣服',
//         goodsImage: 'images/cart_goods1.jpg',
//         description: '这件衣服很好看',
//         goodsNumber: 10,
//         goodsPrice: 199,
//         isSelected: false
//     }
// ]

var arr =[];

for(var i = 0;i < 10;i++){
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'cartList|1': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id': i+1,
            'goodsName':Random.cparagraph( 1,5 ),
            'goodsImage':Random.image('200x100', '#02adea', 'Hello'),
            'description':Random.cparagraph( 1,5 ),
            'goodsNumber':Math.random()*100,
            'goodsPrice':Math.random()*299,
            'isSelected':Math.random()>0.5 ? true:false,
            'address':Random.county(true),
            'zip':Random.zip(),
            'data':Random.datetime('yyyy-MM-dd HH:mm:ss'),
            'mail':Random.email('163.com')
        }]
    })
    arr.push(data)
}
console.log(arr)


