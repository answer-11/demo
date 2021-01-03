// 函数声明
// 最后面那个number表示 返回值类型必须为数字
 function add(a:number,b:number) :number{
    return a+b
}
console.log(add(12,23))
// 除了变量可以声明类型 函数的参数 函数的返回值都是可以进行类型的约束
// 函数参数以及返回值类型的约束是非常有意义的  绝大部分情况下会写很多的工具函数 或者第三方提供的函数库 函数是需要隐藏其内部的细节
// 给出输入 给予输出 事先写好函数调用文档。

// 在js里面没有返回值 默认返回undefined
// 在ts里面  void代表函数没有返回值
function res(a:number,b:number):void{

}
console.log(res(10,20))