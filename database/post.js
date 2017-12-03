const 
    Seq = require('sequelize'),
    seq = require('./connect');

var Post = seq.define('post',{
    'title': Seq.STRING,
    'content': Seq.TEXT,
    'created_at': Seq.BIGINT,
    'modified_at': Seq.BIGINT
});

module.exports = Post;