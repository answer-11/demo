// react里面的类组件的定义 使用es6的class语法
// 方式1 引入
// import React, {Component} from 'react';//es6解构语法
// class ClassComponent extends Component{
// 方式2引入
import React from 'react';
import './index.css'
import PropTypes from 'prop-types';
// 注意1：必须继承React.Component这个父类
class ClassComponent extends React.Component{
    static defaultProps = {
        title:'这个是默认值'//props的title属性
    }
    // 约束属性的类型
    static propTypes = {
        number:PropTypes.number
    }
    // 初始化一些属性  
    // 生命周期函数
    constructor(props){
        // 在class方法中，继承是使用 extends 关键字来实现的。
        // 子类必须在 constructor( )调用 super( )方法，否则新建实例时会报错。
        // 报错的原因是：子类是没有自己的 this 对象的，它只能继承自父类的 this 对象，然后对其进行加工，
        // 而super( )就是将父类中的this对象继承给子类的。没有 super，子类就得不到 this 对象。
        super(props);
        // 由于我们类组件继承了系统的Component,必须先调用super
        this.title = '类组件' //给类组件添加一个title属性
        
        console.log(this.props)
        console.log(this)//指向类组件
    }
    clickHandler(e){
        // 回调函数里面this的指向问题
        console.log(this)//undefined 访问不到
        console.log("点击",e)
    }
    changeHandler=(e)=>{
        // 回调函数里面this的指向问题
        console.log(this)//
        console.log("点击",e)
    }
    // 注意2 必须定义一个render方法
    render(){
        console.log(this)
        console.log(this.props)//this.props 代表的是类组件调用的时候传递的属性都会被放置在props属性上面
        // 返回一个jsx元素
        return(
            // 1.结构
            // 当有平级标签时 需要一个容器包着
            <div> 
                <h2 className='text'>类组件的基本使用</h2>
                <p>1.结构 2.样式 3.行为 4.data数据 5.生命周期函数</p>
                {/* 对于类组件的事件的回调函数我们写在类里面 */}
                {/* 方式1.箭头函数 */}
                <button onClick={(e)=>{this.clickHandler(e)}}>点击我</button>
                {/* 方式2.bind函数 */}
                <button onClick={this.clickHandler.bind(this)}>单击</button>
                {/* 方式3.箭头函数 */}
                <button onClick={this.changeHandler}>点击</button>
                <p>{this.props.children}</p>
        {/* <h3 title= {this.title} >dadadad</h3> */}
            </div>
        )
    }
}
export default ClassComponent