// ************ Require's ************
const express = require("express");
let router = express.Router();
const multer = require ('multer')

// ************ Controller Require ************
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);

/*** CARRITO ***/ 
router.get("/productcart", mainController.productCart);

module.exports = router;
