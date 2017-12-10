const 
    Koa = require('koa'),
    router = require('./control'),
    stat = require('koa-static'),
    mount = require('koa-mount'),
    bp = require('koa-bodyparser'),
    session = require('koa-session'),
    passport = require('./authen/strategy');

var app = new Koa();

app.keys = ['Zwl zWl zwL'];

app.use(mount('/public',stat('./view/lib')))
    .use(session({},app))
    .use(bp())
    .use(passport.initialize())
    .use(passport.session())
    .use((ctx,next) => {
        if (!/^\/admin\/.+/.test(ctx.url) || ctx.isAuthenticated()) return next(); 
        else ctx.redirect('/');
    })
    .use(router.routes())
    .listen(3000);

console.log('app running on port 3000...');