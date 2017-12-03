const
    Post = require('../database/post'),
    fs = require('fs'),
    nun = require('nunjucks'),
    mk = require('markdown-it-katex'),
    markdown = new require('markdown-it')();

markdown.use(mk);

async function show_new_post(ctx,next) {
    ctx.response.type = 'text/html';
    ctx.response.body = nun.render('./view/backend/post/newpost.njk');
}

async function deal_new_post(ctx,next) {
    let 
        title = ctx.request.body.title,
        raw = ctx.request.body.content,
        rendered = markdown.render(raw),
        now = Date.now();
    
    let p = await Post.create({
        title: title,
        markdown: raw,
        rendered: rendered,
        visible: true,
        tags: "[]",
        created_at: now,
        modified_at: now
    });
    ctx.response.body = `<h2><a href="/p/${p.id}">Post ${p.id} Created!</a></h2>`;
    console.log('created post: ' + JSON.stringify(p));
}

async function show_dash_board(ctx,next) {
    ctx.response.type = 'text/html';
    ctx.response.body = nun.render('./view/backend/back-end-base.njk');
}

async function show_man_post(ctx,next) {
    ctx.response.type = 'text/html';
    ctx.response.body = nun.render('./view/backend/post/manpost.njk');
}

module.exports = {
    'GET /admin': show_dash_board,
    'GET /admin/newpost': show_new_post,
    'GET /admin/manpost': show_man_post,
    'POST /admin/newpost': deal_new_post
}