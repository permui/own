const 
    nun = require('nunjucks'),
    passport = require('../authen/strategy');

nun.configure({watch:true});

async function show_login(ctx,next) {
    ctx.response.type = 'text/html';
    let w = JSON.parse(ctx.request.query.wrong || false);
    ctx.response.body = nun.render('./view/frontend/login.njk',{wrong:w});
}

async function get_logout(ctx,next) {
    ctx.logout();
    ctx.redirect('/');
}

let deal_login = passport.authenticate('local',{
    successRedirect: '/admin',
    failureRedirect: '/login?wrong=true',
});

module.exports = {
    'GET /login': show_login,
    'GET /logout': get_logout,
    'POST /login': deal_login
}