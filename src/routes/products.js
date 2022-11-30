// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

// ************ Controller Require ************
const prodController= require(path.resolve(__dirname,'../controllers/prodController'));

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

/*** GET ALL PRODUCTS ***/ 
router.get('/products', prodController.index);

/*** GET ONE PRODUCT ***/ 
router.get('/products/detail/:id', prodController.show);

/*** CREATE ONE PRODUCT ***/ 
router.get('/products/create', prodController.create);
router.post('/products/create', upload.single('imagen'), prodController.save);

/*** EDIT ONE PRODUCT ***/ 
router.get('/products/edit/:id', prodController.edit);
router.put('/products/edit/:id', upload.single('imagen'), prodController.update);

/*** DELETE ONE PRODUCT***/ 
router.get('/products/delete/:id', prodController.delete);

module.exports = router;