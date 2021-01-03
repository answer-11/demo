// Es6代码 --->webpack ---> es5
// 在命令行使用的命令参数比较麻烦 记不住
// 输出文件名称是否可以更换
let name = 'andy';
class People{
    constructor(name){
        this.name = name
    }
    say(){
        console.log(this)
        console.log(this.name)
    }
}
console.log(name)
const p1 = new People('susan')
p1.say()
