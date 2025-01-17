const boom = require("@hapi/boom")

function checkApiKey(req, res, next){
    const apiKey = req.headers['api'];

    if(apiKey === '123'){
        next()
    }else{
        next(boom.unauthorized());
    }
}

function checkUserRoles(req, res, next){
    const user = req.user;
    if(user.role === 'admin'){
        next()
    }
}


module.exports = { checkApiKey, checkUserRoles }