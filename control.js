const 
    fs = require('fs');
    Router = require('koa-router');

let path = __dirname + '/controllers';

let file = fs.readdirSync(path).filter(f => f.endsWith('.js'));

router = new Router();

for (let f of file) {
    let q = require(`${path}/${f}`);
    for (let s in q) {
        if (s.startsWith('GET ')) router.get(s.substring(4),q[s]);
        else if (s.startsWith('POST ')) router.post(s.substring(5),q[s]);
        else console.log('Bad router function!');
    }
}

module.exports = router;