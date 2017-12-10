const git = require('simple-git/promise')();

(async () => {
    await git.addConfig('user.name','permui');
    await git.addConfig('user.email','1037699466@qq.com');
})();

module.exports = git;
