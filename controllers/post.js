const 
    Post = require('../database/post');
    Op = require('sequelize').Op,
    nun = require('nunjucks');

async function show_post(ctx,next) {
    let id = parseInt(ctx.params.id);
    let p = await Post.findOne({where:{id:id}});
    if (!p) {
        ctx.response.redirect('/404');
        return;
    }
    ctx.response.type = 'text/html';
    ctx.response.body = nun.render('./view/frontend/single-post.njk',{
        post: p,
        page_title: p.title,
        modified_time: (new Date(p.modified_at)).toLocaleString()
    })
}

module.exports = {
    'GET /p/:id': show_post
}