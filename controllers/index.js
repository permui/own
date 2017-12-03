const 
    Post = require('../database/post'),
    nun = require('nunjucks');

async function show_index(ctx,next) {
    ctx.response.type = 'text/html';
    let p = await Post.findAll({
        where: {
            visible: true
        }
    });
    ctx.response.body = nun.render('./view/frontend/index.njk',{page_title: 'Own',posts: p});
}

module.exports = {
    'GET /': show_index
}