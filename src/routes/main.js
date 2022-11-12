const express = require("express");

const mainController = require("../controllers/mainController");

let router = express.Router();



router.get("/", mainController.index);

router.get("/login", mainController.login);

router.get("/register", mainController.register);

router.get("/productCart", mainController.productCart);

router.get("/productDetail", mainController.productDetail);

router.get("/newProd", mainController.newProd);

router.get("/editProd", mainController.editProd)


module.exports = router;
