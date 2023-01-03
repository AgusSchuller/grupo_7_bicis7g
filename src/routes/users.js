// ************ Require's ************
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// ************ express-validator ************
const { body } = require("express-validator");

// ************ Controller Require ************
const usersController = require("../controllers/usersController");

let archivoUsuarios = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../database/users.json"))
);

//********** MULTER ********** */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/users");
  },
  filename: function (req, file, cb) {
    cb(null, "users-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

//********** VALIDACIONES ********** */
const validacionesLogin = [
  body("email").isEmail().withMessage("Agregar un email válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener un mínimo de 6 caractéres"),
  body("email")
    .custom((value) => {
      for (let i = 0; i < archivoUsuarios.length; i++) {
        if (archivoUsuarios[i].email == value) {
          return true;
        }
      }
      return false;
    })
    .withMessage("Usuario no registrado"),
  body("password")
    .custom((value, { req }) => {
      for (let i = 0; i < archivoUsuarios.length; i++) {
        if (archivoUsuarios[i].email == req.body.email) {
          if (bcrypt.compareSync(value, archivoUsuarios[i].password)) {
            return true;
          } else {
            return false;
          }
        }
      }
    })
    .withMessage("Usuario o contraseña no coinciden"),
];

const validacionesRegistro = [
  body("name")
    .isLength({
      min: 1,
    })
    .withMessage("El campo Nombre no puede estar vacío"),
  body("apellido")
    .isLength({
      min: 1,
    })
    .withMessage("El campo Apellido no puede estar vacío"),
  body("email").isEmail().withMessage("Debe ingresar un email válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener un mínimo de 6 caractéres"),
  body("confirm_password")
    .isLength({ min: 6 })
    .withMessage(
      "La confirmación de la contraseña debe tener un mínimo de 6 caractéres"
    ),
  body("confirm_password")
    .custom((value, { req }) => {
      if (req.body.password == value) {
        return true;
      } else {
        return false;
      }
    })
    .withMessage("Las contraseñas deben ser iguales"),
  body("imageusers")
    .custom((value, { req }) => {
      if (req.file != undefined) {
        return true;
      }
      return false;
    })
    .withMessage("Debe seleccionar una imagen"),
];

/*** LOGIN ***/
router.get("/login", usersController.login);
router.post("/login", validacionesLogin, usersController.proccesLogin);

/*** REGISTER ***/
router.get("/register", usersController.register);
router.post(
  "/register",
  upload.single("imageusers"),
  validacionesRegistro,
  usersController.processRegister
);

/*** LOGOUT ***/
router.get("/logout", usersController.logout);

module.exports = router;
