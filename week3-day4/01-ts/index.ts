// nodejs 是可以执行ts文件里面只有纯js的代码 如果该ts文件里面包含了ts语法代码，是没办法直接执行
// 需要把ts转换为js代码
var username = "andy";//如果没有给变量进行类型声明 进行类型的推导 根据变量的初始值来推测变量的类型
var age = 11;

// var fn = function(a,b){
//     return a + b
// }
// var num = fn(10,20)
// console.log(num)

// ts标识符的类型 ：1.string(字符串) 2.number(数字,整数，浮点数) 3.boolean(布尔值)

// 常量的后面增加 ：标识符，代表是声明常量的时候 对常量的类型进行约束，代表该常量
// 只能存放该标识符类型的数据
const nexf : number = 1 //现在声明了一个hello字符串类型常量 该常量只能存放字符串类型的数据
console.log(nexf)