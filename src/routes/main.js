// ************ Require's ************
const express = require("express");
let router = express.Router();
const multer = require ('multer')

// ************ Controller Require ************
const mainController = require("../controllers/mainController");

/*** MULTER ***/ 
var storage = multer.diskStorage({
    destination: function (req, file , cb){
        cb(null, './public/img')
    },
    filename: function (req, file , cb){
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
var upload = multer ({storage: storage})

router.get("/", mainController.index);
router.get("/login", mainController.login);
router.get("/register", mainController.register);

/*** CARRITO ***/ 
router.get("/productcart", mainController.productCart);

module.exports = router;
