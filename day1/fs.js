
const fs = require('fs');

function sendOne(){
    fs.readFile("./01 data/1.txt", 'utf-8', function(err,data){
        if(err){
            throw err;
            console.log(err,"数据错误")
        }else{
            console.log(data)
        }
        
    });
}
// console.log(sendOne().data)
function sendTwo(){
    fs.readFile("./01 data/2.txt", 'utf-8', function(err,data){
        if(err){
            throw err;
            console.log(err,"数据错误")
        }else{
            console.log(data)
        }
        
    });
}
function sendThree(){
    fs.readFile("./01 data/3.txt", 'utf-8', function(err,data){
        if(err){
            throw err;
            console.log(err,"数据错误")
        }else{
            console.log(data)
        }
        
    });
}
async function fun(){
   
    let one = await sendOne();
    // console.log(one)
    var two = await sendTwo()
    var three = await sendThree()
}
var p = fun()

// let content1 = fs.readFileSync("./01 data/1.txt",'utf8')
// console.log(content1)
// let content2 = fs.readFileSync("./01 data/2.txt",'utf8')
// console.log(content2)
// let content3 = fs.readFileSync("./01 data/3.txt",'utf8')
// console.log(content3)
// let content4 = fs.readFileSync("./01 data/4.txt",'utf8')

// content4 =content1.concat(content2,content3);
// console.log(content4)


