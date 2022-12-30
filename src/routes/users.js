// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// ************ Controller Require ************
const usersController = require("../controllers/usersController");

//********** MULTER ********** */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/img");
    },
    filename: function (req, file, cb) {
      cb(null, 'bici-'+Date.now()+path.extname(file.originalname))
    }
  })
   
  const upload = multer({ storage })

/*** REGISTER ***/ 
router.get("/login", usersController.login);

/*** REGISTER ***/ 
router.get("/register", usersController.register);

module.exports = router;