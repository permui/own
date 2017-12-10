const 
    passport = require('koa-passport'),
    local = require('passport-local').Strategy,
    config = require('./config');

passport.use(new local((username,password,done) => {
    if (username === config.username && password === config.password) {
        return done(null,config);
    } else {
        return done(null,false,{message:'Please Try Again!'});
    }
}));

passport.serializeUser((user,done) => {
    done(null,user.username);  
});

passport.deserializeUser((username,done) => {
    done(null,config);
})

module.exports = passport;