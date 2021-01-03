// 隐式推导
// (params:number,params1:number)=>number 对后面函数的约束
// interface IType{
//     // 对象的约束 key:type
//     // 函数直接写约束即可，不需要key值
//     (params:number,params1:number):number
// }
// var add3 :IType = function(a:number,b:number):number{
//     return a+b
// }
// console.log(add3(10,20))
var add4 = function (a:number,b:number):number {
    return a + b
}
add4(20,2)

var add3 : (params:number,params1:number)=>number = function(a:number,b:number):number{
    return a+b
}
add3(10,19)




