const Post = require('../database/post');

async function delete_post(ctx,next) {
    let id = ctx.params.id;
    await Post.destroy({
        where: {
            id: id
        },
        force: true
    });
    console.log(`deleted post ${id}`);
    ctx.response.status = 200;
}

async function toggle_post(ctx,next) {
    let id = ctx.params.id;
    let p = await Post.find({where: {id: id}});
    let bef = p.visible;
    console.log(bef);
    await Post.update({visible: !bef},{where: {id: id}});
    console.log(`toggled post ${id}`);
    ctx.response.status = 200;
}

module.exports = {
    'GET /api/post/delete/p/:id': delete_post,
    'GET /api/post/toggle/p/:id': toggle_post
}