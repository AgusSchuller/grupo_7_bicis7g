const path = require("path");
const fs = require("fs");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const { check, validationResult, body } = require("express-validator");

const db = require("../database/models/");
const User = db.User;
const sequelize = db.sequelize;

const usersController = {
  login: (req, res) => {
    res.render(path.resolve(__dirname, "../views/users/login"));
  },
  proccesLogin: (req, res) => {
    db.User.findAll().then((users) => {
      //Aquí guardo los errores que vienen desde la ruta, valiendome del validationResult
      let errors = validationResult(req);
      let usuarioLogueado = [];
      if (req.body.email != "" && req.body.password != "") {
        usuarioLogueado = users.filter(function (user) {
          return user.email === req.body.email;
        });
        //Aquí verifico si la clave que está colocando es la misma que está hasheada en la Base de datos - El compareSync retorna un true ó un false
        if (
          bcrypt.compareSync(req.body.password, usuarioLogueado[0].password) ===
          false
        ) {
          usuarioLogueado = [];
        }
      }
      //console.log(usuarioLogueado);
      //return res.send(usuarioLogueado);

      //Aquí determino si el usuario fue encontrado ó no en la Base de Datos
      if (usuarioLogueado.length === 0) {
        return res.render(path.resolve(__dirname, "../views/users/login"), {
          errors: errors.mapped(),
          old: req.body,
        });
      } else {
        //Aquí guardo en SESSION al usuario logueado
        req.session.usuario = usuarioLogueado[0];
      }
      //Aquí verifico si el usuario le dio click en el check box para recordar al usuario
      if (req.body.recordarme) {
        res.cookie("email", usuarioLogueado[0].email, {
          maxAge: 1000 * 60 * 60 * 24,
        });
      }
      return res.redirect("/");
    });
  },
  register: (req, res) => {
    res.render(path.resolve(__dirname, "../views/users/register"));
  },
  processRegister: (req, res) => {
    let errors = validationResult(req);
     //return res.send(errors);
    //Aquí determino si hay ó no errores encontrados
    if (!errors.isEmpty()) {
      return res.render(path.resolve(__dirname, "../views/users/register"), {
        errors: errors.mapped(),
        old: req.body,
      });
    }
    //Si todo marcha sobre ruedas, entonces
    // Generamos el usuario a partir de los datos del request
    // - Ignoramos repassword, ya que no nos interesa guardarla
    // - Hasheamos la contraseña
    let user = {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      image: req.file ? req.file.filename : "",
      role: 1,
    };
    User.create(user)
      .then((storedUser) => {
        return res.redirect("/login");
      })
      .catch((error) => console.log(error));
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("email", null, { maxAge: -1 });
    res.redirect("/");
  },
};

module.exports = usersController;
