const Post = require('../database/post');

async function show_postlist(ctx,next) {
    let p = await Post.findAll();
    for (let s of p) {
        s.created_at = new Date(s.created_at).toLocaleString();
        s.modified_at = new Date(s.modified_at).toLocaleString();
    }
    ctx.response.type = 'application/json';
    let ret = {
        code: 0,
        msg: '',
        count: p.length,
        data: p
    }
    ctx.response.body = JSON.stringify(ret);
}

module.exports = {
    'GET /data/postlist': show_postlist
}