const
    Post = require('../database/post'),
    fs = require('mz/fs'),
    nun = require('nunjucks'),
    mk = require('markdown-it-katex'),
    markdown = new require('markdown-it')({html:true});

markdown.use(mk);

async function save_post(p) {
    let com = `<!-- ${p.tags} -->\n\n${p.markdown}`;
    await fs.writeFile(`./data/files/posts/${p.title}.md`,com);
    console.log('post saved');
}

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
    ctx.response.redirect('/admin/manpost');
    await save_post(p);
}

async function show_dash_board(ctx,next) {
    if (ctx.isUnauthenticated()) ctx.redirect('/login');
    ctx.response.type = 'text/html';
    ctx.response.body = nun.render('./view/backend/back-end-base.njk');
}

async function show_man_post(ctx,next) {
    ctx.response.type = 'text/html';
    ctx.response.body = nun.render('./view/backend/post/manpost.njk');
}

async function view_post(ctx,next) {
    let id = ctx.params.id;
    let p = await Post.find({where:{id:id}});
    if (!p) ctx.response.redirect('/404');
    ctx.response.body = nun.render('./view/backend/post/viewpost.njk',{post:p});
}

async function edit_post(ctx,next) {
    let id = ctx.params.id;
    let p = await Post.find({where:{id:id}});
    if (!p) ctx.response.redirect('/404');
    ctx.response.body = nun.render('./view/backend/post/editpost.njk',{post:p});
}

async function deal_edit_post(ctx,next) {
    let 
        id = ctx.params.id,
        title = ctx.request.body.title,
        raw = ctx.request.body.content,
        rendered = markdown.render(raw),
        now = Date.now();
    await Post.update({
        title: title,
        markdown: raw,
        rendered: rendered,
        modified_at: now
    },{where:{id:id}});
    ctx.response.redirect('/admin/manpost');
    let p = await Post.find({where:{id:id}});
    await save_post(p);
}

module.exports = {
    'GET /admin': show_dash_board,
    'GET /admin/newpost': show_new_post,
    'GET /admin/manpost': show_man_post,
    'GET /admin/viewpost/:id': view_post,
    'GET /admin/editpost/:id': edit_post,
    'POST /admin/editpost/:id': deal_edit_post,
    'POST /admin/newpost': deal_new_post
}