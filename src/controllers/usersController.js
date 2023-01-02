const path = require("path");
const fs = require("fs");

const usersFilePath = path.join(__dirname, "../database/users.json");
const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { validationResult } = require('express-validator');

const usersController = {
  login: (req, res) => {
    res.render("./users/login");
  },
  register: (req, res) => {
    res.render("./users/register");
  },
  ingresar: (req, res) =>  {
    
  },
  processRegister:  (req, res) =>  {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let newUser = {
				id: users[users.length - 1].id + 1,
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, salt),
				imagen: req.file ? req.file.filename : "default-image.jpg",
			};
			users.push(newUser);
			fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
			res.redirect("/login");
    }else{
      return res.render("./users/register", { errors : errors.mapped(),old: req.body })
    }
  },
  logout: (req, res) =>  {
    

  }
};

module.exports = usersController;