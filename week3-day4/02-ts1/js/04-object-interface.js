"use strict";
// interfacr翻译过来就是接口  一般在编程语言  interface是用来做约束
// 2.interface 这个语法特性只能在ts里面使用。 约束作用
// 3.一般建议 接口的标识符首字母大写的I.这个算是约定俗成
// 接口就是用来约束我们与代码里面的变量的规范
// interface 标识符 {定义类型}
var user1 = {
    id: 1,
    username: 'andy',
    age: 12,
    email: 'answer@163.com'
};
console.log(user1.username);
var userinfo2 = [
    {
        id: 1,
        username: 'andy',
        age: 12,
        email: 'answer@163.com'
    },
    {
        id: 2,
        username: 'andy',
        age: 12,
        email: 'answer@163.com'
    }
];
// console.log(user2.username)
// const userinfo2 =[];
