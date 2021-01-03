"use strict";
var username = "andy";
// username = 1 //错误
console.log(username);
// tsc --init  初始化一个json文件
// tsc --build tsconfig.json  执行文件  当类型数据错误时 不编译成js文件
// onEmitOnError:true   写入json文件中 当类型错误时 不编译
var fn = function (a, b) {
    return a + b;
};
var result = fn(10, 20);
// var result = fn("andy",10)
console.log(result);
// "outDir": "./js",            //js与ts放在一起不好观看与维护 所以我们把编译后的js文件放入新建js文件中
// Ts 基本数据类型：1.string 2.number 3.boolean 4.null(只能赋值null) 5.undefined（只能赋值undefined） 6.void
// null和undefined是任意类型的子类型 
var userInfo; //联合类型
userInfo = "andy";
userInfo = null;
userInfo = undefined;
console.log(userInfo);
