import React from 'react';
import ReactDOM from 'react-dom';
import ClassCompoent from './components/ClassComponents/index'
let title = "标题信息"
ReactDOM.render(
// 1.属性的默认值问题  2.属性的类型约束
   <ClassCompoent  number={1}>wowoowowowwowo</ClassCompoent>,
  //  用户传递了参数 所以为title的值 如果没传 则显示默认值
  document.getElementById('root')
);

