var moment = require("moment")
//日期格式化
// console.log(moment().format('yyyy-MM-DD HH:mm:ss a'));
// console.log(moment().format('YYYY-MM-DD HH:mm:ss a'));
//相对时间 
// console.log(moment("20111031", "YYYYMMDD").fromNow())
// console.log(moment("19:39").startOf('hour').fromNow())
//日历时间
// console.log(moment().subtract(10, 'days').calendar())
// localStorage.setItem(a)
var a = moment().format('yyyy-MM-DD HH:mm:ss a');
// console.log(a)


// console.log(moment("20111111", "YYYYMMDD").fromNow()) // 9 年前
// console.log(moment("20120620", "YYYYMMDD").fromNow()) // 8 年前
// console.log(moment().startOf('day').fromNow());        // 19 小时前
// console.log(moment().endOf('day').fromNow());          // 5 小时内
// console.log(moment().startOf('hour').fromNow());       //29分钟前
// console.log()



let timestamp = 1602228808; // 前端里面时间的处理，一般都是毫秒做单位
console.log('timestamp', moment(1602228808 * 1000).format('YYYY-MM-DD HH:mm:ss'))

