// 1.引入react核心提 提供诸如组件化的概念 还有虚拟DOM
import React from 'react';
//2.把虚拟DOM转为真实DOM 插入到页面document.createElement()---> index.html
import ReactDOM from 'react-dom';
// 3.引入css文件（webpack-css-loader）
import './index.css';
// 4.引入App.js文件（这个文件里面提供了react里面的组件）组件就是用户自己封装的HTML标签
import App from './App';
const reactDOM = React.createElement('div',null,"我是另一个div")
const reactVirtoalDOM = React.createElement('div',{className:'box','data-id':1},'我是div',reactDOM)
let title = 'hi hello'
let age = 16
let jsxElement = (
    <div>
        <h1>标题-{title}</h1><p>副标题</p>
        <p>{age > 18 ? '成年' : '未成年'}</p>
    </div>
)
// let arr =[1,2,3]
// let arr1 = (
//   <div>
//       <p>{arr[0]}</p>
//       <p>{arr[1]}</p>
//   </div>
// )
let list =[
  {name:'abc',age:12},
  {name:'ccc',age:23}
]
// let alist = (
//   <div>
//      {/* <p>{list[0]["name"]}</p> */}
//        {/* <p>{list[1].age}</p> */}
//          { list.map(item=>{
//            console.log(item)
//             return(
//               <ul>
//                 <li>{item.name}</li>
//                 <li>{item.age}</li>
//                 {/* <li></li> */}
//               </ul>
//             )
//           })
//         }
//    </div>
// )
let abc =(
  <div>
    {list.map(item=>{
  return(
    <ul>
      <li>{item.name}</li>
      <li>{item.age}</li>
      {/* <li></li> */}
    </ul>
  )
})}
  </div>
)

// 二位数组的遍历循环

// ReactDOM.render(
//   // 严格模式
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
 ReactDOM.render(
  // jsxElement,
  // arr1,
  abc,
  // alist,
  // <App/>
  // reactDOM,
  // reactVirtoalDOM,
document.getElementById('root')
)


// reportWebVitals();
