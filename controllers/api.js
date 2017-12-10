const 
    Post = require('../database/post'),
    fs = require('mz/fs'),
    git = require('../git');

async function save_delete_post(id,name) {
    let file = `./data/files/posts/${name}.md`;
    await fs.unlink(file);
    await git.add([file]);
    await git.commit(`deleted post ${id} with name ${name}`,[file]);
}

async function delete_post(ctx,next) {
    let id = ctx.params.id;
    let name = (await Post.find({where:{id:id}})).title;
    await Post.destroy({where:{id:id},force: true});
    console.log(`deleted post ${id}`);
    ctx.response.status = 200;
    await save_delete_post(id,name)
}

async function toggle_post(ctx,next) {
    let id = ctx.params.id;
    let p = await Post.find({where: {id: id}});
    let bef = p.visible;
    await Post.update({visible: !bef},{where: {id: id}});
    ctx.response.status = 200;
}

module.exports = {
    'GET /api/post/delete/p/:id': delete_post,
    'GET /api/post/toggle/p/:id': toggle_post
}