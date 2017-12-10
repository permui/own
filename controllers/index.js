const 
    Post = require('../database/post'),
    nun = require('nunjucks'),
    jsdom = require('jsdom').JSDOM;

async function show_index(ctx,next) {
    ctx.response.type = 'text/html';
    let p = (await Post.findAll({where:{visible:true}})).reverse();
    p.forEach(val => {
        let doc = (new jsdom(val.rendered)).window.document;
        let d = doc.createElement('div');
        d.appendChild(doc.body.firstElementChild);
        val.preview = d.innerHTML;
    });
    ctx.response.body = nun.render('./view/frontend/index.njk',{page_title:'Own',posts:p});
}

module.exports = {
    'GET /': show_index
}