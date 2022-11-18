// ************ Require's ************
const express = require('express');
const multer = require ('multer')
const router = express.Router();

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** MULTER ***/ 
var storage = multer.diskStorage({
    destination: function (req, file , cb){
        cb(null, './public/img')
    },
    filename: function (req, file , cb){
        cb(null, file.fieldname + '-' + Date.now() + Path2D.extname(file.originalname))
    }
})
var upload = multer ({storage: storage})
/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CARRITO ***/ 
router.get("/productCart", productsController.productCart);


/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/', productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.patch('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
