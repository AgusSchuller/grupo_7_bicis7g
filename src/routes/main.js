// ************ Require's ************
const express = require("express");
let router = express.Router();
const multer = require ('multer')

// ************ Controller Require ************
const mainController = require("../controllers/mainController");


router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);

/*** CARRITO ***/ 
router.get("/productcart", mainController.productCart);

module.exports = router;
