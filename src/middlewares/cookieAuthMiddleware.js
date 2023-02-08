const fs = require('fs');
const path = require('path');

module.exports = (req,res,next) =>{
    res.locals.usuario = false;
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        return next();
    }else if(req.cookies.email){
        let usuario = archivoUsuarios.find(usuario => usuario.email == req.cookies.email)
        req.session.usuario = usuario;
        res.locals.usuario = usuario;
        return next();
    }else{
        return next();
    }
}