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
}

module.exports = {
    'GET /api/delete/p/:id': delete_post
}