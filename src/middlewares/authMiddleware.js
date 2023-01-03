function authMiddleware (req,res,next){
    if(req.session.usuarioLogueado == undefined){
        next() 
    }
    return res.redirect ('/users/login')
 
}

module.exports = authMiddleware