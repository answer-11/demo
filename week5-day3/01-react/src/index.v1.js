import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import ShowComponent from './components/ShowComponent/indexs'
// import reportWebVitals from './reportWebVitals';
// 后端防止xss攻击 引入dls-htmlparser
// import HtmlParser from "dls-htmlparser"
// HtmlParser.html_parse(str);

// 函数式组件 首字母必须大写
// function ShowComponent(){
//   return(
//     <div>
//         <p>我等哈</p>
//         <h1>大家调度</h1>
//     </div>
//   )
// }
// 富文本编辑器(ueditor)
// 普通文本编辑器（网站的评论框）

// 函数式组件使用方式 ：1.函数调用式 2.标签调用式（标签内没有内容 可以用单标签调用）
ReactDOM.render(
    // <App />,
    // ShowComponent(),
    // <ShowComponent></ShowComponent>,
    // <ShowComponent title="大帅哥" number={1}/>,
    <ShowComponent>双标签的使用</ShowComponent>,
  document.getElementById('root')
);

