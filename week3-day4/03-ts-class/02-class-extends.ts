// 类的三大特性
// 抽象、继承、封装、多态

class Peopel1{
    // 2.this下面的都是属性 需要事先在类里面定义好
    name:string;
    age:number;
    //1.ts里面 类的构造函数是不需要做类型约束的 
    constructor(name:string,age:number){
        this.name = name,
        this.age= age
    }
    // 定义方法
    say(word:string){
        console.log(this.name + "say" + word)
    }
}
//继承(重写)
class Man extends Peopel1{
    constructor(name:string,age:number){
        super(name,age)
    }
}
var p2 = new Man("andy",12)
console.log(p2.name)
console.log(p2.age)


// 我们的子类将父类的方法进行重写 导致了类同一个方法产生的行为不一样 则我们称之为
// 多态（多种形态） 1.重写完成多态  2.重载
class Woman extends Peopel1{
    constructor(name:string,age:number){
        super(name,age)
    }
}
var p2 = new Man("andy",12)
console.log(p2.name)