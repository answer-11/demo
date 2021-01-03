/**

 GET	/posts	posts	app.controllers.posts.index
 GET	/posts/new	new_post	app.controllers.posts.new
 GET	/posts/:id	post	app.controllers.posts.show
 GET	/posts/:id/edit	edit_post	app.controllers.posts.edit
 POST	/posts	posts	app.controllers.posts.create
 PUT	/posts/:id	post	app.controllers.posts.update
 DELETE	/posts/:id	post	app.controllers.posts.destroy

 */

class PostsController{
    /**
     * get + 展示帖子列表
     */
    static index(req, res){

        // res.send('负责列表的展示功能');
        // res.render('index');
        res.json({
            id: 1,
            name: 'gogery'
        })

    }

    /**
     * get+ 展示添加表单
     */
    static new(req, res){

    }

    /**
     * post+收集数据
     */
    static create(req, res){

    }

    /**
     * get + 展示单条详情
     */
    static show(req, res){
        let id = req.params.id;
        res.send('show' +  id );

    }

    /**
     * 展示编辑表单
     */
    static edit(req, res){
        let id = req.params.id;
        res.send(id);
    }

    /**
     * put + 完成更新
     */
    static update(req, res){
        let id = req.params.id;
        res.send('put' + id);
    }

    /**
     * delete + 删除帖子
     */
    static destroy(req, res){
        let id = req.params.id;
        res.send('delete' + id);

    }
}
module.exports = PostsController;