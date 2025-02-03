function checkUserRoles(req, res, next){
    const user = req.user;
    if(user.role === 'user'){
        next()
    }
}


module.exports = {  checkUserRoles }