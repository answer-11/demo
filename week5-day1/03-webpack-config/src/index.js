// Es6代码 --->webpack ---> es5
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
