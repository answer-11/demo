// react里面的类组件的定义 使用es6的class语法

// 方式1引入
// import React from 'react';
// class ClassComponent extends React.Component{
import './index.css'
import PropTypes from 'prop-types';
 // 方式2 引入
import React, {Component, PureComponent} from 'react';//es6解构语法
// PureComponent 翻译过来是 纯
// 当我们自己的类组件继承PureComponent 组件后 可以进行性能的提升，当数据变化后 页面更新
// 但是数据本身没有再次变化，不会触发更新
class ClassComponent extends PureComponent{
    // 用了PureComponent就可以不用下面shouldComponentUpdate这个方法
    static defaultProps = {
        title:'这个是默认值'
    }
    static propTypes = {
        number:PropTypes.number
    }
    constructor(props){
        console.log("1 构造函数")
        super(props);
        this.title = '类组件' 
        
        console.log(this.props)
        console.log(this)
        // 我们的react里面的组件的数据分为两类：1.调用处传递是属性信息 可以通过this.props进行
        // 操作，并且类组件的props和函数式组件的props一样，也是只能读，不能写 2.类组件可以在自己类的里面
        // 维护自己的数据，一般我们把这个数据叫做state(数据) 一般来说我们是在构造函数里面进行state的
        // 定义 一般我们称之为state的初始化操作
        console.log(this.props.number)
        // this.props.number = 10
        
        // 方式一(建议使用) 展示组件，展示用户的基本信息this.state是一个对象，类似vue里面的data属性
        this.state = {
            title:'我是类组件',
            userInfo:{
                id:1,
                username:'andy',
                age:23,
                email:'andy@163.com'
            }
        }
        // 类组件的生命周期函数
        
    }
    
    // componentWillUnmount
    UNSAFE_componentWillMount(){
        console.log("2  UNSAFE_componentWillMount")
    }
    componentDidMount(){
        console.log(" 4 componentDidMount")//定义组件（虚拟DOM（js对象）---> 真实DOM（内存） --->插入网页dom结构
 //---->浏览器渲染)执行完成后，可以看到网页   
}
    // 在做更改时 如果有时是通过事件的方式操作某个state数据 但是操作后相比于之前 我们的数据并没有变化，但是render
    // 还是重新执行 执行setState触发页面的重新的渲染(即使底层使用的虚拟DOM技术，还是进行新虚拟DOM的创建和diff比较，是完全没有意义)
    // shouldComponentUpdate(nextProps,nextState,nextContext){
    //     // shouldComponentUpdate 返回值是Boolean;true表示允许更新 false 不允许更新
    //     // 这个api一般做优化处理
    //     if(this.state.title === nextState.title){
    //         // 这个意味数据根本没有更新
    //         return false
    //     }
    //     return true
    // }
    // 更新操作的生命周期函数
    // nextProps,nextState 代表最新的数据
    UNSAFE_componentWillUpdate(nextProps,nextState,nextContext){
        // 组件数据将要更新没有更新
        console.log("5 最新的消息")
        console.log(nextProps,nextState,nextContext)
    }
    // 这里还要一个render函数执行  6 render
    
    componentDidUpdate(prevProps,prevState,snapshot){
        // 组件已经更新完毕
        console.log("7 最新的消息")
        console.log(prevProps,prevState,snapshot)
    }
    
    // 方式二 直接给对象的state属性进行赋值操作也是可以的
    // 数据驱动，无DOM操作，类组件是否可以实现双向数据绑定里面的方向一的变化，模型（js数据）到
    // 视图重新渲染
    state = {
        title:'我是类组件',
        userInfo:{
            id:1,
            username:'andy',
            age:23,
            email:'andy@163.com'
        }
    }
    clickHandler(e){
        console.log(this)//undefined 访问不到
        console.log("点击",e)
        // this.state.title = "修改state的值"
        // 在react里面如果要实现方向一的变化 则不能直接为模型变量赋值操作，而是需要使用特定
        // 的api进行数据的修改操作
            // 注意1：setState是一个异步的api（主要当数据发生变化后，页面需要重新的渲染，是需要一定的时间，所以设计成异步）
            // 注意2：setState的第二个参数是一个回调函数，在成功修改数据会被触发
            // 注意3：setState的第一个参数，里面如果修改数据在初始化的时候存在，则为修改，如果不存在，则
            // 为新增。并且之前其他的数据不受到影响
        this.setState({
            title:'我是使用setState这个api修改的',
            age:12//新增
            // 没有对state里面的userInfo进行任何操作 则userInfo不受影响的
        },()=>{
            console.log(this.state)
        });//用于专门修改state里面的值，如果要改什么值，则传递相应的对象即可
        console.log(this.state.title)//还是老的值，并不是使用setState修改后的值 
    }
    changeHandler=(e)=>{
        
        console.log(this)//
        console.log("点击",e)
    }
    // 注意2 必须定义一个render方法
    render(){
        console.log("3 render")
        console.log(this)
        console.log(this.props)
        return(
           
            <div> 
                <h2 className='text'>类组件的基本使用</h2>
                <p>1.结构 2.样式 3.行为 4.data数据 5.生命周期函数</p>
                {/* 对于类组件的事件的回调函数我们写在类里面 */}
                <p>{this.state.title}</p>
                <p>{this.state.userInfo.username}</p>
                <p>{this.state.userInfo.email}</p>
                <button onClick={(e)=>{this.clickHandler(e)}}>点击我-修改state的值</button>
            </div>
        )
    }
}
export default ClassComponent