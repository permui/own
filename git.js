const git = require('simple-git')();

git.addConfig('user.name','admin').addConfig('user.email','admin@own.com');

module.exports = git;
