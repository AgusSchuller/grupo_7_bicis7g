// ************ Require's ************
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const fs = require("fs");

// ************ express-validator ************
const { check, validationResult, body } = require("express-validator");

// ************ Controller Require ************
const usersController = require("../controllers/usersController");

//********** MULTER ********** */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/users");
  },
  filename: function (req, file, cb) {
    cb(null, "users-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

//********** VALIDACIONES ********** */
const validacionesLogin = [
  body("email")
    .notEmpty()
    .withMessage("Debes completar el email")
    .isEmail()
    .withMessage("Agregar un email válido"),
  body("password")
    .notEmpty()
    .withMessage("Debes completar la contraseña")
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
    .notEmpty()
    .withMessage("Debes completar el nombre")
    .isLength({
      min: 2,
    })
    .withMessage("El Nombre debe tener al menos dos caracteres"),
  body("lastName")
    .isLength({
      min: 2,
    })
    .withMessage("El Apellido no puede estar vacío"),
  body("email")
    .notEmpty()
    .withMessage("Debes completar el email")
    .isEmail()
    .withMessage("Debe ingresar un email válido"),
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
    .withMessage("Debe seleccionar una imagen")
    .custom((value, { req }) => {
      if (!req.file) throw new Error("Profile Img is required");
      return true;
    }),
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
