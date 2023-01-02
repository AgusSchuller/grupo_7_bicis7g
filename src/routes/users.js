// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const fs = require('fs');

// ************ express-validator ************
const { body } = require('express-validator');

// ************ Controller Require ************
const usersController = require("../controllers/usersController");

let archivoUsuarios =  JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')))

//********** MULTER ********** */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/img/users");
    },
    filename: function (req, file, cb) {
      cb(null, 'users-'+Date.now()+path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage })

//********** VALIDACIONES ********** */
  const validacionesLogin = [

  ]

  const validacionesRegistro = [

  ]

/*** LOGIN ***/ 
router.get("/login", usersController.login);
router.post('/login', validacionesLogin,usersController.ingresar);

/*** REGISTER ***/ 
router.get("/register", usersController.register);
router.post('/register', upload.single('image-users'),validacionesRegistro, usersController.crevate);

/*** LOGOUT ***/ 
router.get('/logout', usersController.logout);

module.exports = router;