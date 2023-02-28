// ************ Require's ************
const express = require("express");
let router = express.Router();
const multer = require("multer");

// ************ Controller Require ************
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);

/*** SERVICIOS ***/
router.get("/servicios", mainController.servicios);

/*** CARRITO ***/
router.get("/productcart", mainController.productCart);

/*** LISTADO ***/
router.get("/listado", mainController.listado);

module.exports = router;
