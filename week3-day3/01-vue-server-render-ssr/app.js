const Vue = require('vue')
// 创建vue实例对象
const app = new Vue({
    // el:'', 在服务器执行 不需要加
    data:{title:'heheh'},
    template: `<div>Hello World--{{title}}</div>`
  })
  
  // 第 2 步：创建一个 renderer
  const renderer = require('vue-server-renderer').createRenderer()
  
  // 第 3 步：将 Vue 实例渲染为 HTML
  renderer.renderToString(app, (err, html) => {
    if (err) throw err
    console.log(html)//现在的操作只是完成了服务器端的渲染，接下来还要提供一个web服务器可以把
    // 我们渲染好的网页返回客户端 安装好express后 可以把渲染后的网页相应给用户，用户看到的就是具有内容的网页 
    // => <div data-server-rendered="true">Hello World</div>
  })