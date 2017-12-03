const 
    Post = require('../database/post');
    Op = require('sequelize').Op,
    nun = require('nunjucks');

async function show_post(ctx,next) {
    let id = ctx.params.id;
    let p = await Post.findOne({
        where: {
            id: id
        }
    });
    if (p) {
        ctx.response.type = 'text/html';
        ctx.response.body = nun.render('./view/frontend/single-post.njk',{
            post: p,
            modified_time: (new Date(p.modified_at)).toLocaleString()
        })
    } else ctx.response.redirect('/404');
}

module.exports = {
    'GET /p/:id': show_post
}