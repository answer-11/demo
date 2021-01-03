"use strict";
// 复合数据类型  1.数组 2.对象 3.元祖 4.函数
// js数组里面元素的类型可以不完全一致 但在强类型语言里面 数组是数据一类的集合 必须严格一致
var arr = [1, 23, 312, 3, "andy"];
console.log(arr);
// 约束数组的元素的类型
var arr1 = [1, 33, 321, 77];
// 约束数组的元素的类型为字符串
var arr2 = ["aa", "dada", "qiqi"];
var arr2 = ["aa", "dada", "qiqi"];
// 约束数组的元素类型为boolean
// Array<数据类型>
// 方式一
var arr3 = [true, false, true];
// 方式二
var arr3 = [true, true, false];
// 不确定数组的有多种类型 怎么用数组的方式去描述一个人的信息
// 用户名 审身高 年龄 是否成年
// 数组是有序的 下标获取对应的位置的元素
var arr4 = ['李阳', '60kg', '170cm', '26'];
console.log(arr4[0]);
console.log(arr4[3]);
