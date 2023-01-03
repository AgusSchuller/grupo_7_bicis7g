const path = require("path");
const fs = require("fs");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

const usersFilePath = path.join(__dirname, "../database/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { validationResult } = require("express-validator");

const usersController = {
  login: (req, res) => {
    res.render("./users/login");
  },
  proccesLogin: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let usersJSON = fs.readFileSync("users.json", { encoding: "utf-8" });
      let users;
      if (usersJSON == "") {
        users = [];
      } else {
        users = JSON.parse(usersJSON);
      }
      let usuarioALoguearse

      for (let i = 0; i < users.length; i++) {
        if (users[i].email == req.body.email) {
          if (bcrypt.compareSync(req.body.password, users[i].password)) {
            let usuarioALoguearse = users[i];
            break;
          }
        }
      }
      if (usuarioALoguearse == undefined) {
        return res.render("./users/login", {
          errors: [{ msg: "Credenciales invalidas" }],
        });
      }
      req.session.usuarioLogueado = usuarioALoguearse;
      if (req.body.recordame!= undefined){
        res.cookie('recordame', usuarioALoguearse.email, {maxAge: 1000 * 60 * 60 * 24})
      }
      return res.render("./users/login")
    } else {
      return res.render("./users/login", {
        errors: errors.mapped(),
        oldData: req.body,
      });
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
  logout: (req, res) => {},
};

module.exports = usersController;
