const express = require('express')
const app = express()
const path = require('path')
const utils = require('./utils/index.js');
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes/index.js')
const userRouter = require('./routes/user.js')
const categoryRouter = require('./routes/category.js')
const movieRouter = require('./routes/movie.js')
const commonRouter = require('./routes/common.js')
const articeRouter = require('./routes/artice.js')
const cookieRouter = require('./routes/cookie.js')
const SiteConfig = require('./config/site.js')




/*
接口相关的 路由文件
接口相关的 路由文件
如果要做支付功能：则必须线上环境
1. 域名必须备案
2. 必须要有公司资质才可以申请微信支付
    - 如果要申请微信支付，还要申请一个微信服务号（进行认证，每年300块）
    - 成功申请，则我们被称为商户(腾讯的第三方商户)，我们的应用被称为商户平台。

* */

const movieApiRouter = require('./routes/api/movie.js');
const memberApiRouter = require('./routes/api/member.js')
const postsApiRouter = require('./routes/api/posts.js')
const paymentApiRouter = require('./routes/api/payment.js')

const h5ApiRouter = require('./routes/api/h5.js')
const cartApiRouter = require('./routes/api/cart.js')


/**
 * 完成session的配置
 *
 * @type {cookieSession}
 */
const cookieSession = require('cookie-session')

// app.use 中间件的使用
app.use(cookieSession({
    name: 'session_h5',
    keys: [ SiteConfig.SESSION_SALT ],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


app.use(cookieParser(SiteConfig.COOKIE_SALT))


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 负责解析 微信服务器通知的消息，微信传递过来的不是json格式数据，是xml
/**
<xml>
     <appid>wx2421b1c4370ec43b</appid>
     <attach>支付测试</attach>
     <body>H5支付测试</body>
     <mch_id>10000100</mch_id>
     <nonce_str>1add1a30ac87aa2db72f57a2375d8fec</nonce_str>
     <notify_url>http://wxpay.wxutil.com/pub_v2/pay/notify.v2.php</notify_url>
     <openid>oUpF8uMuAJO_M2pxb1Q9zNjWeS6o</openid>
     <out_trade_no>1415659990</out_trade_no>
     <spbill_create_ip>14.23.150.211</spbill_create_ip>
     <total_fee>1</total_fee>
     <trade_type>MWEB</trade_type>
     <scene_info>{"h5_info": {"type":"IOS","app_name": "王者荣耀","package_name": "com.tencent.tmgp.sgame"}}</scene_info>
     <sign>0CB01533B8C1EF103065174F50BCA001</sign>
 </xml>
 */
app.use(bodyParser.text({type: '*/xml'}));

app.use(express.static('public'))


app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (req, res) => res.render('findex'));


app.use('/admin', commonRouter);

// 下面的都是需要登录后才可以访问的
app.use('/admin', utils.checkLogin, indexRouter ); // 首页
app.use('/admin', utils.checkLogin, userRouter); // 用户模块
app.use('/admin', utils.checkLogin, categoryRouter); // 电影分类
app.use('/admin', utils.checkLogin, movieRouter); // 电影资源
app.use('/admin', utils.checkLogin, cookieRouter); // 会话
app.use('/admin', utils.checkLogin, articeRouter); // 文章

// 导入接口路由
// 问题： 接口的前缀该如何编写，业内一般使用使用
// 一般接口都会迭代升级，后面会出新的功能版本的接口好比v2
// api/版本号
/**
 * http://localhost:9090/api/v1/movie（模块名称）/list（操作名称）
 *
 * 接口前缀：http://localhost:9090/api/v1
 *
 * 接口名称：/movie/list
 * 编写接口的时候，有接口的规则（规范）现在写的规范：
 * 1. 是民间组织的规范，都是大家经验所得，并没有官方的权威性。
 *
 * 2. 还有一些大公司按照官方推出的规范些文档：一般叫做 REST规范，写出来的接口称之为 RESEFul api （目前主流）。
 *
 * 3. graphSql 这种 api （推进中）
 *
 * 1. 接口的命名
 *
 * https://www.cnblogs.com/klb561/p/9286283.html
 * http://www.ruanyifeng.com/blog/2011/09/restful.html
 * http://www.ruanyifeng.com/blog/2014/05/restful_api.html
 *
 */
app.use('/api/v1', movieApiRouter);
app.use('/api/v1', memberApiRouter);
app.use('/api/v1', postsApiRouter);
app.use('/api/v1', paymentApiRouter);

//针对h5支付的路由
app.use('/api/v1', h5ApiRouter);

// 购物车路由
app.use('/api/v1', cartApiRouter);





app.get('*', function(req, res){
    res.render('error', {
        title: 'No Found'
    })
});

app.listen(9000, () => console.log('movie app listening on port 9000!'))
