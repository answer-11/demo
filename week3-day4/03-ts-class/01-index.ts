// 类的三大特性
// 抽象、继承、封装、多态

class Peopel{
    // 2.this下面的都是属性 需要事先在类里面定义好
    name:string;
    age:number;
    //1.ts里面 类的构造函数是不需要做类型约束的 
    constructor(name:string,age:number){
        this.name = name,
        this.age= age
    }
    say(word:string){
        console.log(this.name + "say" + word)
    }
}
var p1 = new Peopel("andy",12)
console.log(p1) 
console.log(p1.name)
console.log(p1.age)
p1.say('hi')