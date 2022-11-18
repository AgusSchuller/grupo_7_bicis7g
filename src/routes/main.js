// ************ Require's ************
const express = require("express");
let router = express.Router();

// ************ Controller Require ************
const mainController = require("../controllers/mainController");

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);



//router.get("/productDetail", mainController.productDetail);

//router.get("/newProd", mainController.newProd);

//router.get("/editProd", mainController.editProd)


module.exports = router;
