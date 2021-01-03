import React ,{useState,useEffect}from 'react'
// 对于有些属性值 物品们是可以设置默认值，如果用户没有传递 则使用默认值 如果传了 就使用传递的
import './index.css' // 样式
// 1.结构 2.样式 3.行为 4.数据 5.生命周期函数
// 行为



function ShowComponent(props){
  console.log(props)
  // useState
  let [count,setCount] = useState(0)//定义初始值
  function clickHandler(e){ 
    console.log("点击了")
    console.log(e)
    console.log(e.target.innerText)
    console.log(e.target.value)
    setCount(count + 1)//count +1
  }
  //useEffect 参数1 是一个函数 参数2 是一个数组代表依赖的变量
  // 如果只传递一个参数 相当于vue里面的created生命周期函数
  useEffect(()=>{
    console.log("useEffect",useEffect)
  }) 
 
  
  
  useEffect(()=>{
    console.log("useEffect1",useEffect)
  },[count])
  // 在react组件里面 属性是不能扩展的 也就是react里面不允许开发者去定义属性，或者说属性是不可以被改写的
  let title = props.title ? props.title:'这个是title的默认值'  
  // console.log(typeof props.number)
  if((typeof props.number) === 'string'){
    throw new Error("传递参数错误 必须为一个数字")
    return
  }

  // 数据 1.调用出传递属性 2.自己內部的数据
  return(
      <div className="title">
          <p>我等哈{title}</p>
          <h1>大家调度{props.children   }</h1>
          <button onClick={clickHandler}>点击</button>
          <h3>count:{count}</h3>
      </div>
    )
  }
  export default ShowComponent