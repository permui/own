const 
    Seq = require('sequelize'),
    config = require('./config');


var seq = new Seq(config.database,config.username,config.password,{
    host: 'localhost',
    dialect: 'sqlite',
    storage: `./data/blog.sqlite`,
    define: {
        'timestamps': false,
        'underscored': true
    }
});

module.exports = seq;