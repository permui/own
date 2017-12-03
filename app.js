const 
    Koa = require('koa'),
    router = require('./control'),
    stat = require('koa-static'),
    mount = require('koa-mount'),
    bp = require('koa-bodyparser');

var app = new Koa();

app.use(mount('/public',stat('./view/lib')))
    .use(bp())
    .use(router.routes())
    .listen(3000);

console.log('app running on port 3000...');