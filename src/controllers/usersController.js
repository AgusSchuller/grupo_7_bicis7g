const path = require("path");
const fs = require("fs");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const usersFilePath = path.join(__dirname, "../database/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const { validationResult } = require("express-validator");

const usersController = {
  login: (req, res) => {
    res.render("./users/login");
  },
  proccesLogin: (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
      let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));
      let usuarioLogueado = archivoUsuarios.find(usuario => usuario.email == req.body.email)
      delete usuarioLogueado.password;
      req.session.usuario = usuarioLogueado;  
      if(req.body.recordarme){
        res.cookie('email',usuarioLogueado.email,{maxAge: 1000 * 60 * 60 * 24})
      }
      return res.redirect('/');   
    }else{
      res.render(path.resolve(__dirname, '../views/users/login'),{errors:errors.mapped(),old:req.body});        
    }
  },
  register: (req, res) => {
    res.render("./users/register");
  },
  processRegister: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let newUser = {
        id: users[users.length - 1].id + 1,
        nombre: req.body.name,
        apellido: req.body.apellido,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        imagen: req.file ? req.file.filename : "default-image.jpg",
      };
      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
      res.redirect("/login");
    } else {
      return res.render("./users/register", {
        errors: errors.mapped(),
        oldData: req.body,
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie('email',null,{maxAge: -1});
    res.redirect('/')
  },
};

module.exports = usersController;
