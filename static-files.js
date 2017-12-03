const 
    fs = require('mz/fs'),
    path = require('path'),
    mime = require('mime'); 

function staticFiles(url,dir) {
    return async function(ctx,next) {
        let r = ctx.request.url;
        if (r.startsWith(url)) {
            let p = path.join(dir,r.substring(url.length));
            if (await fs.exists(p)) {
                ctx.response.type = mime.getType(p);
                ctx.response.body = await fs.readFile(p);
            }
        } else await next();
    };
}

module.exports = staticFiles;