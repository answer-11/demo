// 对象 key:value 键值对的无序集合 在其他编程语言里 把js里面的字面里对象叫做map（映射）或者hash(哈希)
// {
//     id:1,
//     username:"andy"
// }

// js里面使用对象方式 1.json字面里对象 2.构造函数对象  3.类的实例对象
// 对象的方式可以做到见名知意

// 隐式推导对象  对象格式
// interface 翻译过来叫做 接口 
var object :{
    id:number,
    username:string,
    age:number,
    email:string
}= {         //不具有通用性
    id:1,
    username:'andy',
    age:12,
    email:'answer@163.com'
}
console.log(object.username)
// object.id = "12";