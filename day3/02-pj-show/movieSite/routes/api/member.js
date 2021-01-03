// 完成网站前台会员的注册和登录功能

var express = require('express')
var router = express.Router()
const MemberController = require('../../controllers/api/MemberController');

router.post('/member/register', MemberController.register);
router.post('/member/login', MemberController.login);


// 弊端：现在的我们写的接口地址里面包含了动词信息。favAdd favRemove
// 一般来说我们不建议在url地址里面包含动词，url地址应该是一个描述性的字符串。如果写的一个普通的字符串，则如何来表示其行为呢？

// 有一个大佬出来说话：apache 软件基金会的第一任主席，http协议的起草者，也是apache软件的开发者之一。
// 提出一个url的架构模式：（希望，建议）
// 1. url 地址不要动词，使用名词

// 2. 合理使用 http 协议里面规定的方法(1. get  2. post 3. delete 4. put 5. update 6. trace 7. option....)

//3. 基于 url地址 + http方法，形参对资源（网络资源，图片，文本，记录）的操作的架构被称为 REST 架构。

//4. REST 只是一个思想，还没落地。

//5. 广大的遵守者基于该 REST 规范，形参一套编写 api 的方式，则被称为 RESTFul api 风格。

//6. 通过 REST 规范写出来的 RESTFul api 里面定义好的路由，我们称之为 资源路由。

//7. 示例：
/**
 * posts： 帖子 定义 7 条路由，完成帖子的 增删改查操作
 router.resources('/posts', PostsController);

 GET	/posts	posts	app.controllers.posts.index
 GET	/posts/new	new_post	app.controllers.posts.new
 GET	/posts/:id	post	app.controllers.posts.show
 GET	/posts/:id/edit	edit_post	app.controllers.posts.edit
 POST	/posts	posts	app.controllers.posts.create
 PUT	/posts/:id	post	app.controllers.posts.update
 DELETE	/posts/:id	post	app.controllers.posts.destroy

 */


// express 框架并没有提供原生的资源路由，需要我们自己去编写这样风格的api；
// egg.js 这个框架里面是包含了资源路由支持；

// 只要写一条。代表7条路由规则
// 增（1. 展示表单 2.收集数据） 删（删除） 改（1. 编辑表单 2. 收集编辑的数据） 查（列表）


// 收藏接口：什么人在什么时间收藏哪一部电影
router.post('/member/favAdd', MemberController.favAdd);
router.post('/member/favRemove', MemberController.favRemove);
router.post('/member/favList', MemberController.favList);

// 评论 1. 添加  2. 展示
router.post('/member/commentAdd', MemberController.commentAdd);
router.get('/member/commentList', MemberController.commentList);

// 增加 pv 值
router.post('/member/pvAdd', MemberController.pvAdd);


module.exports = router
