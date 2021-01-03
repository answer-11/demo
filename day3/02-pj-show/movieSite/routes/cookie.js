var express = require('express')
var router = express.Router()

// 1.颁发 cookie 单词翻译过来小饼干的意思。 童话故事
// 典故：大致知道：早年 美国 家庭：母亲去世 爸爸继母 不喜欢女儿，丢弃掉。
// 小女孩（携带一个小面包，小饼干）-----带出去（一路丢面包屑）-----丢；
// 沿着面包屑找回来。

/**
 * domain: 域名。设置子域名（二级域名）是否可以访问cookie。 例：domain:'.主域名' name=value：键值对，可以设置要保存的 Key/Value，注意这里的 name 不能和其他属性项的名字一样
 expires： 过期时间（秒），在设置的某个时间点后该 Cookie 就会失效，如 expires=Wednesday, 09-Nov-99 23:12:40 GMT
 maxAge： 最大失效时间（毫秒），设置在多少后失效
 secure： 当 secure 值为 true 时， cookie 在 HTTP 中是无效，在 HTTPS 中才有效
 path： 表示 cookie 影响到的路由，如 path=/。如果路径不能匹配时，浏览器则不发送这个 Cookie
 httpOnly：默认为false,建议设置为true, 客户端将无法通过document.cookie读取到 COOKIE 信息，可防止 XSS 攻击产生
 signed： 表示是否签名（加密） cookie, 设为 true 会对这个 cookie 签名，这样就需要用res.signedCookies 访问它,前提需要设置上面中间件app.use传参 。未签名则用 res.cookies 访问
 被篡改的签名 cookie 会被服务器拒绝，并且 cookie值会重置为它的原始值

 作者：caae
 链接：https://www.jianshu.com/p/7fc30d77cc5c
 来源：简书
 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
router.get('/publish', async  (req, res) => {
    // 如何颁发 需要设置响应头，给浏览器看到 一次性颁发多个
    // res.setHeader('set-cookie', 'isLogin=1; email=andy@163.com');
    // 原生的写法不好操作，使用第三方的包


    console.log(new Date( Date.now() + 10 * 1000 )); // 使用的 时间格式字符串 2019年12月4日15:59:18GMT，格林威治时间 第一时区
    // res.cookie('name', 'andy', { maxAge: 5*1000});
    // md5('mark' + 'admin88'); // 字符串
    // name=mark.字符串
    res.cookie('name', 'mark', {
        signed: true,  // 使用之前的秘钥进行签名
        // domain: 'h5.com', // 代表在 h5.com 所有的子级域名都可以生效 a.h5.com b.h5.com
        // secure: true, //  当 secure 值为 true 时， cookie 在 HTTP 中是无效，在 HTTPS 中才有效
        // httpOnly: true, // 代表无法通过 document.cookie 获取
        // path: '/', // 生效的路径 整个网站全局生效 /网站根目录 /admin/publish  /admin/read
        // expires:  new Date( Date.now() + 1000 * 1000 )
    });
    // 设置cookie 底层：set-cookie: name=andy 这样的响应头
    // res.setHeader('set-cookie', 'name=andy');

    // http://www.expressjs.com.cn/en/resources/middleware/cookie-parser.html
    res.send('服务器颁发了 cookie');

})

// 2. 查看 cookie
// md5(  mark + admin88 )  === m7CNUC9hNr3zcq5tTj%2B2QfpmKj7TNScWWI0fk7er3ix
// name=s%3Amark.m7CNUC9hNr3zcq5tTj%2B2QfpmKj7TNScWWI0fk7er3ik; Path=/
router.get('/read', async  (req, res) => {
    // console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies);

    res.send('浏览器携带的：cookie：' + req.signedCookies['name'] );
})

module.exports = router