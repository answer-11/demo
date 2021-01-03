const CategoryModel = require('../models/CategoryModel');

/**
 * 展示分类的表单
 * @param req
 * @param res
 * @return {Promise<void>}
 */
async function showCategoryList(req, res){
    try {
        // find方法如果不传递 callback 返回的是一个 Promise对象
        const cateData = await CategoryModel.find({});
        res.render('category-list', { cateData: cateData, title: '电影网站后台电影分类列表'})

    }catch (e) {
        // 一般专门定制一个错误页面
        res.redirect('/admin/404');
    }
}

/**
 * 展示分类表单
 * @param req
 * @param res
 */
function showCategoryForm(req, res){
    res.render('category-add', {title: '电影网站后台电影分类添加'})
}

/**
 * 收集分类信息
 * @param req
 * @param res
 */
function collectCategoryForm(req, res){
        let { cateName } = req.body;
        if( cateName.trim().length <= 0 ){
            res.redirect('back');
            return;
        }
        const cate1 = new CategoryModel( {cateName} );
        cate1.save((error, data) => {
            if( error ){
                res.redirect('back');
            }else{
                res.redirect('/admin/category-list');
            }
        });
}
module.exports = {
    showCategoryList,
    showCategoryForm,
    collectCategoryForm,

}