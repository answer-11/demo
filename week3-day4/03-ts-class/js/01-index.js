"use strict";
// 类的三大特性
// 抽象、继承、封装、多态
// 构造函数是不需要类型约束的
var Peopel = /** @class */ (function () {
    function Peopel(name, age) {
        this.name = name,
            this.age = age;
    }
    Peopel.prototype.say = function (word) {
        console.log(this.name + "say" + word);
    };
    return Peopel;
}());
var p1 = new Peopel("andy", 12);
console.log(p1);
console.log(p1.name);
console.log(p1.age);
p1.say('hi');
